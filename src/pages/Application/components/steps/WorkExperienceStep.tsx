import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

type WorkExperienceValues = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
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
      q1: z.string().min(5, { message: t('application.workQ1Req') }),
      q2: z.string().min(5, { message: t('application.workQ2Req') }),
      q3: z.string().min(5, { message: t('application.workQ3Req') }),
      q4: z.enum([t('application.agree'), t('application.disagree')], { message: t('application.reqOption', { q: t('application.workQ4') }) }),
      q5: z.enum([t('application.netWifi'), t('application.netData'), t('application.netBoth')], { message: t('application.reqOption', { q: t('application.workQ5') }) }),
    });
  }, [t]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<WorkExperienceValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: WorkExperienceValues) => {
    nextStep(data);
  };

  const handlePrev = () => {
    prevStep(getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        
        {/* Q1 */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.workQ1')}</label>
          <textarea 
            rows={4}
            placeholder={t('application.workQ1Placeholder')}
            {...register("q1")} 
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent resize-y" 
          />
          <p className="text-gray-500 text-xs">{t('application.workQ1Desc')}</p>
          {errors.q1 && <p className="text-red-500 text-sm">{errors.q1.message}</p>}
        </div>

        {/* Q2 */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.workQ2')}</label>
          <textarea 
            rows={3}
            {...register("q2")} 
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent resize-y" 
          />
          {errors.q2 && <p className="text-red-500 text-sm">{errors.q2.message}</p>}
        </div>

        {/* Q3 */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.workQ3')}</label>
          <textarea 
            rows={3}
            {...register("q3")} 
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent resize-y" 
          />
          {errors.q3 && <p className="text-red-500 text-sm">{errors.q3.message}</p>}
        </div>

        {/* Q4 */}
        <RadioGroup 
          label={t('application.workQ4')} 
          name="q4" 
          options={[t('application.agree'), t('application.disagree')]} 
          register={register} 
          error={errors.q4?.message} 
        />

        {/* Q5 */}
        <RadioGroup 
          label={t('application.workQ5')} 
          name="q5" 
          options={[t('application.netWifi'), t('application.netData'), t('application.netBoth')]} 
          register={register} 
          error={errors.q5?.message} 
        />
        
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button 
          type="button" 
          onClick={handlePrev}
          className="border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl transition-colors"
        >
          {t('application.prevBtn')}
        </button>
        <button 
          type="submit" 
          className="bg-(--primary) hover:bg-(--secondary) text-white font-bold py-3 px-10 rounded-xl transition-colors"
        >
          {t('application.nextBtn')}
        </button>
      </div>
    </form>
  );
}

function RadioGroup({ label, name, options, register, error }: { label: string, name: string, options: string[], register: any, error?: string }) {
  return (
    <div className="space-y-3">
      <p className="font-bold text-gray-800">{label}</p>
      <div className="flex flex-wrap gap-4 md:gap-6">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            <input type="radio" value={opt} {...register(name)} className="w-5 h-5 accent-(--primary)" />
            <span className="text-gray-700 font-medium">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
