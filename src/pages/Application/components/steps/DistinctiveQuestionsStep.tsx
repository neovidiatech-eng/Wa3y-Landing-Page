import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

export type DistinctiveQuestionsValues = {
  onlineTeachingExperience: string;
  memorizesEntireQuran: 'نعم' | 'لا';
  practicalTajweedLevel: string;
  theoreticalTajweedLevel: string;
  otherLanguages: string;
  howDidYouHearAboutUs: string;
};

interface DistinctiveQuestionsStepProps {
  defaultValues?: Partial<DistinctiveQuestionsValues>;
  nextStep: (data: DistinctiveQuestionsValues) => void;
  prevStep: (data?: DistinctiveQuestionsValues) => void;
}

export default function DistinctiveQuestionsStep({ defaultValues, nextStep, prevStep }: DistinctiveQuestionsStepProps) {
  const { t } = useTranslation();

  const schema = useMemo(() => {
    return z.object({
      onlineTeachingExperience: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      memorizesEntireQuran: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      practicalTajweedLevel: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      theoreticalTajweedLevel: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      otherLanguages: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      howDidYouHearAboutUs: z.string().min(1, { message: t('application.required', 'مطلوب') }),
    });
  }, [t]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<DistinctiveQuestionsValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: DistinctiveQuestionsValues) => {
    nextStep(data);
  };

  const handlePrev = () => {
    prevStep(getValues());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
      <div className="space-y-6">
        
        <h3 className="font-bold text-xl text-(--primary) flex items-center gap-2">
          {t('application.quranTajweedTitle', 'القرآن الكريم والتجويد')}
        </h3>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.onlineTeachingExperience', 'عدد سنوات الخبرة في التعليم عبر الإنترنت (أون لاين)')} *</label>
          <select 
            {...register("onlineTeachingExperience")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
          >
            <option value="">{t('application.select', 'اختر...')}</option>
            <option value="بدون خبرة">بدون خبرة</option>
            <option value="أقل من سنة">أقل من سنة</option>
            <option value="1-3 سنوات">1-3 سنوات</option>
            <option value="أكثر من 3 سنوات">أكثر من 3 سنوات</option>
          </select>
          {errors.onlineTeachingExperience && <p className="text-red-500 text-sm">{errors.onlineTeachingExperience.message}</p>}
        </div>

        <RadioGroup 
          label={t('application.memorizesEntireQuran', 'هل تحفظ القرآن كاملاً؟') + ' *'} 
          name="memorizesEntireQuran" 
          options={['نعم', 'لا']} 
          register={register} 
          error={errors.memorizesEntireQuran?.message} 
        />

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.practicalTajweedLevel', 'درجة إتقانك للتجويد عملياً (تلاوة وقراءة)؟')} *</label>
          <select 
            {...register("practicalTajweedLevel")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
          >
            <option value="">{t('application.select', 'اختر...')}</option>
            <option value="ممتاز">ممتاز</option>
            <option value="جيد جداً">جيد جداً</option>
            <option value="جيد">جيد</option>
            <option value="مقبول">مقبول</option>
          </select>
          {errors.practicalTajweedLevel && <p className="text-red-500 text-sm">{errors.practicalTajweedLevel.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.theoreticalTajweedLevel', 'درجة إتقانك للتجويد نظرياً (حفظ وشرح القواعد)؟')} *</label>
          <select 
            {...register("theoreticalTajweedLevel")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
          >
            <option value="">{t('application.select', 'اختر...')}</option>
            <option value="ممتاز">ممتاز</option>
            <option value="جيد جداً">جيد جداً</option>
            <option value="جيد">جيد</option>
            <option value="مقبول">مقبول</option>
          </select>
          {errors.theoreticalTajweedLevel && <p className="text-red-500 text-sm">{errors.theoreticalTajweedLevel.message}</p>}
        </div>

        <div className="h-px bg-gray-200 my-4"></div>
        <h3 className="font-bold text-xl text-(--primary) flex items-center gap-2">
          {t('application.additionalInfoTitle', 'معلومات إضافية')}
        </h3>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.otherLanguages', 'هل لديك لغات أخرى')} *</label>
          <select 
            {...register("otherLanguages")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
          >
            <option value="">{t('application.select', 'اختر...')}</option>
            <option value="لا يوجد">لا يوجد</option>
            <option value="الإنجليزية">الإنجليزية</option>
            <option value="الفرنسية">الفرنسية</option>
            <option value="لغات أخرى">لغات أخرى</option>
          </select>
          {errors.otherLanguages && <p className="text-red-500 text-sm">{errors.otherLanguages.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.howDidYouHearAboutUs', 'كيف سمعت عنا؟')} *</label>
          <input 
            type="text" 
            {...register("howDidYouHearAboutUs")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
            placeholder="فيسبوك، صديق، إلخ..."
          />
          {errors.howDidYouHearAboutUs && <p className="text-red-500 text-sm">{errors.howDidYouHearAboutUs.message}</p>}
        </div>

      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button type="button" onClick={handlePrev} className="border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl transition-colors">
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
