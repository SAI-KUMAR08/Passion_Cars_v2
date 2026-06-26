"use client";

import { useEffect } from "react";

export default function SeedCredentials() {
  useEffect(() => {
    // Use a fresh key so previous deployments' flags don't block re-seeding
    const KEY = "cartimez_seeded_v2";
    if (localStorage.getItem(KEY)) return;

    fetch("/api/seed", { method: "POST" })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem(KEY, "true");
          console.log("✅ Database seeded with demo data");
        } else {
          console.warn("⚠️ Seed API returned non-OK:", res.status);
        }
      })
      .catch((err) => console.warn("⚠️ Seed API failed:", err));
  }, []);

  return null;
}
