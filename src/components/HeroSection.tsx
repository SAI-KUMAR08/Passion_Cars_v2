import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {

  return (
    <section className="relative overflow-hidden gradient-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent-500 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gold-500 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent-400" />
            Trusted by 5000+ Happy Customers
          </div>

          {/* Main Heading */}
          <h1 className="animate-slide-up max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Pre-Owned Cars Driven on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-gold-400">
              Trust & Quality
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up mt-6 max-w-2xl text-lg text-gray-300 md:text-xl" style={{ animationDelay: "0.1s" }}>
            Discover the finest selection of quality-assured pre-owned vehicles. Each car undergoes rigorous
            inspection and comes with comprehensive warranty coverage.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-slide-up mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/buy" className="btn-marker">
              Browse Our Inventory
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/sell" className="btn-marker-ghost">
              Sell Your Car
            </Link>
          </div>

          {/* Stats */}
          <div
            className="animate-slide-up mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              { value: "500+", label: "Cars in Stock" },
              { value: "15+", label: "Years Experience" },
              { value: "5000+", label: "Happy Customers" },
              { value: "20+", label: "Car Brands" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-white/50" />
      </div>
    </section>
  );
}
