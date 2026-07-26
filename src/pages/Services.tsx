import { motion } from "motion/react";
import { ServiceCard } from "../components/ServiceCard";
import { services } from "../data/content";
import CTASection from "./Home/components/CTASection";
import { IslamicPattern } from "../components/IslamicPattern";
import { useTranslation } from "react-i18next";

export function Services() {
  const { t } = useTranslation();
  return (
    <>
      <section id="services" className="py-24 pt-30 bg-slate-50 relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none text-(--primary)" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-4xl font-black text-teal-800 mb-6"
            >
              {t("programs.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-(--dark) text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-8"
              style={{ fontFamily: "'Amiri', serif" }} // Optional: Quranic font styling
            >
              {t("programs.quranVerse")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-(--muted) text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              {t("programs.description")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {services.map((service, index) => (
              <div key={service.titleKey} className="w-full">
                <ServiceCard 
                  id={service.id}
                  title={t(service.titleKey)}
                  desc={t(service.descKey)}
                  image={service.image}
                  isPrimary={service.isPrimary}
                  index={index} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action at the bottom of the page */}
      <CTASection />
    </>
  );
}
