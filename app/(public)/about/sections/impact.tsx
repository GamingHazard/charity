"use client";

import { Card } from "@/components/ui/card";
import { IMPACT_METRICS } from "../constants";

export function ImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Measurable results of our commitment to transforming lives.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {IMPACT_METRICS.map((metric) => (
            <Card
              key={metric.id}
              className="fade-in-section about-card bg-white/10 backdrop-blur border-white/20 p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {metric.value.toLocaleString()}
                {metric.suffix}
              </div>
              <h3 className="text-lg font-semibold text-blue-100 mb-2">
                {metric.label}
              </h3>
              <p className="text-sm text-blue-50">{metric.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
