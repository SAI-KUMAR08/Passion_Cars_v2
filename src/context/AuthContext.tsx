"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  sendOtp: (phone: string) => Promise<{ success: boolean; otp?: string }>;
  verifyOtp: (phone: string, otp: string, name?: string) => Promise<boolean>;
  adminLogin: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cartimez_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: payload.id,
          phone: payload.phone,
          email: payload.email,
          name: payload.name,
          isAdmin: payload.isAdmin,
        });
      } catch {
        localStorage.removeItem("cartimez_token");
      }
    }
    setLoading(false);
  }, []);

  const sendOtp = async (phone: string): Promise<{ success: boolean; otp?: string }> => {
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    if (!res.ok) return { success: false };
    const data = await res.json();
    return { success: true, otp: data.otp };
  };

  const verifyOtp = async (phone: string, otp: string, name?: string): Promise<boolean> => {
    const body: Record<string, string> = { phone, otp };
    if (name) body.name = name;

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem("cartimez_token", data.token);
    setUser(data.user);
    return true;
  };

  const adminLogin = async (phone: string, password: string): Promise<boolean> => {
    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem("cartimez_token", data.token);
    setUser(data.user);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cartimez_token");
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, adminLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
