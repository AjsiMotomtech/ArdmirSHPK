
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="kreu" className="relative pt-24 md:pt-0 h-screen">
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Welcome Text - Fixed on top of slides */}
        <div className="absolute inset-0 z-20">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-5xl md:text-7xl font-heading font-bold mb-6 text-white"
              >
                {t("hero.welcome")}
              </motion.h1>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button
                  onClick={() => scrollToSection("sherbimet")}
                  className="bg-[#e67e22] hover:bg-[#d35400] text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  {t("hero.servicesButton")}
                </button>
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1a365d] text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  {t("hero.contactButton")}
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index
                  ? "bg-white w-4"
                  : "bg-white opacity-60 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
