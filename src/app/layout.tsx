import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { AuthProvider } from "@/context/AuthContext";
import { CarProvider } from "@/context/CarContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { ToastProvider } from "@/components/Toast";
import SeedCredentials from "@/components/SeedCredentials";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CarTimez | Premium Pre-Owned Cars Driven on Trust & Quality",
  description:
    "Discover the finest selection of quality-assured pre-owned vehicles at CarTimez. Buy, sell, exchange, and finance used cars with transparent pricing and comprehensive warranty.",
  keywords: [
    "pre-owned cars",
    "used cars",
    "car dealership",
    "buy used car",
    "sell car",
    "car exchange",
    "car financing",
    "India",
  ],
  openGraph: {
    title: "CarTimez | Premium Pre-Owned Cars",
    description: "Pre-Owned Cars Driven on Trust & Quality",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <AuthProvider>
          <CarProvider>
            <SettingsProvider>
              <ToastProvider>
                <SeedCredentials />
                <Header />
                <FloatingContact />
                <main className="flex-1">{children}</main>
                <Footer />
              </ToastProvider>
            </SettingsProvider>
          </CarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
