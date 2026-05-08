"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, Heart } from "lucide-react";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import { mockSponsorshipProfiles } from "@/lib/mock-data";
import SponsorshipCard from "@/components/public/sponsorship-card";

const ageGroups = ["All", "0-5", "6-12", "13-18"] as const;
const familyStatuses = ["All", "Total Orphans", "Single Parent"] as const;

export default function SponsorBrowsePage() {
  const [selectedAgeGroup, setSelectedAgeGroup] =
    useState<(typeof ageGroups)[number]>("All");
  const [selectedFamilyStatus, setSelectedFamilyStatus] =
    useState<(typeof familyStatuses)[number]>("All");

  const filteredProfiles = useMemo(() => {
    return mockSponsorshipProfiles.filter((profile) => {
      const ageMatch =
        selectedAgeGroup === "All" || profile.ageGroup === selectedAgeGroup;
      const statusMatch =
        selectedFamilyStatus === "All" ||
        profile.familyStatus === selectedFamilyStatus;
      return ageMatch && statusMatch;
    });
  }, [selectedAgeGroup, selectedFamilyStatus]);

  const totalOrphans = mockSponsorshipProfiles.filter(
    (profile) => profile.familyStatus === "Total Orphans",
  ).length;
  const totalSingleParents = mockSponsorshipProfiles.filter(
    (profile) => profile.familyStatus === "Single Parent",
  ).length;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-linear-to-r from-green-900 via-emerald-900 to-lime-900 py-16">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-white/90">
                <Sparkles size={18} /> Child Sponsorship
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Meet the children who need your support
              </h1>
              <p className="max-w-2xl text-lg text-white/85">
                Browse profiles of young learners and families who are waiting
                for sponsorship. Filter by age, family situation, and click
                through to learn more about each child’s story.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                    Children available
                  </p>
                  <p className="mt-3 text-3xl font-bold text-white">
                    {mockSponsorshipProfiles.length}
                  </p>
                </Card>
                <Card className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                    Orphan & family support
                  </p>
                  <p className="mt-3 text-3xl font-bold text-white">
                    {totalOrphans + totalSingleParents}
                  </p>
                </Card>
              </div>
            </div>
            <div className="rounded-4xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                    Quick facts
                  </p>
                  <h2 className="mt-3 text-3xl font-bold">
                    Support journeys that matter
                  </h2>
                </div>
                <Heart size={32} className="text-primary" />
              </div>
              <ul className="mt-8 space-y-4 text-sm text-white/80">
                <li className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Each sponsorship helps provide education, meals, and
                  stability.
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Profiles are curated to show urgent need and long-term impact.
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Use the filters to focus on age range or family status.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <Card className="rounded-4xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Filter profiles
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Refine by age and orphan status.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Age Group
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {ageGroups.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setSelectedAgeGroup(group)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                          selectedAgeGroup === group
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Family Status
                  </p>
                  <div className="grid gap-3">
                    {familyStatuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setSelectedFamilyStatus(status)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                          selectedFamilyStatus === status
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    setSelectedAgeGroup("All");
                    setSelectedFamilyStatus("All");
                  }}
                  className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Reset Filters
                </Button>
              </div>
            </Card>

            <Card className="rounded-4xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                Snapshot
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm text-muted-foreground">
                    Total children
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {mockSponsorshipProfiles.length}
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm text-muted-foreground">Total orphans</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {totalOrphans}
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm text-muted-foreground">
                    Single parent homes
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">
                    {totalSingleParents}
                  </p>
                </div>
              </div>
            </Card>
          </aside>

          <div>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                  Profiles
                </p>
                <h2 className="mt-3 text-3xl font-bold text-foreground">
                  Children who need sponsorship
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Showing {filteredProfiles.length} of{" "}
                  {mockSponsorshipProfiles.length} profiles.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card px-5 py-3 text-sm text-foreground shadow-sm">
                <p className="text-muted-foreground">Active filters</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {selectedAgeGroup}, {selectedFamilyStatus}
                </p>
              </div>
            </div>

            <AnimatedContainer className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <AnimatedElement key={profile._id} variant="scaleIn">
                    <SponsorshipCard profile={profile} />
                  </AnimatedElement>
                ))
              ) : (
                <Card className="rounded-4xl border border-border bg-card p-10 text-center">
                  <p className="text-lg font-semibold text-foreground">
                    No profiles match your filters.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Try resetting filters or choosing a different age group.
                  </p>
                </Card>
              )}
            </AnimatedContainer>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
