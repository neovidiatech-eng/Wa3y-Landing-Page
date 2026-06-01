/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from "motion/react";
import {
  GraduationCap,
  CheckCircle2,
  MessageSquare,
  Phone,
  Menu,
  X,
  ArrowLeft,
  Star,
  Users,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Counter } from "./components/Counter";
import { IslamicPattern } from "./components/IslamicPattern";
import { ServiceCard } from "./components/ServiceCard";
import { Step } from "./components/Step";
import {
  contactMethods,
  dashboardLink,
  navLinks,
  services,
  socialLinks,
  stats,
  testimonials,
  whyUsSteps,
} from "./data/content";
import { appStyles } from "./styles/appStyles";
import heroImage from "../assets/VEC SAV 336-04.jpg";
import logoImage from "../assets/logo.png";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      dir="rtl"
      className="font-['Cairo'] selection:bg-teal-100 selection:text-teal-900 bg-background overflow-x-hidden"
    >
      <style>{appStyles}</style>

      <div className="fixed inset-0 pattern-bg pointer-events-none" />

      {/* --- Navbar --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-12 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img
              src={logoImage}
              alt="لوجو وعي"
              className="w-16 h-16 sm:w-24 sm:h-24 object-contain -my-4"
            />
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`${i === 0 ? "text-[var(--primary)]" : "text-[var(--muted)]"} font-semibold hover:text-[var(--primary)] transition-colors relative group`}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = dashboardLink)}
              className="hidden md:block bg-[var(--primary)] text-white px-6 py-2 rounded-2xl font-bold hover:bg-[var(--secondary)] transition-all shadow-md"
            >
              تسجيل الدخول
            </motion.button>
            <button
              className="lg:hidden p-2 text-dark"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-dark hover:text-teal-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-2">
                  <a
                    href={dashboardLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white border border-primary text-primary px-6 py-3 rounded-xl font-bold text-center hover:bg-[var(--secondary)] hover:text-white transition-all"
                  >
                    تسجيل الدخول
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center mesh-gradient overflow-hidden">
        <div className="container mx-auto px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-16">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full w-fit"
              >
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                <span className="text-sm font-bold text-[var(--primary)]">
                  أكثر من 500 طالب وطالبة حول العالم
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[var(--dark)]"
              >
                القرآن <span className="text-[var(--primary)]">منهج حياة</span>{" "}
                <br />
                يُبنى به الإنسان
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-xl"
              >
                أكاديمية تربوية تجمع بين أصالة الحفظ وعمق الفهم، لجيل مسلمٍ واعٍ
                يحول الآيات إلى سلوك وأثرٍ في الحياة اليومية.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-4 mt-4"
              >
                <button className="px-8 py-4 bg-[var(--primary)] text-white text-lg font-bold rounded-2xl flex items-center gap-3 shadow-xl hover:translate-y-[-2px] transition-all">
                  <span>ابدأ حصتك المجانية الان</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-100 text-[var(--primary)] text-lg font-bold rounded-2xl hover:bg-slate-50 transition-all">
                  تصفح الخدمات
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 flex flex-col sm:flex-row items-center text-center sm:text-right gap-4 sm:gap-6"
              >
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white bg-teal-100 overflow-hidden flex items-center justify-center"
                    >
                      <Users className="w-6 h-6 text-teal-700" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="block font-bold text-dark">
                    +500 طالب وطالبة
                  </span>
                  <span className="text-muted">
                    ممن اختاروا "وعي" لتغيير حياتهم
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 overflow-hidden rounded-[40px] shadow-2xl border border-white"
              >
                <img
                  src={heroImage}
                  alt="أكاديمية وعي"
                  className="w-full h-auto object-cover rounded-[40px]"
                />
              </motion.div>

              {/* Decorative Blobs */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[var(--accent)] opacity-10 rounded-full blur-3xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[var(--primary)] opacity-5 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[40px] bg-teal-50 border border-teal-100 md:mt-12 shadow-sm"
                >
                  <h4 className="text-xl sm:text-2xl font-black text-[var(--primary)] mb-2">
                    رؤيتنا
                  </h4>
                  <p className="text-teal-900/70 text-sm leading-relaxed">
                    أن نكون نموذجًا رائدًا في التعليم القرآني التربوي الذي يجمع
                    بين الأصالة والتطبيق العملي.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[40px] bg-[var(--dark)] border border-dark/10 shadow-sm"
                >
                  <h4 className="text-xl sm:text-2xl font-black text-white mb-2">
                    رسالتنا
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    بناء إنسان مسلم واعٍ بالقرآن، قادر على تحويل معانيه إلى سلوك
                    وحياة يومية مثمرة.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-1 md:col-span-2 p-10 rounded-[40px] bg-gradient-to-br from-teal-700 to-teal-900 shadow-2xl relative overflow-hidden group"
                >
                  <IslamicPattern className="absolute inset-0 opacity-5 group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-4">
                        قصتنا
                      </h4>
                      <p className="text-teal-50/80 leading-relaxed max-w-md">
                        بدأت "وعي" من إيمان عميق بأن القرآن ليس مجرد كلمات
                        تُحفظ، بل هو دستور يبني الشخصية ويقوم الأخلاق.
                      </p>
                    </div>
                    <GraduationCap className="w-24 h-24 text-white/20 hidden md:block" />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="lg:w-1/2 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--primary)] mb-3 block">
                  من نحن
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-dark mb-8 leading-[1.3]">
                  أكاديمية <span className="text-teal-700 italic">وعي</span>{" "}
                  لبناء الأجيال بالقرآن
                </h2>
                <p className="text-muted text-base sm:text-lg leading-relaxed mb-8">
                  أكاديمية وعي هي منصة تعليمية تربوية متخصصة في تعليم القرآن
                  الكريم وبناء الوعي لدى المتعلمين، من خلال منهج متكامل يجمع بين
                  الحفظ والفهم والتطبيق العملي للقيم القرآنية في الحياة اليومية.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "منهج تعليمي منظم وعصري",
                    "نخبة من المعلمين المتخصصين",
                    "بيئة تعليمية محفزة وآمنة",
                    "متابعة دورية مع أولياء الأمور",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-dark font-medium"
                    >
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-teal-700" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 text-teal-700 font-bold group">
                  احجز حصتك المجانية الان
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 mesh-gradient relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--primary)] mb-3 block"
            >
              خدماتنا
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-dark mb-6"
            >
              برامجنا التعليمية المتميزة
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-muted text-base sm:text-lg"
            >
              نقدم باقة متنوعة من البرامج التي تناسب جميع المستويات والأعمار، مع
              التركيز على الجودة والتربية.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.title}>
                <ServiceCard {...service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section id="why-us" className="py-24 bg-white relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-teal-50 blur-[150px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-50 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <IslamicPattern className="absolute inset-0 opacity-5 pointer-events-none text-[var(--primary)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--primary)] mb-3 block">
                  المميزات
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--dark)] mb-8 leading-[1.3]">
                  لماذا يختار الآباء{" "}
                  <span className="text-[var(--primary)]">وعي</span> لأبنائهم؟
                </h2>
                <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed mb-10">
                  نحن لا نقدم درساً تقليدياً، بل نقدم رحلة تغيير وصناعة إنسان
                  يرتبط بالخالق سبحانه وتعالى وعياً وحباً.
                </p>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden group">
                  <div className="relative z-10">
                    <span className="text-[var(--dark)] font-bold block mb-2">
                      هل لديك استفسار؟
                    </span>
                    <a
                      href="https://wa.me/+201000000000"
                      className="text-[var(--primary)] font-bold hover:underline flex items-center gap-2"
                    >
                      تواصل معنا عبر واتساب
                      <ArrowLeft className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 blur-xl">
                    <Phone className="w-24 h-24 text-[var(--primary)]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="space-y-4">
                {whyUsSteps.map((step, index) => (
                  <div key={step.title}>
                    <Step
                      {...step}
                      index={index}
                      isLast={index === whyUsSteps.length - 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Achievements Section --- */}
      <section className="py-20 bg-gradient-to-l from-teal-700 to-teal-900 relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section
        id="testimonials"
        className="py-24 mesh-gradient relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--primary)] mb-3 block">
              آراء الطلاب
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-dark mb-6">
              ماذا يقولون عنا؟
            </h2>
            <p className="text-muted text-base sm:text-lg">
              شهادات نعتز بها من أولياء الأمور والطلاب الذين خاضوا تجربة وعي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[40px] glass shadow-xl border-white/50 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-teal-500/5 rounded-br-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-[var(--accent)] fill-[var(--accent)]"
                      />
                    ))}
                  </div>
                  <MessageSquare className="w-10 h-10 text-teal-200 absolute -top-4 -right-2 opacity-50" />
                  <p className="text-[var(--dark)]/90 text-lg italic leading-relaxed mb-8">
                    "{t.comment}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-[var(--primary)] font-bold text-xl">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--dark)]">{t.name}</h4>
                      <span className="text-[var(--muted)] text-sm">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-16 md:py-20 bg-white relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-80" />
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-700" />
                تواصل معنا
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-dark mb-6 leading-tight">
                كن جزءاً من عائلة <span className="text-teal-700">وعي</span>
              </h2>

              <p className="text-muted text-base sm:text-lg leading-8">
                نحن هنا للإجابة على جميع استفساراتكم ومساعدتكم في اختيار
                البرنامج الأنسب لكم أو لأبنائكم.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* WhatsApp CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="h-full bg-dark rounded-[40px] shadow-2xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[520px]">
                  <div className="absolute -top-24 -right-24 w-72 h-72 bg-teal-700 rounded-full blur-3xl opacity-40" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-10 -translate-x-1/3 translate-y-1/3" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-teal-700 text-white flex items-center justify-center mb-8 shadow-xl">
                      <MessageSquare className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 leading-tight">
                      هل تحتاج مساعدة فورية؟
                    </h3>

                    <p className="text-gray-900/70 text-base leading-8 mb-10">
                      تواصل معنا مباشرة عبر الواتساب، وسيقوم فريقنا بمساعدتك في
                      اختيار البرنامج المناسب والإجابة على جميع استفساراتك.
                    </p>

                    <div className="space-y-5">
                      {[
                        "رد سريع على الاستفسارات",
                        "مساعدة في اختيار البرنامج المناسب",
                        "متابعة قبل وبعد التسجيل",
                      ].map((text) => (
                        <div
                          key={text}
                          className="flex items-center gap-3 text-gray-900/80"
                        >
                          <span className="w-2 h-2 rounded-full bg-teal-700" />
                          <span className="text-sm sm:text-base">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-12">
                    <motion.a
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      href="#"
                      className="w-full py-5 bg-white text-teal-700 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-teal-50 transition-all shadow-xl"
                    >
                      <MessageSquare className="w-6 h-6" />
                      محادثة واتساب مباشرة
                    </motion.a>

                    <p className="text-center text-sm text-gray-900/50 mt-5">
                      أو استخدم إحدى طرق التواصل الأخرى
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="h-full bg-white rounded-[40px] border border-gray-100 shadow-xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-teal-50 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-dark mb-2">
                          طرق التواصل
                        </h3>
                        <p className="text-muted text-sm sm:text-base">
                          اختر الطريقة المناسبة لك وسنرد عليك في أقرب وقت.
                        </p>
                      </div>

                      <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 items-center justify-center">
                        <MessageSquare className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {contactMethods.map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -6 }}
                          className={`group p-5 rounded-3xl bg-white border border-gray-100 hover:bg-teal-50 hover:border-teal-100 shadow-sm hover:shadow-lg transition-all ${
                            i === 2 ? "md:col-span-2" : ""
                          }`}
                        >
                          <div
                            className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-5`}
                          >
                            <item.icon className="w-6 h-6" />
                          </div>

                          <span className="text-xs text-muted block mb-2 uppercase font-bold tracking-wider">
                            {item.label}
                          </span>

                          <span className="text-lg font-black text-dark leading-relaxed break-words">
                            {item.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                      <div>
                        <h4 className="font-black text-dark mb-1">
                          تابعنا على منصات التواصل
                        </h4>
                        <p className="text-sm text-muted">
                          كن على اطلاع دائم بأحدث البرامج والأنشطة.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                          <motion.a
                            key={label}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            href={href}
                            aria-label={label}
                            className="w-12 h-12 rounded-2xl bg-dark text-white flex items-center justify-center hover:bg-teal-700 transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-dark py-10 relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} أكاديمية وعي. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-500 text-sm">
              تم التصميم بواسطة{" "}
              <span className="text-teal-500 font-bold">neovidia</span>
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-500 hover:text-black text-xs">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-500 hover:text-primary text-xs">
                الشروط والأحكام
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+201000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
        </span>
      </a>

      {/* Scroll to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-28 right-10 z-[60] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-dark transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </div>
  );
}
