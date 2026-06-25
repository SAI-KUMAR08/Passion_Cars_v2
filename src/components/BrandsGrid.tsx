import Link from "next/link";
import { brands, brandLogos } from "@/data/cars";
import BrandLogoImage from "./BrandLogoImage";

export default function BrandsGrid() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="marker-badge bg-accent-50 text-accent-600">
            Browse by Brands
          </span>
          <h2 className="section-title mt-4">Explore by Manufacturer</h2>
          <p className="section-subtitle">
            Choose from 20+ leading car brands — from economy to luxury. Find your perfect match.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => {
            const logo = brandLogos[brand];
            return (
              <Link
                key={brand}
                href={`/buy?brand=${encodeURIComponent(brand)}`}
                className="marker-card group flex flex-col items-center justify-center py-8 text-center transition-all hover:-translate-y-1"
              >
                {/* Brand Logo Badge */}
                <div
                  className="mb-3 flex h-16 w-16 items-center justify-center marker-circle overflow-hidden"
                  style={{ backgroundColor: logo?.bg || "#f0f4f8" }}
                >
                  <BrandLogoImage brand={brand} />
                </div>
                <span
                  className="text-sm font-semibold transition-colors"
                  style={{ color: logo?.color || "#1e3a5f" }}
                >
                  {brand}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
