"use client";

import { useCars } from "@/context/CarContext";
import Link from "next/link";
import { Car, Truck, PlusCircle, Settings as SettingsIcon } from "lucide-react";
import { SkeletonStatCard } from "@/components/Skeleton";

export default function AdminDashboardPage() {
  const { cars, loading } = useCars();

  const stats = [
    { label: "Total Cars", value: cars.length, icon: Car, color: "bg-blue-50 text-blue-600" },
    { label: "Available", value: cars.filter((c) => !c.sold).length, icon: Truck, color: "bg-green-50 text-green-600" },
    { label: "Sold", value: cars.filter((c) => c.sold).length, icon: Car, color: "bg-brand-50 text-brand-600" },
    { label: "Brands", value: new Set(cars.map((c) => c.brand)).size, icon: Car, color: "bg-purple-50 text-purple-600" },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to your admin dashboard</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <SkeletonStatCard key={i} />)}
        </div>
      </div>
    );
  }

  const recentCars = [...cars].reverse().slice(0, 5);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to your admin dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/add-car" className="card-hover flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <PlusCircle className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Add New Car</h3>
            <p className="text-sm text-gray-500">List a new vehicle in your inventory</p>
          </div>
        </Link>
        <Link href="/admin/settings" className="card-hover flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
            <SettingsIcon className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Settings</h3>
            <p className="text-sm text-gray-500">Update business contact information</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recently Added Cars</h2>
        {recentCars.length > 0 ? (
          <div className="table-wrap">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCars.map((car) => (
                  <tr key={car.id}>
                    <td className="font-medium text-gray-900">{car.name}</td>
                    <td className="text-gray-500">{car.brand}</td>
                    <td className="text-gray-700">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(car.price)}
                    </td>
                    <td>
                      {car.sold ? (
                        <span className="badge bg-red-50 text-red-700 border-red-200">Sold</span>
                      ) : (
                        <span className="badge bg-green-50 text-green-700 border-green-200">Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <Car className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-bold text-gray-900">No cars yet</h3>
            <p className="mt-1 text-sm text-gray-500">Start by adding your first car to inventory.</p>
            <Link href="/admin/add-car" className="btn-primary mt-6 inline-flex">
              <PlusCircle className="h-4 w-4" />
              Add First Car
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
