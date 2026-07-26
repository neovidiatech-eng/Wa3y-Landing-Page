import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Eye, MonitorPlay } from "lucide-react";
import { IslamicPattern } from "../components/IslamicPattern";
import CTASection from "./Home/components/CTASection";
import { useTranslation, Trans } from "react-i18next";

export function About() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("goals");

  const tabs = [
    {
      id: "goals",
      label: t("about.tabs.goals"),
      icon: Target,
      content: (
        <div className="space-y-6 text-white text-start">
          {(t("about.goalsContent", { returnObjects: true }) as { title: string, desc: string }[]).map((item, i) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="flex gap-3 text-start"
            >
              <span className="font-bold text-amber-400 mt-1">-</span>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-teal-50/90 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "mechanism",
      label: t("about.tabs.mechanism"),
      icon: MonitorPlay,
      content: (
        <div className="space-y-6 text-white text-start">
          {(t("about.mechanismContent", { returnObjects: true }) as { title: string, desc: string }[]).map((item, i) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="flex gap-3 text-start"
            >
              <span className="font-bold text-amber-400 mt-1">-</span>
              <div>
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-teal-50/90 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: "vision",
      label: t("about.tabs.vision"),
      icon: Eye,
      content: (
        <div className="space-y-6 text-white text-start">
          {(t("about.visionContent", { returnObjects: true }) as string[]).map((item, i) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="flex gap-3 text-start"
            >
              <span className="font-bold text-amber-400 mt-0">-</span>
              <p className="text-white text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      )
    }
  ];

  return (
    <>
      <section className="py-20 pt-30 bg-slate-50 relative overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-[100px] opacity-60" />
        <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none text-(--primary)" />

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Top Intro Box */}
          <div className="max-w-4xl mx-auto text-center mb-16 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-bold py-2 px-8 rounded-full shadow-lg z-20">
              {t("about.whoAreWe")}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-slate-100 relative z-10 mt-6"
            >
              <p className="text-(--muted) text-base sm:text-lg leading-relaxed text-center font-medium mt-4">
                <Trans i18nKey="about.description" components={{ highlight: <span className="text-(--primary) font-bold" /> }} />
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Tabs Title */}
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-(--dark)">
                <Trans i18nKey="about.featuresTitle" components={{ highlight: <span className="text-(--primary)" /> }} />
              </h2>
            </div>

            {/* Tabs Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
                      isActive
                        ? "bg-teal-800 text-white scale-105 shadow-xl"
                        : "bg-amber-400 text-teal-900 hover:bg-amber-500 hover:text-white"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Box */}
            <motion.div
              layout
              className="bg-teal-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-100"
            >
              <IslamicPattern className="absolute inset-0 opacity-10 pointer-events-none" />
              
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {tabs.map(
                    (tab) =>
                      activeTab === tab.id && (
                        <motion.div
                          key={tab.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {tab.content}
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <CTASection />
    </>
  );
}
