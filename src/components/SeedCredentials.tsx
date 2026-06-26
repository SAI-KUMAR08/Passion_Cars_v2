"use client";

import { useEffect } from "react";

export default function SeedCredentials() {
  useEffect(() => {
    const seeded = localStorage.getItem("cartimez_seeded");
    if (seeded) return;

    fetch("/api/seed", { method: "POST" })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("cartimez_seeded", "true");
          console.log("Database seeded with demo data");
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
