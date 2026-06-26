"use client";

import { useState } from "react";
import Image from "next/image";
import { brandLogos } from "@/data/cars";

type LogoRenderer = (props: { color: string; bg: string }) => React.ReactNode;

// Brands that work on simpleicons.org — served from CDN with color
const simpleIconsSlugs: Record<string, string> = {
  "Maruti Suzuki": "suzuki",
  Hyundai: "hyundai",
  Toyota: "toyota",
  Honda: "honda",
  Mahindra: "mahindra",
  Tata: "tata",
  Kia: "kia",
  Volkswagen: "volkswagen",
  Skoda: "skoda",
  Renault: "renault",
  Nissan: "nissan",
  Ford: "ford",
  BMW: "bmw",
  Audi: "audi",
  Porsche: "porsche",
  Volvo: "volvo",
  Mitsubishi: "mitsubishi",
};

// Brands not on simpleicons — rendered as inline SVGs
const inlineLogos: Record<string, LogoRenderer> = {
  "Mercedes-Benz": ({ color }) => (
    <svg viewBox="0 0 60 60" className="h-9 w-9">
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="2" />
      <line x1="30" y1="4" x2="30" y2="30" stroke={color} strokeWidth="2" />
      <line x1="30" y1="30" x2="10" y2="50" stroke={color} strokeWidth="2" />
      <line x1="30" y1="30" x2="30" y2="50" stroke={color} strokeWidth="2" />
      <line x1="30" y1="30" x2="50" y2="50" stroke={color} strokeWidth="2" />
      <line x1="10" y1="50" x2="30" y2="30" stroke={color} strokeWidth="2" />
      <line x1="30" y1="30" x2="50" y2="50" stroke={color} strokeWidth="2" />
    </svg>
  ),
  Jaguar: ({ color }) => (
    <svg viewBox="0 0 60 60" className="h-9 w-9">
      <circle cx="30" cy="30" r="27" fill="none" stroke={color} strokeWidth="1.5" />
      <text x="30" y="32" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="serif">JAGUAR</text>
    </svg>
  ),
  "Land Rover": ({ color }) => (
    <svg viewBox="0 0 60 60" className="h-9 w-9">
      <rect x="4" y="12" width="52" height="36" rx="18" fill="none" stroke={color} strokeWidth="2" />
      <text x="30" y="33" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="9" fontWeight="700" fontFamily="serif">LAND ROVER</text>
    </svg>
  ),
};

export default function BrandLogoImage({ brand }: { brand: string }) {
  const [failed, setFailed] = useState(false);
  const logo = brandLogos[brand];
  const slug = simpleIconsSlugs[brand];
  const color = logo?.color || "#1e3a5f";
  const bg = logo?.bg || "#f0f4f8";

  // Missing brands — render inline SVG
  if (inlineLogos[brand]) {
    return <div className="flex items-center justify-center h-full w-full">{inlineLogos[brand]({ color, bg })}</div>;
  }

  // CDN-loaded logo
  if (slug && !failed) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Image
          src={`https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`}
          alt={`${brand} logo`}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  // Fallback — first letter
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full p-2">
      <text
        x="30" y="36"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="20"
        fontWeight="800"
        fontFamily="system-ui"
      >
        {brand.charAt(0)}
      </text>
    </svg>
  );
}
