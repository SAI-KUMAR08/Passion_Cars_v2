"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { useCars } from "@/context/CarContext";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import type { Car } from "@/data/cars";

const TRANSMISSIONS = ["Manual", "Automatic"] as const;
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric"] as const;

const emptyForm = {
  name: "",
  brand: "",
  year: new Date().getFullYear(),
  transmission: "Manual" as const,
  fuel: "Petrol" as const,
  color: "",
  kilometers: 0,
  price: 0,
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format",
  images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&auto=format"],
  stockId: `STK${String(Date.now()).slice(-5)}`,
  description: "",
};

export default function AddCarPage() {
  const router = useRouter();
  const { addCar } = useCars();
  const { toast } = useToast();
  const [form, setForm] = useState({ ...emptyForm });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" || name === "kilometers" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCar: Car = {
      id: 0,
      ...form,
    };

    await addCar(newCar);
    toast("Car added successfully!");
    router.push("/admin/inventory");
  };

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <Link href="/admin/inventory" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Inventory
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Car</h1>
        <p className="text-sm text-gray-500">Fill in the details to list a new vehicle</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Car Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Hyundai Creta" className="input-field" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Brand *</label>
              <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Hyundai" className="input-field" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Stock ID</label>
              <input type="text" value={form.stockId} disabled className="input-field bg-gray-50 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Specifications</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Year *</label>
              <input type="number" name="year" value={form.year} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Transmission</label>
              <select name="transmission" value={form.transmission} onChange={handleChange} className="select-field">
                {TRANSMISSIONS.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Fuel Type</label>
              <select name="fuel" value={form.fuel} onChange={handleChange} className="select-field">
                {FUEL_TYPES.map((f) => (<option key={f} value={f}>{f}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Color</label>
              <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="e.g. White" className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Kilometers</label>
              <input type="number" name="kilometers" value={form.kilometers} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Price</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className="input-field" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe the vehicle's condition, features, and history..." className="input-field" />
        </div>

        {/* Images */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Image URL</h2>
          <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="input-field" />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/inventory" className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</Link>
          <button type="submit" className="btn-primary px-6 py-3">
            <Save className="h-4 w-4" />
            Save Car
          </button>
        </div>
      </form>
    </div>
  );
}
