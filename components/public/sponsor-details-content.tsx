"use client";

import { useState } from "react";
import type { SponsorshipProfile } from "@/lib/mock-data";
import SponsorshipFormModal from "@/components/public/sponsorship-form-modal";
import HeroSection from "@/components/public/sponsor-details/hero-section";
import ProfileSection from "@/components/public/sponsor-details/profile-section";
import { ProfileFieldGroup } from "@/components/public/sponsor-details/profile-field";
import ImpactMetrics from "@/components/public/sponsor-details/impact-metrics";
import RelatedProfiles from "@/components/public/sponsor-details/related-profiles";
import {
  User,
  Calendar,
  Globe,
  MapPin,
  Book,
  Users,
  Heart,
  Sparkles,
  Banknote,
} from "lucide-react";

interface SponsorDetailsContentProps {
  profile: SponsorshipProfile;
  relatedKids: SponsorshipProfile[];
}

export default function SponsorDetailsContent({
  profile,
  relatedKids,
}: SponsorDetailsContentProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onSponsorClick={() => setIsFormModalOpen(true)}
        />

        {/* Main Content */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
              {/* Left column - Personal & Family Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Details */}
                <ProfileSection
                  title="Personal Details"
                  icon={<User size={20} />}
                  delay={0.1}
                >
                  <ProfileFieldGroup
                    fields={[
                      {
                        label: "Given Name",
                        value: profile.givenName,
                        icon: <User size={16} />,
                      },
                      {
                        label: "Gender",
                        value: profile.gender,
                        icon: <Sparkles size={16} />,
                      },
                      {
                        label: "Date of Birth",
                        value: new Date(profile.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        ),
                        icon: <Calendar size={16} />,
                      },
                      {
                        label: "Age",
                        value: `${profile.age} years old`,
                        icon: <Sparkles size={16} />,
                      },
                      {
                        label: "Class/Grade",
                        value: profile.class,
                        icon: <Book size={16} />,
                      },
                      {
                        label: "Nationality",
                        value: profile.nationality,
                        icon: <Globe size={16} />,
                      },
                    ]}
                    columns={2}
                  />
                </ProfileSection>

                {/* Family Structure */}
                <ProfileSection
                  title="Family & Support"
                  icon={<Users size={20} />}
                  delay={0.2}
                >
                  <ProfileFieldGroup
                    fields={[
                      {
                        label: "Family Status",
                        value: profile.familyStatus,
                        icon: <Heart size={16} />,
                      },
                      {
                        label: "Number of Parents",
                        value: profile.numberOfParents,
                        icon: <Users size={16} />,
                      },
                      {
                        label: "Guardian(s)",
                        value:
                          profile.guardianNames &&
                          profile.guardianNames.length > 0
                            ? profile.guardianNames.join(", ")
                            : "No guardians listed",
                        icon: <Heart size={16} />,
                      },
                      {
                        label: "School",
                        value: profile.school,
                        icon: <Book size={16} />,
                      },
                    ]}
                    columns={2}
                  />
                </ProfileSection>

                {/* About & Interests */}
                <ProfileSection
                  title={`About ${profile.firstName}`}
                  icon={<Sparkles size={20} />}
                  delay={0.3}
                >
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3">
                        Background & Story
                      </p>
                      <p className="text-base leading-relaxed text-gray-700">
                        {profile.background}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">
                        Hobbies & Interests
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.hobbies &&
                          profile.hobbies.map((hobby) => (
                            <span
                              key={hobby}
                              className="inline-flex items-center rounded-full bg-linear-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-700 hover:from-green-200 hover:to-emerald-200 transition-all"
                            >
                              {hobby}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">
                        Why Support is Needed
                      </p>
                      <ul className="space-y-3">
                        {profile.needs.map((need, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-green-100 to-emerald-100">
                              <span className="w-2 h-2 rounded-full bg-green-600" />
                            </span>
                            <span className="text-base text-gray-700">
                              {need}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ProfileSection>

                {/* Sponsorship Details */}
                <ProfileSection
                  title="Sponsorship Details"
                  icon={<Banknote size={20} />}
                  delay={0.4}
                >
                  <ProfileFieldGroup
                    fields={[
                      {
                        label: "Monthly Support Need",
                        value: profile.monthlyNeed,
                        icon: <Banknote size={16} />,
                      },
                      {
                        label: "Location",
                        value: profile.location,
                        icon: <MapPin size={16} />,
                      },
                    ]}
                    columns={2}
                  />
                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your monthly sponsorship provides essential support for{" "}
                      <span className="font-semibold text-green-700">
                        {profile.firstName}
                      </span>
                      's education, nutrition, healthcare, and personal
                      development. Together, we're creating lasting change.
                    </p>
                  </div>
                </ProfileSection>
              </div>

              {/* Right column - Interest & CTA */}
              <div className="space-y-6">
                {/* Interests */}
                <ProfileSection
                  title="Interests"
                  icon={<Heart size={20} />}
                  className="lg:sticky lg:top-24"
                  delay={0.2}
                >
                  <div className="space-y-3">
                    {profile.interests && profile.interests.length > 0 ? (
                      profile.interests.map((interest, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 hover:border-blue-300/80 transition-all"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {interest}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">
                        No specific interests listed
                      </p>
                    )}
                  </div>
                </ProfileSection>

                {/* Quick Stats */}
                <ProfileSection title="Quick Facts" delay={0.3}>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                        Age Group
                      </p>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        {profile.ageGroup}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50">
                      <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                        Status
                      </p>
                      <p className="text-xl font-bold text-gray-900 mt-2">
                        {profile.familyStatus}
                      </p>
                    </div>
                  </div>
                </ProfileSection>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <ImpactMetrics profile={profile} />

        {/* Related Profiles */}
        {relatedKids.length > 0 && (
          <RelatedProfiles
            profiles={relatedKids}
            currentProfileId={profile._id}
          />
        )}
      </main>

      {/* Sponsorship Form Modal */}
      <SponsorshipFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        childProfile={profile}
      />
    </>
  );
}
