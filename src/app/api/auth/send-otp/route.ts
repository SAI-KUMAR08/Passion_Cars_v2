import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

const isDev = process.env.NODE_ENV === "development";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Normalize phone: remove spaces, ensure starts with +
    const normalizedPhone = phone.replace(/\s+/g, "");
    if (!normalizedPhone.startsWith("+")) {
      return NextResponse.json({ error: "Phone number must include country code (e.g. +91)" }, { status: 400 });
    }

    // Mark any previous unused OTPs for this phone as used
    await prisma.otp.updateMany({
      where: { phone: normalizedPhone, used: false, expiresAt: { gte: new Date() } },
      data: { used: true },
    });

    // Generate and store new OTP
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await prisma.otp.create({
      data: { phone: normalizedPhone, otp, expiresAt },
    });

    // In development, return the OTP so the user can see it without SMS
    const response: Record<string, unknown> = { success: true, message: "OTP sent to your phone" };
    if (isDev) {
      response.otp = otp;
      response.message = "OTP sent (DEV: " + otp + ")";
    }

    console.log(`OTP for ${normalizedPhone}: ${otp} (expires at ${expiresAt.toISOString()})`);

    return NextResponse.json(response);
  } catch (error) {
    console.error("send-otp error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
