import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

type PersonalDataValues = {
  fullName: string;
  age: string;
  maritalStatus: string;
  whatsapp: string;
  education: string;
  finishedStudy: string;
};

interface PersonalDataStepProps {
  defaultValues?: Partial<PersonalDataValues>;
  nextStep: (data: PersonalDataValues) => void;
  prevStep: (data?: PersonalDataValues) => void;
}

export default function PersonalDataStep({ defaultValues, nextStep, prevStep }: PersonalDataStepProps) {
  const { t } = useTranslation();

  const schema = useMemo(() => {
    return z.object({
      fullName: z.string().min(3, { message: t('application.personalQ1Req') }),
      age: z.string().regex(/^\d+$/, { message: t('application.personalQ2Req') }),
      maritalStatus: z.enum([t('application.maritalSingle'), t('application.maritalEngaged'), t('application.maritalMarried'), t('application.maritalWidowed'), t('application.maritalDivorced')], { message: t('application.personalQ3Req') }),
      whatsapp: z.string().regex(/^[0-9+]+$/, { message: t('application.personalQ4Req') }).min(10, { message: t('application.personalQ4Min') }),
      education: z.string().min(3, { message: t('application.personalQ5Req') }),
      finishedStudy: z.enum([t('application.yes'), t('application.no')], { message: t('application.reqOption', { q: t('application.personalQ6') }) }),
    });
  }, [t]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<PersonalDataValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: PersonalDataValues) => {
    nextStep(data);
  };

  const handlePrev = () => {
    prevStep(getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ1')}</label>
          <input 
            type="text" 
            placeholder={t('application.personalQ1Placeholder')}
            {...register("fullName")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent" 
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Age */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ2')}</label>
          <input 
            type="text" 
            placeholder={t('application.personalQ2Placeholder')}
            {...register("age")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent" 
          />
          <p className="text-gray-500 text-xs">{t('application.personalQ2Desc')}</p>
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        {/* Marital Status */}
        <RadioGroup 
          label={t('application.personalQ3')} 
          name="maritalStatus" 
          options={[t('application.maritalSingle'), t('application.maritalEngaged'), t('application.maritalMarried'), t('application.maritalWidowed'), t('application.maritalDivorced')]} 
          register={register} 
          error={errors.maritalStatus?.message} 
        />

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ4')}</label>
          <input 
            type="text" 
            dir="ltr"
            placeholder={t('application.personalQ4Placeholder')}
            {...register("whatsapp")} 
            className="w-full text-right border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent" 
          />
          <p className="text-gray-500 text-xs">{t('application.personalQ4Desc')}</p>
          {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>}
        </div>

        {/* Education */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ5')}</label>
          <input 
            type="text" 
            placeholder={t('application.personalQ5Placeholder')}
            {...register("education")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent" 
          />
          {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
        </div>

        {/* Finished Study */}
        <RadioGroup 
          label={t('application.personalQ6')} 
          name="finishedStudy" 
          options={[t('application.yes'), t('application.no')]} 
          register={register} 
          error={errors.finishedStudy?.message} 
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
