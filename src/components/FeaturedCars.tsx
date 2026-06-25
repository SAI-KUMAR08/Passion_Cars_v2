"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Calendar, Cog, Fuel, CircleDot } from "lucide-react";
import { useCars } from "@/context/CarContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function FeaturedCars() {
  const { cars } = useCars();
  // Show first 6 cars as featured
  const featuredCars = cars.slice(0, 6);

  return (
    <section className="py-20">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="marker-badge bg-accent-50 text-accent-600 animate-fade-in">
            Featured Vehicles
          </span>
          <h2 className="section-title mt-4 animate-slide-up">Our Top Picks for You</h2>
          <p className="section-subtitle">
            Handpicked selection of premium pre-owned cars, each thoroughly inspected and ready to drive home.
          </p>
        </div>

        {/* Car Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car, index) => (
            <div key={car.id} className="marker-card-nopad group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Image */}
              <div className={`relative h-48 overflow-hidden bg-gray-100 ${car.sold ? 'opacity-60' : ''}`}>
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {car.sold ? (
                  <span className="marker-stock absolute left-3 top-3 bg-gray-800 text-white font-bold">
                    SOLD
                  </span>
                ) : (
                  <span className="marker-sale absolute left-3 top-3">
                    SALE
                  </span>
                )}
                <span className="marker-stock absolute right-3 top-3">
                  {car.stockId}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-dark-900">{car.name}</h3>

                {/* Specs */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-dark-400">
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
                <div className="mt-2 flex items-center gap-1.5 text-sm text-dark-400">
                  <CircleDot className="h-3.5 w-3.5" />
                  {car.color}
                </div>

                {/* Price & CTA */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <span className="text-2xl font-bold text-dark-900">{formatPrice(car.price)}</span>
                    {car.originalPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        {formatPrice(car.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/buy/${car.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-accent-500 transition-colors hover:text-accent-600"
                  >
                    View
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <Link href="/buy" className="btn-marker">
            View All Cars
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
