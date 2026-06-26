"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user?.isAdmin) {
        router.replace("/admin/dashboard");
      } else if (!user) {
        router.replace("/admin/login");
      } else {
        // Non-admin user — render inline access denied
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-500">You do not have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return null;
}
