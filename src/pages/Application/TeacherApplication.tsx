import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useApplication, useVerifyAccount } from "../../hooks/useApplication";
import { ApplicationPayload } from "../../types";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { parseApiError, ApiErrorDetail } from "../../utils/apiError";
import OtpInput from "./components/OtpInput";

// ---- Sub-components defined OUTSIDE to prevent remount on every render ----

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-md border-t-8 border-teal-700 p-6 mb-8 transition-all hover:shadow-lg">
    <h2 className="text-2xl font-bold text-teal-800 mb-6">{title}</h2>
    <div className="space-y-6">{children}</div>
  </div>
);

const InputField = ({
  label, id, type = "text", placeholder = "", required = true, error, ...props
}: any) => (
  <div>
    <label htmlFor={id} className="block font-semibold text-gray-800 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full border-b-2 border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 outline-none focus:border-teal-600 transition-colors rounded-t-md"
      {...props}
    />
    {error && (
      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{error.message}</span>
      </div>
    )}
  </div>
);

const SelectField = ({
  label, id, required = true, options, error, selectLabel = "اختر...", ...props
}: any) => (
  <div>
    <label htmlFor={id} className="block font-semibold text-gray-800 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      className="w-full border-b-2 border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 outline-none focus:border-teal-600 transition-colors rounded-t-md"
      {...props}
    >
      <option value="">{selectLabel}</option>
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && (
      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{error.message}</span>
      </div>
    )}
  </div>
);

const RadioField = ({
  label, required = true, options, error, registerFn, name
}: any) => (
  <div>
    <label className="block font-semibold text-gray-800 mb-3">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="space-y-3">
      {options.map((opt: any) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-100 rounded-lg hover:bg-slate-50 transition-colors">
          <input
            type="radio"
            value={opt.value}
            {...registerFn(name)}
            className="w-5 h-5 text-teal-600 focus:ring-teal-500"
          />
          <span className="text-gray-700 font-medium">{opt.label}</span>
        </label>
      ))}
    </div>
    {error && (
      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
        <AlertCircle className="w-4 h-4" />
        <span>{error.message}</span>
      </div>
    )}
  </div>
);

// ---------------------------------------------------------------------------

export default function TeacherApplication() {
  const { t } = useTranslation();
  const { mutate: submitApplication, isPending } = useApplication();
  const { mutate: handleVerifyAccount, isPending: isVerifying } = useVerifyAccount();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<ApiErrorDetail | null>(null);
  
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<ApiErrorDetail | null>(null);

  const schema = useMemo(() => {
    return z.object({
      fullName: z.string().min(3, { message: t('application.nameMin', 'يجب أن يكون الاسم 3 أحرف على الأقل') }),
      email: z.string().email({ message: t('application.emailInvalid', 'البريد الإلكتروني غير صالح') }),
      password: z.string().min(6, { message: t('application.passwordMin', 'يجب أن تكون كلمة المرور 6 أحرف على الأقل') }),
      comfirmPassword: z.string().min(6, { message: t('application.required', 'مطلوب') }),
      whatsappNumber: z.string().min(8, { message: t('application.phoneMin', 'رقم الهاتف قصير جداً') }),
      age: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      birthDate: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      gender: z.enum(['male', 'female'], { message: t('application.required', 'مطلوب') }),
      governorate: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      maritalStatus: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      qualification: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      hasPersonalLaptop: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      hasCurrentJob: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      hasFreeTimeFrom3To8: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      dailyFreeTimeHours: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      niqabDuringSession: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      onlineTeachingExperience: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      memorizesEntireQuran: z.enum(['نعم', 'لا'], { message: t('application.required', 'مطلوب') }),
      practicalTajweedLevel: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      theoreticalTajweedLevel: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      otherLanguages: z.string().optional(),
      howDidYouHearAboutUs: z.string().min(1, { message: t('application.required', 'مطلوب') }),
      agreedToWorkConditions: z.boolean().refine((val) => val === true, {
        message: t('application.agreeConditionsReq', 'يجب الموافقة على جميع الشروط'),
      }),
      notes: z.string().optional(),
    }).refine((data) => data.password === data.comfirmPassword, {
      message: t('application.passwordMatch', 'كلمات المرور غير متطابقة'),
      path: ['comfirmPassword'],
    });
  }, [t]);

  type FormValues = z.infer<typeof schema>;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: 'female',
      hasPersonalLaptop: 'نعم',
      hasCurrentJob: 'لا',
      hasFreeTimeFrom3To8: 'نعم',
      niqabDuringSession: 'لا',
      memorizesEntireQuran: 'نعم',
      agreedToWorkConditions: false,
    }
  });

  const onSubmit = (data: FormValues) => {
    setSubmitError(null);
    setSubmittedEmail(data.email);

    const payload: ApplicationPayload = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      comfirmPassword: data.comfirmPassword,
      codeCountry: "+20",
      phone: data.whatsappNumber,
      gender: data.gender,
      country: "Egypt",
      nationality: "Egyptian",
      timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Africa/Cairo",
      city: "Cairo",
      age: parseInt(data.age) || 0,
      notes: data.notes || "",
      additionalData: {
        whatsappNumber: data.whatsappNumber,
        // birthDate: data.birthDate,
        qualification: data.qualification,
        hasPersonalLaptop: data.hasPersonalLaptop === "نعم",
        governorate: data.governorate,
        maritalStatus: data.maritalStatus,
        hasCurrentJob: data.hasCurrentJob === "نعم",
        hasFreeTimeFrom3To8: data.hasFreeTimeFrom3To8 === "نعم",
        dailyFreeTimeHours: data.dailyFreeTimeHours,
        niqabDuringSession: data.niqabDuringSession === "نعم",
        onlineTeachingExperience: data.onlineTeachingExperience,
        memorizesEntireQuran: data.memorizesEntireQuran === "نعم" ? "yes" : "no",
        howDidYouHearAboutUs: data.howDidYouHearAboutUs,
        practicalTajweedLevel: data.practicalTajweedLevel,
        theoreticalTajweedLevel: data.theoreticalTajweedLevel,
        otherLanguages: data.otherLanguages || "",
        agreedToWorkConditions: data.agreedToWorkConditions,
      },
    };

    submitApplication(payload, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (err: any) => {
        const parsed = parseApiError(err, t('application.errorDefault', 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.'));
        setSubmitError(parsed);
      }
    });
  };

  const onVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;
    setVerifyError(null);

    handleVerifyAccount(
      { email: submittedEmail, otp: otpCode.trim() },
      {
        onSuccess: () => {
          setIsAccountVerified(true);
          setVerifyError(null);
        },
        onError: (err: any) => {
          const parsed = parseApiError(
            err,
            t('application.otpError', 'رمز التحقق غير صحيح أو انتهت صلاحيته. يرجى إعادة المحاولة.')
          );
          setVerifyError(parsed);
        }
      }
    );
  };

  const formValues = watch();
  
  // Calculate Progress
  const requiredFields = [
    formValues.fullName,
    formValues.email,
    formValues.whatsappNumber,
    formValues.age,
    formValues.gender,
    formValues.qualification,
    formValues.hasPersonalLaptop,
    formValues.hasCurrentJob,
    formValues.hasFreeTimeFrom3To8,
    formValues.dailyFreeTimeHours,
    formValues.memorizesEntireQuran,
    formValues.practicalTajweedLevel,
    formValues.theoreticalTajweedLevel,
    formValues.onlineTeachingExperience,
    formValues.howDidYouHearAboutUs,
    formValues.agreedToWorkConditions === true ? true : false
  ];
  
  const filledFieldsCount = requiredFields.filter(field => {
    if (typeof field === 'string') return field.trim().length > 0;
    if (typeof field === 'boolean') return field;
    return false;
  }).length;
  
  const defaultFilledFields = 5; // gender, hasPersonalLaptop, hasCurrentJob, hasFreeTimeFrom3To8, memorizesEntireQuran
  const progressPercentage = Math.round((Math.max(0, filledFieldsCount - defaultFilledFields) / (requiredFields.length - defaultFilledFields)) * 100);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 flex justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl p-8 md:p-14 shadow-xl text-center border-t-8 border-green-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-14 h-14" strokeWidth={2.5} />
          </div>

          {isAccountVerified ? (
            <>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                {t('application.verifiedSuccessTitle', 'تم تفعيل حسابك بنجاح!')}
              </h2>
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-10">
                {t('application.verifiedSuccessDesc', 'تم تأكيد حسابك وإرسال طلبك رسمياً. سيتم التواصل معك قريباً.')}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setIsAccountVerified(false);
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all shadow-md text-lg"
              >
                {t('application.newAppBtn', 'طلب جديد')}
              </button>
            </>
          ) : (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t('application.otpNoticeTitle', 'تأكيد الحساب عبر رمز (OTP)')}
              </h3>
              <p className="text-gray-600 mb-8 font-medium leading-relaxed">
                {t('application.otpNoticeDesc', 'يرجى التحقق من رمز التأكيد المرسل لبريدك الإلكتروني لتأكيد تفعيل الحساب.')}
              </p>
              
              <form onSubmit={onVerifySubmit} className="space-y-8">
                <div className="flex flex-col items-center">
                  <label className="text-gray-700 font-bold mb-4 text-lg">
                    {t('application.otpInputLabel', 'أدخل رمز التحقق')}
                  </label>
                  <div dir="ltr">
                    <OtpInput value={otpCode} onChange={setOtpCode} />
                  </div>
                  {verifyError && (
                    <div className="flex items-center gap-2 mt-4 text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span className="font-medium text-sm">{verifyError.message}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || otpCode.length < 4}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-md text-lg flex justify-center items-center gap-2"
                >
                  {isVerifying ? (
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    t('application.verifyBtn', 'تأكيد الحساب الآن')
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  const yesNoOptions = [
    { label: t('application.yes', 'نعم'), value: 'نعم' },
    { label: t('application.no', 'لا'), value: 'لا' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        
        {/* Form Header */}
        <div className="bg-white rounded-xl shadow-md border-t-8 border-teal-700 p-8 mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-800 mb-6">
            {t('application.heroTitle', 'نموذج تقديم المعلمين')}
          </h1>

          {/* Progress Bar */}
          <div className="max-w-xl mx-auto mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-bold text-sm">نسبة إكمال النموذج</span>
              <span className="text-teal-700 font-extrabold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-teal-600 h-3 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3 shadow-sm">
            <AlertCircle className="text-red-500 w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-1">{submitError.message}</h3>
              {submitError.errors && (
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1 mt-2">
                  {submitError.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <SectionCard title={t('application.personalDataTitle', 'البيانات الشخصية')}>
            <InputField 
              label={t('application.fullName', 'الاسم ثلاثي')}
              id="fullName"
              placeholder={t('application.fullNamePlaceholder', 'أدخل اسمك ثلاثي')}
              error={errors.fullName}
              {...register('fullName')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label={t('application.email', 'البريد الإلكتروني')}
                id="email"
                type="email"
                error={errors.email}
                {...register('email')}
              />
              <InputField 
                label={t('application.whatsapp', 'رقم الواتساب')}
                id="whatsappNumber"
                type="tel"
                error={errors.whatsappNumber}
                {...register('whatsappNumber')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label={t('application.password', 'كلمة المرور')}
                id="password"
                type="password"
                error={errors.password}
                {...register('password')}
              />
              <InputField 
                label={t('application.comfirmPassword', 'تأكيد كلمة المرور')}
                id="comfirmPassword"
                type="password"
                error={errors.comfirmPassword}
                {...register('comfirmPassword')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <InputField 
                label={t('application.age', 'العمر')}
                id="age"
                type="number"
                error={errors.age}
                {...register('age')}
              />
              {/* <InputField 
                label={t('application.birthDate', 'تاريخ الميلاد')}
                id="birthDate"
                type="date"
                error={errors.birthDate}
                {...register('birthDate')}
              /> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField 
                label={t('application.gender', 'الجنس')}
                id="gender"
                options={[
                  { label: t('application.female', 'أنثى'), value: 'female' },
                  { label: t('application.male', 'ذكر'), value: 'male' }
                ]}
                error={errors.gender}
                {...register('gender')}
              />
              <SelectField 
                label={t('application.maritalStatus', 'الحالة الاجتماعية')}
                id="maritalStatus"
                options={[
                  { label: 'أعزب / عزباء', value: 'single' },
                  { label: 'متزوج / متزوجة', value: 'married' },
                  { label: 'مطلق / مطلقة', value: 'divorced' },
                  { label: 'أرمل / أرملة', value: 'widowed' },
                ]}
                error={errors.maritalStatus}
                {...register('maritalStatus')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label={t('application.governorate', 'المحافظة')}
                id="governorate"
                error={errors.governorate}
                {...register('governorate')}
              />
              <SelectField 
                label={t('application.qualification', 'المؤهل الدراسي')}
                id="qualification"
                options={[
                  { label: 'دبلوم', value: 'diploma' },
                  { label: 'بكالوريوس', value: 'bachelor' },
                  { label: 'ماجستير', value: 'master' },
                  { label: 'دكتوراه', value: 'phd' },
                  { label: 'أخرى', value: 'other' },
                ]}
                error={errors.qualification}
                {...register('qualification')}
              />
            </div>
          </SectionCard>

          <SectionCard title={t('application.timeAvailabilityTitle', 'التفرغ والعمل')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadioField 
                label={t('application.hasPersonalLaptop', 'هل لديك لاب توب شخصي؟')}
                options={yesNoOptions}
                error={errors.hasPersonalLaptop}
                registerFn={register}
                name="hasPersonalLaptop"
              />
              <RadioField 
                label={t('application.hasCurrentJob', 'هل لديك عمل حالي؟')}
                options={yesNoOptions}
                error={errors.hasCurrentJob}
                registerFn={register}
                name="hasCurrentJob"
              />
            </div>
            <RadioField 
              label={t('application.hasFreeTimeFrom3To8', 'هل لديك وقت فراغ من الساعة 3 مساءاً إلى الساعة 8 مساءاً؟')}
              options={yesNoOptions}
              error={errors.hasFreeTimeFrom3To8}
              registerFn={register}
              name="hasFreeTimeFrom3To8"
            />
            <InputField
              label={t('application.dailyFreeTimeHours', 'كم ساعة متاحة لديك كوقت فراغ (يومياً)؟')}
              id="dailyFreeTimeHours"
              type="number"
              placeholder="مثال: 4"
              error={errors.dailyFreeTimeHours}
              {...register('dailyFreeTimeHours')}
            />
            <RadioField 
              label={t('application.niqabDuringSession', 'هل تمانعي رفع النقاب أثناء الحلقة؟')}
              options={yesNoOptions}
              error={errors.niqabDuringSession}
              registerFn={register}
              name="niqabDuringSession"
            />
          </SectionCard>

          <SectionCard title={t('application.quranTajweedTitle', 'القرآن الكريم والتجويد والخبرات')}>
            <RadioField 
              label={t('application.memorizesEntireQuran', 'هل تحفظ القرآن كاملاً؟')}
              options={yesNoOptions}
              error={errors.memorizesEntireQuran}
              registerFn={register}
              name="memorizesEntireQuran"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField 
                label={t('application.practicalTajweedLevel', 'درجة إتقانك للتجويد عملياً؟')}
                id="practicalTajweedLevel"
                options={[
                  { label: 'ممتاز', value: 'excellent' },
                  { label: 'جيد جداً', value: 'very_good' },
                  { label: 'جيد', value: 'good' }
                ]}
                error={errors.practicalTajweedLevel}
                {...register('practicalTajweedLevel')}
              />
              <SelectField 
                label={t('application.theoreticalTajweedLevel', 'درجة إتقانك للتجويد نظرياً؟')}
                id="theoreticalTajweedLevel"
                options={[
                  { label: 'ممتاز', value: 'excellent' },
                  { label: 'جيد جداً', value: 'very_good' },
                  { label: 'جيد', value: 'good' }
                ]}
                error={errors.theoreticalTajweedLevel}
                {...register('theoreticalTajweedLevel')}
              />
            </div>
            <SelectField 
              label={t('application.onlineTeachingExperience', 'سنوات الخبرة في التعليم عن بعد')}
              id="onlineTeachingExperience"
              options={[
                { label: 'لا توجد خبرة', value: 'no experience' },
                { label: 'أقل من سنة', value: 'less than 1 year' },
                { label: 'سنة واحدة', value: '1 year' },
                { label: '2 سنوات', value: '2 years' },
                { label: '3 سنوات فأكثر', value: '3+ years' }
              ]}
              error={errors.onlineTeachingExperience}
              {...register('onlineTeachingExperience')}
            />
            <InputField 
              label={t('application.otherLanguages', 'لغات أخرى (اختياري)')}
              id="otherLanguages"
              placeholder="مثال: English, French"
              required={false}
              error={errors.otherLanguages}
              {...register('otherLanguages')}
            />
            <InputField 
              label={t('application.howDidYouHearAboutUs', 'كيف سمعت عنا؟')}
              id="howDidYouHearAboutUs"
              error={errors.howDidYouHearAboutUs}
              {...register('howDidYouHearAboutUs')}
            />
          </SectionCard>

          <SectionCard title={t('application.questionsAndTermsTitle', 'شروط العمل')}>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
              <ul className="space-y-4">
                {[
                  t('application.cond1', 'العمل يومياً بدون إجازة أسبوعية.'),
                  t('application.cond2', 'الالتزام بحضور الحصص التجريبية.'),
                  t('application.cond3', 'الالتزام بعدم التوقف عن العمل فجأة بدون إشعار مسبق.'),
                  t('application.cond4', 'الموافقة على الراتب المحدد.')
                ].map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed font-medium">{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-100 rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                {...register('agreedToWorkConditions')}
                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
              />
              <span className="font-bold text-gray-800">
                {t('application.agreedToWorkConditions', 'أقر بموافقتي على جميع الشروط المذكورة أعلاه')}
                <span className="text-red-500 mr-1">*</span>
              </span>
            </label>
            {errors.agreedToWorkConditions && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.agreedToWorkConditions.message}</span>
              </div>
            )}

            <div className="mt-6">
              <label htmlFor="notes" className="block font-semibold text-gray-800 mb-2">
                {t('application.notesTitle', 'ملاحظات إضافية (اختياري)')}
              </label>
              <textarea
                id="notes"
                rows={3}
                className="w-full border-b-2 border-gray-300 bg-gray-50 focus:bg-white px-4 py-3 outline-none focus:border-teal-600 transition-colors rounded-t-md resize-none"
                placeholder={t('application.notesPlaceholder', 'أي معلومات إضافية تود إضافتها...')}
                {...register('notes')}
              />
            </div>
          </SectionCard>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-12 py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            >
              {isPending ? (
                <>
                  <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('application.submitting', 'جاري الإرسال...')}
                </>
              ) : (
                t('application.submitBtn', 'تقديم الطلب')
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
