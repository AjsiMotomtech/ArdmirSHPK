import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1a365d] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="text-2xl font-heading font-bold mb-6">
              <span className="text-[#e67e22]">Ardmir</span> Shpk
            </h4>
            <p className="text-white text-opacity-80 mb-6">
              {t("footer.companyDescription")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#e67e22] transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#e67e22] transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-[#e67e22] transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#e67e22] transition duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-heading font-bold mb-6">{t("footer.services.title")}</h5>
            <ul className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <li key={index}>
                  <a href="#sherbimet" className="text-white text-opacity-80 hover:text-[#e67e22] transition duration-300">
                    {t(`footer.services.items.${index}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-heading font-bold mb-6">{t("footer.quickLinks.title")}</h5>
            <ul className="space-y-3">
              <li>
                <a href="#kreu" className="text-white text-opacity-80 hover:text-[#e67e22] transition duration-300">
                  {t("footer.quickLinks.home")}
                </a>
              </li>
              <li>
                <a href="#rreth-nesh" className="text-white text-opacity-80 hover:text-[#e67e22] transition duration-300">
                  {t("footer.quickLinks.about")}
                </a>
              </li>
              <li>
                <a href="#sherbimet" className="text-white text-opacity-80 hover:text-[#e67e22] transition duration-300">
                  {t("footer.quickLinks.services")}
                </a>
              </li>
              <li>
                <a href="#projektet" className="text-white text-opacity-80 hover:text-[#e67e22] transition duration-300">
                  {t("footer.quickLinks.projects")}
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-white text-opacity-80 hover:text-[#e67e22] transition duration-300">
                  {t("footer.quickLinks.contact")}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-heading font-bold mb-6">{t("footer.contact.title")}</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1 text-[#e67e22]"></i>
                <span className="text-white text-opacity-80">{t("footer.contact.address")}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mr-3 mt-1 text-[#e67e22]"></i>
                <span className="text-white text-opacity-80">{t("footer.contact.phone")}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mr-3 mt-1 text-[#e67e22]"></i>
                <span className="text-white text-opacity-80">{t("footer.contact.email")}</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mr-3 mt-1 text-[#e67e22]"></i>
                <span className="text-white text-opacity-80">{t("footer.contact.hours")}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-opacity-60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Ardmir Shpk. {t("footer.copyright")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white text-opacity-60 hover:text-[#e67e22] text-sm transition duration-300">
                {t("footer.privacy")}
              </a>
              <a href="#" className="text-white text-opacity-60 hover:text-[#e67e22] text-sm transition duration-300">
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
