"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/data-context";
import { useState } from "react";
import { Arrow } from "@radix-ui/react-context-menu";
import { ArrowRight } from "lucide-react";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";

const programEmojis: { [key: string]: string } = {
  "Education Initiatives": "📚",
  "Nutrition Program": "🍎",
  "Teacher Training": "👨‍🏫",
  "Community Health": "⚕️",
};

export function ProgramsSection() {
  const { programs } = useData();

  const [activetab, setActiveTab] = useState("mission");

  const displayPrograms = programs.slice(0, 4).map((p) => ({
    title: p.title,
    description: p.description,
    emoji: programEmojis[p.title] || "🌱",
  }));

  return (
    <AnimatedElement variant="fadeInUp">
      <section className="pt-15 sm:pt-22 relative px-4 sm:px-0 md:px-8 bg-background">
        <img
          src="layer1-1.png"
          alt="Program Image"
          className="  absolute hidden sm:inline-block top-10 right-10"
        />
        <img
          src="layer1-2.png"
          alt="Program Image"
          className=" absolute hidden sm:inline-block top-80 right-0  "
        />
        <div className="relative sm:mt-14 sm:flex z-10 max-w-6xl mx-auto">
          <div className="w-full sm:w-2/4   gap-2   sm:pt-5 flex ">
            <span className="w-70   ">
              <span className="h-40 w-full flex items-center justify-center  ">
                <span className="p-3   rounded-full bg-card border-8 border-primary">
                  <img src="/logo.png" className="w-20 h-20   " />
                </span>
              </span>
              <span className="flex-1   h-full">
                <img
                  src="https://html.kodesolution.com/2026/hopenest-html/images/resource/about-1-1.jpg"
                  className="rounded-md w-full h-auto"
                />
              </span>
            </span>
            <span className="w-full  felx-1">
              <img
                src="https://html.kodesolution.com/2026/hopenest-html/images/resource/about-1-2.jpg"
                className="rounded-md w-full h-full"
              />
            </span>
          </div>

          <div className="sm:flex-1  px-5 py-4">
            <p style={{ fontFamily: "Quicksand" }}>Who we are?</p>
            <h1
              style={{ fontFamily: "Quicksand" }}
              className="font-semibold sm:font-bold text-2xl sm:text-5xl text-accent"
            >
              A Charity dedicated to Education, Nutrition and childhood Dignity
            </h1>
            <span className="flex w-full border-b-2 border-border gap-2">
              <Button
                style={{ fontFamily: "Quicksand" }}
                onClick={() => setActiveTab("mission")}
                variant="ghost"
                className={`bg-transparent cursor-pointer font-bold -mb-0.5 hover:bg-transparent hover:text-primary  text-accent mt-4 ${activetab === "mission" ? "border-b-2 rounded-r-none rounded-l-none border-primary" : ""}`}
              >
                Our Mission
              </Button>
              <Button
                style={{ fontFamily: "Quicksand" }}
                onClick={() => setActiveTab("vision")}
                variant="ghost"
                className={`bg-transparent cursor-pointer font-bold -mb-0.5 hover:bg-transparent hover:text-primary  text-accent mt-4 ${activetab === "vision" ? "border-b-2 rounded-r-none rounded-l-none border-primary" : ""}`}
              >
                Our vision
              </Button>
            </span>

            {activetab === "mission" && (
              <p style={{ fontFamily: "Quicksand" }} className="mt-4 ">
                To empower individuals and communities through access to quality
                education and nutritious food, creating sustainable pathways out
                of poverty and enabling every person to reach their full
                potential.
              </p>
            )}
            {activetab === "vision" && (
              <p style={{ fontFamily: "Quicksand" }} className="mt-4 ">
                A world where every child has access to education and proper
                nutrition, where communities are empowered to create lasting
                change, and where opportunity is not determined by circumstance
                of birth.
              </p>
            )}

            <span className="flex gap-4 items-center justify-center mt-6">
              <span className="w-1/2">
                <Link
                  style={{ fontFamily: "Quicksand" }}
                  href="/about"
                  className=" rounded-xlg text-primary rounded-lg justify-center p-3 flex items-center font-bold bg-primary/10 "
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </span>
              <span className="w-1/2">
                <h1
                  style={{ fontFamily: "Quicksand" }}
                  className="font-bold text-green-900 text-3xl"
                >
                  100%{" "}
                </h1>
                <span
                  style={{ fontFamily: "Quicksand" }}
                  className="text-primary font-semibold"
                >
                  Non-Profitable & Transparent
                </span>
              </span>
            </span>
          </div>
        </div>
        <img
          src="/object1-1.png"
          alt="Program Image"
          className="animate-float-slow absolute top-10 hidden sm:inline-block"
        />
      </section>
    </AnimatedElement>
  );
}
