"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Send } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
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

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      details: [settings.phone, "Toll Free: 1800-123-4567"],
      action: { href: "tel:" + settings.phone.replace(/[^0-9+]/g, ""), text: "Call Now" },
    },
    {
      icon: Mail,
      label: "Email",
      details: ["info@cartimez.com", "sales@cartimez.com"],
      action: { href: "mailto:info@cartimez.com", text: "Send Email" },
    },
    {
      icon: MapPin,
      label: "Address",
      details: ["123, Auto Plaza, Sector 18", "Mumbai, Maharashtra - 400001"],
    },
    {
      icon: Clock,
      label: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Have a question? We&apos;re here to help. Reach out to us and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <ScrollReveal key={info.label}>
                <div className="card-hover text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <info.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{info.label}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="mt-1 text-sm text-gray-500">{detail}</p>
                  ))}
                  {"action" in info && info.action && (
                    <a
                      href={info.action.href}
                      className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      {info.action.text}
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Form */}
      <section className="bg-gray-50 py-16">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Map */}
            <ScrollReveal direction="left">
              <span className="badge-red">Visit Us</span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">Find Us at Our Showroom</h2>
              <p className="mt-4 leading-relaxed text-gray-500">
                Visit our state-of-the-art showroom to explore our complete inventory in person. Our team is ready
                to assist you with test drives and expert guidance.
              </p>
              <div className="mt-6 aspect-[16/9] rounded-xl bg-gray-200 overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-gray-800">
                  <div className="text-center text-white">
                    <MapPin className="mx-auto h-12 w-12 text-brand-400" />
                    <p className="mt-2 text-lg font-semibold">CarTimez Showroom</p>
                    <p className="text-sm text-gray-400">123, Auto Plaza, Sector 18, Mumbai</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={"https://wa.me/" + settings.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
                <a href={"tel:" + settings.phone.replace(/[^0-9+]/g, "")} className="btn-secondary">
                  <Phone className="h-5 w-5" />
                  Call Us
                </a>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right">
              {submitted ? (
                <div className="card text-center py-12">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                  <p className="mt-2 text-gray-500">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
                    }}
                    className="btn-primary mt-8"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card">
                  <h3 className="text-xl font-bold text-gray-900">Send Us a Message</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full name" className="input-field" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="input-field" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Subject</label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className="select-field">
                        <option value="general">General Inquiry</option>
                        <option value="buying">I want to buy a car</option>
                        <option value="selling">I want to sell my car</option>
                        <option value="exchange">Car Exchange</option>
                        <option value="finance">Financing</option>
                        <option value="test-drive">Book a Test Drive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">Message *</label>
                      <textarea name="message" required value={formData.message} onChange={handleChange} rows={4} placeholder="How can we help you?" className="input-field" />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                      <Send className="h-5 w-5" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-wide max-w-4xl">
          <ScrollReveal className="text-center">
            <span className="badge-red">FAQ</span>
            <h2 className="section-title mt-4">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="mt-12 space-y-4">
            {[
              { q: "How do I book a test drive?", a: "You can call us directly, send a WhatsApp message, or fill out our contact form. We'll schedule a test drive at your convenience." },
              { q: "What documents do I need to buy a car?", a: "You'll need a valid government ID (Aadhar, PAN, or Passport), address proof, and income documents if you're applying for financing." },
              { q: "Can I return a car after purchase?", a: "We offer a 3-day exchange policy if you're not satisfied with your purchase, subject to our terms and conditions." },
              { q: "How long does the financing process take?", a: "Loan approvals typically take 24-48 hours with minimal documentation. Our finance team guides you through the entire process." },
            ].map((faq, index) => (
              <details key={index} className="card group cursor-pointer">
                <summary className="flex items-center justify-between gap-4 text-base font-semibold text-gray-900">
                  {faq.q}
                  <span className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
