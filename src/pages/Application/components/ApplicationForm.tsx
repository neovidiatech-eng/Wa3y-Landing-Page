import React, { useState } from "react";
import Stepper from "./Stepper";
import TermsStep from "./steps/TermsStep";
import PersonalDataStep from "./steps/PersonalDataStep";
import WorkExperienceStep from "./steps/WorkExperienceStep";
import OtpInput from "./OtpInput";
import { useTranslation } from "react-i18next";
import { useSupervisorApplication, useVerifyAccount } from "../../../hooks/useApplication";
import { SupervisorPayload } from "../../../types";
import { CheckCircle2, AlertCircle, X, RotateCcw, KeyRound } from "lucide-react";
import { parseApiError, ApiErrorDetail } from "../../../utils/apiError";

export default function ApplicationForm() {
  const { t } = useTranslation();
  const { mutate: submitApplication, isPending, isError, error, reset } = useSupervisorApplication();
  const { mutate: handleVerifyAccount, isPending: isVerifying } = useVerifyAccount();

  const steps = [
    t('application.step1', 'البيانات الشخصية'),
    t('application.step2', 'الخبرات والإشراف'),
    t('application.step4', 'شروط العمل')
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

  const handleSubmit = (termsData: any) => {
    setSubmitError(null);
    if (reset) reset();

    const updatedFormData = {
      ...formData,
      terms: termsData
    };

    const payload: SupervisorPayload = {
      name: updatedFormData.personal.fullName || "",
      email: updatedFormData.personal.email || "",
      password: updatedFormData.personal.password || "",
      confirmPassword: updatedFormData.personal.comfirmPassword || updatedFormData.personal.password || "",
      codeCountry: updatedFormData.personal.codeCountry || "+20",
      phone: updatedFormData.personal.whatsappNumber || "",
      gender: updatedFormData.personal.gender || "female",
      country: "Egypt",
      nationality: "Egyptian",
      timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Africa/Cairo",
      city: "Cairo",
      age: parseInt(updatedFormData.personal.age) || 0,
      notes: termsData.notes || "",
      additionalData: {
        whatsappNumber: updatedFormData.personal.whatsappNumber || "",
        birthDate: updatedFormData.personal.birthDate || "",
        qualification: updatedFormData.personal.qualification || "",
        hasPersonalLaptop: updatedFormData.personal.hasPersonalLaptop === "نعم",
        governorate: updatedFormData.personal.governorate || "",
        maritalStatus: updatedFormData.personal.maritalStatus || "",
        hasCurrentJob: updatedFormData.work.hasCurrentJob === "نعم",
        hasFreeTimeFrom3To8: updatedFormData.work.hasFreeTimeFrom3To8 === "نعم",
        dailyFreeTimeHours: updatedFormData.work.dailyFreeTimeHours || "",
        agreedToWorkConditions: termsData.agreedToWorkConditions || false,
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
            <PersonalDataStep 
              defaultValues={formData.personal}
              nextStep={(data) => { updateFormData("personal", data); nextStep(); }} 
            />
          )}
          {currentStep === 2 && (
            <WorkExperienceStep 
              defaultValues={formData.work}
              nextStep={(data) => { updateFormData("work", data); nextStep(); }} 
              prevStep={(data) => prevStep("work", data)} 
            />
          )}
          {currentStep === 3 && (
            <TermsStep 
              defaultValues={formData.terms}
              isSubmitting={isPending}
              prevStep={(data) => prevStep("terms", data)} 
              nextStep={(data) => { updateFormData("terms", data); handleSubmit(data); }} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
