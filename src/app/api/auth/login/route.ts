import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "cartimez-secret-change-in-production";

// Inline seed — runs if the admin user doesn't exist (handles brand renames)
async function ensureSeedData() {
  const adminExists = await prisma.user.findUnique({ where: { email: "admin@passioncar.com" } });
  if (adminExists) return;

  // Clear old data if the email changed (e.g. cartimez.com → passioncar.com)
  const oldAdmin = await prisma.user.findFirst();
  if (oldAdmin) {
    await prisma.user.deleteMany();
    await prisma.car.deleteMany();
    await prisma.setting.deleteMany();
  }

  console.log("🔹 Database empty — auto-seeding demo data...");

  const cars = [
    { name: "Hyundai Creta", brand: "Hyundai", year: 2023, transmission: "Automatic", fuel: "Petrol", color: "White", kilometers: 12000, price: 1350000, originalPrice: 1550000, image: "https://images.unsplash.com/photo-1748214547184-d994bfe53322?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1748214547184-d994bfe53322?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1748214547306-360d11024747?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1633359064754-804ba55e733f?w=800&h=600&fit=crop&auto=format"], stockId: "STK24001", onSale: true },
    { name: "Toyota Fortuner", brand: "Toyota", year: 2022, transmission: "Automatic", fuel: "Diesel", color: "Silver", kilometers: 25000, price: 2800000, originalPrice: 3200000, image: "https://images.unsplash.com/photo-1664783856972-ac9922d7b2d3?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1664783856972-ac9922d7b2d3?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1742697167580-af91e3ead35e?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1670054953044-2605dbd0d747?w=800&h=600&fit=crop&auto=format"], stockId: "STK24002", onSale: true },
    { name: "Maruti Suzuki Swift", brand: "Maruti Suzuki", year: 2023, transmission: "Manual", fuel: "Petrol", color: "Blue", kilometers: 8000, price: 685000, image: "https://images.unsplash.com/photo-1663852408695-f57f4d75a536?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1663852408695-f57f4d75a536?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1663852397535-18292e115327?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&auto=format"], stockId: "STK24003" },
    { name: "Honda City", brand: "Honda", year: 2023, transmission: "Automatic", fuel: "Petrol", color: "Red", kilometers: 10000, price: 1150000, originalPrice: 1300000, image: "https://images.unsplash.com/photo-1609676671207-d021525a635d?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1609676671207-d021525a635d?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&auto=format"], stockId: "STK24004", onSale: true },
    { name: "BMW X1", brand: "BMW", year: 2022, transmission: "Automatic", fuel: "Petrol", color: "Black", kilometers: 18000, price: 3200000, image: "https://images.unsplash.com/photo-1677517859847-0e750bfd13a9?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1677517859847-0e750bfd13a9?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1680298255666-6071fc905870?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1652967786601-4bd6ffffd42e?w=800&h=600&fit=crop&auto=format"], stockId: "STK24005" },
    { name: "Mahindra Scorpio N", brand: "Mahindra", year: 2023, transmission: "Manual", fuel: "Diesel", color: "Navy Blue", kilometers: 15000, price: 1480000, image: "https://images.unsplash.com/photo-1710225358761-4f5891df657d?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1710225358761-4f5891df657d?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1642927492908-f31e0f35b774?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1723306975792-f5a053a59dd3?w=800&h=600&fit=crop&auto=format"], stockId: "STK24006" },
    { name: "Kia Seltos", brand: "Kia", year: 2023, transmission: "Automatic", fuel: "Petrol", color: "White", kilometers: 11000, price: 1420000, image: "https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1659406189166-7c17fe5df12a?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1635744179251-36f60e556bf4?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1710594394925-8d739e519835?w=800&h=600&fit=crop&auto=format"], stockId: "STK24007" },
    { name: "Mercedes-Benz GLC", brand: "Mercedes-Benz", year: 2022, transmission: "Automatic", fuel: "Diesel", color: "Silver", kilometers: 20000, price: 4500000, image: "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1563721911289-ada2924d66f1?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1692970095410-6bd548fc7f6c?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&auto=format"], stockId: "STK24008", sold: true },
    { name: "Tata Punch", brand: "Tata", year: 2023, transmission: "Manual", fuel: "Petrol", color: "Orange", kilometers: 5000, price: 720000, image: "https://images.unsplash.com/photo-1653407978873-f7bd5d3a3f8f?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1653407978873-f7bd5d3a3f8f?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1778344423800-d65e08ee3bee?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&auto=format"], stockId: "STK24009" },
    { name: "Volkswagen Taigun", brand: "Volkswagen", year: 2023, transmission: "Automatic", fuel: "Petrol", color: "Carbon Steel", kilometers: 9000, price: 1380000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1665803307330-4eba7198f746?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1645381295607-6117fba646c6?w=800&h=600&fit=crop&auto=format"], stockId: "STK24010" },
    { name: "Skoda Slavia", brand: "Skoda", year: 2023, transmission: "Automatic", fuel: "Petrol", color: "Blue", kilometers: 7000, price: 1250000, image: "https://images.unsplash.com/photo-1560282013-9f0f8ae50635?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1560282013-9f0f8ae50635?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop&auto=format"], stockId: "STK24011" },
    { name: "Audi Q3", brand: "Audi", year: 2022, transmission: "Automatic", fuel: "Petrol", color: "White", kilometers: 16000, price: 3800000, image: "https://images.unsplash.com/photo-1655283176367-ee22be6cbcd4?w=800&h=600&fit=crop&auto=format", images: ["https://images.unsplash.com/photo-1655283176367-ee22be6cbcd4?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1655283188541-3336892f6bcc?w=800&h=600&fit=crop&auto=format", "https://images.unsplash.com/photo-1655284525111-4d25dab8270a?w=800&h=600&fit=crop&auto=format"], stockId: "STK24012", sold: true },
  ];

  for (let i = 0; i < cars.length; i++) {
    await prisma.car.create({ data: { ...cars[i] as any, displayId: i + 1 } });
  }

  const hash = await bcrypt.hash("admin123", 10);
  await prisma.user.create({ data: { name: "Admin User", email: "admin@passioncar.com", password: hash, isAdmin: true } });

  const demoHash = await bcrypt.hash("demo123", 10);
  await prisma.user.create({ data: { name: "Demo User", email: "demo@passioncar.com", password: demoHash, isAdmin: false } });

  await prisma.setting.create({ data: { key: "phone", value: "+91 99999 88888" } });
  await prisma.setting.create({ data: { key: "whatsapp", value: "919999988888" } });

  console.log("✅ Auto-seed complete");
}

export async function POST(req: Request) {
  try {
    await ensureSeedData();

    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin } });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
