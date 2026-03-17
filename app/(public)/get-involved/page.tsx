'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const opportunities = [
  {
    type: 'Donate',
    icon: '💝',
    title: 'Make a Financial Contribution',
    description: 'Your donation directly supports our programs and helps us reach more communities in need.',
    cta: 'Donate Now',
  },
  {
    type: 'Volunteer',
    icon: '🤝',
    title: 'Volunteer Your Time',
    description: 'Join our team and contribute your skills and passion to make a real difference.',
    cta: 'Learn More',
  },
  {
    type: 'Partner',
    icon: '🌱',
    title: 'Partner With Us',
    description: 'We welcome corporate partnerships and collaborations to amplify our impact.',
    cta: 'Explore Partnerships',
  },
];

export default function GetInvolved() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <section className="flex-1 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Get Involved
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            There are many ways to support our mission. Choose how you'd like to make a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.type} className="p-6 bg-card border-border flex flex-col">
              <div className="text-4xl mb-4">{opportunity.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{opportunity.title}</h3>
              <p className="text-foreground/70 flex-1 mb-6">{opportunity.description}</p>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {opportunity.cta}
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-accent/10 border border-accent/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h2>
          <p className="text-foreground/70 mb-6">
            Contact our team to learn more about how you can support Seeds of Love Foundation.
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Contact Us
          </Button>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
