"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Heart, Star, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";

interface Donor {
  id: string;
  name: string;
  amount: number;
  date: string;
  message?: string;
}

const topDonors: Donor[] = [
  {
    id: "donor-1",
    name: "Amina Patel",
    amount: 1200,
    date: "2026-03-01",
    message: "For the children.",
  },
  {
    id: "donor-2",
    name: "Samuel Osei",
    amount: 950,
    date: "2026-02-22",
    message: "In honor of my family.",
  },
  {
    id: "donor-3",
    name: "Grace Abbott",
    amount: 850,
    date: "2026-03-05",
    message: "Together we can do more.",
  },
  {
    id: "donor-4",
    name: "Mateo Suarez",
    amount: 700,
    date: "2026-03-10",
    message: "For hope and healing.",
  },
  {
    id: "donor-5",
    name: "Sofia Nguyen",
    amount: 650,
    date: "2026-02-27",
    message: "Blessings to all.",
  },
];

const impactMetrics = [
  { title: "Meals Provided", value: 4500, suffix: "+" },
  { title: "Students Supported", value: 170, suffix: "+" },
  { title: "Water Filters Installed", value: 24, suffix: "" },
  { title: "Communities Reached", value: 12, suffix: "" },
];

function formatCurrency(value: number) {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function DonatePage() {
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [note, setNote] = useState("");

  const totalRaised = useMemo(() => {
    return topDonors.reduce((sum, donor) => sum + donor.amount, 0);
  }, []);

  const goal = 50000;
  const progress = Math.min(100, Math.round((totalRaised / goal) * 100));

  const handleSelectAmount = (value: string) => {
    setAmount(value);
    setCustomAmount("");
  };

  const calculatedAmount = customAmount ? Number(customAmount) : Number(amount);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900 via-green-800 to-emerald-900">
        <Image
          src="https://legendfinancial.co.uk/wp-content/uploads/2024/12/LF-Blog-11-How-Tax-Relief-on-Charity-Donations-ft.webp"
          alt="Donation background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900/70"></div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedElement variant="fadeInLeft" className="space-y-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80">
              <Sparkles className="size-4" /> Faith & Giving
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Give with Joy & Make a Lasting Impact
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-xl">
              "Each one must give as he has decided in his heart, not
              reluctantly or under compulsion, for God loves a cheerful giver."{" "}
              <br />– 2 Corinthians 9:7
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-6 bg-white/10 border border-white/10">
                <h3 className="text-lg font-semibold text-white">Why Give?</h3>
                <p className="mt-2 text-sm text-white/80">
                  Your donation helps provide education, nutrition, and clean
                  water to communities in need.
                </p>
              </Card>
              <Card className="p-6 bg-white/10 border border-white/10">
                <h3 className="text-lg font-semibold text-white">
                  Where it goes
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Funds are directed to programs that empower families, support
                  children, and build sustainable futures.
                </p>
              </Card>
            </div>
          </AnimatedElement>

          <AnimatedElement
            variant="fadeInRight"
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/donation-image.jpg"
              alt="Hands holding heart-shaped earth"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative p-8 sm:p-10 lg:p-12 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="size-5 text-primary" />
                <div>
                  <p className="text-sm uppercase tracking-wide text-white/80">
                    Current Goal
                  </p>
                  <p className="text-2xl font-semibold">
                    <AnimatedCounter value={goal} prefix="$" />
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Total Raised</span>
                  <span className="font-semibold">
                    <AnimatedCounter value={totalRaised} prefix="$" />
                  </span>
                </div>
                <Progress value={progress} />
                <p className="text-xs text-white/70">
                  <AnimatedCounter value={progress} suffix="%" /> funded
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Donation Form + Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground">
                Make a Donation
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                Choose an amount or enter your own, then proceed to donate.
                Every gift helps us reach more people.
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {["25", "50", "100"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSelectAmount(value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        amount === value && !customAmount
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {formatCurrency(Number(value))}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Input
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value.replace(/[^0-9]/g, ""));
                      setAmount("0");
                    }}
                    className="pl-4 py-3"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/50">
                    USD
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    Message (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Leave a note or prayer request..."
                    className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    rows={4}
                  />
                </div>

                <Button className="w-full py-3">
                  Donate {formatCurrency(calculatedAmount || 0)}
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold text-foreground">
                Impact By The Numbers
              </h3>
              <AnimatedContainer className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {impactMetrics.map((metric, index) => (
                  <AnimatedElement
                    key={metric.title}
                    variant="fadeInUp"
                    delay={index * 0.12}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <Star className="size-5" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-foreground">
                          <AnimatedCounter
                            value={metric.value}
                            suffix={metric.suffix}
                          />
                        </p>
                        <p className="text-sm text-foreground/70">
                          {metric.title}
                        </p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </AnimatedContainer>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground">
                Hall of Thanks
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                Recognizing our most generous supporters who help make this work
                possible.
              </p>

              <AnimatedContainer className="mt-6 space-y-4">
                {topDonors.map((donor, index) => (
                  <AnimatedElement
                    key={donor.id}
                    variant="fadeInUp"
                    delay={index * 0.12}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {donor.name}
                      </p>
                      <p className="text-xs text-foreground/70">
                        {donor.message}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {new Date(donor.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-foreground">
                        <AnimatedCounter value={donor.amount} prefix="$" />
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-foreground/70">
                        <Heart className="size-4 text-primary" />
                        Top Donor
                      </span>
                    </div>
                  </AnimatedElement>
                ))}
              </AnimatedContainer>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground">
                How Your Gift Helps
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Supplies for children in our education programs.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Nutritious meal packages for families.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Clean water systems for schools.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Training and resources for local leaders.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
