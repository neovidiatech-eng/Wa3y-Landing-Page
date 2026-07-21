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
