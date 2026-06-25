"use client";

import { useEffect } from "react";

export default function SeedCredentials() {
  useEffect(() => {
    const seeded = localStorage.getItem("cartimez_seeded");
    if (seeded) return;

    // Try seeding from the API (only works after `prisma db seed` has run)
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@cartimez.com", password: "admin123" }),
    }).then((res) => {
      if (res.ok) localStorage.setItem("cartimez_seeded", "true");
    }).catch(() => {});
  }, []);

  return null;
}
