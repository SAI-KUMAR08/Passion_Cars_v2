"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Car } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-dark-900">Welcome Back</h1>
          <p className="mt-2 text-dark-400">Sign in to your CarTimez account</p>
        </div>

        {/* Form */}
	        <form onSubmit={handleSubmit} className="marker-card space-y-5">
	          {error && (
	            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
	              {error}
	            </div>
	          )}

	          <div>
	            <label className="mb-1.5 block text-sm font-medium text-dark-700">Email Address</label>
	            <input
	              type="email"
	              value={email}
	              onChange={(e) => setEmail(e.target.value)}
	              placeholder="you@example.com"
	              required
	              className="w-full marker-input px-4 py-3 text-sm"
	            />
	          </div>

	          <div>
	            <label className="mb-1.5 block text-sm font-medium text-dark-700">Password</label>
	            <div className="relative">
	              <input
	                type={showPassword ? "text" : "password"}
	                value={password}
	                onChange={(e) => setPassword(e.target.value)}
	                placeholder="Enter your password"
	                required
	                className="w-full marker-input px-4 py-3 pr-10 text-sm"
	              />
	              <button
	                type="button"
	                onClick={() => setShowPassword(!showPassword)}
	                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
	              >
	                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
	              </button>
	            </div>
	          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-marker w-full justify-center py-3.5 text-base disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Sign In
              </span>
            )}
          </button>

          <p className="text-center text-sm text-dark-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent-500 hover:text-accent-600">
              Create one
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}
