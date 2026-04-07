"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatedElement } from "@/components/motion/animated-elements";
import { Calendar, Target, DollarSign } from "lucide-react";

interface Campaign {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  goal: number;
  raised: number;
  endDate: string;
  status: string;
  donations: string[];
}

interface CampaignPreviewProps {
  campaign: Campaign;
}

export function CampaignPreview({ campaign }: CampaignPreviewProps) {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;
  const formattedGoal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(campaign.goal);
  const formattedRaised = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(campaign.raised);

  const endDate = new Date(campaign.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <AnimatedElement variant="fadeInUp">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: "Quicksand" }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Our Current Campaign
            </h2>
            <p
              style={{ fontFamily: "Quicksand" }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Join us in making a difference. Every contribution counts toward
              our goal.
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Campaign Image */}
              <div className="relative h-64 lg:h-full min-h-[300px]">
                <img
                  src={campaign.image.url}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Ongoing Campaign
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <h3
                    style={{ fontFamily: "Quicksand" }}
                    className="text-2xl lg:text-3xl font-bold text-accent mb-2"
                  >
                    {campaign.title}
                  </h3>
                  <p
                    style={{ fontFamily: "Quicksand" }}
                    className="text-primary font-semibold mb-4 text-lg"
                  >
                    {campaign.tagline}
                  </p>
                  <p
                    style={{ fontFamily: "Quicksand" }}
                    className="text-muted-foreground mb-6 leading-relaxed"
                  >
                    {campaign.description}
                  </p>

                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span
                        style={{ fontFamily: "Quicksand" }}
                        className="text-sm font-semibold text-accent"
                      >
                        Progress
                      </span>
                      <span
                        style={{ fontFamily: "Quicksand" }}
                        className="text-sm text-muted-foreground"
                      >
                        {progressPercentage.toFixed(1)}% funded
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 mb-3" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign size={16} className="text-primary" />
                        <span
                          style={{ fontFamily: "Quicksand" }}
                          className="font-semibold text-accent"
                        >
                          {formattedRaised} raised
                        </span>
                      </span>
                      <span
                        style={{ fontFamily: "Quicksand" }}
                        className="text-muted-foreground"
                      >
                        Goal: {formattedGoal}
                      </span>
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar size={16} className="text-primary" />
                    <span
                      style={{ fontFamily: "Quicksand" }}
                      className="text-sm text-muted-foreground"
                    >
                      Ends: {endDate}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/donate" className="flex-1">
                    <Button
                      style={{ fontFamily: "Quicksand" }}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 text-lg"
                    >
                      Donate Now
                    </Button>
                  </Link>
                  <Link href="/campaign" className="flex-1">
                    <Button
                      style={{ fontFamily: "Quicksand" }}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 text-lg"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}
