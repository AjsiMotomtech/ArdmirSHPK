import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { projectCategories } from "@/lib/data";
import { getProjects, getProjectCategories } from "@/lib/dataService";
import { ProjectCategory, Project } from "@/lib/types";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const { ref: sectionRef, inView } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>(projectCategories);
  const [loading, setLoading] = useState(true);

  // Load projects and categories from data service
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectsData = await getProjects();
        setProjects(Array.isArray(projectsData) ? projectsData : []);

        const categoriesData = await getProjectCategories();
        if (categoriesData && categoriesData.length > 0) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const filterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projektet" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={sectionRef as React.LegacyRef<HTMLDivElement>}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={headerVariants}
            className="text-sm font-medium text-[#e67e22] uppercase tracking-wider mb-2"
          >
            {t("projects.subtitle")}
          </motion.h2>
          <motion.h3 
            variants={headerVariants}
            className="text-4xl font-heading font-bold text-[#1a365d]"
          >
            {t("projects.title")}
          </motion.h3>
          <motion.div 
            variants={headerVariants}
            className="w-20 h-1 bg-[#e67e22] mx-auto mt-6"
          ></motion.div>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          variants={filterVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button 
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
              activeCategory === "all" 
                ? "bg-gray-200 font-semibold" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {t("projects.filters.all")}
          </button>

          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${
                activeCategory === category 
                  ? "bg-gray-200 font-semibold" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {t(`projects.filters.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e67e22]"></div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={projectVariants}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={project.image} 
                      alt={t(project.title)}
                      className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-white">
                        <h4 className="font-heading font-bold text-xl mb-2">
                          {t(project.title)}
                        </h4>
                        <p className="text-sm mb-2">
                          {t(project.description)}
                        </p>
                        <a href="#" className="text-[#e67e22] font-bold hover:text-[#f39c12] transition duration-300">
                          {t("projects.viewDetails")}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;