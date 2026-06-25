"use client";

import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function CTASection() {
  const { settings } = useSettings();

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-accent" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ready to Find Your Dream Car?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Visit our showroom today or schedule a test drive. Our team is ready to help you every step of the
            way.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/buy"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-bold text-accent-600 transition-all hover:bg-gray-100"
            >
              Browse Inventory
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={"tel:" + settings.phone.replace(/[^0-9+]/g, "")}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </a>
            <a
              href={"https://wa.me/" + settings.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
