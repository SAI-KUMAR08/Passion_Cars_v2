"use client";

import { useState } from "react";
import { CheckCircle, Upload, Phone, MessageCircle } from "lucide-react";
import CTASection from "@/components/CTASection";
import { useSettings } from "@/context/SettingsContext";
import ScrollReveal from "@/components/ScrollReveal";

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
  const processSteps = [
    { step: "1", title: "Request Received", desc: "We acknowledge your sell request within 2 hours.", icon: "📋" },
    { step: "2", title: "Inspection Scheduled", desc: "Our expert inspects your car at your location.", icon: "🔍" },
    { step: "3", title: "Vehicle Evaluation", desc: "Fair market valuation based on inspection.", icon: "📊" },
    { step: "4", title: "Offer Generated", desc: "Receive the best price offer within 24 hours.", icon: "💰" },
    { step: "5", title: "Payment", desc: "Instant payment once you accept the offer.", icon: "✅" },
  ];

  const steps = [
    { step: "1", title: "Submit Details", desc: "Fill in your car's details and our team will review them." },
    { step: "2", title: "Get Valuation", desc: "We provide a fair market valuation within 24 hours." },
    { step: "3", title: "Inspection", desc: "Our experts inspect your car at your location or our showroom." },
    { step: "4", title: "Get Paid", desc: "Instant payment once you accept the offer. We handle all paperwork." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Sell Your Car</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Get the best price for your car with our hassle-free selling process
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container-wide">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <span className="badge-red">How It Works</span>
            <h2 className="section-title mt-4">Sell in 4 Easy Steps</h2>
            <p className="section-subtitle">We make selling your car simple, fast, and transparent.</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="card-hover text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Benefits */}
            <ScrollReveal direction="left">
              <span className="badge-red">Why Sell to Us</span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">We Offer the Best Value for Your Car</h2>
              <p className="mt-4 leading-relaxed text-gray-500">
                At Passion Car, we believe in fair and transparent valuations. Our experienced team ensures you get
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
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" />
                    <span className="text-gray-600">{item}</span>
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
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal direction="right">
              {submitted ? (
                <div className="card text-center py-12">
                  {/* Progress Tracker */}
                  <div className="mx-auto mb-8 max-w-md">
                    <div className="space-y-4">
                      {processSteps.map((ps, i) => (
                        <div key={ps.step} className="flex items-center gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            i <= 0 ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-400"
                          }`}>
                            {ps.step}
                          </div>
                          <div className="flex-1 text-left">
                            <p className={`font-semibold text-sm ${i <= 0 ? "text-gray-900" : "text-gray-400"}`}>
                              {ps.title}
                            </p>
                            <p className={`text-xs ${i <= 0 ? "text-gray-500" : "text-gray-300"}`}>
                              {ps.desc}
                            </p>
                          </div>
                          {i < processSteps.length - 1 && (
                            <div className={`h-8 w-0.5 ${i < 0 ? "bg-brand-600" : "bg-gray-200"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                  <p className="mt-2 text-gray-500">
                    Your request has been submitted successfully. Our team will contact you within 24 hours with a valuation.
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
                  <h3 className="text-xl font-bold text-gray-900">Submit Your Car Details</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Fill in the details below and we&apos;ll get back to you with a valuation.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-field"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Car Make *</label>
                        <input
                          type="text"
                          name="carMake"
                          required
                          value={formData.carMake}
                          onChange={handleChange}
                          placeholder="e.g. Hyundai, Toyota"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Car Model *</label>
                        <input
                          type="text"
                          name="carModel"
                          required
                          value={formData.carModel}
                          onChange={handleChange}
                          placeholder="e.g. Creta, Fortuner"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Year *</label>
                        <input
                          type="number"
                          name="year"
                          required
                          value={formData.year}
                          onChange={handleChange}
                          placeholder="2023"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Kilometers *</label>
                        <input
                          type="number"
                          name="kilometers"
                          required
                          value={formData.kilometers}
                          onChange={handleChange}
                          placeholder="15000"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Condition</label>
                        <select
                          name="condition"
                          value={formData.condition}
                          onChange={handleChange}
                          className="select-field"
                        >
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="fair">Fair</option>
                          <option value="needs-repair">Needs Repair</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Additional Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Any additional details about your car..."
                        className="input-field"
                      />
                    </div>

                    <div className="rounded-xl border-2 border-dashed border-gray-200 p-6 text-center transition-colors hover:border-brand-300">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Upload car photos (optional)
                      </p>
                      <p className="text-xs text-gray-400">Drag &amp; drop or click to browse</p>
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                      Submit for Valuation
                    </button>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
