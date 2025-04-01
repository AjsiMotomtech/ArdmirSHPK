import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { services } from "@/lib/data";

const ServicesSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const divRef = ref as React.LegacyRef<HTMLDivElement>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="sherbimet" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={divRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={headerVariants}
            className="text-sm font-medium text-[#e67e22] uppercase tracking-wider mb-2"
          >
            {t("services.subtitle")}
          </motion.h2>
          <motion.h3 
            variants={headerVariants}
            className="text-4xl font-heading font-bold text-[#1a365d]"
          >
            {t("services.title")}
          </motion.h3>
          <motion.div 
            variants={headerVariants}
            className="w-20 h-1 bg-[#e67e22] mx-auto mt-6"
          ></motion.div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.icon} 
                  alt={t(service.title)} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="font-heading font-bold text-xl text-[#1a365d] mb-3">
                  {t(service.title)}
                </h4>
                <p className="text-neutral-800 mb-6">
                  {t(service.description)}
                </p>
                <a
                  href="#kontakt"
                  className="text-[#e67e22] font-bold hover:text-[#d35400] transition duration-300 flex items-center"
                >
                  {t("services.learnMore")}
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
