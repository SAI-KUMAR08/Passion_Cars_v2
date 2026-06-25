"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const DEFAULTS = {
  phone: "+91 99999 88888",
  whatsapp: "919999988888",
};

interface Settings {
  phone: string;
  whatsapp: string;
}

interface SettingsContextType {
  settings: Settings;
  updatePhone: (phone: string) => void;
  updateWhatsapp: (whatsapp: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings({ phone: data.phone || DEFAULTS.phone, whatsapp: data.whatsapp || DEFAULTS.whatsapp }))
      .catch(() => {});
  }, []);

  const updatePhone = async (phone: string) => {
    setSettings((prev) => ({ ...prev, phone }));
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
  };

  const updateWhatsapp = async (whatsapp: string) => {
    setSettings((prev) => ({ ...prev, whatsapp }));
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp }),
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updatePhone, updateWhatsapp }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
}
