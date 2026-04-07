"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Heart, Calendar, MapPin, HeartOff, Target } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import { mockCampaigns, Campaign } from "@/lib/mock-data";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  CampaignCardSkeleton,
  CampaignsSectionSkeleton,
  DonorRecognitionSkeleton,
} from "@/components/campaign/campaign-skeleton-loaders";

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
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);

  const ongoing = useMemo(
    () => mockCampaigns?.find((c) => c.status === "ongoing"),
    [],
  );
  const upcoming = useMemo(
    () => mockCampaigns?.filter((c) => c.status === "upcoming"),
    [],
  );
  const completed = useMemo(
    () => mockCampaigns?.filter((c) => c.status === "completed"),
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

  const {
    data: campaignData,
    isLoading,
    error,
  } = useQuery<any[]>({
    queryKey: ["campaigns", "all"],
  });

  useEffect(() => {
    if (campaignData) {
      setCampaigns(campaignData);
    }
  }, [campaignData]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Enhanced Hero Section */}
      <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <Image
          src="https://img.freepik.com/free-photo/african-kids-enjoying-life_23-2151438321.jpg"
          alt="Campaign background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-green-900/80 via-green-800/70 to-orange-900/60"></div>

        {/* Urgency Banner */}
        <div className="relative z-10 max-w-6xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
            <Calendar className="w-4 h-4" />
            Only {daysRemaining(ongoing.endDate)} days left to make a
            difference!
          </div>
        </div>

        <AnimatedContainer className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Campaign Info */}
            <AnimatedElement variant="fadeInLeft" className="space-y-6">
              <div className="space-y-4">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                  style={{ fontFamily: "Quicksand" }}
                >
                  {ongoing.title}
                </h1>
                <p
                  className="text-lg sm:text-xl text-white/90 leading-relaxed"
                  style={{ fontFamily: "Quicksand" }}
                >
                  {ongoing.tagline}
                </p>
              </div>

              {/* Progress Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      <AnimatedCounter value={ongoing.raised} prefix="$" />
                    </div>
                    <p className="text-white/80 text-sm">Raised</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-orange-300 mb-1">
                      <AnimatedCounter value={ongoing.goal} prefix="$" />
                    </div>
                    <p className="text-white/80 text-sm">Goal</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm text-white/80 mb-2">
                    <span>Progress</span>
                    <span>
                      <AnimatedCounter value={progress} suffix="%" />
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {/* Mock donor avatars */}
                  <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    SM
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    AK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                    +12
                  </div>
                </div>
                <p className="text-white/90 text-sm">
                  Join{" "}
                  <span className="font-semibold text-orange-300">
                    247 donors
                  </span>{" "}
                  this month
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/donate" className="flex-1 sm:flex-none">
                  <Button
                    size="lg"
                    className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Give Hope Today
                    <Heart className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 sm:flex-none border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  See Impact Stories
                </Button> */}
              </div>
            </AnimatedElement>

            {/* Right Column - Campaign Image */}
            <AnimatedElement variant="fadeInRight" className="relative">
              <div className="relative h-127 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={ongoing.image.url}
                  alt={ongoing.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Stats */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-800">
                      {daysRemaining(ongoing.endDate)} days left
                    </span>
                  </div>
                </div>

                {/* Impact Quote */}
                <div className="absolute bottom-6 left-6 right-6">
                  <blockquote className="text-white">
                    <p className="text-lg font-semibold mb-2 italic">
                      "Your donation today becomes hope tomorrow"
                    </p>
                    <footer className="text-sm text-white/80">
                      — Seeds of Love Foundation
                    </footer>
                  </blockquote>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </AnimatedContainer>
      </section>
      {/* Campaign Milestones */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement variant="fadeInUp" className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Quicksand" }}
            >
              Our Journey to{" "}
              {ongoing.goal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every milestone reached brings us closer to our goal of
              transforming lives
            </p>
          </AnimatedElement>

          <AnimatedContainer className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
              {[
                {
                  amount: 5000,
                  label: "Education Fund",
                  status: "completed",
                  description: "Provided school supplies for 100 children",
                },
                {
                  amount: 15000,
                  label: "Nutrition Program",
                  status: "completed",
                  description: "Delivered meals to 50 families weekly",
                },
                {
                  amount: 25000,
                  label: "Clean Water Initiative",
                  status: "completed",
                  description: "Install water systems in 3 communities",
                },
                {
                  amount: ongoing.goal,
                  label: "Full Transformation",
                  status: progress >= 100 ? "completed" : "goal",
                  description: "Complete community development program",
                },
              ].map((milestone, index) => (
                <AnimatedElement
                  key={index}
                  variant="scaleIn"
                  delay={index * 0.1}
                  className="text-center"
                >
                  <div
                    className={`relative mb-4 ${index < 3 ? "z-10" : "z-0"}`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto rounded-full  flex items-center justify-center ${
                        milestone.status === "completed"
                          ? "bg-green-500 border-green-500 text-white"
                          : milestone.status === "goal"
                            ? "bg-orange-500 border-orange-500 text-white"
                            : ""
                      }`}
                    >
                      {milestone.status === "completed" ? (
                        <HeartOff className="w-8 h-8" />
                      ) : milestone.status === "goal" ? (
                        <span className="text-xl font-bold">
                          <Target className="w-8 h-8" />
                        </span>
                      ) : (
                        <span className="text-xl font-bold">⏳</span>
                      )}
                    </div>
                    {/* {index < 3 && (
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300"></div>
                    )} */}
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${milestone.amount.toLocaleString()}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {milestone.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {milestone.description}
                    </p>
                    {milestone.status === "completed" && (
                      <div className="mt-2 inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                        <span>✓</span>
                        Achieved
                      </div>
                    )}
                  </div>
                </AnimatedElement>
              ))}
            </div>

            {/* Current Progress Indicator */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">
                  Currently at{" "}
                  <span className="text-green-600 font-bold">
                    ${ongoing.raised.toLocaleString()}
                  </span>
                  ({progress}% of goal)
                </span>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-16 hidden px-4 sm:px-6 lg:px-8 bg-linear-to-br from-orange-50 to-green-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement variant="fadeInUp" className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Quicksand" }}
            >
              Stories of Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how your donations are creating real change in the lives of
              children and families
            </p>
          </AnimatedElement>

          <AnimatedContainer className="grid hidden grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <AnimatedElement variant="fadeInUp" delay={0.1} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/user.avif"
                    alt="Maria's Story"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Maria's Journey</p>
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-gray-700 italic mb-4">
                    "Thanks to donors like you, I now have access to quality
                    education and nutritious meals. My future is brighter than
                    ever!"
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-600">
                        M
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Maria, Age 12
                      </p>
                      <p className="text-xs text-gray-500">Student</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            {/* Story 2 */}
            <AnimatedElement variant="fadeInUp" delay={0.2} className="group">
              <Card className="overflow-hidden pt-0 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/user.avif"
                    alt="Community Impact"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Community Garden</p>
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-gray-700 italic mb-4">
                    "The community garden project has provided fresh vegetables
                    for 50 families. We're healthier and more self-sufficient
                    now."
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">
                        C
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Community Leader
                      </p>
                      <p className="text-xs text-gray-500">Local Coordinator</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            {/* Story 3 */}
            <AnimatedElement variant="fadeInUp" delay={0.3} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/user.avif"
                    alt="School Support"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Education Support</p>
                  </div>
                </div>
                <div className="p-6">
                  <blockquote className="text-gray-700 italic mb-4">
                    "Clean water and proper sanitation at our school have
                    reduced illness by 70%. Children can focus on learning
                    instead of being sick."
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">T</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Teacher Sarah
                      </p>
                      <p className="text-xs text-gray-500">School Principal</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedElement>
          </AnimatedContainer>
        </div>
      </section>

      {/* Donor Recognition Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-green-600 to-green-700">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement variant="fadeInUp" className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Quicksand" }}
            >
              Wall of Hope & Generosity
            </h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Celebrating our amazing donors who are making a difference
            </p>
          </AnimatedElement>

          {isLoading ? (
            <DonorRecognitionSkeleton />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Top Donors */}
              <AnimatedElement variant="fadeInLeft">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-300" />
                      Top Contributors
                    </h3>
                    <div className="space-y-4">
                      {[
                        { name: "Anonymous", amount: 2500, badge: "🥇" },
                        { name: "Sarah M.", amount: 1500, badge: "🥈" },
                        { name: "John D.", amount: 1200, badge: "🥉" },
                        { name: "Community Fund", amount: 1000, badge: "🏆" },
                      ].map((donor, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{donor.badge}</span>
                            <div>
                              <p className="text-white font-medium">
                                {donor.name}
                              </p>
                              <p className="text-green-200 text-sm">
                                Recent donor
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-300 font-bold">
                              ${donor.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedElement>

              {/* Recent Activity */}
              <AnimatedElement variant="fadeInRight">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-300" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Emma K.",
                          amount: 50,
                          time: "2 hours ago",
                          message: "Hope this helps!",
                        },
                        {
                          name: "Mike R.",
                          amount: 100,
                          time: "5 hours ago",
                          message: "For the children",
                        },
                        {
                          name: "Lisa T.",
                          amount: 25,
                          time: "1 day ago",
                          message: "Small change, big impact",
                        },
                        {
                          name: "David W.",
                          amount: 75,
                          time: "2 days ago",
                          message: "Keep up the great work",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-white/10 rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {activity.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-white font-medium text-sm">
                                {activity.name}
                              </p>
                              <p className="text-green-200 text-xs">
                                {activity.time}
                              </p>
                            </div>
                            <p className="text-orange-300 font-bold text-sm">
                              ${activity.amount}
                            </p>
                            <p className="text-green-100 text-xs italic">
                              "{activity.message}"
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedElement>
            </div>
          )}

          {/* Call to Action */}
          <AnimatedElement variant="fadeInUp" className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Join Our Community of Changemakers
              </h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Every donation, no matter the size, creates ripples of hope.
                Your generosity inspires others and transforms lives.
              </p>
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Make Your Impact Today
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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
          </div> */}

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">
              Upcoming Campaigns
            </h2>
            <p className="text-foreground/70 mt-2">
              See what’s coming next and how you can help.
            </p>
            {isLoading ? (
              <CampaignsSectionSkeleton count={2} />
            ) : (
              <AnimatedContainer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcoming.map((campaign, index) => (
                  <AnimatedElement
                    key={campaign.id}
                    variant="fadeInUp"
                    delay={index * 0.12}
                    className="overflow-hidden group"
                  >
                    <Card className="overflow-hidden rounded-[30px] border border-white/10 bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                      <div className="relative h-96 overflow-hidden">
                        <Image
                          src={campaign.image.url}
                          alt={campaign.title}
                          fill
                          className="object-cover h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                        <div className="absolute top-4 left-4 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">
                          Upcoming
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                          <h3 className="text-xl font-semibold">
                            {campaign.title}
                          </h3>
                          <p className="text-sm opacity-90">
                            {campaign.tagline}
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                            Campaign
                          </p>
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            <Heart className="w-3.5 h-3.5 text-orange-500" />
                            {formatCurrency(campaign.goal)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-5 line-clamp-3">
                          {campaign.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded-2xl bg-slate-100 p-3">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                              Ends
                            </p>
                            <p className="font-semibold text-slate-900">
                              {new Date(campaign.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-slate-100 p-3">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                              Status
                            </p>
                            <p className="font-semibold text-slate-900">
                              Upcoming
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </AnimatedElement>
                ))}
              </AnimatedContainer>
            )}
          </section>

          {completed?.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground">
                Completed Campaigns
              </h2>
              <p className="text-foreground/70 mt-2">
                Our past campaigns that have reached their goals.
              </p>
              {isLoading ? (
                <CampaignsSectionSkeleton count={2} />
              ) : (
                <AnimatedContainer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completed.map((campaign, index) => (
                    <AnimatedElement
                      key={campaign.id}
                      variant="fadeInUp"
                      delay={index * 0.12}
                      className="overflow-hidden group"
                    >
                      <Card className="overflow-hidden rounded-[30px] border border-white/10 bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <div className="relative h-96 overflow-hidden">
                          <Image
                            src={campaign.image.url}
                            alt={campaign.title}
                            fill
                            className="object-cover h-full transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                          <div className="absolute top-4 left-4 rounded-full bg-emerald-600/90 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">
                            Completed
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                            <h3 className="text-xl font-semibold">
                              {campaign.title}
                            </h3>
                            <p className="text-sm opacity-90">
                              {campaign.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                              Completed
                            </p>
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                              <Heart className="w-3.5 h-3.5 text-emerald-600" />
                              Raised {formatCurrency(campaign.raised)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-5 line-clamp-3">
                            {campaign.description}
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="rounded-2xl bg-slate-100 p-3">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                Finished
                              </p>
                              <p className="font-semibold text-slate-900">
                                {new Date(
                                  campaign.endDate,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-slate-100 p-3">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                Donations
                              </p>
                              <p className="font-semibold text-slate-900">
                                {campaign.donations.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </AnimatedElement>
                  ))}
                </AnimatedContainer>
              )}
            </section>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <AnimatedElement variant="fadeInUp" className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "Quicksand" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about donating and our impact
            </p>
          </AnimatedElement>

          <AnimatedContainer className="space-y-6">
            {[
              {
                question: "How is my donation used?",
                answer:
                  "100% of your donation goes directly to program implementation. We cover operational costs through separate fundraising efforts, ensuring every dollar you give creates maximum impact.",
              },
              {
                question: "Is my donation tax-deductible?",
                answer:
                  "Yes! Seeds of Love Foundation is a registered 501(c)(3) nonprofit organization. You'll receive a tax deduction for your generous contribution.",
              },
              {
                question: "How do I know my donation is making a difference?",
                answer:
                  "We provide regular impact reports, photos, and stories from the field. You'll see exactly how your contribution is transforming lives in real-time.",
              },
              {
                question: "Can I choose how my donation is used?",
                answer:
                  "While we allocate funds based on greatest need, you can specify preferences for education, nutrition, or community development programs.",
              },
              {
                question: "Is my payment information secure?",
                answer:
                  "Absolutely. We use bank-level SSL encryption and trusted payment processors. Your financial information is never stored on our servers.",
              },
              {
                question: "Can I set up recurring donations?",
                answer:
                  "Yes! Monthly donations provide stability for our programs and allow us to plan long-term impact initiatives.",
              },
            ].map((faq, index) => (
              <AnimatedElement
                key={index}
                variant="fadeInUp"
                delay={index * 0.1}
              >
                <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </Card>
              </AnimatedElement>
            ))}
          </AnimatedContainer>

          {/* Trust Signals */}
          <AnimatedElement variant="fadeInUp" className="mt-12">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Trusted & Transparent
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: "🔒", label: "Secure Payments" },
                  { icon: "📊", label: "Impact Reports" },
                  { icon: "✅", label: "Tax Deductible" },
                  { icon: "🤝", label: "Partner Verified" },
                ].map((trust, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-3xl mb-2">{trust.icon}</div>
                    <p className="text-sm font-medium text-gray-700">
                      {trust.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </main>
  );
}
