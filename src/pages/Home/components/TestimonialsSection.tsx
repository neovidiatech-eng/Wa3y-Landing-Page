import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../../../data/content";
import { useTranslation } from "react-i18next";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-(--primary) mb-3 block">
            {t("testimonialsSection.subtitle")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-(--dark) mb-6 leading-[1.3]">
            {t("testimonialsSection.titlePart1")} <span className="text-(--primary)">{t("testimonialsSection.titleHighlight")}</span>{t("testimonialsSection.titlePart2")}
          </h2>
          <p className="text-(--muted) text-base sm:text-lg leading-relaxed">
            {t("testimonialsSection.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all relative"
            >
              <Quote className="absolute top-6 left-6 w-12 h-12 text-slate-50 opacity-50 rotate-180" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-(--dark) leading-relaxed mb-8 relative z-10 font-medium">
                "{t(testimonial.commentKey)}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg">
                  {t(testimonial.nameKey).charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-(--dark)">{t(testimonial.nameKey)}</h4>
                  <span className="text-sm text-(--muted)">{t(testimonial.roleKey)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
