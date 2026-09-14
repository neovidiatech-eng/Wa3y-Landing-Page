import { useState, useEffect } from "react";
import { navLinks, dashboardLink } from "../../data/content";
import { X, Menu, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/logo.png";
import { useTranslation } from "react-i18next";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const toggleLanguage = () => {
      const newLang = i18n.language.startsWith("ar") ? "en" : "ar";
      i18n.changeLanguage(newLang);
    };

    // scroll effect
    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
    // close mobile menu on route change
      useEffect(() => {
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, [location.pathname]);
  
    
  return (
           <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || location.pathname !== "/"
            ? "bg-white/80 backdrop-blur-lg shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-12 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Link to="/">
              <img
                src={logoImage}
                alt="لوجو وعي"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain -my-4"
              />
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.href;
              return (
                <motion.div
                  key={link.nameKey}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`${
                      isActive ? "text-(--primary)" : "text-(--muted)"
                    } font-semibold hover:text-(--primary) transition-colors relative group py-2`}
                  >
                    {t(link.nameKey)}
                    {isActive && (
                      <motion.span 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--primary) rounded-full" 
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-(--primary) font-bold px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors"
            >
              <Globe className="w-5 h-5" />
              {i18n.language.startsWith("ar") ? "EN" : "عربي"}
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = dashboardLink)}
              className="hidden md:block cursor-pointer bg-(--primary) text-white px-6 py-2 rounded-2xl font-bold hover:bg-(--secondary) transition-all shadow-md"
            >
              {t("header.login", "تسجيل الدخول")}
            </motion.button>

            <motion.button
             whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/join-us")}

              className="hidden md:block cursor-pointer text-(--primary) px-6 py-2 rounded-2xl font-bold hover:text-(--primary) transition-all shadow-md"
            >
              {t("header.joinTeam", "انضم لفريق وعي")}
            </motion.button>
            <button
              className="lg:hidden p-2 text-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.nameKey}
                      to={link.href}
                      className={`text-lg font-medium hover:text-(--primary) transition-colors inline-block w-fit relative py-1 ${
                        isActive ? "text-(--primary)" : "text-dark"
                      }`}
                    >
                      {t(link.nameKey)}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--primary) rounded-full" />
                      )}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-3 mt-2">
                  <a
                    href={dashboardLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-(--primary) text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-(--secondary) transition-all"
                  >
                    {t("header.login", "تسجيل الدخول")}
                  </a>
                  <button
                    onClick={() => navigate("/application")}
                    className="bg-white border-2 border-(--primary) text-(--primary) px-6 py-3 rounded-xl font-bold text-center hover:bg-teal-50 transition-all"
                  >
                    {t("header.joinTeam", "انضم لفريق وعي")}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
  )
}
