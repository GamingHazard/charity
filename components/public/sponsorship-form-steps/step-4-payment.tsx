"use client";

import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  PaymentData,
  formatCardNumber,
  formatExpiry,
} from "@/lib/sponsorship-form-types";

interface Step4PaymentProps {
  data: Partial<PaymentData>;
  onChange: (data: Partial<PaymentData>) => void;
  errors: Partial<Record<keyof PaymentData, string>>;
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

export default function Step4Payment({
  data,
  onChange,
  errors,
}: Step4PaymentProps) {
  const handleChange = (field: keyof PaymentData, value: string) => {
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
    } else if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    } else if (field === "expiry") {
      value = formatExpiry(value);
    }
    onChange({ ...data, [field]: value });
  };

  const displayCardNumber = data.cardNumber
    ? formatCardNumber(data.cardNumber)
    : "";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Card Preview */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl bg-linear-to-br from-primary via-emerald-600 to-green-700 p-6 text-white shadow-lg"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">●●●●</span>
            <span className="text-sm font-semibold">VISA</span>
          </div>
          <div>
            <p className="text-xs text-white/70 mb-1">Card Number</p>
            <p className="text-lg font-mono tracking-widest">
              {displayCardNumber || "●●●● ●●●● ●●●● ●●●●"}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-white/70 mb-1">Cardholder</p>
              <p className="text-sm font-semibold">
                {data.cardName?.toUpperCase() || "YOUR NAME"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/70 mb-1">Expires</p>
              <p className="text-sm font-semibold">{data.expiry || "MM/YY"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cardholder Name */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Cardholder Name *
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          value={data.cardName || ""}
          onChange={(e) => handleChange("cardName", e.target.value)}
          className={`rounded-2xl ${errors.cardName ? "border-destructive" : ""}`}
        />
        {errors.cardName && (
          <p className="text-xs text-destructive mt-1">{errors.cardName}</p>
        )}
      </motion.div>

      {/* Card Number */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Card Number *
        </label>
        <Input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={displayCardNumber}
          onChange={(e) => handleChange("cardNumber", e.target.value)}
          className={`rounded-2xl font-mono tracking-wider ${
            errors.cardNumber ? "border-destructive" : ""
          }`}
          maxLength={19}
        />
        {errors.cardNumber && (
          <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>
        )}
      </motion.div>

      {/* Expiry and CVV */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Expiry Date *
          </label>
          <Input
            type="text"
            placeholder="MM/YY"
            value={data.expiry || ""}
            onChange={(e) => handleChange("expiry", e.target.value)}
            className={`rounded-2xl font-mono ${
              errors.expiry ? "border-destructive" : ""
            }`}
            maxLength={5}
          />
          {errors.expiry && (
            <p className="text-xs text-destructive mt-1">{errors.expiry}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            CVV *
          </label>
          <Input
            type="text"
            placeholder="123"
            value={data.cvv || ""}
            onChange={(e) => handleChange("cvv", e.target.value)}
            className={`rounded-2xl font-mono ${
              errors.cvv ? "border-destructive" : ""
            }`}
            maxLength={4}
          />
          {errors.cvv && (
            <p className="text-xs text-destructive mt-1">{errors.cvv}</p>
          )}
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4"
      >
        <p className="text-xs text-yellow-800">
          🔒 <span className="font-semibold">Security Note:</span> Your card
          information is stored securely on your device only. We never store raw
          card data on our servers.
        </p>
      </motion.div>

      {/* Terms */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-border bg-background/50 p-4"
      >
        <p className="text-xs text-muted-foreground">
          By completing this purchase, you agree to our payment terms and
          sponsorship agreement.
        </p>
      </motion.div>
    </motion.div>
  );
}
