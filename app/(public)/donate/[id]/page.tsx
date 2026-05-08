import { notFound } from "next/navigation";
import { mockSponsorshipProfiles } from "@/lib/mock-data";
import SponsorDetailsContent from "@/components/public/sponsor-details-content";

interface SponsorDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SponsorDetailsPage({
  params,
}: SponsorDetailsPageProps) {
  const { id } = await params;
  const profile = mockSponsorshipProfiles.find((item) => item._id === id);

  if (!profile) {
    notFound();
  }

  const relatedKids = mockSponsorshipProfiles
    .filter(
      (item) => item.ageGroup === profile.ageGroup && item._id !== profile._id,
    )
    .slice(0, 3);

  return <SponsorDetailsContent profile={profile} relatedKids={relatedKids} />;
}
