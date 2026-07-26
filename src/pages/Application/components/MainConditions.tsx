import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MainConditions() {
  const { t } = useTranslation();
  
  const conditions = t('application.conditions', { returnObjects: true }) as string[];

  return (
    <div className="w-full mt-12 mb-12">
      <div className="mb-6">
        <h2 className="text-(--primary) font-bold text-[1.5rem] md:text-[2rem]">
          {t('application.mainConditionsTitle')}
        </h2>
        <p className="text-gray-600 text-lg font-medium mt-2">
          {t('application.mainConditionsDesc')}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 
                className="text-(--primary) bg-green-50 rounded-full w-6 h-6 shrink-0" 
                strokeWidth={1.5} 
              />
              <span className="text-gray-800 text-lg font-medium">{condition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

