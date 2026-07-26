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
  additionalData: {
    marital_status?: string;
    education: string;
    finished_study: boolean;
    agree_all_conditions: boolean;
    salary_acceptance: boolean;
    daily_work_no_weekly_off: boolean;
    shift_selection: string;
    all_day_availability: string;
    can_use_tools: boolean;
    agree_no_stopping_policy: boolean;
    supervision_experience_details: string;
    current_job_and_hours: string;
    previous_jobs: string;
    agree_attend_trial_sessions: boolean;
    internet_stability: string;
    why_choose_you: string;
    supervision_role_idea: string;
    convince_parent_message: string;
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

