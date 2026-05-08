"use client";

import { motion } from "framer-motion";

interface SponsorshipFormHeaderProps {
  currentStep: number;
  totalSteps: number;
  childName?: string;
  childImage?: string;
}

export default function SponsorshipFormHeader({
  currentStep,
  totalSteps,
  childName,
  childImage,
}: SponsorshipFormHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  const stepLabels = ["Your Info", "Location", "Donation", "Payment"];

  return (
    <div className="space-y-6 pb-6 border-b border-border">
      {/* Step Counter and Title */}
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-2"
        >
          Step {currentStep} of {totalSteps}
        </motion.p>
        <motion.h2
          key={currentStep}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-2xl font-bold text-foreground"
        >
          {stepLabels[currentStep - 1]}
        </motion.h2>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-primary via-emerald-500 to-green-600 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: progressPercentage / 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex gap-2 justify-between">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Child Context (if provided) */}
      {childName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-background/50 p-3"
        >
          {childImage && (
            <img
              src={childImage}
              alt={childName}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Sponsoring</p>
            <p className="font-semibold text-foreground truncate">
              {childName}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
