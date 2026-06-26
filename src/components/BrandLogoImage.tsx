"use client";

import { useState } from "react";
import Image from "next/image";

// Real brand logo images from carlogos.org
const brandLogoImages: Record<string, string> = {
  "Maruti Suzuki": "https://www.carlogos.org/car-logos/suzuki-logo.png",
  Hyundai: "https://www.carlogos.org/car-logos/hyundai-logo.png",
  Toyota: "https://www.carlogos.org/car-logos/toyota-logo.png",
  Honda: "https://www.carlogos.org/car-logos/honda-logo.png",
  Mahindra: "https://www.carlogos.org/car-logos/mahindra-logo.png",
  Tata: "https://www.carlogos.org/car-logos/tata-logo.png",
  Kia: "https://www.carlogos.org/car-logos/kia-logo.png",
  Volkswagen: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
  Skoda: "https://www.carlogos.org/car-logos/skoda-logo.png",
  Renault: "https://www.carlogos.org/car-logos/renault-logo.png",
  Nissan: "https://www.carlogos.org/car-logos/nissan-logo.png",
  Ford: "https://www.carlogos.org/car-logos/ford-logo.png",
  BMW: "https://www.carlogos.org/car-logos/bmw-logo.png",
  "Mercedes-Benz": "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
  Audi: "https://www.carlogos.org/car-logos/audi-logo.png",
  "Land Rover": "https://www.carlogos.org/car-logos/land-rover-logo.png",
  Porsche: "https://www.carlogos.org/car-logos/porsche-logo.png",
  Volvo: "https://www.carlogos.org/car-logos/volvo-logo.png",
  Jaguar: "https://www.carlogos.org/car-logos/jaguar-logo.png",
  Mitsubishi: "https://www.carlogos.org/car-logos/mitsubishi-logo.png",
};

export default function BrandLogoImage({ brand }: { brand: string }) {
  const [failed, setFailed] = useState(false);
  const imgUrl = brandLogoImages[brand];

  if (imgUrl && !failed) {
    return (
      <div className="flex items-center justify-center h-full w-full p-2">
        <Image
          src={imgUrl}
          alt={`${brand} logo`}
          width={48}
          height={48}
          className="h-10 w-auto object-contain"
          onError={() => setFailed(true)}
          unoptimized
        />
      </div>
    );
  }

  // Fallback — first letter
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full p-2">
      <text x="30" y="36" textAnchor="middle" dominantBaseline="middle" fill="#1e3a5f" fontSize="20" fontWeight="800" fontFamily="system-ui">
        {brand.charAt(0)}
      </text>
    </svg>
  );
}
