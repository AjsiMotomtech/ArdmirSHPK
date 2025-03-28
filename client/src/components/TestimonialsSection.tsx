import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { testimonials } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const testimonialVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.4 }
    }
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={headerVariants}
            className="text-sm font-medium text-[#e67e22] uppercase tracking-wider mb-2"
          >
            {t("testimonials.subtitle")}
          </motion.h2>
          <motion.h3 
            variants={headerVariants}
            className="text-4xl font-heading font-bold text-[#1a365d]"
          >
            {t("testimonials.title")}
          </motion.h3>
          <motion.div 
            variants={headerVariants}
            className="w-20 h-1 bg-[#e67e22] mx-auto mt-6"
          ></motion.div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={testimonialVariants}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={t("testimonials.clientPortrait")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex text-[#e67e22] mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`fas ${
                          i < testimonials[currentTestimonial].rating
                            ? 'fa-star'
                            : i + 0.5 === testimonials[currentTestimonial].rating
                            ? 'fa-star-half-alt'
                            : 'fa-star-o'
                        }`}></i>
                      ))}
                    </div>
                    <p className="text-neutral-800 italic mb-6">
                      "{t(testimonials[currentTestimonial].text)}"
                    </p>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-[#1a365d]">
                        {t(testimonials[currentTestimonial].name)}
                      </h4>
                      <p className="text-sm text-neutral-800">
                        {t(testimonials[currentTestimonial].position)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center transition duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="text-[#1a365d]" size={18} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center transition duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="text-[#1a365d]" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
