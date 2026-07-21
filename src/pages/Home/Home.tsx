import { motion } from "motion/react";
import { ArrowLeft, Phone } from "lucide-react";
import { IslamicPattern } from "../../components/IslamicPattern";
import { Counter } from "../../components/Counter";
import { stats, whyUsSteps } from "../../data/content";
import Hero from "./components/Hero";
import { Step } from "@/src/components/Step";

// New Components
import AboutPreview from "./components/AboutPreview";
import Programs from "./components/Programs";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import { useTranslation, Trans } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* --- Hero Section --- */}
      <Hero />

      {/* --- About Preview Section --- */}
      <AboutPreview />

      {/* --- Programs/Services Section --- */}
      <Programs />

      {/* --- Why Us Section --- */}
      <section id="why-us" className="py-24 bg-white relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-0 w-125 h-125 bg-teal-50 blur-[150px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-100 h-100 bg-amber-50 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <IslamicPattern className="absolute inset-0 opacity-5 pointer-events-none text-(--primary)" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-(--primary) mb-3 block">
                  {t("home.features")}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-(--dark) mb-8 leading-[1.3]">
                  <Trans i18nKey="home.whyParentsChoose" components={{ highlight: <span className="text-(--primary)" /> }} />
                </h2>
                <p className="text-(--muted) text-base sm:text-lg leading-relaxed mb-10">
                  {t("home.whyParentsChooseDesc")}
                </p>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden group">
                  <div className="relative z-10">
                    <span className="text-(--dark) font-bold block mb-2">
                      {t("home.haveQuestion")}
                    </span>
                    <a
                      href="https://wa.me/+201000000000"
                      className="text-(--primary) font-bold hover:underline flex items-center gap-2"
                    >
                      {t("home.contactWhatsapp")}
                      <ArrowLeft className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 blur-xl">
                    <Phone className="w-24 h-24 text-(--primary)" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="space-y-4">
                {whyUsSteps.map((step, index) => (
                  <div key={step.titleKey}>
                    <Step
                      title={t(step.titleKey)}
                      desc={t(step.descKey)}
                      index={index}
                      isLast={index === whyUsSteps.length - 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Achievements/Stats Section --- */}
      <section className="py-20 bg-linear-to-l from-teal-700 to-teal-900 relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.labelKey}>
                <Counter value={stat.value} label={t(stat.labelKey)} icon={stat.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <TestimonialsSection />

      {/* --- CTA Section --- */}
      <CTASection />
    </>
  );
}
