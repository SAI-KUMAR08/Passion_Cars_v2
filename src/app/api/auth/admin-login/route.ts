import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "cartimez-secret-change-in-production";

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json({ error: "Phone and password are required" }, { status: 400 });
    }

    const normalizedPhone = phone.replace(/\s+/g, "");

    const user = await prisma.user.findUnique({ where: { phone: normalizedPhone } });
    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.isAdmin) {
      return NextResponse.json({ error: "This login is for administrators only." }, { status: 403 });
    }

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
    console.error("admin-login error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
