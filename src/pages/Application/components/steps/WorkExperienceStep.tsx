import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

export type WorkExperienceValues = {
  hasCurrentJob: 'نعم' | 'لا';
  hasFreeTimeFrom3To8: 'نعم' | 'لا';
  dailyFreeTimeHours: string;
  niqabDuringSession: 'نعم' | 'لا';
};

interface WorkExperienceStepProps {
  defaultValues?: Partial<WorkExperienceValues>;
  nextStep: (data: WorkExperienceValues) => void;
  prevStep: (data?: WorkExperienceValues) => void;
}

export default function WorkExperienceStep({ defaultValues, nextStep, prevStep }: WorkExperienceStepProps) {
  const { t } = useTranslation();

  const schema = useMemo(() => {
    return z.object({
      hasCurrentJob: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      hasFreeTimeFrom3To8: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      dailyFreeTimeHours: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      niqabDuringSession: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
    });
  }, [t]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<WorkExperienceValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = (data: WorkExperienceValues) => {
    nextStep(data);
  };

  const handlePrev = () => {
    prevStep(getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
      <div className="space-y-6">
        
        <h3 className="font-bold text-xl text-(--primary) flex items-center gap-2">
          {t('application.timeAvailabilityTitle', 'الوقت والتفرغ')}
        </h3>

        <RadioGroup 
          label={t('application.hasCurrentJob', 'هل لديك عمل حالي؟') + ' *'} 
          name="hasCurrentJob" 
          options={['نعم', 'لا']} 
          register={register} 
          error={errors.hasCurrentJob?.message} 
        />

        <RadioGroup 
          label={t('application.hasFreeTimeFrom3To8', 'هل لديك وقت فراغ من الساعة 3 مساءاً إلى الساعة 8 مساءاً؟') + ' *'} 
          name="hasFreeTimeFrom3To8" 
          options={['نعم', 'لا']} 
          register={register} 
          error={errors.hasFreeTimeFrom3To8?.message} 
        />

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.dailyFreeTimeHours', 'كم ساعة متاحة لديك كوقت فراغ (يومياً)؟')} *</label>
          <select 
            {...register("dailyFreeTimeHours")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
          >
            <option value="">{t('application.select', 'اختر...')}</option>
            <option value="1-2 ساعات">1-2 ساعات</option>
            <option value="3-4 ساعات">3-4 ساعات</option>
            <option value="5-6 ساعات">5-6 ساعات</option>
            <option value="أكثر من 6 ساعات">أكثر من 6 ساعات</option>
          </select>
          {errors.dailyFreeTimeHours && <p className="text-red-500 text-sm">{errors.dailyFreeTimeHours.message}</p>}
        </div>

        <RadioGroup 
          label={t('application.niqabDuringSession', 'هل تمانعي رفع النقاب أثناء الحلقة؟') + ' *'} 
          name="niqabDuringSession" 
          options={['نعم', 'لا']} 
          register={register} 
          error={errors.niqabDuringSession?.message} 
        />
        
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button 
          type="button" 
          onClick={handlePrev}
          className="border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl transition-colors"
        >
          {t('application.prevBtn', 'السابق')}
        </button>
        <button 
          type="submit" 
          className="bg-(--primary) hover:bg-(--secondary) text-white font-bold py-3 px-10 rounded-xl transition-colors"
        >
          {t('application.nextBtn', 'التالي')}
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
