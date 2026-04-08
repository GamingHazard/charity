"use client";

import { Card } from "@/components/ui/card";
import { HandHeart, ShieldCheck, Medal } from "lucide-react";
import { CORE_VALUES } from "../constants";

const iconMap: { [key: string]: React.ReactNode } = {
  compassion: <HandHeart className="w-10 h-10 text-red-500" />,
  integrity: <ShieldCheck className="w-10 h-10 text-green-500" />,
  excellence: <Medal className="w-10 h-10 text-yellow-500" />,
};

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These principles guide every decision we make and action we take.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((value) => (
            <Card
              key={value.id}
              className="value-card about-card p-8 bg-white text-center hover:shadow-lg"
            >
              <div className="flex justify-center mb-4">
                {iconMap[value.id]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
