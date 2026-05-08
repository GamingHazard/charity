"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ProfileSection({
  title,
  icon,
  children,
  className = "",
  delay = 0,
}: ProfileSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        {icon && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 text-green-600">
            {icon}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex-1">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6">{children}</div>
    </motion.div>
  );
}
