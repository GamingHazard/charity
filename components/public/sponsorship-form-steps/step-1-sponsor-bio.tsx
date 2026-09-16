"use client";

import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { SponsorData } from "@/lib/sponsorship-form-types";

interface Step1SponsorBioProps {
  data: Partial<SponsorData>;
  onChange: (data: Partial<SponsorData>) => void;
  errors: Partial<Record<keyof SponsorData, string>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function Step1SponsorBio({
  data,
  onChange,
  errors,
}: Step1SponsorBioProps) {
  const handleChange = (field: keyof SponsorData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 20);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Full Name *
        </label>
        <Input
          type="text"
          placeholder="Enter your full name"
          value={data.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={`bg-background rounded-2xl ${errors.fullName ? "border-destructive" : ""}`}
        />
        {errors.fullName && (
          <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          About you (optional)
        </label>
        <textarea
          value={data.bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Tell us a little about yourself"
          maxLength={1000}
          className="min-h-28 w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.bio && <p className="text-xs text-destructive mt-1">{errors.bio}</p>}
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Email Address *
        </label>
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={data.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`bg-background rounded-2xl ${errors.email ? "border-destructive" : ""}`}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Phone Number *
        </label>
        <Input
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={data.phone || ""}
          onChange={(e) => handleChange("phone", formatPhone(e.target.value))}
          className={`bg-background rounded-2xl ${errors.phone ? "border-destructive" : ""}`}
        />
        {errors.phone && (
          <p className="text-xs text-destructive mt-1">{errors.phone}</p>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-background rounded-2xl border border-border   p-4"
      >
        <p className="text-xs text-muted-foreground">
          ℹ️ We'll use this information to confirm your sponsorship commitment.
        </p>
      </motion.div>
    </motion.div>
  );
}
