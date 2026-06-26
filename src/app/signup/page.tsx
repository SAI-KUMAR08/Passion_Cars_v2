"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Car, ArrowLeft, Smartphone, MessageSquare, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [devOtp, setDevOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { sendOtp, verifyOtp } = useAuth();
  const router = useRouter();

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      setError("Please enter a valid phone number — must be at least 10 digits after country code");
      return;
    }

    setLoading(true);
    try {
      const result = await sendOtp(phone);
      if (result.success) {
        if (result.otp) setDevOtp(result.otp);
        setStep("otp");
        startResendTimer();
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setError("");
    setLoading(true);
    try {
      const result = await sendOtp(phone);
      if (result.success) {
        if (result.otp) setDevOtp(result.otp);
        setOtp(["", "", "", "", "", ""]);
        startResendTimer();
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`s-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`s-otp-${index - 1}`);
      prevInput?.focus();
    }
    if (e.key === "Enter") {
      handleVerifyOtp();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const success = await verifyOtp(phone, otpString, name);
      if (success) {
        const token = localStorage.getItem("cartimez_token");
        let isAdmin = false;
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            isAdmin = payload.isAdmin;
          } catch {}
        }
        router.push(isAdmin ? "/admin" : "/dashboard");
      } else {
        setError("Invalid or expired OTP. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setStep("phone");
    setOtp(["", "", "", "", "", ""]);
    setDevOtp("");
    setError("");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-600">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-500">Join Passion Car and start your journey</p>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
              {error}
            </div>
          )}

          {step === "phone" ? (
            /* Step 1: Name + Phone */
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Smartphone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99999 88888"
                    required
                    className="input-field pl-10"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-400">
                  Include country code (e.g., +91 for India)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending OTP...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Send OTP
                  </span>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                  Sign in
                </Link>
              </p>
            </form>
          ) : (
            /* Step 2: OTP Verification */
            <div className="space-y-5">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Go back
              </button>

              <div>
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">{name}</span> — verify your phone
                </p>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Enter OTP sent to {phone}
                </label>
                <p className="mb-4 text-xs text-gray-400">Enter the 6-digit code sent to your phone</p>

                {devOtp && (
                  <div className="mb-5 rounded-xl bg-brand-600 px-6 py-5 text-center shadow-lg">
                    <p className="text-sm font-medium text-brand-100">Your One-Time Password</p>
                    <p className="mt-1 text-3xl font-bold tracking-[0.25em] text-white">{devOtp}</p>
                    <p className="mt-1 text-xs text-brand-200">Valid for 5 minutes</p>
                  </div>
                )}

                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`s-otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onFocus={(e) => e.target.select()}
                      className="h-14 w-12 rounded-lg border border-gray-300 text-center text-xl font-bold text-gray-900 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.join("").length !== 6}
                className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Verify & Create Account
                  </span>
                )}
              </button>

              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-400">
                    Resend OTP in <span className="font-medium">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-sm font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
