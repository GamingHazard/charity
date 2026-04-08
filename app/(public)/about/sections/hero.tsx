"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Award } from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import { IMPACT_METRICS } from "../constants";

export function HeroSection() {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://img.freepik.com/free-photo/african-kids-enjoying-life_23-2151438321.jpg"
        alt="Children learning and growing"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-br from-green-900/80 via-green-800/70 to-yellow-900/60"></div>

      <AnimatedContainer className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Info */}
          <AnimatedElement variant="fadeInLeft" className="space-y-6">
            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "Quicksand" }}
              >
                Transforming Lives Through Education
              </h1>
              <p
                className="text-lg sm:text-xl text-white/90 leading-relaxed"
                style={{ fontFamily: "Quicksand" }}
              >
                Seeds of Love is dedicated to providing quality education and
                support to vulnerable children, creating pathways to brighter
                futures.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-3 gap-4">
                {IMPACT_METRICS.map((metric, index) => (
                  <div key={metric.id} className="text-center">
                    <div
                      className={`text-2xl sm:text-3xl font-bold mb-1 ${
                        index === 0
                          ? "text-blue-300"
                          : index === 1
                            ? "text-purple-300"
                            : "text-green-300"
                      }`}
                    >
                      <AnimatedCounter
                        value={metric.value}
                        suffix={metric.suffix || "+"}
                        delay={index * 200}
                      />
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Impact */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  SM
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  MK
                </div>
                <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  PO
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  +50
                </div>
              </div>
              <p className="text-white/90 text-sm">
                Join our{" "}
                <span className="font-semibold text-blue-300">
                  community of supporters
                </span>{" "}
                making a difference
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donate" className="flex-1 sm:flex-none">
                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Make a Difference
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </AnimatedElement>

          {/* Right Column - Hero Image */}
          <AnimatedElement variant="fadeInRight" className="relative">
            <div className="relative h-127 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Henry.png"
                alt="Children learning and growing"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating Achievement Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">
                    15+ Years Impact
                  </span>
                </div>
              </div>

              {/* Impact Quote */}
              <div className="absolute bottom-6 left-6 right-6">
                <blockquote className="text-white">
                  <p className="text-lg font-semibold mb-2 italic">
                    "Education is the foundation of a brighter tomorrow"
                  </p>
                  <footer className="text-sm text-white/80">
                    — Dr. Byamukama Henry, Founder of Seeds of Love
                  </footer>
                </blockquote>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedContainer>
    </section>
  );
}
