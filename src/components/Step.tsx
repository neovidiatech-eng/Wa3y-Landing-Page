import { motion } from "motion/react";

type StepProps = {
  title: string;
  desc: string;
  index: number;
  isLast?: boolean;
};

export function Step({ title, desc, index, isLast = false }: StepProps) {
  return (
    <div className="relative flex items-start gap-8 group">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] font-bold shadow-lg group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300"
        >
          {index + 1}
          <div className="absolute -inset-2 bg-teal-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            className="w-1 bg-gradient-to-b from-[var(--primary)] to-transparent flex-grow mt-2 rounded-full opacity-30"
          />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="pb-12"
      >
        <h3 className="text-xl font-bold text-[var(--dark)] mb-3 group-hover:text-[var(--primary)] transition-colors">{title}</h3>
        <p className="text-[var(--muted)] leading-relaxed max-w-lg">{desc}</p>
      </motion.div>
    </div>
  );
}

