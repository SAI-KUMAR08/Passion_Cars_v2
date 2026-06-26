"use client";

import Link from "next/link";
import { Car, DollarSign, RefreshCw, Banknote, ArrowRight } from "lucide-react";
import { services } from "@/data/cars";
import ScrollReveal from "./ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="h-8 w-8" />,
  DollarSign: <DollarSign className="h-8 w-8" />,
  RefreshCw: <RefreshCw className="h-8 w-8" />,
  Banknote: <Banknote className="h-8 w-8" />,
};

export default function ServicesSection() {
  return (
    <section className="py-20">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="badge-red">Our Services</span>
          <h2 className="section-title mt-4">Everything You Need Under One Roof</h2>
          <p className="section-subtitle">
            From buying to selling, financing to exchange — we handle it all with transparency and care.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <div className="card-hover flex flex-col sm:flex-row sm:items-start sm:gap-6">
                <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 sm:mb-0">
                  {iconMap[service.icon] || <Car className="h-8 w-8" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{service.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All CTA */}
        <ScrollReveal className="mt-10 text-center">
          <Link href="/services" className="btn-primary px-8 py-4 text-base">
            Explore All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
