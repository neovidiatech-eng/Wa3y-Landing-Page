import { motion } from "motion/react";
import { services } from "../../../data/content";
import { ServiceCard } from "../../../components/ServiceCard";
import { IslamicPattern } from "../../../components/IslamicPattern";
import { useTranslation } from "react-i18next";

export default function Programs() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="programs">
      <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none text-(--primary)" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-teal-800 mb-6"
          >
            {t("programs.title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-(--dark) text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed"
            style={{ fontFamily: "'Qalam QuranQalam Quran', 'Amiri', serif" }} // Assuming they might have a Quranic font or standard Arabic serif
          >
            "{t("programs.quranVerse")}"
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {services.map((service, index) => (
            <div key={service.titleKey}>
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
  );
}
