import {
  Award,
  BookOpen,
  Clock,
  Facebook,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";

export const dashboardLink = "https://dashboard.waaiacademy.com";

export const navLinks = [
  { name: "الرئيسية", nameKey: "nav.home", href: "/" },
  { name: "عن الأكاديمية", nameKey: "nav.about", href: "/about" },
  { name: "البرامج والمسارات", nameKey: "nav.programs", href: "/subjects" },
  { name: "الخطط والأسعار", nameKey: "nav.plans", href: "/plans" },
  { name: "تواصل معنا", nameKey: "nav.contact", href: "/contact" },
];

export const services = [
  {
    id: "islamic-education-kids",
    titleKey: "services.islamic_education.title",
    descKey: "services.islamic_education.desc",
    image: "/images/quran_child_1.png",
    isPrimary: false
  },
  {
    id: "tajweed-adults",
    titleKey: "services.tajweed_adults.title",
    descKey: "services.tajweed_adults.desc",
    image: "/images/quran_child_2.png",
    isPrimary: false
  },
  {
    id: "quran-non-arabic",
    titleKey: "services.quran_non_arabic.title",
    descKey: "services.quran_non_arabic.desc",
    image: "/images/quran_child_3.png",
    isPrimary: false
  },
  {
    id: "quran-memorization",
    titleKey: "services.quran_memorization.title",
    descKey: "services.quran_memorization.desc",
    image: "/images/quran_child_4.png",
    isPrimary: true
  }
];

export const whyUsSteps = [
  {
    titleKey: "whyUs.curriculum.title",
    descKey: "whyUs.curriculum.desc",
  },
  {
    titleKey: "whyUs.teachers.title",
    descKey: "whyUs.teachers.desc",
  },
  {
    titleKey: "whyUs.flexible.title",
    descKey: "whyUs.flexible.desc",
  },
  {
    titleKey: "whyUs.followup.title",
    descKey: "whyUs.followup.desc",
  },
];

export const stats = [
  { value: 500, labelKey: "stats.students", icon: Users },
  { value: 40, labelKey: "stats.teachers", icon: GraduationCap },
  { value: 3000, labelKey: "stats.hours", icon: Clock },
  { value: 5, labelKey: "stats.experience", icon: Award },
];

export const testimonials = [
  {
    nameKey: "testimonials.t1.name",
    roleKey: "testimonials.t1.role",
    commentKey: "testimonials.t1.comment",
    rating: 5,
  },
  {
    nameKey: "testimonials.t2.name",
    roleKey: "testimonials.t2.role",
    commentKey: "testimonials.t2.comment",
    rating: 5,
  },
  {
    nameKey: "testimonials.t3.name",
    roleKey: "testimonials.t3.role",
    commentKey: "testimonials.t3.comment",
    rating: 5,
  },
];

export const contactMethods = [
  { icon: Phone, labelKey: "contact.phone", value: "+20 100 000 0000", color: "bg-teal-50 text-teal-700" },
  { icon: Mail, labelKey: "contact.email", value: "info@waeiacademy.com", color: "bg-dark/5 text-dark" },
  { icon: MapPin, labelKey: "contact.location", valueKey: "contact.locationValue", color: "bg-teal-50 text-teal-700" },
];

export const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

