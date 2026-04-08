"use client";

import { Card } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

export function MissionVisionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Guiding our work toward a future where every child has access to
            quality education and opportunities.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <Card className="fade-in-section about-card p-8 border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-4">
              <Target className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To empower vulnerable children through quality education, holistic
              support, and community engagement, enabling them to break the
              cycle of poverty and realize their full potential as productive
              members of society.
            </p>
          </Card>

          {/* Vision */}
          <Card className="fade-in-section about-card p-8 border-l-4 border-purple-600">
            <div className="flex items-start gap-4 mb-4">
              <Lightbulb className="w-8 h-8 text-purple-600 shrink-0 mt-1" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              A world where every child, regardless of circumstance, has access
              to transformative education and support systems that unlock their
              potential and create pathways to dignified, fulfilling lives.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
