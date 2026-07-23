import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

type DistinctiveQuestionsValues = {
  q1: string;
  q2: string;
  q3: string;
  agree: boolean;
};

interface DistinctiveQuestionsStepProps {
  defaultValues?: Partial<DistinctiveQuestionsValues>;
  nextStep: (data: DistinctiveQuestionsValues) => void;
  prevStep: (data?: DistinctiveQuestionsValues) => void;
  isSubmitting?: boolean;
}

export default function DistinctiveQuestionsStep({ defaultValues, nextStep, prevStep, isSubmitting }: DistinctiveQuestionsStepProps) {
  const { t } = useTranslation();


  const schema = useMemo(() => {
    return z.object({
      q1: z.string().min(5, { message: t('application.distQ1Desc') }),
      q2: z.string().min(5, { message: t('application.distQ2Desc') }),
      q3: z.string().min(5, { message: t('application.distQ3Desc') }),
      agree: z.boolean().refine(val => val === true, {
        message: t('application.policyReq'),
      }),
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        
        {/* Q1 */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.distQ1')}</label>
          <textarea 
            rows={3}
            placeholder={t('application.distQ1Placeholder')}
            {...register("q1")} 
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent resize-y" 
          />
          <p className="text-gray-500 text-xs">{t('application.distQ1Desc')}</p>
          {errors.q1 && <p className="text-red-500 text-sm">{errors.q1.message}</p>}
        </div>

        {/* Q2 */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.distQ2')}</label>
          <textarea 
            rows={3}
            placeholder={t('application.distQ2Placeholder')}
            {...register("q2")} 
            className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent resize-y" 
          />
          <p className="text-gray-500 text-xs">{t('application.distQ2Desc')}</p>
          {errors.q2 && <p className="text-red-500 text-sm">{errors.q2.message}</p>}
        </div>

        {/* Q3 */}
        <div className="border border-blue-200 bg-blue-50/30 rounded-2xl p-6">
          <div className="space-y-2">
            <label className="font-bold text-blue-900 block mb-2 text-lg">
              {t('application.distQ3')}
            </label>
            <p className="text-blue-800 font-bold text-sm">{t('application.distQ3Note1')}</p>
            <p className="text-blue-600 text-xs mb-4">{t('application.distQ3Note2')}</p>
            <textarea 
              rows={5}
              placeholder={t('application.distQ3Placeholder')}
              {...register("q3")} 
              className="w-full bg-white border border-blue-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-y border-dashed" 
            />
            <p className="text-blue-500 text-xs">{t('application.distQ3Desc')}</p>
            {errors.q3 && <p className="text-red-500 text-sm">{errors.q3.message}</p>}
          </div>
        </div>

        {/* Policy & Agreement */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl space-y-4">
          <p className="font-bold text-gray-800">{t('application.policyTitle')}</p>
          <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: t('application.policyDesc') }}></p>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            <input 
              type="checkbox" 
              id="agree" 
              {...register("agree")} 
              className="w-5 h-5 accent-(--primary) rounded text-(--primary) focus:ring-(--primary)" 
            />
            <label htmlFor="agree" className="text-gray-800 font-bold cursor-pointer">
              {t('application.policyCheck')}
            </label>
          </div>
          {errors.agree && <p className="text-red-500 text-sm">{errors.agree.message}</p>}
        </div>
        
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button type="button" onClick={() => prevStep(getValues())} className="px-6 py-2 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors">
          {t('application.prevBtn')}
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-(--primary) hover:bg-(--secondary) text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>...</span>
          ) : (
            <>
              <span>{t('application.submitBtn')}</span>
              <Check className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
