"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function FloatingContact() {
  const { settings } = useSettings();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={"tel:" + settings.phone.replace(/[^0-9+]/g, "")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg transition-all hover:bg-accent-600 hover:-translate-y-1 hover:shadow-xl"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </a>
      <a
        href={"https://wa.me/" + settings.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:-translate-y-1 hover:shadow-xl"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
