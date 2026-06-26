export interface Car {
  id: number;
  name: string;
  brand: string;
  year: number;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
  color: string;
  kilometers: number;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  stockId: string;
  onSale?: boolean;
  sold?: boolean;
  description?: string;
}

export const brands = [
  "Maruti Suzuki",
  "Hyundai",
  "Toyota",
  "Honda",
  "Mahindra",
  "Tata",
  "Kia",
  "Volkswagen",
  "Skoda",
  "Renault",
  "Nissan",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Land Rover",
  "Porsche",
  "Volvo",
  "Jaguar",
  "Mitsubishi",
];

// Brand logo data with colors and SVG paths for real-looking brand badges
export const brandLogos: Record<string, { color: string; bg: string }> = {
  "Maruti Suzuki": { color: "#0059b3", bg: "#e8f0fe" },
  Hyundai: { color: "#002c5f", bg: "#e8edf2" },
  Toyota: { color: "#eb0a1e", bg: "#fde8ea" },
  Honda: { color: "#cc0000", bg: "#fce8e8" },
  Mahindra: { color: "#d32f2f", bg: "#fbe9e9" },
  Tata: { color: "#1a237e", bg: "#e8eaf6" },
  Kia: { color: "#05141f", bg: "#e8ecee" },
  Volkswagen: { color: "#001e50", bg: "#e8ebf0" },
  Skoda: { color: "#16a34a", bg: "#e8f5ee" },
  Renault: { color: "#ffcc00", bg: "#fefae8" },
  Nissan: { color: "#c3002f", bg: "#fce8ed" },
  Ford: { color: "#1a3a5c", bg: "#e8eef2" },
  BMW: { color: "#0066b1", bg: "#e8f1f9" },
  "Mercedes-Benz": { color: "#1a1a1a", bg: "#ececec" },
  Audi: { color: "#161616", bg: "#ececec" },
  "Land Rover": { color: "#006847", bg: "#e8f3ee" },
  Porsche: { color: "#d32f2f", bg: "#fbe9e9" },
  Volvo: { color: "#003057", bg: "#e8eef2" },
  Jaguar: { color: "#121212", bg: "#ececec" },
  Mitsubishi: { color: "#d32f2f", bg: "#fbe9e9" },
};

export const cars: Car[] = [
  {
    id: 1,
    name: "Hyundai Creta",
    brand: "Hyundai",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "White",
    kilometers: 12000,
    price: 1350000,
    originalPrice: 1550000,
    image: "https://images.unsplash.com/photo-1748214547184-d994bfe53322?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1748214547184-d994bfe53322?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1748214547306-360d11024747?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1633359064754-804ba55e733f?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24001",
    onSale: true,
    description: "Well-maintained Hyundai Creta with excellent mileage and complete service history. Driven carefully with regular maintenance at authorized service center.",
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    brand: "Toyota",
    year: 2022,
    transmission: "Automatic",
    fuel: "Diesel",
    color: "Silver",
    kilometers: 25000,
    price: 2800000,
    originalPrice: 3200000,
    image: "https://images.unsplash.com/photo-1664783856972-ac9922d7b2d3?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1664783856972-ac9922d7b2d3?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1742697167580-af91e3ead35e?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1670054953044-2605dbd0d747?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24002",
    onSale: true,
    description: "Premium SUV with powerful diesel engine and luxury features. Well-suited for both city driving and off-road adventures.",
  },
  {
    id: 3,
    name: "Maruti Suzuki Swift",
    brand: "Maruti Suzuki",
    year: 2023,
    transmission: "Manual",
    fuel: "Petrol",
    color: "Blue",
    kilometers: 8000,
    price: 685000,
    image: "https://images.unsplash.com/photo-1663852408695-f57f4d75a536?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1663852408695-f57f4d75a536?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1663852397535-18292e115327?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24003",
    description: "Excellent condition Swift with low mileage and complete service record. Perfect city car with great fuel efficiency.",
  },
  {
    id: 4,
    name: "Honda City",
    brand: "Honda",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "Red",
    kilometers: 10000,
    price: 1150000,
    originalPrice: 1300000,
    image: "https://images.unsplash.com/photo-1609676671207-d021525a635d?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1609676671207-d021525a635d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24004",
    onSale: true,
    description: "Premium sedan with CVT transmission and sunroof. Spacious interiors with Honda's legendary reliability.",
  },
  {
    id: 5,
    name: "BMW X1",
    brand: "BMW",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "Black",
    kilometers: 18000,
    price: 3200000,
    image: "https://images.unsplash.com/photo-1677517859847-0e750bfd13a9?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1677517859847-0e750bfd13a9?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1680298255666-6071fc905870?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1652967786601-4bd6ffffd42e?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24005",
    description: "Luxury compact SUV with sporty performance and premium interior. Loaded with advanced tech and safety features.",
  },
  {
    id: 6,
    name: "Mahindra Scorpio N",
    brand: "Mahindra",
    year: 2023,
    transmission: "Manual",
    fuel: "Diesel",
    color: "Navy Blue",
    kilometers: 15000,
    price: 1480000,
    image: "https://images.unsplash.com/photo-1710225358761-4f5891df657d?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1710225358761-4f5891df657d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1642927492908-f31e0f35b774?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1723306975792-f5a053a59dd3?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24006",
    description: "Powerful SUV with rugged build and modern features. Commanding road presence with exceptional off-road capability.",
  },
  {
    id: 7,
    name: "Kia Seltos",
    brand: "Kia",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "White",
    kilometers: 11000,
    price: 1420000,
    image: "https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1635744179251-36f60e556bf4?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1710594394925-8d739e519835?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24007",
    description: "Feature-loaded SUV with stylish design and premium cabin. Packed with cutting-edge technology and safety features.",
  },
  {
    id: 8,
    name: "Mercedes-Benz GLC",
    brand: "Mercedes-Benz",
    year: 2022,
    transmission: "Automatic",
    fuel: "Diesel",
    color: "Silver",
    kilometers: 20000,
    price: 4500000,
    image: "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1692970095410-6bd548fc7f6c?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24008",
    sold: true,
    description: "Luxury SUV with exquisite craftsmanship and advanced technology. Superior comfort with Mercedes-Benz hallmark quality. (SOLD)",
  },
  {
    id: 9,
    name: "Tata Punch",
    brand: "Tata",
    year: 2023,
    transmission: "Manual",
    fuel: "Petrol",
    color: "Orange",
    kilometers: 5000,
    price: 720000,
    image: "https://images.unsplash.com/photo-1653407978873-f7bd5d3a3f8f?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1653407978873-f7bd5d3a3f8f?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1778344423800-d65e08ee3bee?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24009",
    description: "Compact SUV with 5-star safety rating and punchy performance. Perfect for urban adventures with a bold design.",
  },
  {
    id: 10,
    name: "Volkswagen Taigun",
    brand: "Volkswagen",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "Carbon Steel",
    kilometers: 9000,
    price: 1380000,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1665803307330-4eba7198f746?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1645381295607-6117fba646c6?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24010",
    description: "German-engineered SUV with robust build and thrilling drive. Solid handling with Volkswagen's legendary build quality.",
  },
  {
    id: 11,
    name: "Skoda Slavia",
    brand: "Skoda",
    year: 2023,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "Blue",
    kilometers: 7000,
    price: 1250000,
    image: "https://images.unsplash.com/photo-1560282013-9f0f8ae50635?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1560282013-9f0f8ae50635?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24011",
    description: "Elegant sedan with European engineering and premium comfort. Spacious cabin with best-in-class rear legroom.",
  },
  {
    id: 12,
    name: "Audi Q3",
    brand: "Audi",
    year: 2022,
    transmission: "Automatic",
    fuel: "Petrol",
    color: "White",
    kilometers: 16000,
    price: 3800000,
    image: "https://images.unsplash.com/photo-1655283176367-ee22be6cbcd4?w=800&h=600&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1655283176367-ee22be6cbcd4?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1655283188541-3336892f6bcc?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1655284525111-4d25dab8270a?w=800&h=600&fit=crop&auto=format",
    ],
    stockId: "STK24012",
    sold: true,
    description: "Luxury compact SUV with quattro all-wheel drive and virtual cockpit. Premium craftsmanship with Audi's iconic design language. (SOLD)",
  },
];

export const services = [
  {
    title: "Buy Car",
    description:
      "Browse our extensive collection of quality-assured pre-owned cars. Each vehicle undergoes rigorous inspection to ensure you get the best value for your money.",
    icon: "Car",
    features: ["250+ cars in stock", "Rigorous quality checks", "Test drive available", "Best price guarantee"],
  },
  {
    title: "Sell Car",
    description:
      "Get the best price for your car with our hassle-free selling process. We handle all documentation and provide instant payment.",
    icon: "DollarSign",
    features: ["Free car evaluation", "Best market price", "Instant payment", "Paperwork handled"],
  },
  {
    title: "Exchange",
    description:
      "Upgrade to your dream car with our seamless exchange program. We offer fair valuation for your current vehicle.",
    icon: "RefreshCw",
    features: ["Fair valuation", "Minimal paperwork", "Quick process", "All brands accepted"],
  },
  {
    title: "Finance",
    description:
      "Drive your dream car with our flexible financing options. We partner with leading banks for the best interest rates.",
    icon: "Banknote",
    features: ["Low interest rates", "Flexible EMI options", "Quick approval", "Minimal documentation"],
  },
];

export const whyChooseUs = [
  {
    title: "Warranty",
    description: "1-year warranty on petrol engines and 6-month warranty on diesel engines for complete peace of mind.",
    icon: "Shield",
  },
  {
    title: "Quality Assured",
    description: "Every car undergoes a comprehensive 100-point inspection to ensure top quality and reliability.",
    icon: "BadgeCheck",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees, no surprises. What you see is exactly what you pay — complete price transparency.",
    icon: "Eye",
  },
  {
    title: "Personalized Service",
    description: "Dedicated relationship managers to guide you through every step of your car-buying journey.",
    icon: "Headphones",
  },
  {
    title: "After-Sales Support",
    description: "Free pick-up and drop-off services for all mechanical repairs with dedicated service center access.",
    icon: "Wrench",
  },
];

export const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Mumbai",
    text: "Excellent experience! Found my dream car within budget. The team was transparent and helpful throughout the process.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    location: "Delhi",
    text: "Sold my old car at a great price and bought a newer model through exchange. Seamless process, highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Singh",
    location: "Bangalore",
    text: "The financing options made it easy for me to own a car within my budget. Very professional team.",
    rating: 5,
  },
];

export const teamMembers = [
  {
    name: "Vikram Mehta",
    role: "Founder & CEO",
    bio: "With over 15 years in the automotive industry, Vikram founded Passion Car with a vision to make pre-owned car buying transparent and trustworthy.",
    image: "/images/team-1.svg",
  },
  {
    name: "Neha Kapoor",
    role: "Head of Sales",
    bio: "Neha leads our sales team with passion and expertise, ensuring every customer finds the perfect car for their needs.",
    image: "/images/team-2.svg",
  },
  {
    name: "Arjun Reddy",
    role: "Chief Mechanic",
    bio: "Arjun oversees our 100-point inspection process with 12+ years of mechanical expertise and an eye for detail.",
    image: "/images/team-3.svg",
  },
];

export const faqs = [
  {
    q: "How does the car buying process work?",
    a: "Simply browse our inventory, book a test drive, and once you've chosen your car, we handle all documentation and registration. You can drive home the same day!",
  },
  {
    q: "What warranty do you offer on used cars?",
    a: "We offer a 1-year warranty on petrol engines and a 6-month warranty on diesel engines, covering major mechanical components.",
  },
  {
    q: "Can I exchange my old car?",
    a: "Absolutely! We accept all makes and models in exchange. Our experts provide a fair market valuation, and the amount is adjusted against your new purchase.",
  },
  {
    q: "What documents do I need to sell my car?",
    a: "You'll need the original RC (Registration Certificate), insurance papers, pollution certificate, and your ID proof. We help with the transfer paperwork.",
  },
  {
    q: "Do you provide financing options?",
    a: "Yes, we partner with 10+ leading banks and NBFCs to offer competitive car loans with flexible EMI options. Our finance team helps with quick approval.",
  },
  {
    q: "Can I get a test drive?",
    a: "Yes, you can book a test drive at our showroom. We also offer doorstep test drives for select models within the city limits.",
  },
];

// Demo credentials
export const demoCredentials = {
  admin: { phone: "+919999988888", email: "passioncar@gmail.com", password: "admin@6781", name: "Admin User" },
  user: { phone: "+918888877777", email: "demo@passioncar.com", name: "Demo User" },
};
