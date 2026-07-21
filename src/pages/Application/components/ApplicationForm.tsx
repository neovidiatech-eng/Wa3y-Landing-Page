import React, { useState } from "react";
import Stepper from "./Stepper";
import TermsStep from "./steps/TermsStep";
import PersonalDataStep from "./steps/PersonalDataStep";
import WorkExperienceStep from "./steps/WorkExperienceStep";
import DistinctiveQuestionsStep from "./steps/DistinctiveQuestionsStep";
import { useTranslation } from "react-i18next";

export default function ApplicationForm() {
  const { t } = useTranslation();
  
  const steps = [
    t('application.step1'),
    t('application.step2'),
    t('application.step3'),
    t('application.step4')
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    terms: {},
    personal: {},
    work: {},
    distinctive: {}
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

  const handleSubmit = () => {
    // Scroll to top or show success message
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-white rounded-3xl p-10 md:p-16 shadow-lg mb-20 text-center border-t-4 border-(--primary)">
        <div className="w-20 h-20 bg-green-100 text-(--primary) rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('application.successTitle')}</h2>
        <p className="text-gray-600 text-lg">{t('application.successDesc')}</p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
          }}
          className="mt-8 bg-(--primary) hover:bg-(--secondary) text-white font-bold py-3 px-8 rounded-xl transition-colors"
        >
          {t('application.newAppBtn')}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mb-20" id="form">
      <div className="text-start mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-(--primary) mb-2">{t('application.formTitle')}</h2>
        <p className="text-gray-500 text-sm md:text-base">{t('application.formDesc')}</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <Stepper currentStep={currentStep} steps={steps} />

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
              prevStep={(data) => prevStep("distinctive", data)} 
              nextStep={(data) => { updateFormData("distinctive", data); handleSubmit(); }} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
