import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "../data/content";
import CTASection from "./Home/components/CTASection";
import { useTranslation } from "react-i18next";

export function Testimonials() {
  const { t } = useTranslation();
  return (
    <>
      <section
        id="testimonials"
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-teal-50 blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-amber-50 blur-[100px] translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-(--primary) mb-3 block">
              {t("testimonials.subtitle")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-(--dark) mb-6 leading-[1.3]">
              {t("testimonials.title")}
            </h2>
            <p className="text-(--muted) text-base sm:text-lg leading-relaxed">
              {t("testimonials.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.nameKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-teal-900/5 relative hover:-translate-y-2 transition-transform duration-300 border border-slate-100"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-amber-100">
                  <Quote className="w-12 h-12 rotate-180" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10">
                  "{t(testimonial.commentKey)}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-bold text-xl">
                    {t(testimonial.nameKey).charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-900">{t(testimonial.nameKey)}</h4>
                    <span className="text-sm text-teal-600 font-medium">{t(testimonial.roleKey)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action at the bottom of the page */}
      <CTASection />
    </>
  );
}
