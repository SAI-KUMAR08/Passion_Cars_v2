"use client";

import { useState } from "react";
import { CheckCircle, Upload, Phone, MessageCircle } from "lucide-react";
import CTASection from "@/components/CTASection";
import { useSettings } from "@/context/SettingsContext";

export default function SellPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carMake: "",
    carModel: "",
    year: "",
    kilometers: "",
    condition: "good",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { step: "1", title: "Submit Details", desc: "Fill in your car's details and our team will review them." },
    { step: "2", title: "Get Valuation", desc: "We provide a fair market valuation within 24 hours." },
    { step: "3", title: "Inspection", desc: "Our experts inspect your car at your location or our showroom." },
    { step: "4", title: "Get Paid", desc: "Instant payment once you accept the offer. We handle all paperwork." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="gradient-primary py-20">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Sell Your Car</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Get the best price for your car with our hassle-free selling process
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <span className="marker-badge bg-accent-50 text-accent-600">
              How It Works
            </span>
            <h2 className="section-title mt-4">Sell in 4 Easy Steps</h2>
            <p className="section-subtitle">We make selling your car simple, fast, and transparent.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div key={item.step} className="card text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-dark-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Benefits */}
            <div>
              <span className="marker-badge bg-accent-50 text-accent-600">
                Why Sell to Us
              </span>
              <h2 className="mt-4 text-3xl font-bold text-dark-900">We Offer the Best Value for Your Car</h2>
              <p className="mt-4 leading-relaxed text-dark-400">
                At CarTimez, we believe in fair and transparent valuations. Our experienced team ensures you get
                the best market price for your vehicle with zero hassle.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Free professional car evaluation",
                  "Best price guaranteed — compare with any other dealer",
                  "Instant payment — no waiting for cheques to clear",
                  "Complete paperwork handled by our team",
                  "Free RC transfer and documentation",
                  "Doorstep pickup available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" />
                    <span className="text-dark-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={"tel:" + settings.phone.replace(/[^0-9+]/g, "")} className="btn-primary">
                  <Phone className="h-5 w-5" />
                  Call Us Now
                </a>
                <a
                  href={"https://wa.me/" + settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="card text-center py-12">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-900">Thank You!</h3>
                  <p className="mt-2 text-dark-400">
                    Your request has been submitted successfully. Our team will contact you within 24 hours with a
                    valuation.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", carMake: "", carModel: "", year: "", kilometers: "", condition: "good", message: "" });
                    }}
                    className="btn-primary mt-8"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card">
                  <h3 className="text-xl font-bold text-dark-900">Submit Your Car Details</h3>
                  <p className="mt-2 text-sm text-dark-400">
                    Fill in the details below and we&apos;ll get back to you with a valuation.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-dark-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Car Make *</label>
                        <input
                          type="text"
                          name="carMake"
                          required
                          value={formData.carMake}
                          onChange={handleChange}
                          placeholder="e.g. Hyundai, Toyota"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Car Model *</label>
                        <input
                          type="text"
                          name="carModel"
                          required
                          value={formData.carModel}
                          onChange={handleChange}
                          placeholder="e.g. Creta, Fortuner"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Year *</label>
                        <input
                          type="number"
                          name="year"
                          required
                          value={formData.year}
                          onChange={handleChange}
                          placeholder="2023"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Kilometers *</label>
                        <input
                          type="number"
                          name="kilometers"
                          required
                          value={formData.kilometers}
                          onChange={handleChange}
                          placeholder="15000"
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-dark-700">Condition</label>
                        <select
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                        >
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="needs-repair">Needs Repair</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-dark-700">
                        Additional Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any additional details about your car..."
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none"
                      />
                    </div>

                    <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-dark-400" />
                      <p className="mt-2 text-sm text-dark-500">
                        Upload car photos (optional)
                      </p>
                      <p className="text-xs text-dark-400">Drag & drop or click to browse</p>
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                      Submit for Valuation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
