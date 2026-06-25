"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Cog, Fuel, Gauge, CircleDot, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { useCars } from "@/context/CarContext";
import CTASection from "@/components/CTASection";
import { useSettings } from "@/context/SettingsContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CarDetailPage() {
  const params = useParams();
  const { cars } = useCars();
  const { settings } = useSettings();
  const [selectedImage, setSelectedImage] = useState(0);
  const car = cars.find((c) => c.id === Number(params.id));

  if (!car) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="text-3xl font-bold text-dark-900">Car Not Found</h1>
        <p className="mt-4 text-dark-400">The car you&apos;re looking for doesn&apos;t exist or has been sold.</p>
        <Link href="/buy" className="btn-primary mt-8">
          <ArrowLeft className="h-5 w-5" />
          Back to Inventory
        </Link>
      </div>
    );
  }

  const currentImage = car.images[selectedImage] || car.image;
  const relatedCars = cars.filter((c) => c.brand === car.brand && c.id !== car.id).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-gray-100 bg-gray-50 py-4">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm text-dark-400">
            <Link href="/" className="hover:text-accent-500">Home</Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-accent-500">Inventory</Link>
            <span>/</span>
            <span className="text-dark-900">{car.name}</span>
          </div>
        </div>
      </section>

      {/* Car Detail */}
      <section className="py-12">
        <div className="container-wide">
          <Link href="/buy" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-dark-500 hover:text-accent-500">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Link>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Image Gallery */}
            <div className="lg:col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 border-2 border-dark-900">
                <Image
                  src={currentImage}
                  alt={car.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-500"
                  priority
                />
                {car.sold ? (
                  <span className="marker-stock absolute left-4 top-4 text-sm px-4 py-1.5 bg-gray-800 text-white font-bold">
                    SOLD
                  </span>
                ) : (
                  <span className="marker-sale absolute left-4 top-4 text-sm px-4 py-1.5">
                    On Sale
                  </span>
                )}
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-[4/3] overflow-hidden bg-gray-100 transition-all duration-200 ${
                      selectedImage === i
                        ? "ring-2 ring-accent-500 ring-offset-2 opacity-100 scale-95"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ borderRadius: 0, border: selectedImage === i ? "2.5px solid #0f172a" : "2.5px solid transparent" }}
                  >
                    <Image src={img} alt={`${car.name} view ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 25vw, 20vw" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-dark-900">{car.name}</h1>
              <p className="mt-1 text-sm text-dark-400">Stock ID: {car.stockId}</p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent-500">{formatPrice(car.price)}</span>
                {car.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(car.originalPrice)}</span>
                )}
              </div>
              {car.sold && (
                <div className="mt-4 marker-card bg-red-50 text-center border-red-300">
                  <p className="font-bold text-red-700">This vehicle has been sold</p>
                  <p className="text-sm text-red-500 mt-1">Check similar cars in our inventory</p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-5">
                {[
                  { icon: Calendar, label: "Year", value: car.year.toString() },
                  { icon: Cog, label: "Transmission", value: car.transmission },
                  { icon: Fuel, label: "Fuel Type", value: car.fuel },
                  { icon: Gauge, label: "Kilometers", value: `${car.kilometers.toLocaleString()} km` },
                  { icon: CircleDot, label: "Color", value: car.color },
                  { icon: Cog, label: "Brand", value: car.brand },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-accent-500" />
                    <div>
                      <p className="text-xs text-dark-400">{item.label}</p>
                      <p className="text-sm font-semibold text-dark-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {car.description && (
                <div className="mt-6">
                  <h3 className="font-semibold text-dark-900">Description</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-400">{car.description}</p>
                </div>
              )}

              {/* Features */}
              <div className="mt-6">
                <h3 className="font-semibold text-dark-900">Key Features</h3>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    "Power Steering",
                    "Air Conditioning",
                    "Power Windows",
                    "ABS",
                    "Airbags",
                    "Central Locking",
                    "Music System",
                    "Alloy Wheels",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-dark-500">
                      <CheckCircle className="h-4 w-4 text-accent-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                <a href={"tel:" + settings.phone.replace(/[^0-9+]/g, "")} className="btn-primary w-full justify-center py-4 text-base">
                  <Phone className="h-5 w-5" />
                  Call Now: {settings.phone}
                </a>
                <a
                  href={"https://wa.me/" + settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center py-4 text-base border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-dark-900">Similar {car.brand} Models</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCars.map((rc) => (
                <Link key={rc.id} href={`/buy/${rc.id}`} className="card group overflow-hidden p-0">
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <Image src={rc.image} alt={rc.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-dark-900">{rc.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-accent-500">{formatPrice(rc.price)}</span>
                      <span className="flex items-center gap-1 text-sm text-dark-500">
                        {rc.year} &middot; {rc.kilometers.toLocaleString()} km
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
