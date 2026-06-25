import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedCars from "@/components/FeaturedCars";
import BrandsGrid from "@/components/BrandsGrid";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <FeaturedCars />
      <BrandsGrid />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
