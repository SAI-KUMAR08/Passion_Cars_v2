import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/cars";

export default function TestimonialsSection() {
  return (
    <section className="gradient-primary py-20">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="marker-badge bg-white/10 text-accent-300 border-white/30">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Real stories from real customers who found their perfect car with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="card relative bg-white/5 backdrop-blur-sm border border-white/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="absolute right-4 top-4 h-10 w-10 text-white/10" />
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
