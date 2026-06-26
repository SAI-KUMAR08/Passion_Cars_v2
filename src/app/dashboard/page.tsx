"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Car, PlusCircle, ArrowRight } from "lucide-react";

export default function UserDashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  // Admin users should use the admin panel
  if (user.isAdmin) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* Content */}
      <div className="container-wide py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="mt-1 text-gray-500">Manage your car listings from your personal dashboard</p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/sell" className="card-hover group">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <PlusCircle className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Sell Your Car</h3>
                <p className="text-sm text-gray-500">List your car for sale and get the best value</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-brand-600" />
            </div>
          </Link>

          <Link href="/buy" className="card-hover group">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Car className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Browse Inventory</h3>
                <p className="text-sm text-gray-500">Explore our collection of quality-assured cars</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-300 transition-colors group-hover:text-brand-600" />
            </div>
          </Link>
        </div>

        {/* Your Listings */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900">Your Listings</h2>
          <div className="mt-4 rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <Car className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-bold text-gray-900">No listings yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              When you submit a car for sale, it will appear here so you can track its status.
            </p>
            <Link href="/sell" className="btn-primary mt-6 inline-flex">
              <PlusCircle className="h-4 w-4" />
              Sell Your Car
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
