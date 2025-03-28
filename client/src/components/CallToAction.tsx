import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const CallToAction = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
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
    <section className="py-16 bg-[#1a365d] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <h3 className="text-3xl font-heading font-bold mb-2">
              {t("cta.title")}
            </h3>
            <p className="text-white text-opacity-80">
              {t("cta.subtitle")}
            </p>
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            onClick={() => scrollToSection("kontakt")}
            className="bg-[#e67e22] hover:bg-[#d35400] text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            {t("cta.button")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
