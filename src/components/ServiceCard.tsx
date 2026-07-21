import { motion } from "motion/react";
import { Link } from "react-router-dom";

type ServiceCardProps = {
  id: string;
  title: string;
  desc: string;
  image: string;
  isPrimary?: boolean;
  index: number;
};

export function ServiceCard({ id, title, desc, image, isPrimary, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      
      className={`relative group rounded-[30px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full ${
        isPrimary 
          ? "bg-teal-800 text-white border border-teal-700 hover:shadow-teal-900/20" 
          : "bg-white text-(--dark) border border-slate-100 hover:border-teal-100 hover:shadow-teal-900/5"
      }`}
    >
      <Link to={`/subjects/${id}`} className="flex flex-col grow">
        <div className="h-56 overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradient to match card's top rounded corners nicely */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="p-8 grow flex flex-col hover:bg-teal-800 group/content transition-colors duration-300">
          <h3 className={`text-xl md:text-2xl font-black mb-4 transition-colors duration-300 group-hover/content:text-white ${isPrimary ? "text-amber-400" : "text-teal-800"}`}>
            {title}
          </h3>
          <p className={`leading-relaxed text-sm md:text-base grow transition-colors duration-300 group-hover/content:text-white ${isPrimary ? "text-teal-50" : "text-(--muted)"}`}>
            {desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
