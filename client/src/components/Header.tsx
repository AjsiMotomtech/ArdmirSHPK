import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      closeMobileMenu();
    }
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-sm py-4"}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-heading font-bold text-primary">
              <span className="text-[#e67e22]">Ardmir</span> Shpk
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection("kreu")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
              {t("nav.home")}
            </button>
            <button onClick={() => scrollToSection("rreth-nesh")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
              {t("nav.about")}
            </button>
            <button onClick={() => scrollToSection("sherbimet")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
              {t("nav.services")}
            </button>
            <button onClick={() => scrollToSection("projektet")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
              {t("nav.projects")}
            </button>
            <button onClick={() => scrollToSection("kontakt")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
              {t("nav.contact")}
            </button>
            
            <LanguageSwitcher />
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-neutral-800 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t mt-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection("kreu")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
                  {t("nav.home")}
                </button>
                <button onClick={() => scrollToSection("rreth-nesh")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
                  {t("nav.about")}
                </button>
                <button onClick={() => scrollToSection("sherbimet")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
                  {t("nav.services")}
                </button>
                <button onClick={() => scrollToSection("projektet")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
                  {t("nav.projects")}
                </button>
                <button onClick={() => scrollToSection("kontakt")} className="font-heading font-medium text-neutral-800 hover:text-[#e67e22] transition duration-300">
                  {t("nav.contact")}
                </button>
                
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
