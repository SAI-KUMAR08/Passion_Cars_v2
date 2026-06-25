"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Car, Plus, LogOut, LayoutDashboard, ArrowLeft, X, Phone, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCars } from "@/context/CarContext";
import { useSettings } from "@/context/SettingsContext";
import type { Car as CarType } from "@/data/cars";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

const TRANSMISSIONS = ["Manual", "Automatic"] as const;
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric"] as const;

export default function AdminPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const { cars, addCar, updateCar, deleteCar, toggleSold } = useCars();
  const { settings, updatePhone } = useSettings();
  const [phoneInput, setPhoneInput] = useState(settings.phone);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [deletingCar, setDeletingCar] = useState<CarType | null>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Close edit modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setEditingCar(null);
        setDeletingCar(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEditSave = useCallback(
    (updated: CarType) => {
      updateCar(updated);
      setEditingCar(null);
    },
    [updateCar],
  );

  const handleDeleteConfirm = useCallback(
    (car: CarType) => {
      deleteCar(car.id);
      setDeletingCar(null);
    },
    [deleteCar],
  );

  const handleToggleSold = useCallback(
    (car: CarType) => {
      toggleSold(car.id, car.sold ?? false);
    },
    [toggleSold],
  );

  const handleAddSave = useCallback(
    (newCar: CarType) => {
      addCar(newCar);
      setEditingCar(null);
    },
    [addCar],
  );

  const openAddNew = useCallback(() => {
    const newCar: CarType = {
      id: 0,
      name: "",
      brand: "",
      year: new Date().getFullYear(),
      transmission: "Manual",
      fuel: "Petrol",
      color: "",
      kilometers: 0,
      price: 0,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format",
      ],
      stockId: `STK${String(Date.now()).slice(-5)}`,
      description: "",
    };
    setEditingCar(newCar);
  }, []);

  // ----- Loading state -----
  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-500 border-t-transparent" />
      </div>
    );
  }

  // ----- Not logged in (should redirect, but protect render) -----
  if (!user) return null;

  // ----- Logged in but not admin -----
  if (!user.isAdmin) {
    return (
      <>
        {/* Minimal header */}
        <section className="bg-dark-900 text-white">
          <div className="container-wide py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-sm text-gray-400">Welcome back, {user.name}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Access Denied */}
        <section className="py-24">
          <div className="container-wide">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                <svg
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-dark-900">Access Denied</h2>
              <p className="mt-2 text-dark-500">
                You do not have permission to access the admin dashboard. Only
                administrators can manage inventory.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ----- Admin dashboard -----
  const stats = [
    { label: "Total Cars", value: cars.length, icon: Car, color: "bg-blue-50 text-blue-600" },
    { label: "On Sale", value: cars.filter((c) => !c.sold).length, icon: Car, color: "bg-green-50 text-green-600" },
    { label: "Brands", value: new Set(cars.map((c) => c.brand)).size, icon: Car, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <>
      {/* Admin Header */}
      <section className="bg-dark-900 text-white">
        <div className="container-wide py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
                View Site
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-gray-50 py-8">
        <div className="container-wide">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="card flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">{stat.value}</p>
                    <p className="text-sm text-dark-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="container-wide">
          <div className="mx-auto max-w-lg">
            <h2 className="text-lg font-bold text-dark-900 flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent-500" />
              Contact Settings
            </h2>
            <p className="text-sm text-dark-400 mt-1">Phone number shown across the website</p>
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="marker-input flex-1 px-4 py-2.5 text-sm"
                placeholder="+91 99999 88888"
              />
              <button
                onClick={() => updatePhone(phoneInput)}
                className="btn-marker py-2.5 px-5 text-sm"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Management */}
      <section className="py-12">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-dark-900">Inventory Management</h2>
              <p className="text-sm text-dark-400 mt-1">Manage your car listings</p>
            </div>
            <button
              onClick={openAddNew}
              className="flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New Car
            </button>
          </div>

          <div className="overflow-x-auto marker-table-wrap">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-dark-700">Car</th>
                  <th className="px-4 py-3 font-semibold text-dark-700">Stock ID</th>
                  <th className="px-4 py-3 font-semibold text-dark-700">Year</th>
                  <th className="px-4 py-3 font-semibold text-dark-700">Price</th>
                  <th className="px-4 py-3 font-semibold text-dark-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-dark-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image src={car.image} alt={car.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-dark-900">{car.name}</p>
                          <p className="text-xs text-dark-400">{car.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-dark-500">{car.stockId}</td>
                    <td className="px-4 py-3 text-dark-500">{car.year}</td>
                    <td className="px-4 py-3 font-medium text-dark-900">{formatPrice(car.price)}</td>
                    <td className="px-4 py-3">
                      {car.sold ? (
                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 border border-red-200">
                          SOLD
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 border border-green-200">
                          On Sale
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingCar(car)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-dark-600 hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleSold(car)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          {car.sold ? "Re-list" : "Sold"}
                        </button>
                        <button
                          onClick={() => setDeletingCar(car)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Edit / Add Modal */}
      {editingCar && (
        <EditCarModal
          car={editingCar}
          onSave={editingCar.name ? handleEditSave : handleAddSave}
          onClose={() => setEditingCar(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deletingCar && (
        <DeleteConfirmModal
          car={deletingCar}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingCar(null)}
        />
      )}
    </>
  );
}

/* ──────────────────── Edit Car Modal ──────────────────── */

function EditCarModal({
  car,
  onSave,
  onClose,
}: {
  car: CarType;
  onSave: (updated: CarType) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...car });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "year" || name === "kilometers" || name === "price"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-dark-900">{car.name ? "Edit Car" : "Add New Car"}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-dark-400 hover:bg-gray-100 hover:text-dark-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-dark-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Year</label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                required
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Transmission</label>
              <select
                name="transmission"
                value={form.transmission}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
              >
                {TRANSMISSIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Fuel */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Fuel</label>
              <select
                name="fuel"
                value={form.fuel}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
              >
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Color</label>
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                required
              />
            </div>

            {/* Kilometers */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Kilometers</label>
              <input
                type="number"
                name="kilometers"
                value={form.kilometers}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-1 block text-sm font-medium text-dark-700">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-dark-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ──────────────────── Delete Confirmation Modal ──────────────────── */

function DeleteConfirmModal({
  car,
  onConfirm,
  onCancel,
}: {
  car: CarType;
  onConfirm: (car: CarType) => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <svg
              className="h-7 w-7 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-dark-900">Delete Car</h3>
          <p className="mt-2 text-sm text-dark-500">
            Are you sure you want to delete <span className="font-semibold text-dark-700">{car.name}</span>? This action cannot be undone.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-dark-600 hover:bg-gray-50 transition-colors"
          >
            No, Cancel
          </button>
          <button
            onClick={() => onConfirm(car)}
            className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
