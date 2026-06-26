"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, X } from "lucide-react";
import { useCars } from "@/context/CarContext";
import { useToast } from "@/components/Toast";
import type { Car as CarType } from "@/data/cars";
import { SkeletonCard } from "@/components/Skeleton";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

const TRANSMISSIONS = ["Manual", "Automatic"] as const;
const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric"] as const;

export default function AdminInventoryPage() {
  const { cars, updateCar, deleteCar, toggleSold, loading } = useCars();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [deletingCar, setDeletingCar] = useState<CarType | null>(null);

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

  const filteredCars = cars.filter((car) =>
    !search || car.name.toLowerCase().includes(search.toLowerCase()) || car.brand.toLowerCase().includes(search.toLowerCase()) || car.stockId.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditSave = useCallback((updated: CarType) => {
    updateCar(updated);
    setEditingCar(null);
    toast("Car updated successfully");
  }, [updateCar, toast]);

  const handleDeleteConfirm = useCallback((car: CarType) => {
    deleteCar(car.id);
    setDeletingCar(null);
    toast("Car deleted successfully");
  }, [deleteCar, toast]);

  const handleToggleSold = useCallback((car: CarType) => {
    toggleSold(car.id, car.sold ?? false);
    toast(car.sold ? "Car re-listed" : "Car marked as sold");
  }, [toggleSold, toast]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">Manage your car listings</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">Manage your car listings</p>
        </div>
        <Link
          href="/admin/add-car"
          className="flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Car
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, brand, or stock ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      {filteredCars.length > 0 ? (
        <div className="table-wrap">
          <table className="w-full">
            <thead>
              <tr>
                <th>Car</th>
                <th>Stock ID</th>
                <th>Year</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image src={car.image} alt={car.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{car.name}</p>
                        <p className="text-xs text-gray-500">{car.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-500">{car.stockId}</td>
                  <td className="text-gray-500">{car.year}</td>
                  <td className="font-medium text-gray-900">{formatPrice(car.price)}</td>
                  <td>
                    {car.sold ? (
                      <span className="badge bg-red-50 text-red-700 border-red-200">SOLD</span>
                    ) : (
                      <span className="badge bg-green-50 text-green-700 border-green-200">On Sale</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCar(car)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
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
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <Search className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-lg font-bold text-gray-900">
            {search ? "No cars found" : "No cars in inventory"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {search ? "Try a different search term." : "Start by adding your first car."}
          </p>
          {!search && (
            <Link href="/admin/add-car" className="btn-primary mt-6 inline-flex">
              <Plus className="h-4 w-4" />
              Add First Car
            </Link>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingCar && (
        <EditCarModal car={editingCar} onSave={handleEditSave} onClose={() => setEditingCar(null)} />
      )}

      {/* Delete Confirmation */}
      {deletingCar && (
        <DeleteConfirmModal car={deletingCar} onConfirm={handleDeleteConfirm} onCancel={() => setDeletingCar(null)} />
      )}
    </div>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" || name === "kilometers" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{car.name ? "Edit Car" : "Add New Car"}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Brand</label>
              <input type="text" name="brand" value={form.brand} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Year</label>
              <input type="number" name="year" value={form.year} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Transmission</label>
              <select name="transmission" value={form.transmission} onChange={handleChange} className="select-field">
                {TRANSMISSIONS.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Fuel</label>
              <select name="fuel" value={form.fuel} onChange={handleChange} className="select-field">
                {FUEL_TYPES.map((f) => (<option key={f} value={f}>{f}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Color</label>
              <input type="text" name="color" value={form.color} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Kilometers</label>
              <input type="number" name="kilometers" value={form.kilometers} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Price</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className="input-field" required />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
              <input type="text" name="image" value={form.image} onChange={handleChange} className="input-field" />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">Save Changes</button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Car</h3>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete <span className="font-semibold text-gray-700">{car.name}</span>? This action cannot be undone.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={onCancel} className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">No, Cancel</button>
          <button onClick={() => onConfirm(car)} className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}
