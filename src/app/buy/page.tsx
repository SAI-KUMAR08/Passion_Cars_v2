"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Cog, Fuel, Gauge, CircleDot, Search, SlidersHorizontal, X } from "lucide-react";
import { brands } from "@/data/cars";
import { useCars } from "@/context/CarContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function BuyPage() {
  const { cars } = useCars();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = cars.filter((car) => {
    if (search && !car.name.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (selectedBrand && car.brand !== selectedBrand) return false;
    if (selectedTransmission && car.transmission !== selectedTransmission) return false;
    if (selectedFuel && car.fuel !== selectedFuel) return false;
    if (car.price < priceRange[0] || car.price > priceRange[1]) return false;
    return true;
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedTransmission("");
    setSelectedFuel("");
    setPriceRange([0, 5000000]);
  };

  const hasActiveFilters = search || selectedBrand || selectedTransmission || selectedFuel;

  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Browse Our Inventory</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Explore our extensive collection of quality-assured pre-owned cars
          </p>
        </div>
      </section>

      {/* Filters & Listing */}
      <section className="py-12">
        <div className="container-wide">
          {/* Search & Filter Toggle */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search by car name or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="marker-input w-full py-3 pl-10 pr-4 text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-dark-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                  showFilters
                    ? "border-accent-200 bg-accent-50 text-accent-600"
                    : "border-gray-200 text-dark-500 hover:border-gray-300"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <span className="text-sm text-dark-400">
                {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}
              </span>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 animate-slide-down marker-card">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand Filter */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dark-500">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="marker-select w-full px-3 py-2.5 text-sm text-dark-900"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transmission Filter */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dark-500">
                    Transmission
                  </label>
                  <select
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="marker-select w-full px-3 py-2.5 text-sm text-dark-900"
                  >
                    <option value="">All Transmissions</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                {/* Fuel Filter */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dark-500">
                    Fuel Type
                  </label>
                  <select
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    className="marker-select w-full px-3 py-2.5 text-sm text-dark-900"
                  >
                    <option value="">All Fuels</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Price Range Display */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-dark-500">
                    Max Price: {formatPrice(priceRange[1])}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={50000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent-500"
                  />
                  <div className="flex justify-between text-xs text-dark-400 mt-1">
                    <span>₹0</span>
                    <span>₹50L+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {filteredCars.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCars.map((car) => (
                <div key={car.id} className="marker-card-nopad group">
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
                        On Sale
                      </span>
                    )}
                    <span className="marker-stock absolute right-3 top-3">
                      {car.stockId}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-dark-900">{car.name}</h3>
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
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-dark-400">
                      <CircleDot className="h-3.5 w-3.5" />
                      {car.color}
                    </div>
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
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-8 w-8 text-dark-400" />
              </div>
              <h3 className="text-xl font-bold text-dark-900">No cars found</h3>
              <p className="mt-2 text-dark-400">
                Try adjusting your filters or search criteria to find your perfect car.
              </p>
              <button onClick={clearFilters} className="btn-marker mt-6">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
