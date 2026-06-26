"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/cars";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  return (
    <section className="bg-navy-800 py-20">
      <div className="container-wide">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="badge bg-white/10 text-gray-300 border-white/10">Testimonials</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Real stories from real customers who found their perfect car with us.
          </p>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <div className="card relative bg-white/5 backdrop-blur-sm border border-white/10 text-white">
                <Quote className="absolute right-4 top-4 h-10 w-10 text-white/10" />
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-sm leading-relaxed text-gray-300">&ldquo;{testimonial.text}&rdquo;</p>
                {/* Author */}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
