import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function getSetting(key: string) {
  const s = await prisma.setting.findUnique({ where: { key } });
  return s?.value || null;
}

async function upsertSetting(key: string, value: string) {
  return prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function GET() {
  try {
    const phone = await getSetting("phone");
    const whatsapp = await getSetting("whatsapp");
    return NextResponse.json({
      phone: phone || "+91 99999 88888",
      whatsapp: whatsapp || "919999988888",
    });
  } catch {
    return NextResponse.json({ phone: "+91 99999 88888", whatsapp: "919999988888" });
  }
}

export async function PUT(req: Request) {
  try {
    const { phone, whatsapp } = await req.json();
    if (phone) await upsertSetting("phone", phone);
    if (whatsapp) await upsertSetting("whatsapp", whatsapp);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
