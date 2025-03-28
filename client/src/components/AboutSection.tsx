import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { aboutStats } from "@/lib/data";

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="rreth-nesh" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-1/2"
          >
            <img 
              src="https://images.unsplash.com/photo-1572206912757-5a78ff4d79be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt={t("about.imageAlt")}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
          
          <div className="w-full md:w-1/2">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-medium text-[#e67e22] uppercase tracking-wider mb-2">
                {t("about.subtitle")}
              </h2>
              <h3 className="text-4xl font-heading font-bold text-[#1a365d] mb-6">
                {t("about.title")}
              </h3>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-lg text-neutral-800 mb-6">
              {t("about.paragraph1")}
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-neutral-800 mb-8">
              {t("about.paragraph2")}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 mb-8"
            >
              {aboutStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-[#1a365d] mb-2">
                    {stat.value}
                  </span>
                  <span className="text-neutral-800 text-center">
                    {t(stat.label)}
                  </span>
                </div>
              ))}
            </motion.div>
            
            <motion.a 
              variants={itemVariants}
              href="#sherbimet"
              className="inline-flex items-center text-[#e67e22] font-bold hover:text-[#d35400] transition duration-300"
            >
              {t("about.exploreButton")}
              <i className="fas fa-arrow-right ml-2"></i>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
