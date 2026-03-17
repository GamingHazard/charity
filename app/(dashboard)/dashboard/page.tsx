'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useData } from '@/lib/data-context';

export default function DashboardPage() {
  const { programs, donations, getTotalDonations, getTotalImpact } = useData();

  const totalDonations = getTotalDonations();
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const totalPeopleImpacted = getTotalImpact();

  const stats = [
    { label: 'Total Programs', value: programs.length.toString(), color: 'bg-primary' },
    { label: 'Total Donations', value: `$${(totalDonations / 1000).toFixed(0)}K`, color: 'bg-accent' },
    { label: 'Active Programs', value: activePrograms.toString(), color: 'bg-primary' },
    { label: 'People Impacted', value: `${(totalPeopleImpacted / 1000).toFixed(1)}K+`, color: 'bg-accent' },
  ];

  const recentActivities = [
    { activity: 'New donation received', amount: donations.length > 0 ? `$${donations[0].amount.toLocaleString()}` : '$0', time: 'Recently' },
    { activity: `${activePrograms} programs currently active`, amount: '', time: 'Ongoing' },
    { activity: `${programs.length} total programs in system`, amount: '', time: 'Current' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Dashboard</h2>
        <p className="text-foreground/70">Manage your foundation's operations and track impact</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-card border-border">
            <p className="text-foreground/60 text-sm mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <div className={`${stat.color} w-2 h-8 rounded-full`}></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/dashboard/programs">
              <Button className="w-full justify-start text-left" variant="outline">
                ➕ Add New Program
              </Button>
            </Link>
            <Link href="/dashboard/donations">
              <Button className="w-full justify-start text-left" variant="outline">
                💰 Log Donation
              </Button>
            </Link>
            <Link href="/dashboard/content">
              <Button className="w-full justify-start text-left" variant="outline">
                📝 Update Content
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((item, index) => (
              <div key={index} className="flex items-start justify-between pb-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-foreground font-medium">{item.activity}</p>
                  <p className="text-xs text-foreground/60 mt-1">{item.time}</p>
                </div>
                {item.amount && (
                  <p className="text-accent font-semibold">{item.amount}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
