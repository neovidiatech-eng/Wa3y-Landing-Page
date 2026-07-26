import { AnimatePresence, motion } from "motion/react";
import { ChevronDown} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IslamicPattern } from "../IslamicPattern";
import Header from "./Header";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

export function Layout() {
  const location = useLocation();

  return (
    <div
      className="font-['Cairo'] selection:bg-teal-100 selection:text-teal-900 bg-background overflow-x-hidden min-h-screen flex flex-col"
    >
      <div className="fixed inset-0 pattern-bg pointer-events-none" />

      {/* --- Navbar --- */}
   
<Header/>
      {/* Page Content with Transitions */}
      <div className={`grow ${location.pathname !== "/" ? "pt-16 md:pt-20 lg:pt-24" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Footer --- */}
  <Footer/>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+201000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-60 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <FaWhatsapp size={28}/>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
        </span>
      </a>

      {/* Scroll to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-28 right-10 z-60 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-dark transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </div>
  );
}
