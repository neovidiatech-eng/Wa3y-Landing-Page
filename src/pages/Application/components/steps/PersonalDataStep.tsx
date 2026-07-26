import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

export type PersonalDataValues = {
  fullName: string;
  email: string;
  password?: string;
  comfirmPassword?: string;
  codeCountry?: string;
  phone: string;
  gender?: string;
  country?: string;
  nationality?: string;
  timezone?: string;
  city?: string;
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

const COUNTRY_CODES = [
  { code: "+20", label: "مصر (+20)" },
  { code: "+966", label: "السعودية (+966)" },
  { code: "+971", label: "الإمارات (+971)" },
  { code: "+965", label: "الكويت (+965)" },
  { code: "+974", label: "قطر (+974)" },
  { code: "+968", label: "عُمان (+968)" },
  { code: "+962", label: "الأردن (+962)" },
  { code: "+961", label: "لبنان (+961)" },
  { code: "+212", label: "المغرب (+212)" },
  { code: "+213", label: "الجزائر (+213)" },
  { code: "+216", label: "تونس (+216)" },
  { code: "+249", label: "السودان (+249)" },
  { code: "+90", label: "تركيا (+90)" },
  { code: "+1", label: "أمريكا / كندا (+1)" },
  { code: "+44", label: "المملكة المتحدة (+44)" },
];

export default function PersonalDataStep({ defaultValues, nextStep, prevStep }: PersonalDataStepProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = useMemo(() => {
    return z.object({
      fullName: z.string().min(3, { message: t('application.personalQ1Req') }),
      email: z.string().email({ message: t('application.emailReq', { defaultValue: 'يرجى إدخال بريد إلكتروني صحيح' }) }),
      password: z.string().optional(),
      comfirmPassword: z.string().optional(),
      codeCountry: z.string().optional().default("+20"),
      phone: z.string().min(6, { message: t('application.personalQ4Req') }),
      gender: z.string().optional().default("male"),
      country: z.string().optional().default("Egypt"),
      nationality: z.string().optional().default("Egyptian"),
      city: z.string().optional().default("Cairo"),
      age: z.string().regex(/^\d+$/, { message: t('application.personalQ2Req') }),
      maritalStatus: z.enum([
        t('application.maritalSingle'), 
        t('application.maritalEngaged'), 
        t('application.maritalMarried'), 
        t('application.maritalWidowed'), 
        t('application.maritalDivorced')
      ], { message: t('application.personalQ3Req') }),
      whatsapp: z.string().regex(/^[0-9+]+$/, { message: t('application.personalQ4Req') }).min(10, { message: t('application.personalQ4Min') }),
      education: z.string().min(3, { message: t('application.personalQ5Req') }),
      finishedStudy: z.enum([t('application.yes'), t('application.no')], { message: t('application.reqOption', { q: t('application.personalQ6') }) }),
      timezone: z.string().optional(),
    }).refine((data) => !data.password || !data.comfirmPassword || data.password === data.comfirmPassword, {
      message: t('application.confirmPasswordMatch', { defaultValue: 'تأكيد كلمة المرور يجب أن يطابق كلمة المرور' }),
      path: ['comfirmPassword'],
    });
  }, [t]);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<PersonalDataValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      codeCountry: "+20",
      gender: "male",
      country: "Egypt",
      nationality: "Egyptian",
      city: "Cairo",
      ...defaultValues,
    },
  });

  const onSubmit = (data: PersonalDataValues) => {
    // Auto-detect timezone
    data.timezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Africa/Cairo";

    // Ensure phone/whatsapp sync if needed
    if (!data.phone && data.whatsapp) {
      data.phone = data.whatsapp;
    }
    if (!data.comfirmPassword && data.password) {
      data.comfirmPassword = data.password;
    }
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
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.emailLabel', 'البريد الإلكتروني')}</label>
          <input 
            type="email" 
            dir="ltr"
            placeholder={t('application.emailPlaceholder', 'example@domain.com')}
            {...register("email")} 
            className="w-full text-right border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password & Confirm Password (Identical layout with show/hide toggle) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.passwordLabel', 'كلمة المرور')}</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                dir="ltr"
                placeholder={t('application.passwordPlaceholder', '••••••••')}
                {...register("password")} 
                className="w-full text-right border border-gray-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 transition-colors"
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.confirmPasswordLabel', 'تأكيد كلمة المرور')}</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                dir="ltr"
                placeholder={t('application.passwordPlaceholder', '••••••••')}
                {...register("comfirmPassword")} 
                className="w-full text-right border border-gray-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 transition-colors"
                tabIndex={-1}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.comfirmPassword && <p className="text-red-500 text-sm">{errors.comfirmPassword.message}</p>}
          </div>
        </div>

        {/* Country Code & Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 col-span-1">
            <label className="font-bold text-gray-800">{t('application.codeCountry', 'كود الدولة')}</label>
            <select 
              dir="ltr"
              {...register("codeCountry")} 
              className="w-full text-center border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white font-mono transition-all" 
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="font-bold text-gray-800">{t('application.phoneLabel', 'رقم الهاتف')}</label>
            <input 
              type="text" 
              dir="ltr"
              placeholder="1001234567"
              {...register("phone")} 
              className="w-full text-right border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ4')}</label>
          <input 
            type="text" 
            dir="ltr"
            placeholder={t('application.personalQ4Placeholder')}
            {...register("whatsapp")} 
            className="w-full text-right border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
          />
          <p className="text-gray-500 text-xs">{t('application.personalQ4Desc')}</p>
          {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>}
        </div>

        {/* Gender, Country, City */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.genderLabel', 'الجنس')}</label>
            <select 
              {...register("gender")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
            >
              <option value="male">{t('application.genderMale', 'ذكر')}</option>
              <option value="female">{t('application.genderFemale', 'أنثى')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.countryLabel', 'الدولة')}</label>
            <input 
              type="text" 
              placeholder="Egypt"
              {...register("country")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.cityLabel', 'المدينة')}</label>
            <input 
              type="text" 
              placeholder="Cairo"
              {...register("city")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
            />
          </div>
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.nationalityLabel', 'الجنسية')}</label>
          <input 
            type="text" 
            placeholder="Egyptian"
            {...register("nationality")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
          />
        </div>

        {/* Age */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ2')}</label>
          <input 
            type="text" 
            placeholder={t('application.personalQ2Placeholder')}
            {...register("age")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
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

        {/* Education */}
        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.personalQ5')}</label>
          <input 
            type="text" 
            placeholder={t('application.personalQ5Placeholder')}
            {...register("education")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition-all" 
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
