"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/motion/animated-elements";
import { ArrowRight, Heart, Users, Award } from "lucide-react";

export function AboutPreview() {
  const stats = [
    { icon: Users, label: "Communities Served", value: "20+" },
    { icon: Heart, label: "Years of Service", value: "20+" },
    { icon: Award, label: "Awards Received", value: "15+" },
  ];

  return (
    <AnimatedElement variant="fadeInUp">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2
                style={{ fontFamily: "Quicksand" }}
                className="text-3xl sm:text-4xl font-bold text-accent mb-6"
              >
                About Seeds of Love
              </h2>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-muted-foreground mb-6 leading-relaxed"
              >
                For over two decades, Seeds of Love has been dedicated to
                empowering communities through education, nutrition, and
                sustainable development. We believe that every child deserves
                access to quality education and proper nutrition, regardless of
                their circumstances.
              </p>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-muted-foreground mb-8 leading-relaxed"
              >
                Our mission is to create lasting change by addressing the root
                causes of poverty and inequality. Through our comprehensive
                programs, we've helped thousands of families build brighter
                futures for themselves and their children.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div
                      style={{ fontFamily: "Quicksand" }}
                      className="text-2xl font-bold text-accent"
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{ fontFamily: "Quicksand" }}
                      className="text-sm text-muted-foreground"
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button
                  style={{ fontFamily: "Quicksand" }}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5a0b0ca58dd0412bcede6be6/1520452766003-O8OONBDXCD6W62DN9X95/Happy+kids++at+EducAid+Charity+Sierra+Leone.jpg?format=2500w"
                  alt="Seeds of Love team and community work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}
