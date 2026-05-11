"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useData } from "@/lib/data-context";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";

export default function DashboardPage() {
  const { programs, donations, getTotalDonations, getTotalImpact } = useData();

  const totalDonations = getTotalDonations();
  const activePrograms = programs.filter((p) => p.status === "active").length;
  const totalPeopleImpacted = getTotalImpact();

  const stats = [
    {
      label: "Total Programs",
      value: programs.length.toString(),
      color: "bg-primary",
    },
    {
      label: "Total Donations",
      value: `$${(totalDonations / 1000).toFixed(0)}K`,
      color: "bg-accent",
    },
    {
      label: "Active Programs",
      value: activePrograms.toString(),
      color: "bg-primary",
    },
    {
      label: "People Impacted",
      value: `${(totalPeopleImpacted / 1000).toFixed(1)}K+`,
      color: "bg-accent",
    },
  ];

  const recentActivities = [
    {
      activity: "New donation received",
      amount:
        donations.length > 0
          ? `$${donations[0].amount.toLocaleString()}`
          : "$0",
      time: "Recently",
    },
    {
      activity: `${activePrograms} programs currently active`,
      amount: "",
      time: "Ongoing",
    },
    {
      activity: `${programs.length} total programs in system`,
      amount: "",
      time: "Current",
    },
  ];

  return (
    <div className="p-8">
      <AnimatedElement variant="fadeInDown">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Dashboard
          </h2>
          <p className="text-foreground/70">
            Manage your foundation's operations and track impact
          </p>
        </div>
      </AnimatedElement>

      {/* Stats Grid */}
      <AnimatedContainer staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <AnimatedElement
              key={index}
              variant="slideInUp"
              delay={index * 0.08}
              className="p-6 bg-card border-border"
            >
              <p className="text-foreground/60 text-sm mb-2">{stat.label}</p>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <div className={`${stat.color} w-2 h-8 rounded-full`}></div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </AnimatedContainer>

      {/* Quick Actions */}
      <AnimatedContainer staggerDelay={0.2}>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <AnimatedElement variant="fadeInLeft">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2 gap-5 flex flex-col">
                <Link className="mx-5" href="/dashboard/children">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    🧒 Children
                  </Button>
                </Link>
                <Link className="mx-5" href="/dashboard/sponsorships">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    💝 Sponsorships
                  </Button>
                </Link>
                <Link className="mx-5" href="/dashboard/staff">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    👥 Staff & Volunteers
                  </Button>
                </Link>
                <Link className="mx-5" href="/dashboard/blogs">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    📖 Blogs
                  </Button>
                </Link>
                <Link className="mx-5" href="/dashboard/gallery">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    🖼️ Gallery
                  </Button>
                </Link>
                <Link className="mx-5" href="/dashboard/events">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    📅 Events
                  </Button>
                </Link>
                <Link className="mx-5" href="/dashboard/campaigns">
                  <Button
                    className=" w-full justify-start text-left"
                    variant="outline"
                  >
                    🎯 Campaigns
                  </Button>
                </Link>
              </div>
            </Card>
          </AnimatedElement>

          {/* Recent Activity */}
          <AnimatedElement variant="fadeInRight">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between pb-3 border-b border-border last:border-b-0"
                  >
                    <div>
                      <p className="text-foreground font-medium">
                        {item.activity}
                      </p>
                      <p className="text-xs text-foreground/60 mt-1">
                        {item.time}
                      </p>
                    </div>
                    {item.amount && (
                      <p className="text-accent font-semibold">{item.amount}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedElement>
        </div>
      </AnimatedContainer>
    </div>
  );
}
