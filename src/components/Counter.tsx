import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "../types";

type CounterProps = {
  value: number;
  label: string;
  icon: IconType;
};

export function Counter({ value, label, icon: Icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center p-6 text-center"
    >
      <div className="mb-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">{count}+</span>
      <span className="text-teal-50 font-medium">{label}</span>
    </motion.div>
  );
}

