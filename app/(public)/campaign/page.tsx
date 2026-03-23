"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Heart, Calendar, MapPin } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import { mockCampaigns, Campaign } from "@/lib/mock-data";
import Link from "next/link";

function formatCurrency(value: number) {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function daysRemaining(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
}

export default function CampaignPage() {
  const ongoing = useMemo(
    () => mockCampaigns.find((c) => c.status === "ongoing"),
    [],
  );
  const upcoming = useMemo(
    () => mockCampaigns.filter((c) => c.status === "upcoming"),
    [],
  );
  const completed = useMemo(
    () => mockCampaigns.filter((c) => c.status === "completed"),
    [],
  );

  if (!ongoing) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="py-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Donation Campaigns
          </h1>
          <p className="text-foreground/70">
            No active campaigns at the moment. Please check back soon.
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  const progress = Math.min(
    100,
    Math.round((ongoing.raised / ongoing.goal) * 100),
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <Image
          src="https://img.freepik.com/free-photo/african-kids-enjoying-life_23-2151438321.jpg"
          alt="Campaign background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-green-900/70"></div>
        <AnimatedContainer className="relative z-10 max-w-6xl mx-auto">
          <AnimatedElement variant="fadeInUp" className="space-y-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "Quicksand" }}
            >
              Support Our Ongoing Campaigns
            </h1>
            <p
              className="text-base sm:text-lg text-white/90 max-w-2xl"
              style={{ fontFamily: "Quicksand" }}
            >
              Join us in making a lasting impact. Browse our current and
              upcoming campaigns to see how you can help bring positive change
              to communities in need.
            </p>
          </AnimatedElement>
        </AnimatedContainer>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedElement
              variant="fadeInLeft"
              className="relative h-[380px] rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={ongoing.image.url}
                alt={ongoing.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                  <Calendar className="size-4" />
                  Ends in {daysRemaining(ongoing.endDate)} days
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement variant="fadeInRight" className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {ongoing.title}
                </h1>
                <p className="mt-3 text-lg text-foreground/70">
                  {ongoing.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="text-sm font-medium text-foreground/70">
                    Raised
                  </p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    <AnimatedCounter value={ongoing.raised} prefix="$" />
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <p className="text-sm font-medium text-foreground/70">Goal</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">
                    <AnimatedCounter value={ongoing.goal} prefix="$" />
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>Progress</span>
                  <span>
                    <AnimatedCounter value={progress} suffix="%" />
                  </span>
                </div>
                <Progress value={progress} />
              </div>

              <p className="text-foreground/70 leading-relaxed">
                {ongoing.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <Link href="/donate" className="w-full sm:w-auto">
                  <Button>Donate Now</Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto">
                  Share Campaign
                </Button>
              </div>
            </AnimatedElement>
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">
              Upcoming Campaigns
            </h2>
            <p className="text-foreground/70 mt-2">
              See what’s coming next and how you can help.
            </p>
            <AnimatedContainer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((campaign, index) => (
                <AnimatedElement
                  key={campaign.id}
                  variant="fadeInUp"
                  delay={index * 0.12}
                  className="overflow-hidden"
                >
                  <Card className="overflow-hidden pt-0">
                    <div className="relative h-96">
                      <Image
                        src={campaign.image.url}
                        alt={campaign.title}
                        fill
                        className="object-cover h-full"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-semibold">
                          {campaign.title}
                        </h3>
                        <p className="text-sm opacity-90">{campaign.tagline}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-foreground/70 mb-3">
                        {campaign.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-4" />
                          Starts soon
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Heart className="size-4" />
                          Goal:{" "}
                          <AnimatedCounter value={campaign.goal} prefix="$" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </AnimatedElement>
              ))}
            </AnimatedContainer>
          </section>

          {completed.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground">
                Completed Campaigns
              </h2>
              <p className="text-foreground/70 mt-2">
                Our past campaigns that have reached their goals.
              </p>
              <AnimatedContainer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {completed.map((campaign, index) => (
                  <AnimatedElement
                    key={campaign.id}
                    variant="fadeInUp"
                    delay={index * 0.12}
                    className="overflow-hidden"
                  >
                    <Card className="overflow-hidden pt-0">
                      <div className="relative h-96">
                        <Image
                          src={campaign.image.url}
                          alt={campaign.title}
                          fill
                          className="object-conatin h-full"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-semibold">
                            {campaign.title}
                          </h3>
                          <p className="text-sm opacity-90">
                            {campaign.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-foreground/70 mb-3">
                          {campaign.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-4" />
                            Completed{" "}
                            {new Date(campaign.endDate).toLocaleDateString()}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Heart className="size-4" />
                            Raised{" "}
                            <AnimatedCounter
                              value={campaign.raised}
                              prefix="$"
                            />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </AnimatedElement>
                ))}
              </AnimatedContainer>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
