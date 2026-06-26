import Link from "next/link";
import { ArrowRight, Shield, BadgeCheck, Landmark, ClipboardCheck } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Verified Cars" },
  { icon: BadgeCheck, label: "Quality Checked" },
  { icon: Landmark, label: "Finance Available" },
  { icon: ClipboardCheck, label: "RC Transfer Assistance" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Subtle Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="container-wide relative z-10">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-500" />
            Trusted by 5000+ Happy Customers
          </div>

          {/* Main Heading */}
          <h1 className="animate-slide-up max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Pre-Owned Cars Driven on{" "}
            <span className="text-brand-500">Trust &amp; Quality</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-slide-up mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
            style={{ animationDelay: "0.1s" }}
          >
            Discover the finest selection of quality-assured pre-owned vehicles. Each car undergoes rigorous
            inspection and comes with comprehensive warranty coverage.
          </p>

          {/* Trust Badges */}
          <div
            className="animate-slide-up mt-8 flex flex-wrap justify-center gap-4"
            style={{ animationDelay: "0.15s" }}
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 text-brand-400" />
                  {badge.label}
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div
            className="animate-slide-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href="/buy"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-brand-700 active:scale-[0.98]"
            >
              Browse Our Inventory
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              Sell Your Car
            </Link>
          </div>

          {/* Stats */}
          <div
            className="animate-slide-up mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { value: "500+", label: "Cars Sold" },
              { value: "10+", label: "Years Experience" },
              { value: "4.9★", label: "Customer Rating" },
              { value: "20+", label: "Car Brands" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
