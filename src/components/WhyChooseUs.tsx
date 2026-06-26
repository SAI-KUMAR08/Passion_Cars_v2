"use client";

import { Shield, BadgeCheck, Eye, Headphones, Wrench } from "lucide-react";
import { whyChooseUs } from "@/data/cars";
import ScrollReveal from "./ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-8 w-8" />,
  BadgeCheck: <BadgeCheck className="h-8 w-8" />,
  Eye: <Eye className="h-8 w-8" />,
  Headphones: <Headphones className="h-8 w-8" />,
  Wrench: <Wrench className="h-8 w-8" />,
};

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="badge-red">Why Choose Us</span>
          <h2 className="section-title mt-4">Built on Trust, Driven by Quality</h2>
          <p className="section-subtitle">
            We are committed to providing the best pre-owned car buying experience with transparency, quality,
            and unmatched after-sales support.
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whyChooseUs.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.08}>
              <div className="card-hover group text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {iconMap[feature.icon] || <Shield className="h-8 w-8" />}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
