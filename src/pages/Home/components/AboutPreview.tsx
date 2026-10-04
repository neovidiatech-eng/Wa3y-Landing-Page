import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { IslamicPattern } from "../../../components/IslamicPattern";
import { useTranslation } from "react-i18next";

export default function AboutPreview() {
  const { t, i18n } = useTranslation();
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <IslamicPattern className="absolute inset-0 opacity-5 pointer-events-none text-(--primary)" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-20 overflow-hidden rounded-[40px] shadow-2xl border border-white">
              <img
                src="/images/about_wa3y.png"
                alt="عن أكاديمية وعي"
                className="w-full h-auto object-cover rounded-[40px]"
              />
              <div className="absolute inset-0 bg-teal-900/10" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-60" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-(--primary) inline-block">
              {t("aboutPreview.subtitle")}
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--dark) leading-[1.3]">
              {t("aboutPreview.titlePart1")} <span className="text-(--primary)">{t("aboutPreview.titleHighlight")}</span><br />
              {t("aboutPreview.titlePart2")}
            </h2>
            
            <p className="text-(--muted) text-base sm:text-lg leading-relaxed">
              {t("aboutPreview.desc1")}
            </p>
            
            <p className="text-(--muted) text-base sm:text-lg leading-relaxed">
              {t("aboutPreview.desc2")}
            </p>
            
            <div className="mt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 text-(--primary) text-lg font-bold rounded-2xl hover:bg-slate-50 hover:border-teal-100 hover:shadow-lg hover:shadow-teal-900/5 transition-all group"
              >
                {t("aboutPreview.cta")}
                <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-1 ${i18n.language.startsWith('en') ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
