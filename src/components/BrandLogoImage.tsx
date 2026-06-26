"use client";

import { brandLogos } from "@/data/cars";

type LogoRenderer = (props: { color: string; bg: string }) => React.ReactNode;

const brandSvgLogos: Record<string, LogoRenderer> = {
  "Maruti Suzuki": ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M50 18 L58 42 L82 42 L63 56 L70 80 L50 65 L30 80 L37 56 L18 42 L42 42 Z" fill={color} opacity="0.9" />
    </svg>
  ),
  Hyundai: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <ellipse cx="50" cy="50" rx="40" ry="36" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M28 42 Q35 30 50 28 Q65 30 72 42 L68 46 Q60 36 50 34 Q40 36 32 46 Z" fill={color} />
      <path d="M28 58 Q35 70 50 72 Q65 70 72 58 L68 54 Q60 64 50 66 Q40 64 32 54 Z" fill={color} />
      <line x1="28" y1="50" x2="72" y2="50" stroke={color} strokeWidth="3" />
    </svg>
  ),
  Toyota: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <ellipse cx="50" cy="45" rx="30" ry="22" fill="none" stroke={color} strokeWidth="2.5" />
      <ellipse cx="50" cy="60" rx="18" ry="14" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="50" cy="45" r="4" fill={color} />
      <text x="50" y="88" textAnchor="middle" fill={color} fontSize="9" fontWeight="700" fontFamily="system-ui">TOYOTA</text>
    </svg>
  ),
  Honda: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <rect x="12" y="38" width="76" height="24" rx="4" fill="none" stroke={color} strokeWidth="3" />
      <line x1="50" y1="12" x2="50" y2="88" stroke={color} strokeWidth="3" />
      <path d="M50 38 Q60 30 70 30" fill="none" stroke={color} strokeWidth="3" />
      <path d="M50 62 Q60 70 70 70" fill="none" stroke={color} strokeWidth="3" />
      <path d="M50 38 Q40 30 30 30" fill="none" stroke={color} strokeWidth="3" />
      <path d="M50 62 Q40 70 30 70" fill="none" stroke={color} strokeWidth="3" />
    </svg>
  ),
  Mahindra: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <rect x="15" y="20" width="70" height="60" rx="8" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M50 35 L62 65 L38 65 Z" fill={color} opacity="0.85" />
      <line x1="50" y1="35" x2="50" y2="20" stroke={color} strokeWidth="2.5" />
      <line x1="62" y1="65" x2="82" y2="75" stroke={color} strokeWidth="2.5" />
      <line x1="38" y1="65" x2="18" y2="75" stroke={color} strokeWidth="2.5" />
      <text x="50" y="92" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="system-ui">MAHINDRA</text>
    </svg>
  ),
  Tata: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M26 50 Q35 28 50 26 Q65 28 74 50 Q65 72 50 74 Q35 72 26 50Z" fill={color} opacity="0.15" />
      <path d="M34 50 Q42 36 50 34 Q58 36 66 50" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M50 34 L50 74" stroke={color} strokeWidth="2" opacity="0.3" />
    </svg>
  ),
  Kia: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <ellipse cx="50" cy="50" rx="40" ry="34" fill="none" stroke={color} strokeWidth="2.5" />
      <text x="50" y="54" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="22" fontWeight="800" fontFamily="system-ui">KIA</text>
      <path d="M28 58 Q38 50 50 52" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  ),
  Volkswagen: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="2.5" />
      <text x="50" y="42" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="16" fontWeight="900" fontFamily="system-ui">VW</text>
      <line x1="50" y1="50" x2="38" y2="72" stroke={color} strokeWidth="2.5" />
      <line x1="50" y1="50" x2="62" y2="72" stroke={color} strokeWidth="2.5" />
      <line x1="38" y1="72" x2="62" y2="72" stroke={color} strokeWidth="2.5" />
    </svg>
  ),
  Skoda: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M30 65 L50 28 L70 65 Z" fill="none" stroke={color} strokeWidth="2.5" />
      <line x1="50" y1="28" x2="50" y2="65" stroke={color} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4" fill={color} />
      <text x="50" y="88" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="system-ui">SKODA</text>
    </svg>
  ),
  Renault: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M50 15 L50 85 M15 50 L85 50" stroke={color} strokeWidth="2" opacity="0.3" />
      <text x="50" y="54" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="14" fontWeight="700" fontFamily="system-ui">R</text>
    </svg>
  ),
  Nissan: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="42" r="28" fill="none" stroke={color} strokeWidth="2.5" />
      <text x="50" y="46" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="24" fontWeight="800" fontFamily="system-ui">N</text>
      <text x="50" y="82" textAnchor="middle" fill={color} fontSize="8" fontWeight="700" fontFamily="system-ui">NISSAN</text>
    </svg>
  ),
  Ford: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <ellipse cx="50" cy="50" rx="42" ry="32" fill="none" stroke={color} strokeWidth="2.5" />
      <text x="50" y="54" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="20" fontWeight="800" fontFamily="system-ui">Ford</text>
      <path d="M26 42 Q38 30 50 38" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M74 42 Q62 30 50 38" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  BMW: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="28" fill="none" stroke={color} strokeWidth="2" />
      <line x1="50" y1="22" x2="50" y2="78" stroke={color} strokeWidth="2" />
      <line x1="22" y1="50" x2="78" y2="50" stroke={color} strokeWidth="2" />
      <path d="M50 22 L50 50 L78 50" fill={color} opacity="0.7" />
      <path d="M50 78 L50 50 L22 50" fill={color} opacity="0.7" />
      <text x="50" y="90" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="system-ui">BMW</text>
    </svg>
  ),
  "Mercedes-Benz": ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="2.5" />
      <line x1="50" y1="14" x2="50" y2="50" stroke={color} strokeWidth="2.5" />
      <line x1="50" y1="50" x2="24" y2="74" stroke={color} strokeWidth="2.5" />
      <line x1="50" y1="50" x2="76" y2="74" stroke={color} strokeWidth="2.5" />
      <line x1="24" y1="74" x2="76" y2="74" stroke={color} strokeWidth="2.5" />
    </svg>
  ),
  Audi: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="26" cy="50" r="16" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="16" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="74" cy="50" r="16" fill="none" stroke={color} strokeWidth="2.5" />
      <text x="50" y="86" textAnchor="middle" fill={color} fontSize="8" fontWeight="700" fontFamily="system-ui">AUDI</text>
    </svg>
  ),
  "Land Rover": ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <ellipse cx="50" cy="50" rx="38" ry="30" fill="none" stroke={color} strokeWidth="2.5" />
      <text x="50" y="48" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="9" fontWeight="800" fontFamily="system-ui">LAND</text>
      <text x="50" y="62" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="9" fontWeight="800" fontFamily="system-ui">ROVER</text>
    </svg>
  ),
  Porsche: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <rect x="12" y="20" width="76" height="60" rx="10" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth="2" />
      <path d="M36 50 Q42 38 50 36 Q58 38 64 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <text x="50" y="54" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="16" fontWeight="800" fontFamily="system-ui">P</text>
    </svg>
  ),
  Volvo: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M26 38 L38 62 L50 44 L62 62 L74 38" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="50" y="86" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" fontFamily="system-ui">VOLVO</text>
    </svg>
  ),
  Jaguar: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M28 68 Q30 55 38 48 Q42 44 46 46 Q50 48 52 44 Q56 38 60 34 Q62 32 58 38 Q54 44 62 42 Q68 40 62 46 Q58 50 56 54 Q54 58 52 60 Q46 66 42 68 Q36 70 28 68Z" fill={color} opacity="0.85" />
    </svg>
  ),
  Mitsubishi: ({ color }) => (
    <svg viewBox="0 0 100 100" className="h-10 w-10">
      <path d="M50 18 L78 68 L22 68 Z" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 38 L66 68 L34 68 Z" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 55 L58 68 L42 68 Z" fill={color} opacity="0.7" />
      <text x="50" y="88" textAnchor="middle" fill={color} fontSize="6" fontWeight="700" fontFamily="system-ui">MITSUBISHI</text>
    </svg>
  ),
};

export default function BrandLogoImage({ brand }: { brand: string }) {
  const logo = brandLogos[brand];
  const color = logo?.color || "#1e3a5f";

  if (brandSvgLogos[brand]) {
    return <div className="flex items-center justify-center h-full w-full">{brandSvgLogos[brand]({ color, bg: "" })}</div>;
  }

  // Fallback — first letter
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full p-2">
      <text x="30" y="36" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="20" fontWeight="800" fontFamily="system-ui">{brand.charAt(0)}</text>
    </svg>
  );
}
