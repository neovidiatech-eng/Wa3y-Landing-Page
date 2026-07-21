import { motion } from "motion/react";
import { MessageSquare, Check } from "lucide-react";
import { contactMethods, socialLinks } from "../data/content";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export function Contact() {
  const { t, i18n } = useTranslation();

  const contactSchema = useMemo(() => z.object({
    name: z.string().min(1, t("contact.validation.nameRequired")),
    phone: z.string().min(1, t("contact.validation.phoneRequired")),
    email: z.string().min(1, t("contact.validation.emailRequired")).email(t("contact.validation.emailInvalid")),
    message: z.string().min(1, t("contact.validation.messageRequired")),
  }), [t]);

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Mock API call
    console.log("Form data submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(t("contact.form.success"));
    reset();
  };

  return (
    <section
      id="contact"
      className="pt-32 pb-24 bg-slate-50 relative overflow-hidden min-h-[70vh]"
    >
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-teal-800 mb-6">
              {t("contact.needHelp")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {t("contact.helpDesc")}
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 mb-8">
              {(t("contact.features", { returnObjects: true }) as string[]).map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-teal-700 font-bold">
                  <span className="bg-teal-100 p-1 rounded-full"><Check className="w-4 h-4" /></span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            
            <a href="#" className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
              <MessageSquare className="w-5 h-5" />
              {t("contact.whatsappBtn")}
            </a>
          </motion.div>
        </div>

        {/* Contact Grid Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Right Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-start pt-4 lg:pt-8"
          >
            <h3 className="text-4xl lg:text-5xl font-black text-teal-800 mb-4">{t("contact.contactUs")}</h3>
            <div className="w-20 h-1.5 rounded-full bg-amber-500 mb-12"></div>

            <div className="space-y-6 w-full flex flex-col items-center md:items-start">
              {contactMethods.map((method, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-6 w-full justify-center md:justify-start group cursor-default p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-teal-50"
                >
                  <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-teal-800 group-hover:text-white transition-all duration-500 shadow-sm">
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex flex-col text-start`}>
                    <span className="text-teal-900/60 text-sm font-bold mb-1">{t(method.labelKey || "")}</span>
                    <span className="text-gray-800 font-black text-lg md:text-xl tracking-wide group-hover:text-teal-800 transition-colors" dir="ltr">{method.value || t(method.valueKey || "")}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-center justify-center md:justify-start gap-5 w-full px-4">
              {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  aria-label={label}
                  className="w-14 h-14 rounded-2xl bg-white border border-gray-100 text-teal-800 flex items-center justify-center hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-teal-900 rounded-4xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Form decorative background */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-800 rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            <h3 className="text-3xl font-black text-amber-500 mb-10 text-center relative z-10">{t("contact.leaveMessage")}</h3>
            
            <form className="relative z-10 space-y-6 flex flex-col h-full" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder={t("contact.form.name")}
                    {...register("name")}
                    className={`w-full bg-white text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${i18n.language === 'en' ? 'text-start' : 'text-start'} ${errors.name ? 'border-2 border-red-400' : ''}`}
                  />
                  <p className={`text-red-300 text-xs px-2 font-medium min-h-4 mt-1 ${i18n.language === 'en' ? 'text-start' : 'text-start'}`}>
                    {errors.name?.message}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <input
                    type="tel"
                    placeholder={t("contact.form.phone")}
                    {...register("phone")}
                    className={`w-full bg-white text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${i18n.language === 'en' ? 'text-start' : 'text-start'} ${errors.phone ? 'border-2 border-red-400' : ''}`}
                  />
                  <p className={`text-red-300 text-xs px-2 font-medium min-h-4 mt-1 ${i18n.language === 'en' ? 'text-start' : 'text-start'}`}>
                    {errors.phone?.message}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  placeholder={t("contact.form.email")}
                  {...register("email")}
                  className={`w-full bg-white text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${i18n.language === 'en' ? 'text-start' : 'text-start'} ${errors.email ? 'border-2 border-red-400' : ''}`}
                />
                <p className={`text-red-300 text-xs px-2 font-medium min-h-4 mt-1 ${i18n.language === 'en' ? 'text-start' : 'text-start'}`}>
                  {errors.email?.message}
                </p>
              </div>

              <div className="space-y-2">
                <textarea
                  rows={5}
                  placeholder={t("contact.form.message")}
                  {...register("message")}
                  className={`w-full bg-white text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none transition-colors ${i18n.language === 'en' ? 'text-start' : 'text-start'} ${errors.message ? 'border-2 border-red-400' : ''}`}
                ></textarea>
                <p className={`text-red-300 text-xs px-2 font-medium min-h-4 mt-1 ${i18n.language === 'en' ? 'text-start' : 'text-start'}`}>
                  {errors.message?.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-fit mx-auto px-12 py-3 bg-amber-500 text-teal-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg mt-4 block disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
              >
                {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
