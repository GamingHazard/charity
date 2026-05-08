"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ProfileFieldProps {
  label: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function ProfileField({
  label,
  value,
  icon,
  className = "",
}: ProfileFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-50/40 border border-gray-200/50 p-4 hover:border-gray-300/80 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-50/60 transition-all ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 flex items-center justify-center mt-0.5">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500">
            {label}
          </p>
          <p className="mt-2 text-base sm:text-lg font-bold text-gray-900 break-words">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface ProfileFieldGroupProps {
  fields: {
    label: string;
    value: string | number | ReactNode;
    icon?: ReactNode;
  }[];
  columns?: 1 | 2 | 3;
}

export function ProfileFieldGroup({
  fields,
  columns = 2,
}: ProfileFieldGroupProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <motion.div
      className={`grid gap-4 sm:gap-6 ${gridClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {fields.map((field, idx) => (
        <ProfileField key={idx} {...field} />
      ))}
    </motion.div>
  );
}
