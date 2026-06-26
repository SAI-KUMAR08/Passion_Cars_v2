"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Cog, Fuel, Gauge, CircleDot, CheckCircle, Phone, MessageCircle, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useCars } from "@/context/CarContext";
import CTASection from "@/components/CTASection";
import { useSettings } from "@/context/SettingsContext";
import { SkeletonCarDetail } from "@/components/Skeleton";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

const trustBadges = [
  "✓ Quality Checked",
  "✓ Warranty Included",
  "✓ Finance Available",
  "✓ RC Transfer",
];

export default function CarDetailPage() {
  const params = useParams();
  const { cars, loading } = useCars();
  const { settings } = useSettings();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showEmi, setShowEmi] = useState(false);
  const [emiYears, setEmiYears] = useState(5);
  const car = cars.find((c) => c.id === Number(params.id));

  if (loading) {
    return (
      <section className="py-12">
        <div className="container-wide">
          <SkeletonCarDetail />
        </div>
      </section>
    );
  }

  if (!car) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Car Not Found</h1>
        <p className="mt-4 text-gray-500">The car you&apos;re looking for doesn&apos;t exist or has been sold.</p>
        <Link href="/buy" className="btn-primary mt-8">
          <ArrowLeft className="h-5 w-5" />
          Back to Inventory
        </Link>
      </div>
    );
  }

  const currentImage = car.images[selectedImage] || car.image;
  const relatedCars = cars.filter((c) => c.brand === car.brand && c.id !== car.id).slice(0, 3);
  const emiRate = 9.5;
  const principal = car.price * 0.8;
  const monthlyRate = emiRate / 12 / 100;
  const totalMonths = emiYears * 12;
  const emi = Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-gray-100 bg-gray-50 py-4">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-brand-600 transition-colors">Inventory</Link>
            <span>/</span>
            <span className="text-gray-900">{car.name}</span>
          </div>
        </div>
      </section>

      {/* Car Detail */}
      <section className="py-12">
        <div className="container-wide">
          <Link href="/buy" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Inventory
          </Link>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Image Gallery */}
            <div className="lg:col-span-3">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={currentImage}
                  alt={car.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-all duration-500"
                  priority
                />
                {car.sold ? (
                  <span className="badge absolute left-4 top-4 bg-navy-700 text-white border-0 text-sm px-3 py-1.5">
                    SOLD
                  </span>
                ) : (
                  <span className="badge absolute left-4 top-4 bg-brand-600 text-white border-0 text-sm px-3 py-1.5">
                    ON SALE
                  </span>
                )}
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
                  {selectedImage + 1} / {car.images.length}
                </div>
                {/* Navigation Arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(Math.min(car.images.length - 1, selectedImage + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 transition-all duration-200 ${
                      selectedImage === i
                        ? "ring-2 ring-brand-600 ring-offset-2 opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${car.name} view ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 25vw, 20vw" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details & Contact Card */}
            <div className="lg:col-span-2">
              {/* Sticky Contact Card */}
              <div className="lg:sticky lg:top-24 lg:space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
                  <p className="mt-1 text-sm text-gray-500">Stock ID: {car.stockId}</p>

                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-brand-600">{formatPrice(car.price)}</span>
                    {car.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">{formatPrice(car.originalPrice)}</span>
                    )}
                  </div>
                  {car.sold && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                      <p className="font-bold text-red-700">This vehicle has been sold</p>
                      <p className="text-sm text-red-500 mt-1">Check similar cars in our inventory</p>
                    </div>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {trustBadges.map((badge) => (
                      <span key={badge} className="badge bg-brand-50 text-brand-700 border-brand-200">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-5">
                  {[
                    { icon: Calendar, label: "Year", value: car.year.toString() },
                    { icon: Cog, label: "Transmission", value: car.transmission },
                    { icon: Fuel, label: "Fuel Type", value: car.fuel },
                    { icon: Gauge, label: "Kilometers", value: `${car.kilometers.toLocaleString()} km` },
                    { icon: CircleDot, label: "Color", value: car.color },
                    { icon: Cog, label: "Brand", value: car.brand },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-brand-600" />
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <a href={"tel:" + settings.phone.replace(/[^0-9+]/g, "")} className="btn-primary w-full justify-center py-4 text-base">
                    <Phone className="h-5 w-5" />
                    Call Now: {settings.phone}
                  </a>
                  <a
                    href={"https://wa.me/" + settings.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center py-4 text-base"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Enquire on WhatsApp
                  </a>
                  <button className="btn-ghost w-full justify-center border border-gray-200">
                    <Share2 className="h-4 w-4" />
                    Share Vehicle
                  </button>
                </div>

                {/* EMI Calculator */}
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                  <button
                    onClick={() => setShowEmi(!showEmi)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-gray-900">EMI Calculator</span>
                    <span className={`text-gray-400 transition-transform ${showEmi ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {showEmi && (
                    <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Vehicle Price</p>
                        <p className="text-lg font-bold text-gray-900">{formatPrice(car.price)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Loan Amount (80%)</p>
                        <p className="text-lg font-bold text-gray-900">{formatPrice(Math.round(car.price * 0.8))}</p>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-gray-500">Tenure: {emiYears} years</label>
                        <input
                          type="range"
                          min={1}
                          max={7}
                          value={emiYears}
                          onChange={(e) => setEmiYears(Number(e.target.value))}
                          className="w-full accent-brand-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>1 yr</span>
                          <span>7 yrs</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-brand-50 p-3">
                        <p className="text-sm text-gray-500">Monthly EMI @{emiRate}%</p>
                        <p className="text-2xl font-bold text-brand-600">{formatPrice(emi)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div className="mt-12 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900">Vehicle Description</h2>
              <p className="mt-4 leading-relaxed text-gray-600">{car.description}</p>
            </div>
          )}

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
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
                <li key={feature} className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white p-3 text-sm text-gray-700 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-brand-600 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Warranty & Inspection */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900">Warranty Information</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">• 1-year warranty on petrol engines</li>
                <li className="flex items-center gap-2">• 6-month warranty on diesel engines</li>
                <li className="flex items-center gap-2">• Coverage on major mechanical components</li>
                <li className="flex items-center gap-2">• Transferable to new owner</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900">Inspection Notes</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">• 100-point quality inspection completed</li>
                <li className="flex items-center gap-2">• Engine and transmission checked</li>
                <li className="flex items-center gap-2">• Body and paint condition verified</li>
                <li className="flex items-center gap-2">• Service history authenticated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-wide">
            <h2 className="text-2xl font-bold text-gray-900">Similar {car.brand} Models</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCars.map((rc) => (
                <Link key={rc.id} href={`/buy/${rc.id}`} className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <Image src={rc.image} alt={rc.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{rc.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-600">{formatPrice(rc.price)}</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
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
