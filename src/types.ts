import type { LucideIcon } from "lucide-react";

export type IconType = LucideIcon;

export interface Currency {
  id: string;
  name_en: string;
  name_ar: string;
  symbol: string;
  code: string;
}

export interface Plan {
  id: string;
  name_en: string;
  name_ar: string;
  description: string;
  price: string;
  duration: number;
  features: string[];
  currencyId: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  bestSeller: boolean;
  sessionsCount: number;
  sessionTime: number;
  currency: Currency;
}

export interface PlansResponse {
  message: string;
  status: number;
  lang: string;
  data: Plan[];
}

export interface ApplicationPayload {
  name: string;
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
  age: number;
  notes?: string;
  additionalData: {
    whatsappNumber: string;
    birthDate: string;
    qualification: string;
    hasPersonalLaptop: boolean;
    governorate: string;
    maritalStatus: string;
    hasCurrentJob: boolean;
    hasFreeTimeFrom3To8: boolean;
    dailyFreeTimeHours: string;
    niqabDuringSession: boolean;
    onlineTeachingExperience: string;
    memorizesEntireQuran: string;
    howDidYouHearAboutUs: string;
    practicalTajweedLevel: string;
    theoreticalTajweedLevel: string;
    otherLanguages: string;
    agreedToWorkConditions: boolean;
  };
}

export interface SupervisorPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  codeCountry?: string;
  phone: string;
  gender?: string;
  country?: string;
  nationality?: string;
  timezone?: string;
  city?: string;
  age: number;
  notes?: string;
  additionalData: {
    whatsappNumber: string;
    birthDate: string;
    qualification: string;
    hasPersonalLaptop: boolean;
    governorate: string;
    maritalStatus: string;
    hasCurrentJob: boolean;
    hasFreeTimeFrom3To8: boolean;
    dailyFreeTimeHours: string;
    agreedToWorkConditions: boolean;
  };
}

export interface VerifyAccountPayload {
  email: string;
  otp?: string;
}

export interface ApplicationResponse {
  message: string;
  status: number;
  data?: unknown;
}

