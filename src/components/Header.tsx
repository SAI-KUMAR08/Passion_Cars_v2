"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/buy", label: "Buy Car" },
  { href: "/sell", label: "Sell Car" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="container-wide">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 transition-all group-hover:shadow-lg group-hover:shadow-brand-200">
              <svg viewBox="0 0 100 100" className="h-7 w-7 text-white" fill="currentColor">
                <path d="M20 65c-2 0-4-1-5.5-3L8 52c-1.5-2-2-4-1-6l4-10c2-5 7-9 12-9h54c5 0 10 4 12 9l4 10c1 2 .5 4-1 6l-6.5 10c-1.5 2-3.5 3-5.5 3h-4c-3 0-5.5-1-7-3l-3-4H34l-3 4c-1.5 2-4 3-7 3h-4z"/>
                <circle cx="28" cy="62" r="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="72" cy="62" r="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                <circle cx="28" cy="62" r="3" fill="currentColor"/>
                <circle cx="72" cy="62" r="3" fill="currentColor"/>
                <rect x="30" y="50" width="40" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Passion<span className="text-brand-600">Car</span>
              </span>
              <span className="-mt-1 text-[10px] font-medium uppercase tracking-widest text-gray-400">
                Premium Pre-Owned Cars
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden items-center gap-3 lg:flex">
            {!user ? (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            ) : (
              <>
                <Link
                  href={user.isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="container-wide py-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary justify-center text-sm"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Link>
                ) : (
                  <>
                    <Link
                      href={user.isAdmin ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="btn-primary justify-center text-sm"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
