import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { t, i18n } = useTranslation();
  return (
    <section className="py-24 relative overflow-hidden bg-(--primary)">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_60%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-[1.3]"
          >
            {t("ctaSection.title")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-teal-50 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {t("ctaSection.desc")}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/+201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white text-(--primary) text-lg font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <span>{t("ctaSection.primary")}</span>
              <ArrowLeft className={`w-5 h-5 ${i18n.language.startsWith('en') ? 'rotate-180' : ''}`} />
            </a>
            <a
              href="#programs"
              className="w-full sm:w-auto px-8 py-4 bg-teal-800 border-2 border-teal-700 text-white text-lg font-bold rounded-2xl flex items-center justify-center hover:bg-teal-900 transition-all"
            >
              {t("ctaSection.secondary")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
