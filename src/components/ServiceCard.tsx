import { motion } from "motion/react";
import type { IconType } from "../types";

type ServiceCardProps = {
  icon: IconType;
  title: string;
  desc: string;
  accentClass: string;
  iconClass: string;
  index: number;
};

export function ServiceCard({ icon: Icon, title, desc, accentClass, iconClass, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="relative group p-8 rounded-3xl bg-white border border-teal-50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${accentClass} opacity-5 rounded-bl-[100px] transition-all group-hover:w-40 group-hover:h-40`}
      />

      <div className="relative z-10">
        <div className={`mb-6 inline-flex p-4 rounded-2xl ${iconClass} items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[var(--dark)] mb-4">{title}</h3>
        <p className="text-[var(--muted)] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

