"use client";

import { Car, DollarSign, RefreshCw, Banknote, CheckCircle } from "lucide-react";
import { services } from "@/data/cars";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="h-10 w-10" />,
  DollarSign: <DollarSign className="h-10 w-10" />,
  RefreshCw: <RefreshCw className="h-10 w-10" />,
  Banknote: <Banknote className="h-10 w-10" />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Comprehensive automotive solutions — from buying and selling to exchange and financing. We handle it all.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="container-wide space-y-16">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {index % 2 === 0 ? (
                  <>
                    <div>
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        {iconMap[service.icon] || <Car className="h-10 w-10" />}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                      <p className="mt-4 leading-relaxed text-gray-500">{service.description}</p>
                      <ul className="mt-6 space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="btn-primary mt-6">
                        Get Started
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center">
                      <div className="text-center text-white">
                        {iconMap[service.icon]}
                        <p className="mt-4 text-2xl font-bold">{service.title}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center order-last lg:order-first">
                      <div className="text-center text-white">
                        {iconMap[service.icon]}
                        <p className="mt-4 text-2xl font-bold">{service.title}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        {iconMap[service.icon] || <Car className="h-10 w-10" />}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                      <p className="mt-4 leading-relaxed text-gray-500">{service.description}</p>
                      <ul className="mt-6 space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="btn-primary mt-6">
                        Get Started
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-gray-50 py-20">
        <div className="container-wide">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="badge-red">How It Works</span>
            <h2 className="section-title mt-4">Simple 3-Step Process</h2>
            <p className="section-subtitle">Getting your dream car is as easy as 1-2-3.</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Browse & Select", desc: "Explore our extensive inventory online or visit our showroom. Compare models, features, and prices." },
              { step: "02", title: "Inspect & Test Drive", desc: "Schedule a test drive of your shortlisted cars. Our experts walk you through every detail." },
              { step: "03", title: "Drive Home", desc: "We handle all documentation, registration, and paperwork. You drive home the same day!" },
            ].map((item) => (
              <ScrollReveal key={item.step}>
                <div className="card-hover text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
