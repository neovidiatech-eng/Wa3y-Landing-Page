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
  full_name_3: string;
  age: number;
  marital_status: string;
  whatsapp_number: string;
  education: string;
  finished_study: string;
  agree_all_conditions: string;
  salary_acceptance: string;
  daily_work_no_weekly_off: string;
  shift_selection: string;
  all_day_availability: string;
  can_use_tools: string;
  agree_no_stopping_policy: string;
  supervision_experience_details: string;
  current_job_and_hours: string;
  previous_jobs: string;
  agree_attend_trial_sessions: string;
  internet_stability: string;
  why_choose_you: string;
  supervision_role_idea: string;
  convince_parent_message: string;
}

export interface ApplicationResponse {
  message: string;
  status: number;
  data?: unknown;
}

