import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    env: {
      DATABASE_URL_SET: !!process.env.DATABASE_URL,
      DATABASE_URL_PREFIX: process.env.DATABASE_URL
        ? process.env.DATABASE_URL.substring(0, 30) + "..."
        : "NOT SET",
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  // Test DB connection
  try {
    const userCount = await prisma.user.count();
    const carCount = await prisma.car.count();
    diagnostics.database = {
      connected: true,
      users: userCount,
      cars: carCount,
    };
  } catch (error) {
    diagnostics.database = {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  return NextResponse.json(diagnostics);
}
