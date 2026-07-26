import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { services } from "../data/content";
import { motion } from "motion/react";
import { IslamicPattern } from "../components/IslamicPattern";
import { ServiceCard } from "../components/ServiceCard";
import { useTranslation, Trans } from "react-i18next";

export function SubjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  
  const subject = services.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!subject) {
    return (
      <div className="py-32 text-center min-h-[60vh] flex flex-col justify-center items-center bg-slate-50">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">{t("subjectDetails.notFound")}</h2>
        <Link to="/subjects" className="bg-teal-800 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors">
          {t("subjectDetails.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-24">
      {/* Hero Section */}
      <section className="relative bg-zinc-600 min-h-100 flex items-center overflow-hidden">
        {/* Background Image / Pattern */}
        <div className="absolute inset-0 z-0">
          <img 
            src={subject.image} 
            alt={t(subject.titleKey)} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-800/90 to-zinc-800/40" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center py-16">
          <div className="w-full md:w-1/2 md:pe-12 text-center md:text-start">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-amber-400 mb-6 pt-20"
            >
              {t("subjectDetails.courseTitle", { title: t(subject.titleKey) })}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-white text-base md:text-lg leading-relaxed mb-8"
            >
              {t(subject.descKey)}
            </motion.p>
          </div>
          <div className="w-full md:w-1/2">
             {/* Empty space for image if needed, or we can just leave it to show the bg image */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 relative -mt-8 z-20">
        <div className="flex justify-center mb-16">
          <div className="bg-gray-200 text-teal-900 font-bold px-8 py-4 rounded-xl shadow-md text-lg text-center max-w-2xl border-b-4 border-gray-300">
            <Trans i18nKey="subjectDetails.whyChoose" values={{ title: t(subject.titleKey) }} />
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {(t("subjectDetails.defaultFeatures", { returnObjects: true }) as { title: string, desc: string }[]).map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              {/* Star/Hexagon Number Shape */}
              <div className="shrink-0 relative w-12 h-12 flex items-center justify-center text-amber-500 font-bold text-xl mt-1">
                {/* A simple CSS star/burst shape using a div rotated */}
                <div className="absolute inset-0 bg-amber-400 rotate-45 rounded-sm opacity-20"></div>
                <div className="absolute inset-0 bg-amber-400 rotate-12 rounded-sm opacity-20"></div>
                <svg className="absolute inset-0 w-full h-full text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z"/>
                </svg>
                <span className="relative z-10 text-teal-900 font-black text-sm">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-teal-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center max-w-4xl bg-teal-700  rounded-2xl p-7 m-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          {t("subjectDetails.registerTitle", { title: t(subject.titleKey) })}
        </h2>
        <p className="text-gray-100 text-lg leading-relaxed mb-4">
          {t("subjectDetails.registerDesc1")}
        </p>
        <p className="text-gray-200 text-lg leading-relaxed mb-8">
          {t("subjectDetails.registerDesc2", { title: t(subject.titleKey) })}
        </p>
        <a 
          href="https://dashboard.waaiacademy.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-teal-800 hover:bg-teal-700 text-white font-bold py-3 px-12 rounded-full transition-colors shadow-lg"
        >
          {t("subjectDetails.registerBtn")}
        </a>
      </section>

      {/* Other Materials Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-amber-500 mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
               {/* Small icon or geometric shape */}
               <div className="w-3 h-3 bg-amber-500 rotate-45" />
            </span>
            {t("subjectDetails.otherSubjects")}
          </h2>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 xl:gap-8">
          {services.filter(svc => svc.id !== id).map((svc, index) => (
            <div key={svc.id} className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]">
              <ServiceCard 
                id={svc.id}
                title={t(svc.titleKey)}
                desc={t(svc.descKey)}
                image={svc.image}
                isPrimary={svc.isPrimary}
                index={index} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
