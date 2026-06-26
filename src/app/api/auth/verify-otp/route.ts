import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "cartimez-secret-change-in-production";

export async function POST(req: Request) {
  try {
    const { phone, otp, name } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone number and OTP are required" }, { status: 400 });
    }

    const normalizedPhone = phone.replace(/\s+/g, "");

    // Find a valid (unused, not expired) OTP for this phone
    const validOtp = await prisma.otp.findFirst({
      where: {
        phone: normalizedPhone,
        otp,
        used: false,
        expiresAt: { gte: new Date() },
      },
    });

    if (!validOtp) {
      return NextResponse.json({ error: "Invalid or expired OTP. Please request a new one." }, { status: 401 });
    }

    // Mark OTP as used
    await prisma.otp.update({ where: { id: validOtp.id }, data: { used: true } });

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { phone: normalizedPhone } });

    if (user) {
      // Login flow — existing user
      const token = jwt.sign(
        { id: user.id, phone: user.phone, name: user.name, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return NextResponse.json({
        token,
        user: { id: user.id, phone: user.phone, email: user.email, name: user.name, isAdmin: user.isAdmin },
      });
    }

    // Registration flow — new user
    if (!name) {
      return NextResponse.json({
        error: "No account found with this phone number. Please sign up with your name.",
      }, { status: 404 });
    }

    const firstUser = (await prisma.user.count()) === 0;

    user = await prisma.user.create({
      data: { name, phone: normalizedPhone, isAdmin: firstUser },
    });

    const token = jwt.sign(
      { id: user.id, phone: user.phone, name: user.name, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user: { id: user.id, phone: user.phone, email: user.email, name: user.name, isAdmin: user.isAdmin },
    });
  } catch (error) {
    console.error("verify-otp error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
