"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Car } from "@/data/cars";

interface CarContextType {
  cars: Car[];
  addCar: (car: Car) => Promise<void>;
  updateCar: (updated: Car) => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  toggleSold: (id: number, sold: boolean) => Promise<void>;
  loading: boolean;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export function CarProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((data) => setCars(data))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  const addCar = async (car: Car) => {
    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    });
    if (res.ok) {
      const created = await res.json();
      setCars((prev) => [...prev, created]);
    }
  };

  const updateCar = async (updated: Car) => {
    const res = await fetch("/api/cars", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setCars((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    }
  };

  const deleteCar = async (id: number) => {
    const res = await fetch("/api/cars", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setCars((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleSold = async (id: number, sold: boolean) => {
    const car = cars.find((c) => c.id === id);
    if (!car) return;
    await updateCar({ ...car, sold: !sold });
  };

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar, toggleSold, loading }}>
      {children}
    </CarContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarContext);
  if (!context) throw new Error("useCars must be used within a CarProvider");
  return context;
}
