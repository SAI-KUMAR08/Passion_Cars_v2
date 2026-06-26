"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Calendar, Cog, Fuel, CircleDot } from "lucide-react";
import { useCars } from "@/context/CarContext";
import ScrollReveal from "./ScrollReveal";
import { SkeletonCard } from "./Skeleton";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedCars() {
  const { cars, loading } = useCars();
  const featuredCars = cars.slice(0, 6);

  return (
    <section className="py-20">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="badge-red">Featured Vehicles</span>
          <h2 className="section-title mt-4">Our Top Picks for You</h2>
          <p className="section-subtitle">
            Handpicked selection of premium pre-owned cars, each thoroughly inspected and ready to drive home.
          </p>
        </ScrollReveal>

        {/* Skeleton Loading */}
        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Car Grid */}
        {!loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car, index) => (
              <ScrollReveal key={car.id} delay={index * 0.08}>
                <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  {/* Image */}
                  <div className={`relative h-48 overflow-hidden bg-gray-100 ${car.sold ? "opacity-60" : ""}`}>
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {car.sold ? (
                      <span className="badge absolute left-3 top-3 bg-navy-700 text-white border-0">
                        SOLD
                      </span>
                    ) : (
                      <span className="badge absolute left-3 top-3 bg-brand-600 text-white border-0">
                        ON SALE
                      </span>
                    )}
                    <span className="badge absolute right-3 top-3 bg-white/90 text-gray-700 backdrop-blur-sm border-0">
                      {car.stockId}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>

                    {/* Specs */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {car.year}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Cog className="h-3.5 w-3.5" />
                        {car.transmission}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Fuel className="h-3.5 w-3.5" />
                        {car.fuel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Gauge className="h-3.5 w-3.5" />
                        {car.kilometers.toLocaleString()} km
                      </span>
                    </div>

                    {/* Color */}
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <CircleDot className="h-3.5 w-3.5" />
                      {car.color}
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <span className="text-2xl font-bold text-brand-600">{formatPrice(car.price)}</span>
                        {car.originalPrice && (
                          <span className="ml-2 text-sm text-gray-400 line-through">
                            {formatPrice(car.originalPrice)}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/buy/${car.id}`}
                        className="flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                      >
                        View
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <ScrollReveal className="mt-10 text-center">
          <Link href="/buy" className="btn-primary">
            View All Cars
            <ArrowRight className="h-5 w-5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
