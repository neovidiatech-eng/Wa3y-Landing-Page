import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type TermsFormValues = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
};

interface TermsStepProps {
  defaultValues?: Partial<TermsFormValues>;
  nextStep: (data: TermsFormValues) => void;
}

export default function TermsStep({ defaultValues, nextStep }: TermsStepProps) {
  const { t } = useTranslation();

  const conditions = t('application.conditions', { returnObjects: true }) as string[];

  const schema = useMemo(() => {
    return z.object({
      q1: z.enum([t('application.agree'), t('application.disagree')], { message: t('application.reqOption', { q: t('application.termsQ1') }) }),
      q2: z.enum([t('application.agree'), t('application.disagree')], { message: t('application.reqOption', { q: t('application.termsQ2') }) }),
      q3: z.enum([t('application.agree'), t('application.disagree')], { message: t('application.reqOption', { q: t('application.termsQ3') }) }),
      q4: z.enum([t('application.shift1'), t('application.shift2')], { message: t('application.reqOption', { q: t('application.termsQ4') }) }),
      q5: z.enum([t('application.fullTime'), t('application.cannot')], { message: t('application.reqOption', { q: t('application.termsQ5') }) }),
      q6: z.enum([t('application.yes'), t('application.no')], { message: t('application.reqOption', { q: t('application.termsQ6') }) }),
      q7: z.enum([t('application.agree')], { message: t('application.reqOption', { q: t('application.termsQ7Title') }) }),
    });
  }, [t]);

  const { register, handleSubmit, formState: { errors } } = useForm<TermsFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: TermsFormValues) => {
    nextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Conditions Box */}
      <div className="border border-green-200 bg-green-50/30 rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t('application.mainConditionsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {conditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="text-(--primary) w-5 h-5 shrink-0" strokeWidth={2} />
              <span className="text-gray-700 font-medium">{condition}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <RadioGroup 
          label={t('application.termsQ1')} 
          name="q1" 
          options={[t('application.agree'), t('application.disagree')]} 
          register={register} 
          error={errors.q1?.message} 
        />
        <RadioGroup 
          label={t('application.termsQ2')} 
          name="q2" 
          options={[t('application.agree'), t('application.disagree')]} 
          register={register} 
          error={errors.q2?.message} 
        />
        <RadioGroup 
          label={t('application.termsQ3')} 
          name="q3" 
          options={[t('application.agree'), t('application.disagree')]} 
          register={register} 
          error={errors.q3?.message} 
        />
        <RadioGroup 
          label={t('application.termsQ4')} 
          name="q4" 
          options={[t('application.shift1'), t('application.shift2')]} 
          register={register} 
          error={errors.q4?.message} 
        />
        <RadioGroup 
          label={t('application.termsQ5')} 
          name="q5" 
          options={[t('application.fullTime'), t('application.cannot')]} 
          register={register} 
          error={errors.q5?.message} 
        />
        <RadioGroup 
          label={t('application.termsQ6')} 
          name="q6" 
          options={[t('application.yes'), t('application.no')]} 
          register={register} 
          error={errors.q6?.message} 
        />
        
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-4">
          <p className="font-bold text-gray-800">{t('application.termsQ7Title')}</p>
          <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: t('application.termsQ7Desc') }}></p>
          <div className="flex items-center gap-2 mt-4">
            <input type="radio" id="q7-agree" value={t('application.agree')} {...register("q7")} className="w-5 h-5 accent-(--primary)" />
            <label htmlFor="q7-agree" className="text-gray-800 font-medium cursor-pointer">{t('application.termsQ7Label')}</label>
          </div>
          {errors.q7 && <p className="text-red-500 text-sm">{errors.q7.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" className="bg-(--primary) hover:bg-(--secondary) text-white font-bold py-3 px-10 rounded-xl transition-colors">
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer border border-gray-200 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors w-full md:w-auto">
            <input type="radio" value={opt} {...register(name)} className="w-5 h-5 accent-(--primary)" />
            <span className="text-gray-700 font-medium">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
