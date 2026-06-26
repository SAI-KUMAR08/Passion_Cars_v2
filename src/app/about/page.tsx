import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Users, Target, ArrowRight } from "lucide-react";
import { teamMembers } from "@/data/cars";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us | CarTimez",
  description:
    "Learn about CarTimez — our story, mission, and the team behind India's most trusted pre-owned car dealership.",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in every transaction. No hidden fees, no surprises.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Every car undergoes a rigorous 100-point inspection before it reaches our showroom floor.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Our customers are at the heart of everything we do. Your satisfaction is our success.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every aspect — from our inventory to our after-sales service.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="container-wide text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">About CarTimez</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Driven by passion, built on trust. Discover the story behind India&apos;s most reliable pre-owned car
            dealership.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="badge-red">Our Story</span>
              <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
                A Decade of Delivering Excellence
              </h2>
              <p className="mt-4 leading-relaxed text-gray-500">
                Founded in 2015, CarTimez started with a simple vision — to transform the pre-owned car
                buying experience in India. What began as a small showroom in Mumbai has grown into one of
                the region&apos;s most trusted automotive dealerships.
              </p>
              <p className="mt-4 leading-relaxed text-gray-500">
                Over the past decade, we&apos;ve helped over 5,000 customers find their dream cars, built
                lasting relationships based on trust, and earned a reputation for quality, transparency, and
                exceptional service.
              </p>
              <p className="mt-4 leading-relaxed text-gray-500">
                Our team of automotive experts brings decades of combined experience to ensure every car
                we sell meets the highest standards of quality and reliability.
              </p>
              <Link href="/buy" className="btn-primary mt-8">
                Browse Our Inventory
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden">
                <div className="flex h-full items-center justify-center bg-gray-800">
                  <div className="text-center text-white">
                    <span className="text-8xl font-bold text-white/20">10+</span>
                    <p className="mt-2 text-xl font-semibold">Years of Excellence</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-brand-600 px-6 py-4 text-white shadow-xl">
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm text-white/80">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-red">Our Values</span>
            <h2 className="section-title mt-4">What Drives Us</h2>
            <p className="section-subtitle">
              Our core values shape every interaction, every sale, and every relationship we build.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="card-hover text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <span className="badge-red">Our Team</span>
            <h2 className="section-title mt-4">Meet the People Behind CarTimez</h2>
            <p className="section-subtitle">
              Our dedicated team of automotive experts is committed to providing you with the best experience.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="card-hover text-center">
                <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={192}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-brand-600">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
