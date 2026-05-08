"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  DonationData,
  PRESET_AMOUNTS,
  SPONSORSHIP_PERIODS,
} from "@/lib/sponsorship-form-types";

interface Step3DonationProps {
  data: Partial<DonationData>;
  onChange: (data: Partial<DonationData>) => void;
  errors: Partial<Record<keyof DonationData, string>>;
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

export default function Step3Donation({
  data,
  onChange,
  errors,
}: Step3DonationProps) {
  const handleAmountClick = (amount: number) => {
    onChange({ ...data, amount });
  };

  const handleCustomAmount = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(num)) {
      onChange({ ...data, amount: num });
    }
  };

  const handlePeriodChange = (period: DonationData["period"]) => {
    onChange({ ...data, period });
  };

  const isCustomAmount = !PRESET_AMOUNTS.includes(data.amount as any);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Donation Amount Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-sm font-semibold text-foreground">
          Select Donation Amount *
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRESET_AMOUNTS.map((amount) => (
            <motion.button
              key={amount}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAmountClick(amount)}
              className={`rounded-2xl border-2 px-4 py-4 font-semibold transition-all ${
                data.amount === amount && !isCustomAmount
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-background text-foreground hover:border-accent"
              }`}
            >
              ${amount}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Custom Amount */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Or enter a custom amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
            $
          </span>
          <Input
            type="text"
            placeholder="Enter amount"
            value={data.amount || ""}
            onChange={(e) => handleCustomAmount(e.target.value)}
            className="rounded-2xl bg-background pl-8"
          />
        </div>
      </motion.div>

      {/* Sponsorship Period */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-sm font-semibold text-foreground">
          Sponsorship Period *
        </label>
        <div className="space-y-3">
          {SPONSORSHIP_PERIODS.map((period) => (
            <motion.label
              key={period}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 cursor-pointer transition hover:border-primary hover:bg-primary/5"
            >
              <input
                type="radio"
                name="period"
                value={period}
                checked={data.period === period}
                onChange={(e) =>
                  handlePeriodChange(e.target.value as DonationData["period"])
                }
                className="h-4 w-4 rounded-full border-2 border-border text-primary focus:ring-primary cursor-pointer"
              />
              <div className="flex-1">
                <p className="font-semibold text-foreground">{period}</p>
                <p className="text-xs text-muted-foreground">
                  {period === "Monthly" && "Renews every month"}
                  {period === "3 Months" && "Renews every quarter"}
                  {period === "6 Months" && "Renews twice per year"}
                  {period === "Yearly" && "Renews annually"}
                </p>
              </div>
            </motion.label>
          ))}
        </div>
        {errors.period && (
          <p className="text-xs text-destructive">{errors.period}</p>
        )}
      </motion.div>

      {/* Summary */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-4"
      >
        <p className="text-sm text-foreground">
          💰 Your commitment:{" "}
          <span className="font-semibold">
            ${data.amount || 0} {data.period}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
