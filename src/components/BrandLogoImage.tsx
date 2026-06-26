"use client";

import { useState } from "react";
import Image from "next/image";

// Real brand logo images from Wikimedia Commons
const brandLogoImages: Record<string, string> = {
  "Maruti Suzuki": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Maruti_Suzuki_logo.svg/240px-Maruti_Suzuki_logo.svg.png",
  Hyundai: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Hyundai_Motor_Company_logo.svg/240px-Hyundai_Motor_Company_logo.svg.png",
  Toyota: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Toyota_Logo.svg/240px-Toyota_Logo.svg.png",
  Honda: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Honda_Logo.svg/240px-Honda_Logo.svg.png",
  Mahindra: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Mahindra_&_Mahindra_logo.svg/240px-Mahindra_&_Mahindra_logo.svg.png",
  Tata: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tata_Motors_Logo.svg/240px-Tata_Motors_Logo.svg.png",
  Kia: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Kia_Corporation_Logo.svg/240px-Kia_Corporation_Logo.svg.png",
  Volkswagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/240px-Volkswagen_logo_2019.svg.png",
  Skoda: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/%C5%A0koda_Logo.svg/240px-%C5%A0koda_Logo.svg.png",
  Renault: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Renault_logo_2021.svg/240px-Renault_logo_2021.svg.png",
  Nissan: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Nissan_logo.svg/240px-Nissan_logo.svg.png",
  Ford: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/240px-Ford_Motor_Company_Logo.svg.png",
  BMW: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/240px-BMW.svg.png",
  "Mercedes-Benz": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mercedes-Benz_Star_2022.svg/240px-Mercedes-Benz_Star_2022.svg.png",
  Audi: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Audi_2021_Logo.svg/240px-Audi_2021_Logo.svg.png",
  "Land Rover": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Land_Rover_logo_2020.svg/240px-Land_Rover_logo_2020.svg.png",
  Porsche: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Porsche_logo.svg/240px-Porsche_logo.svg.png",
  Volvo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Volvo_Logo_%282014%29.svg/240px-Volvo_Logo_%282014%29.svg.png",
  Jaguar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Jaguar_logo_%282021%29.svg/240px-Jaguar_logo_%282021%29.svg.png",
  Mitsubishi: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mitsubishi_logo.svg/240px-Mitsubishi_logo.svg.png",
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
      <text x="30" y="36" textAnchor="middle" dominantBaseline="middle" fill="#1e3a5f" fontSize="20" fontWeight="800" fontFamily="system-ui">{brand.charAt(0)}</text>
    </svg>
  );
}
