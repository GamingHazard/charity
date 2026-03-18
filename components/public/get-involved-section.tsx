import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedElement, AnimatedContainer } from '@/components/motion/animated-elements';

export function GetInvolvedSection() {
  const ways = [
    {
      title: 'Make a Donation',
      description: 'Your contribution directly supports our programs and helps us reach more communities.',
      emoji: '💝',
    },
    {
      title: 'Volunteer',
      description: 'Join our team and contribute your skills and passion to create real, lasting change.',
      emoji: '🤝',
    },
    {
      title: 'Become a Partner',
      description: 'Partner with us through corporate collaborations to amplify our collective impact.',
      emoji: '🌍',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement variant="fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Get Involved
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              There are many ways to support our mission. Choose what matters most to you.
            </p>
          </div>
        </AnimatedElement>

        <AnimatedContainer staggerDelay={0.2}>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {ways.map((way, index) => (
              <AnimatedElement key={index} variant="scaleIn" delay={index * 0.1} className="p-6 bg-background border-border flex flex-col">
                <div className="text-4xl mb-4">{way.emoji}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{way.title}</h3>
                <p className="text-foreground/70 flex-1">{way.description}</p>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedContainer>

        <AnimatedElement variant="fadeInUp">
          <div className="text-center">
            <Link href="/get-involved">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 text-lg">
                Explore Ways to Help
              </Button>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
