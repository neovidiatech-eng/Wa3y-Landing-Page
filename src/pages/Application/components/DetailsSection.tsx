import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  
  const conditions = t('application.conditions', { returnObjects: true }) as string[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

      <div>
        <div className=" rounded-2xl p-4 md:p-6">
          <h1 className="text-gray-600 font-semibold text-[1.5rem]  md:text-[2rem]">
            {t('application.heroTitle')}
          </h1>
          <div className="flex justify-start gap-2 mt-4">
            <button className="bg-(--primary) text-white px-6 py-2 rounded-2xl font-bold hover:bg-(--secondary) transition-all  mt-10 shadow-md">
              <a href="#form"> {t('application.applyNowBtn')}</a>
            </button>
            <button className=" border-2 border-(--primary) text-(--primary) px-6 py-2 rounded-2xl font-bold hover:bg-(--primary) hover:text-white transition-all  mt-10 shadow-md">
              <a href="#form">  {t('application.readConditionsBtn')}</a>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <ul className="flex flex-col gap-5">
            {conditions.map((condition, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-(--primary) bg-green-50 rounded-full w-6 h-6 shrink-0" strokeWidth={1.5} />
                <span className="text-gray-800 text-md font-medium">{condition}</span>
              </li>
            ))}
          </ul>
          <button className="w-full bg-(--primary) hover:bg-(--secondary) text-white py-3 rounded-2xl font-bold mt-8 transition-colors text-lg shadow-md">
            <a href="#form">{t('application.startApplyBtn')}</a>
          </button>
        </div>
      </div>

    </div>

  )
}
