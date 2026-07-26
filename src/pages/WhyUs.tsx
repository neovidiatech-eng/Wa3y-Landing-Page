import { ArrowLeft, Phone } from "lucide-react";
import { IslamicPattern } from "../components/IslamicPattern";
import { Step } from "../components/Step";
import { whyUsSteps } from "../data/content";
import CTASection from "./Home/components/CTASection";
import { useTranslation, Trans } from "react-i18next";

export function WhyUs() {
  const { t, i18n } = useTranslation();
  return (
    <>
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
                      <ArrowLeft className={`w-4 h-4 ${i18n.language.startsWith('en') ? 'rotate-180' : ''}`} />
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

      {/* Call to action at the bottom of the page */}
      <CTASection />
    </>
  );
}
