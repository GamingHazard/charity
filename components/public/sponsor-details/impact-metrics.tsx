"use client";

import { motion } from "framer-motion";
import { Heart, TrendingUp, Target } from "lucide-react";
import type { SponsorshipProfile } from "@/lib/mock-data";

interface ImpactMetricsProps {
  profile: SponsorshipProfile;
}

export default function ImpactMetrics({ profile }: ImpactMetricsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const metrics = [
    {
      icon: Heart,
      label: "Progress",
      value: `${profile.progress}%`,
      color: "from-red-500 to-rose-500",
    },
    {
      icon: TrendingUp,
      label: "Support Level",
      value: "Active",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      label: "Next Goal",
      value: "90%",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <motion.section
      className="relative hidden py-12 sm:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Impact & Progress
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Track how {profile.firstName}'s sponsorship journey is progressing
            and the difference it's making.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50 p-8 shadow-lg mb-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                Sponsorship Support Level
              </p>
              <p className="text-3xl font-bold text-green-600">
                {profile.progress}%
              </p>
            </div>
            <div className="relative h-3 rounded-full bg-gray-200/50 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${profile.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {profile.progress < 50 &&
                "Still building support - every contribution helps!"}
              {profile.progress >= 50 &&
                profile.progress < 75 &&
                "Halfway there! Growing support reaching more impact."}
              {profile.progress >= 75 &&
                profile.progress < 100 &&
                "Nearly at full support! Almost reaching maximum impact."}
              {profile.progress >= 100 &&
                "Fully sponsored! Making maximum impact on this child's life."}
            </p>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          className="grid gap-6 sm:gap-8 md:grid-cols-3"
          variants={containerVariants}
        >
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border border-white/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-lg`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  {metric.label}
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional info */}
        <motion.div
          variants={itemVariants}
          className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-50/60 to-green-50/60 backdrop-blur-sm border border-emerald-200/50 p-6 sm:p-8"
        >
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <span className="font-semibold text-emerald-700">
              📊 Did you know?
            </span>{" "}
            Your consistent sponsorship of {profile.firstName} provides
            stability for education, nutrition, and healthcare. Together, we're
            building a brighter future.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
