'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <section className="flex-1 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Story
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Founded in 2015, Seeds of Love Foundation has been dedicated to nurturing growth and opportunity in underserved communities around the world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-foreground/70 leading-relaxed">
              To empower individuals and communities through access to quality education and nutritious food, creating sustainable pathways out of poverty and enabling every person to reach their full potential.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-foreground/70 leading-relaxed">
              A world where every child has access to education and proper nutrition, where communities are empowered to create lasting change, and where opportunity is not determined by circumstance of birth.
            </p>
          </Card>
        </div>

        <Card className="p-8 bg-accent/10 border border-accent/20 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['Compassion', 'Integrity', 'Excellence'].map((value) => (
              <div key={value}>
                <h3 className="font-semibold text-foreground mb-2">{value}</h3>
                <p className="text-sm text-foreground/70">
                  We believe in treating every person with dignity and respect while maintaining the highest standards of accountability.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Footer />
    </main>
  );
}
