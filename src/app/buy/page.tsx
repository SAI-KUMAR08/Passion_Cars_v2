"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Calendar, Cog, Fuel, Gauge, CircleDot,
  Search, SlidersHorizontal, X, CarFront
} from "lucide-react";
import { brands } from "@/data/cars";
import { useCars } from "@/context/CarContext";
import { SkeletonCard } from "@/components/Skeleton";
import ScrollReveal from "@/components/ScrollReveal";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

type SortOption = "newest" | "price-low" | "price-high" | "recent";

const transmissions = ["Manual", "Automatic"];
const fuels = ["Petrol", "Diesel", "CNG", "Electric"];

export default function BuyPage() {
  const { cars, loading } = useCars();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const years = useMemo(() => {
    const yrSet = new Set(cars.map((c) => c.year));
    return Array.from(yrSet).sort((a, b) => b - a);
  }, [cars]);

  const filteredCars = useMemo(() => {
    const result = cars.filter((car) => {
      if (search && !car.name.toLowerCase().includes(search.toLowerCase()) && !car.brand.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (selectedBrand && car.brand !== selectedBrand) return false;
      if (selectedTransmission && car.transmission !== selectedTransmission) return false;
      if (selectedFuel && car.fuel !== selectedFuel) return false;
      if (selectedYear && car.year !== Number(selectedYear)) return false;
      if (car.price < priceRange[0] || car.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      case "recent":
      default:
        result.sort((a, b) => b.year - a.year || b.id - a.id);
        break;
    }
    return result;
  }, [cars, search, selectedBrand, selectedTransmission, selectedFuel, selectedYear, priceRange, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedTransmission("");
    setSelectedFuel("");
    setSelectedYear("");
    setPriceRange([0, 5000000]);
  };

  const hasActiveFilters = search || selectedBrand || selectedTransmission || selectedFuel || selectedYear;

  // Shared filter panel content used in both sidebar (desktop) and popover (mobile)
  const filterPanelContent = (
    <div className="space-y-6">
      {/* Brand */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Brand</label>
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="select-field w-full">
          <option value="">All Brands</option>
          {brands.map((brand) => (<option key={brand} value={brand}>{brand}</option>))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Transmission</label>
        <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} className="select-field w-full">
          <option value="">All Transmissions</option>
          {transmissions.map((t) => (<option key={t} value={t}>{t}</option>))}
        </select>
      </div>

      {/* Fuel */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Fuel Type</label>
        <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)} className="select-field w-full">
          <option value="">All Fuels</option>
          {fuels.map((f) => (<option key={f} value={f}>{f}</option>))}
        </select>
      </div>

      {/* Year */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Year</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="select-field w-full">
          <option value="">All Years</option>
          {years.map((y) => (<option key={y} value={y}>{y}</option>))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Max Price: {formatPrice(priceRange[1])}
        </label>
        <input
          type="range"
          min={0}
          max={5000000}
          step={50000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full accent-brand-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹0</span>
          <span>₹50L+</span>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button onClick={clearFilters} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
          <X className="h-4 w-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Browse Our Inventory</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Explore our extensive collection of quality-assured pre-owned cars
          </p>
        </div>
      </section>

      {/* Filters & Listing */}
      <section className="py-8 lg:py-12">
        <div className="container-wide">
          {/* Search & Sort bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by car name or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="select-field py-2.5 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Lowest Price</option>
                <option value="price-high">Highest Price</option>
                <option value="recent">Recently Added</option>
              </select>

              {/* Mobile-only filter toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors lg:hidden ${
                  showMobileFilters
                    ? "border-brand-200 bg-brand-50 text-brand-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              <span className="text-sm text-gray-400">
                {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"}
              </span>
            </div>
          </div>

          {/* Mobile Filter Panel (hidden on lg+) */}
          {showMobileFilters && (
            <div className="mt-4 animate-slide-down rounded-xl border border-gray-100 bg-white p-6 shadow-sm lg:hidden">
              {filterPanelContent}
            </div>
          )}

          {/* Main Content: Sidebar + Grid (lg+) */}
          <div className="mt-8 flex gap-8">
            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                </div>
                {filterPanelContent}
              </div>
            </aside>

            {/* Car Grid */}
            <div className="flex-1 min-w-0">
              {/* Skeleton Loading */}
              {loading && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}

              {/* Results */}
              {!loading && filteredCars.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCars.map((car, index) => (
                    <ScrollReveal key={car.id} delay={index * 0.03}>
                      <div className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                        <div className={`relative h-48 overflow-hidden bg-gray-100 ${car.sold ? "opacity-60" : ""}`}>
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {car.sold ? (
                            <span className="badge absolute left-3 top-3 bg-navy-700 text-white border-0">SOLD</span>
                          ) : car.onSale ? (
                            <span className="badge absolute left-3 top-3 bg-brand-600 text-white border-0">ON SALE</span>
                          ) : null}
                          <span className="badge absolute right-3 top-3 bg-white/90 text-gray-700 backdrop-blur-sm border-0">
                            {car.stockId}
                          </span>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />{car.year}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Cog className="h-3.5 w-3.5" />{car.transmission}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Fuel className="h-3.5 w-3.5" />{car.fuel}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Gauge className="h-3.5 w-3.5" />{car.kilometers.toLocaleString()} km
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                            <CircleDot className="h-3.5 w-3.5" />{car.color}
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                            <div>
                              <span className="text-2xl font-bold text-brand-600">{formatPrice(car.price)}</span>
                              {car.originalPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">{formatPrice(car.originalPrice)}</span>
                              )}
                            </div>
                            <Link
                              href={`/buy/${car.id}`}
                              className="flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                            >
                              View Details
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredCars.length === 0 && (
                <div className="mt-16 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">No cars found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria to find your perfect car.</p>
                  <button onClick={clearFilters} className="btn-primary mt-6">Clear All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
