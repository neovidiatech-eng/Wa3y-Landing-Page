import React, { useMemo } from "react";
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
  codeCountry: string;
  whatsappNumber: string;
  age: string;
  gender: 'male' | 'female';
  birthDate: string;
  qualification: string;
  hasPersonalLaptop: 'نعم' | 'لا';
  governorate: string;
  maritalStatus: string;
};

interface PersonalDataStepProps {
  defaultValues?: Partial<PersonalDataValues>;
  nextStep: (data: PersonalDataValues) => void;
}

export default function PersonalDataStep({ defaultValues, nextStep }: PersonalDataStepProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);

  const schema = useMemo(() => {
    return z.object({
      fullName: z.string().min(3, { message: t('application.nameMin', 'يجب أن يكون الاسم 3 أحرف على الأقل') }),
      email: z.string().email({ message: t('application.emailInvalid', 'البريد الإلكتروني غير صالح') }),
      password: z.string().min(6, { message: t('application.passwordMin', 'يجب أن تكون كلمة المرور 6 أحرف على الأقل') }).optional().or(z.literal('')),
      comfirmPassword: z.string().optional().or(z.literal('')),
      codeCountry: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      whatsappNumber: z.string().min(8, { message: t('application.phoneMin', 'رقم الهاتف قصير جداً') }),
      age: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      gender: z.enum(['male', 'female'], { message: t('application.required', 'مطلوب') }),
      birthDate: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      qualification: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      hasPersonalLaptop: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      governorate: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      maritalStatus: z.string().min(1, { message: t('application.required', 'مطلوب') }),
    }).refine((data) => {
      if (data.password && data.password !== data.comfirmPassword) {
        return false;
      }
      return true;
    }, {
      message: t('application.passwordMatch', 'كلمات المرور غير متطابقة'),
      path: ["comfirmPassword"],
    });
  }, [t]);

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDataValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      codeCountry: "+20",
      ...defaultValues,
    },
  });

  const onSubmit = (data: PersonalDataValues) => {
    nextStep(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-fadeIn">
      
      <div className="space-y-6">
        <h3 className="font-bold text-xl text-(--primary) flex items-center gap-2">
          {t('application.personalDataTitle', 'البيانات الشخصية')}
        </h3>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.fullName', 'الاسم ثلاثي')} *</label>
          <input 
            type="text" 
            {...register("fullName")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
            placeholder={t('application.fullNamePlaceholder', 'أدخل اسمك ثلاثي')}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.email', 'البريد الإلكتروني')} *</label>
          <input 
            type="email" 
            {...register("email")} 
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all text-left dir-ltr"
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.password', 'كلمة المرور (اختياري)')}</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                {...register("password")} 
                className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all text-left dir-ltr pr-10"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.comfirmPassword', 'تأكيد كلمة المرور')}</label>
            <input 
              type={showPassword ? "text" : "password"}
              {...register("comfirmPassword")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all text-left dir-ltr"
              placeholder="••••••••"
            />
            {errors.comfirmPassword && <p className="text-red-500 text-sm">{errors.comfirmPassword.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-gray-800">{t('application.whatsapp', 'رقم الواتساب')} *</label>
          <div className="flex" dir="ltr">
            <select 
              {...register("codeCountry")}
              className="border border-gray-200 border-r-0 px-3 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-(--primary) bg-gray-50 text-gray-700 w-24 text-center"
            >
              <option value="+20">+20</option>
              <option value="+966">+966</option>
              <option value="+971">+971</option>
              <option value="+965">+965</option>
              <option value="+212">+212</option>
              <option value="+213">+213</option>
            </select>
            <input 
              type="tel" 
              {...register("whatsappNumber")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
              placeholder="10xxxxxxxxx"
            />
          </div>
          {errors.whatsappNumber && <p className="text-red-500 text-sm text-right">{errors.whatsappNumber.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.age', 'العمر')} *</label>
            <input 
              type="number" 
              {...register("age")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) bg-white transition-all"
              placeholder="25"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.gender', 'الجنس')} *</label>
            <select 
              {...register("gender")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) bg-white transition-all"
            >
              <option value="male">{t('application.male', 'ذكر')}</option>
              <option value="female">{t('application.female', 'أنثى')}</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.birthDate', 'تاريخ الميلاد')} *</label>
            <input 
              type="date" 
              {...register("birthDate")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
            />
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.governorate', 'المحافظة')} *</label>
            <input 
              type="text" 
              {...register("governorate")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) bg-white transition-all"
              placeholder="القاهرة..."
            />
            {errors.governorate && <p className="text-red-500 text-sm">{errors.governorate.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.maritalStatus', 'الحالة الاجتماعية')} *</label>
            <select 
              {...register("maritalStatus")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent bg-white transition-all"
            >
              <option value="">{t('application.select', 'اختر...')}</option>
              <option value="أعزب">أعزب</option>
              <option value="متزوج">متزوج</option>
              <option value="مطلق">مطلق</option>
              <option value="أرمل">أرمل</option>
            </select>
            {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="font-bold text-gray-800">{t('application.qualification', 'المؤهل الدراسي')} *</label>
            <input 
              type="text" 
              {...register("qualification")} 
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary) bg-white transition-all"
              placeholder="بكالوريوس..."
            />
            {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification.message}</p>}
          </div>
        </div>

        <RadioGroup 
          label={t('application.hasPersonalLaptop', 'هل لديك لاب توب شخصي؟') + ' *'} 
          name="hasPersonalLaptop" 
          options={['نعم', 'لا']} 
          register={register} 
          error={errors.hasPersonalLaptop?.message} 
        />

      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
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
            <span className="text-gray-700 font-medium">{opt}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
