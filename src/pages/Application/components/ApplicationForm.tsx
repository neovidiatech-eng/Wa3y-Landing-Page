import React, { useState } from "react";
import Stepper from "./Stepper";
import TermsStep from "./steps/TermsStep";
import PersonalDataStep from "./steps/PersonalDataStep";
import WorkExperienceStep from "./steps/WorkExperienceStep";
import DistinctiveQuestionsStep from "./steps/DistinctiveQuestionsStep";
import OtpInput from "./OtpInput";
import { useTranslation } from "react-i18next";
import { useApplication, useVerifyAccount } from "../../../hooks/useApplication";
import { ApplicationPayload } from "../../../types";
import { CheckCircle2, AlertCircle, X, RotateCcw, KeyRound } from "lucide-react";
import { parseApiError, ApiErrorDetail } from "../../../utils/apiError";

export default function ApplicationForm() {
  const { t } = useTranslation();
  const { mutate: submitApplication, isPending, isError, error, reset } = useApplication();
  const { mutate: handleVerifyAccount, isPending: isVerifying } = useVerifyAccount();

  const steps = [
    t('application.step1'),
    t('application.step2'),
    t('application.step3'),
    t('application.step4')
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<ApiErrorDetail | null>(null);

  const [otpCode, setOtpCode] = useState("");
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<ApiErrorDetail | null>(null);

  const [formData, setFormData] = useState({
    terms: {} as any,
    personal: {} as any,
    work: {} as any,
    distinctive: {} as any
  });

  const updateFormData = (stepName: keyof typeof formData, data: any) => {
    setFormData(prev => ({ ...prev, [stepName]: data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const prevStep = (stepName?: keyof typeof formData, data?: any) => {
    if (stepName && data) {
      updateFormData(stepName, data);
    }
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleSubmit = (distinctiveData: any) => {
    setSubmitError(null);
    if (reset) reset();

    const updatedFormData = {
      ...formData,
      distinctive: distinctiveData
    };

    const isTrueValue = (val: any) => {
      if (typeof val === 'boolean') return val;
      if (!val) return false;
      const str = String(val).trim().toLowerCase();
      return (
        str === 'true' ||
        str === '1' ||
        str === 'yes' ||
        str === 'أوافق' ||
        str === 'نعم' ||
        str === t('application.agree').toLowerCase() ||
        str === t('application.yes').toLowerCase()
      );
    };

    const payload: ApplicationPayload = {
      // Personal & Account Data
      name: updatedFormData.personal.fullName || updatedFormData.personal.name || "",
      email: updatedFormData.personal.email || "",
      password: updatedFormData.personal.password || "",
      comfirmPassword: updatedFormData.personal.comfirmPassword || updatedFormData.personal.password || "",
      codeCountry: updatedFormData.personal.codeCountry || "+20",
      phone: updatedFormData.personal.phone || updatedFormData.personal.whatsapp || "",
      gender: updatedFormData.personal.gender || "male",
      country: updatedFormData.personal.country || "Egypt",
      nationality: updatedFormData.personal.nationality || "Egyptian",
      timezone: updatedFormData.personal.timezone || (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Africa/Cairo") || "Africa/Cairo",
      city: updatedFormData.personal.city || "Cairo",
      age: Number(updatedFormData.personal.age) || 0,
      additionalData: {
        marital_status: updatedFormData.personal.maritalStatus || "",
        education: updatedFormData.personal.education || "",
        finished_study: isTrueValue(updatedFormData.personal.finishedStudy),

        // Terms
        agree_all_conditions: isTrueValue(updatedFormData.terms.q1),
        salary_acceptance: isTrueValue(updatedFormData.terms.q2),
        daily_work_no_weekly_off: isTrueValue(updatedFormData.terms.q3),
        shift_selection: updatedFormData.terms.q4 || "",
        all_day_availability: updatedFormData.terms.q5 || "",
        can_use_tools: isTrueValue(updatedFormData.terms.q6),
        agree_no_stopping_policy: isTrueValue(updatedFormData.terms.q7),

        // Work Experience
        supervision_experience_details: updatedFormData.work.q1 || "",
        current_job_and_hours: updatedFormData.work.q2 || "",
        previous_jobs: updatedFormData.work.q3 || "",
        agree_attend_trial_sessions: isTrueValue(updatedFormData.work.q4),
        internet_stability: updatedFormData.work.q5 || "",

        // Distinctive Questions
        why_choose_you: distinctiveData.q1 || "",
        supervision_role_idea: distinctiveData.q2 || "",
        convince_parent_message: distinctiveData.q3 || "",
      },
    };

    submitApplication(payload, {
      onSuccess: () => {
        setIsSubmitted(true);
        setSubmitError(null);
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

    const email = formData.personal.email || "";

    handleVerifyAccount(
      { email,otp: otpCode.trim() },
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

  // SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="w-full bg-white rounded-3xl p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.08)] mb-20 text-center border-t-8 border-green-500 animate-fadeIn">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 className="w-14 h-14" strokeWidth={2.5} />
        </div>

        {isAccountVerified ? (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              {t('application.verifiedSuccessTitle', 'تم تفعيل حسابك بنجاح!')}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {t('application.verifiedSuccessDesc', 'تم تأكيد حسابك وإرسال طلبك رسمياً إلى فريق الموارد البشرية بأكاديمية وعي. سيتم مراجعة بياناتك والتواصل معك قريباً.')}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              {t('application.successTitle')}
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {t('application.successDesc')}
            </p>

            {/* OTP Verification Box */}
            <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-6 max-w-lg mx-auto mb-8 text-start shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                  <KeyRound className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-amber-950 text-lg">
                    {t('application.otpNoticeTitle', 'تأكيد الحساب عبر رمز (OTP)')}
                  </h4>
                  <p className="text-amber-900 text-sm leading-relaxed font-medium">
                    {t('application.otpNoticeDesc', 'يرجى التحقق من رمز التأكيد (OTP) المرسل لبريدك الإلكتروني لتأكيد تفعيل الحساب، حتى يصل طلبك رسمياً للأكاديمية وتتم مراجعته.')}
                  </p>
                </div>
              </div>

              <form onSubmit={onVerifySubmit} className="space-y-4 pt-2 border-t border-amber-200/80">
                <div className="space-y-3 text-center">
                  <label className="block text-sm font-bold text-amber-950">
                    {t('application.otpInputLabel', 'أدخل رمز التحقق (OTP)')}
                  </label>
                  <OtpInput
                    length={6}
                    value={otpCode}
                    onChange={setOtpCode}
                    disabled={isVerifying}
                  />
                </div>

                {verifyError && (
                  <div className="bg-red-50 p-3.5 rounded-xl border border-red-200 text-start space-y-1">
                    <p className="text-red-700 text-sm font-bold">{verifyError.message}</p>
                    {verifyError.errors && verifyError.errors.length > 0 && (
                      <ul className="list-disc list-inside text-red-600 text-xs space-y-0.5">
                        {verifyError.errors.map((errText, idx) => (
                          <li key={idx}>{errText}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || !otpCode.trim()}
                  className="w-full bg-(--primary) hover:bg-(--secondary) disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifying ? (
                    <span>{t('application.verifying', 'جاري التحقق...')}</span>
                  ) : (
                    <>
                      <KeyRound className="w-5 h-5" />
                      <span>{t('application.verifyBtn', 'تأكيد الحساب الآن')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        )}

        <button 
          onClick={() => {
            setIsSubmitted(false);
            setIsAccountVerified(false);
            setOtpCode("");
            setVerifyError(null);
            setCurrentStep(1);
            setSubmitError(null);
            setFormData({ terms: {}, personal: {}, work: {}, distinctive: {} });
            if (reset) reset();
          }}
          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>{t('application.newAppBtn')}</span>
        </button>
      </div>
    );
  }

  // Extract display error object (message + errors array)
  const displayError = submitError || (isError && error ? parseApiError(error, t('application.errorDefault', 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.')) : null);

  return (
    <div className="w-full mb-20" id="form">
      <div className="text-start mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-(--primary) mb-2">{t('application.formTitle')}</h2>
        <p className="text-gray-500 text-sm md:text-base">{t('application.formDesc')}</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <Stepper currentStep={currentStep} steps={steps} />

        {/* ERROR MESSAGE ALERT BANNER */}
        {displayError && (
          <div className="mt-6 p-4 md:p-5 bg-red-50 border-r-4 border-red-500 text-red-700 rounded-xl flex items-start justify-between gap-4 shadow-sm animate-shake">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-800 text-sm md:text-base mb-1">
                  {displayError.message || "تعذر تقديم الطلب!"}
                </h4>
                {displayError.errors && displayError.errors.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm leading-relaxed mt-1">
                    {displayError.errors.map((errText, idx) => (
                      <li key={idx}>{errText}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setSubmitError(null);
                if (reset) reset();
              }}
              className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-100/50"
              aria-label="Dismiss error"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="mt-8">
          {currentStep === 1 && (
            <TermsStep 
              defaultValues={formData.terms}
              nextStep={(data) => { updateFormData("terms", data); nextStep(); }} 
            />
          )}
          {currentStep === 2 && (
            <PersonalDataStep 
              defaultValues={formData.personal}
              nextStep={(data) => { updateFormData("personal", data); nextStep(); }} 
              prevStep={(data) => prevStep("personal", data)} 
            />
          )}
          {currentStep === 3 && (
            <WorkExperienceStep 
              defaultValues={formData.work}
              nextStep={(data) => { updateFormData("work", data); nextStep(); }} 
              prevStep={(data) => prevStep("work", data)} 
            />
          )}
          {currentStep === 4 && (
            <DistinctiveQuestionsStep 
              defaultValues={formData.distinctive}
              isSubmitting={isPending}
              prevStep={(data) => prevStep("distinctive", data)} 
              nextStep={(data) => { updateFormData("distinctive", data); handleSubmit(data); }} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
