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
          {/* Hero Logo */}
          <div className="animate-fade-in mb-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/20">
              <svg viewBox="0 0 100 100" className="h-9 w-9 text-white" fill="currentColor">
                <path d="M20 65c-2 0-4-1-5.5-3L8 52c-1.5-2-2-4-1-6l4-10c2-5 7-9 12-9h54c5 0 10 4 12 9l4 10c1 2 .5 4-1 6l-6.5 10c-1.5 2-3.5 3-5.5 3h-4c-3 0-5.5-1-7-3l-3-4H34l-3 4c-1.5 2-4 3-7 3h-4z"/>
                <circle cx="28" cy="62" r="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="72" cy="62" r="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="28" cy="62" r="3" fill="currentColor"/>
                <circle cx="72" cy="62" r="3" fill="currentColor"/>
                <rect x="30" y="50" width="40" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold tracking-tight text-white">
                Passion<span className="text-brand-500">Car</span>
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Premium Pre-Owned Cars
              </span>
            </div>
          </div>

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
