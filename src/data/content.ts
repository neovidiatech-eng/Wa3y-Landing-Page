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
  { name: "الرئيسية", href: "#" },
  { name: "من نحن", href: "#about" },
  { name: "خدماتنا", href: "#services" },
  { name: "لماذا نحن", href: "#why-us" },
  { name: "آراء الطلاب", href: "#testimonials" },
  { name: "تواصل معنا", href: "#contact" },
];

export const services = [
  {
    icon: BookOpen,
    title: "حلقات تحفيظ القرآن أونلاين",
    desc: "برامج تعليمية مرنة لجميع الأعمار بإشراف معلمين ومعلمات متخصصين مع متابعة مستمرة لتحقيق أفضل النتائج.",
    accentClass: "from-teal-600 to-teal-800",
    iconClass: "bg-teal-100 text-[var(--primary)]",
  },
  {
    icon: GraduationCap,
    title: "برامج بناء الوعي التربوي",
    desc: "تعليم القيم القرآنية وربط المعاني بالسلوك العملي لبناء شخصية مسلمة واعية ومتزنة تقتدي بالقرآن.",
    accentClass: "from-dark to-slate-900",
    iconClass: "bg-slate-100 text-[var(--dark)]",
  },
  {
    icon: HeartHandshake,
    title: "متابعة وتقارير دورية",
    desc: "اختبارات وتقارير تقدم مستمرة لكل طالب مع خطط تطوير تساعد على الثبات والتحسن المستمر.",
    accentClass: "from-accent to-amber-600",
    iconClass: "bg-amber-100 text-[var(--accent)]",
  },
];

export const whyUsSteps = [
  {
    title: "منهج متكامل",
    desc: "لا نركز على الحفظ المجرد فقط، بل نهتم بعمق بفهم المقاصد والتطبيق العملي لما يُحفظ في الحياة اليومية لتكون أخلاقهم القرآن.",
  },
  {
    title: "معلمون متخصصون",
    desc: "نخبة من المعلمين والمعلمات ذوي الخبرة الطويلة ليس فقط في علم التجويد، بل في فنون التربية والتعامل النفسي مع الأطفال والشباب.",
  },
  {
    title: "تعليم أونلاين مرن",
    desc: "تقنيات تعليمية حديثة تسمح للطلاب بالتعلم من أي مكان في العالم، مع أدوات تفاعلية تكسر حاجز الملل وتجعل الحلقة ممتعة.",
  },
  {
    title: "متابعة شخصية دقيقة",
    desc: "كل طالب لدينا هو حالة خاصة؛ له خطة تناسب قدراته وتقارير شهرية تطلع أولياء الأمور على أدق تفاصيل التقدم والتحسن.",
  },
];

export const stats = [
  { value: 500, label: "طالب وطالبة", icon: Users },
  { value: 40, label: "معلم متخصص", icon: GraduationCap },
  { value: 3000, label: "ساعة تعليمية", icon: Clock },
  { value: 5, label: "سنوات خبرة", icon: Award },
];

export const testimonials = [
  {
    name: "أم محمد",
    role: "ولي أمر",
    comment: "ابني أصبح أكثر التزامًا وحبًا للقرآن بعد انضمامه للأكاديمية، والمتابعة رائعة جدًا وتحفز الطالب باستمرار.",
    rating: 5,
  },
  {
    name: "أحمد خالد",
    role: "طالب",
    comment: "أكثر شيء أعجبني هو الجمع بين الحفظ وفهم المعاني بطريقة عملية ومبسطة، المعلمون هنا رائعون حقاً.",
    rating: 5,
  },
  {
    name: "سارة علي",
    role: "ولي أمر",
    comment: "تجربة مميزة جدًا، المعلمات متعاونات والبيئة التعليمية محفزة ومريحة للطفل، أنصح بها بشدة.",
    rating: 5,
  },
];

export const contactMethods = [
  { icon: Phone, label: "الهاتف", value: "+20 100 000 0000", color: "bg-teal-50 text-teal-700" },
  { icon: Mail, label: "البريد الإلكتروني", value: "info@waeiacademy.com", color: "bg-dark/5 text-dark" },
  { icon: MapPin, label: "الموقع", value: "القاهرة، مصر", color: "bg-teal-50 text-teal-700" },
];

export const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

