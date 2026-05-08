"use client";

import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { LocationData } from "@/lib/sponsorship-form-types";

interface Step2LocationProps {
  data: Partial<LocationData>;
  onChange: (data: Partial<LocationData>) => void;
  errors: Partial<Record<keyof LocationData, string>>;
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

export default function Step2Location({
  data,
  onChange,
  errors,
}: Step2LocationProps) {
  const handleChange = (field: keyof LocationData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          📍 Your address helps us send sponsorship updates and receipts
        </p>
      </div>

      {/* Address */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Street Address *
        </label>
        <Input
          type="text"
          placeholder="e.g., 123 Main Street"
          value={data.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-destructive">{errors.address}</p>
        )}
      </motion.div>

      {/* City and State */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            City *
          </label>
          <Input
            type="text"
            placeholder="e.g., New York"
            value={data.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-destructive">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            State / Province *
          </label>
          <Input
            type="text"
            placeholder="e.g., NY"
            value={data.state || ""}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-destructive">{errors.state}</p>
          )}
        </div>
      </motion.div>

      {/* Zip Code */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Zip / Postal Code *
        </label>
        <Input
          type="text"
          placeholder="e.g., 10001"
          value={data.zip || ""}
          onChange={(e) => handleChange("zip", e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        {errors.zip && (
          <p className="mt-1 text-sm text-destructive">{errors.zip}</p>
        )}
      </motion.div>
    </motion.div>
  );
}
