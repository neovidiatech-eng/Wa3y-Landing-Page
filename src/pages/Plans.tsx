import { usePlans } from "../hooks/usePlans";
import { IslamicPattern } from "../components/IslamicPattern";
import CTASection from "./Home/components/CTASection";
import { Check } from "lucide-react";
import { Plan } from "../types";
import { useTranslation } from "react-i18next";

export function Plans() {
  const { t, i18n } = useTranslation();

  const { data: response, isLoading, error } = usePlans();
  const plans = response?.data || [];

  return (
    <>
      <section className="pt-30 pb-24 bg-slate-50 relative min-h-[70vh]">
        <IslamicPattern className="absolute inset-0 opacity-[0.03] pointer-events-none text-(--primary)" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-black text-teal-800 mb-6">
              {t("plans.title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("plans.subtitle")}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-800 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 bg-red-50 p-6 rounded-xl max-w-2xl mx-auto border border-red-100">
              {t("plans.error")}
              <br />
              <span className="text-sm mt-2 block opacity-80">
                {error instanceof Error ? error.message : "Error loading plans"}
              </span>
            </div>
          ) : plans && plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan: Plan) => (
                <div key={plan.id} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-shadow relative overflow-hidden group">
                  {/* Decorative background shape */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-teal-50 rounded-full transition-transform group-hover:scale-150 duration-500 z-0"></div>
                  
                  {plan.bestSeller && (
                    <div className={`absolute top-0 ${i18n.language === 'en' ? 'right-0 rounded-bl-xl' : 'right-0 rounded-bl-xl'} bg-amber-500 text-white text-sm font-bold px-4 py-1 z-10`}>
                      {t("plans.bestSeller")}
                    </div>
                  )}
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-teal-900 mb-2">{i18n.language === 'en' && plan.name_en ? plan.name_en : plan.name_ar}</h3>
                    <p className="text-gray-500 mb-6 min-h-12 whitespace-pre-line">{plan.description}</p>
                    
                    <div className="mb-8 border-b border-gray-100 pb-8">
                      <span className="text-4xl font-black text-amber-500">{plan.price}</span>
                      <span className="text-gray-500 mx-2">
                        {i18n.language === 'en' ? plan.currency?.name_en || t("plans.currencyFallback") : plan.currency?.name_ar || t("plans.currencyFallback")} / {t("plans.perMonth")}
                      </span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 grow">
                      {/* Using session info since features array was mostly empty in sample data */}
                      <li className="flex items-start gap-3">
                        <span className="bg-teal-100 text-teal-800 rounded-full p-1 mt-1 shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-gray-700 leading-relaxed">
                          {t("plans.sessionsCount", { count: plan.sessionsCount })}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-teal-100 text-teal-800 rounded-full p-1 mt-1 shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                        <span className="text-gray-700 leading-relaxed">
                          {t("plans.sessionTime", { time: plan.sessionTime })}
                        </span>
                      </li>
                      {plan.features?.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="bg-teal-100 text-teal-800 rounded-full p-1 mt-1 shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="text-gray-700 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                    onClick={() => window.open(`https://dashboard.waaiacademy.com/register?planId=${plan.id}`, "_blank")}
                    className="w-full py-4 rounded-xl font-bold cursor-pointer transition-all bg-teal-800 text-white hover:bg-teal-700 hover:shadow-lg mt-auto">
                      {t("plans.subscribe")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-20 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <p className="text-xl font-medium">{t("plans.noPlans")}</p>
            </div>
          )}
        </div>
      </section>
      
      <CTASection />
    </>
  );
}
