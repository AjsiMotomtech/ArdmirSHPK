import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CallToAction from "@/components/CallToAction";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="font-body text-neutral-800 bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CallToAction />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Home;
