"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/lib/data-context";
import { useState } from "react";

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
              <span className="p-3   rounded-full bg-primary border-8 border-white">
                <img
                  src="https://html.kodesolution.com/2026/hopenest-html/images/resource/about-1-uni-icon.png"
                  className="w-20 h-20   "
                />
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
          <p>Who we are?</p>
          <h1 className="font-semibold sm:font-bold text-2xl sm:text-5xl text-accent">
            A Charity dedicated to Education, Nutrition and childhood Dignity
          </h1>
          <span className="flex w-full border-b-2 border-border gap-2">
            <Button
              onClick={() => setActiveTab("mission")}
              variant="ghost"
              className={`bg-transparent cursor-pointer -mb-0.5 hover:bg-transparent hover:text-primary  text-accent mt-4 ${activetab === "mission" ? "border-b-2 rounded-r-none rounded-l-none border-primary" : ""}`}
            >
              Our Mission
            </Button>
            <Button
              onClick={() => setActiveTab("vision")}
              variant="ghost"
              className={`bg-transparent cursor-pointer -mb-0.5 hover:bg-transparent hover:text-primary  text-accent mt-4 ${activetab === "vision" ? "border-b-2 rounded-r-none rounded-l-none border-primary" : ""}`}
            >
              Our vision
            </Button>
          </span>

          {activetab === "mission" && (
            <p className="mt-4 ">
              To ensure every child receives nutritious food and a safe learning
              environment, empowering them to build a healthier and more
              educated future.
            </p>
          )}
          {activetab === "vision" && (
            <p className="mt-4 ">
              To ensure every child receives nutritious food and a safe learning
              environment, empowering them to build a healthier and more
              educated future.
            </p>
          )}

          <span className="flex gap-4 items-center justify-center mt-6">
            <span className="w-1/2">
              <Button className=" rounded-xlg">
                Learn More
              </Button>
            </span>
            <span className="w-1/2">
              <h1 className="font-bold text-green-900 text-3xl">100% </h1>
              <span className="text-primary font-semibold">Non-Profitable & Transparent</span>
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
  );
}
