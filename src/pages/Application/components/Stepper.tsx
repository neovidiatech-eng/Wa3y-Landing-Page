import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export default function Stepper({ currentStep, steps }: StepperProps) {
  const { t } = useTranslation();
  const percentage = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="w-full flex flex-col mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-bold text-gray-800 text-lg md:text-xl">{t('application.stepperTitle')}</h3>
        <span className="text-gray-500 text-sm font-bold">{percentage}%</span>
      </div>

      {/* Steps icons */}
      <div className="flex justify-between items-start w-full px-1 sm:px-2 md:px-8 mb-4">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;

          return (
            <div key={step} className="flex flex-col items-center gap-2 md:gap-3">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors
                  ${isActive ? "bg-white text-(--primary) border-2 border-(--primary)" 
                    : isCompleted ? "bg-(--primary) text-white border-2 border-(--primary)" 
                    : "bg-white text-gray-400 border-2 border-gray-200"}`}
              >
                {isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} /> : stepNum}
              </div>
              <span 
                className={`text-[9px] sm:text-[10px] md:text-sm font-bold text-center w-17.5 sm:w-20 md:w-28 leading-tight
                  ${isActive || isCompleted ? "text-gray-800" : "text-gray-400"}`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar (Thick green over thin grey) */}
      <div className="relative w-full flex items-center mt-2">
        {/* Thin grey line */}
        <div className="absolute left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        {/* Thick green line */}
        <div 
          className="h-1.5 bg-(--primary) transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="mt-4 text-right">
        <span className="text-gray-500 text-xs md:text-sm font-bold">
          {t('application.stepOf', { current: currentStep, total: steps.length })}
        </span>
      </div>
    </div>
  );
}
