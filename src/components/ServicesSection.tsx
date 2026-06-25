import Link from "next/link";
import { Car, DollarSign, RefreshCw, Banknote, ArrowRight } from "lucide-react";
import { services } from "@/data/cars";

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
        <div className="mx-auto max-w-3xl text-center">
          <span className="marker-badge bg-accent-50 text-accent-600">
            Our Services
          </span>
          <h2 className="section-title mt-4">Everything You Need Under One Roof</h2>
          <p className="section-subtitle">
            From buying to selling, financing to exchange — we handle it all with transparency and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="marker-card group flex flex-col sm:flex-row sm:items-start sm:gap-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center marker-circle bg-accent-50 text-accent-500 sm:mb-0">
                {iconMap[service.icon] || <Car className="h-8 w-8" />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-dark-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-400">{service.description}</p>
                <ul className="mt-3 space-y-1.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-dark-500">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-accent-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-primary px-8 py-4 text-base">
            Explore All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
