import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export type TermsValues = {
  notes?: string;
  agreedToWorkConditions: boolean;
};

interface TermsStepProps {
  defaultValues?: Partial<TermsValues>;
  isSubmitting?: boolean;
  nextStep: (data: TermsValues) => void;
  prevStep: (data?: TermsValues) => void;
}

export default function TermsStep({ defaultValues, isSubmitting, nextStep, prevStep }: TermsStepProps) {
  const { t } = useTranslation();

  const conditions = [
    t('application.cond1', 'العمل يومياً بدون إجازة أسبوعية.'),
    t('application.cond2', 'الالتزام بحضور الحصص التجريبية.'),
    t('application.cond3', 'الالتزام بعدم التوقف عن العمل فجأة بدون إشعار مسبق.'),
    t('application.cond4', 'الموافقة على الراتب المحدد.'),
  ];

  const schema = useMemo(() => {
    return z.object({
      notes: z.string().optional(),
      agreedToWorkConditions: z.boolean().refine(val => val === true, {
        message: t('application.agreeConditionsReq', 'يجب الموافقة على جميع الشروط'),
      }),
    });
  }, [t]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<TermsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
      agreedToWorkConditions: defaultValues?.agreedToWorkConditions || false,
    },
  });

  const onSubmit = (data: TermsValues) => {
    nextStep(data);
  };

  const handlePrev = () => {
    prevStep(getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
      <div className="space-y-6">
        
        <h3 className="font-bold text-xl text-(--primary) flex items-center gap-2">
          {t('application.questionsAndTermsTitle', 'شروط العمل والملاحظات')}
        </h3>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm mt-6">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            {t('application.conditionsTitle', 'شروط الانضمام')}
          </h4>
          <ul className="space-y-3 mb-6">
            {conditions.map((condition, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-(--primary) mt-1 shrink-0">•</span>
                <span className="text-gray-700 font-medium leading-relaxed">{condition}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                <input 
                  type="checkbox" 
                  {...register("agreedToWorkConditions")} 
                  className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-md checked:bg-(--primary) checked:border-(--primary) transition-all focus:ring-2 focus:ring-(--primary) focus:ring-offset-2"
                />
                <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-bold text-gray-800 group-hover:text-(--primary) transition-colors">
                {t('application.agreedToWorkConditions', 'أقر بموافقتي على جميع الشروط المذكورة أعلاه')}
              </span>
            </label>
            {errors.agreedToWorkConditions && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1 font-medium">
                {errors.agreedToWorkConditions.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.notesTitle', 'ملاحظات إضافية (اختياري)')}</label>
          <textarea 
            {...register("notes")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all min-h-[100px]"
            placeholder={t('application.notesPlaceholder', 'أي معلومات إضافية تود إضافتها...')}
          />
        </div>

      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button 
          type="button" 
          onClick={handlePrev}
          disabled={isSubmitting}
          className="border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50"
        >
          {t('application.prevBtn', 'السابق')}
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-(--primary) hover:bg-(--secondary) text-white font-bold py-3 px-10 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('application.submitting', 'جاري الإرسال...')}</span>
            </>
          ) : (
            <span>{t('application.submitBtn', 'تقديم الطلب')}</span>
          )}
        </button>
      </div>
    </form>
  );
}

function RadioGroup({ label, name, options, register, error }: { label: string, name: string, options: string[], register: any, error?: string }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-bold text-gray-800">{label}</p>
      <div className="flex flex-wrap gap-4 md:gap-6">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <input type="radio" value={opt} {...register(name)} className="w-5 h-5 accent-(--primary)" />
            <span className="text-gray-700 font-medium">{t(`application.${opt === 'نعم' ? 'yes' : 'no'}`, opt)}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
