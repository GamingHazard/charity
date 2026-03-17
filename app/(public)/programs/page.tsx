'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';

const programs = [
  {
    id: 1,
    title: 'Education Initiatives',
    description: 'Building schools and providing scholarships to ensure every child has access to quality education.',
    impact: '5,000+ students reached',
  },
  {
    id: 2,
    title: 'Nutrition Program',
    description: 'Providing nutritious meals and health education to communities facing food insecurity.',
    impact: '12,000+ people supported',
  },
  {
    id: 3,
    title: 'Teacher Training',
    description: 'Training and empowering local educators to improve teaching standards and student outcomes.',
    impact: '200+ teachers trained',
  },
  {
    id: 4,
    title: 'Community Health',
    description: 'Establishing clinics and health awareness programs to improve access to healthcare.',
    impact: '3,000+ health consultations',
  },
];

export default function Programs() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <section className="flex-1 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Programs
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Creating meaningful impact through carefully designed and executed programs in education, nutrition, and community development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="p-6 bg-card border-border hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-foreground mb-2">{program.title}</h3>
              <p className="text-foreground/70 mb-4">{program.description}</p>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span className="inline-block w-2 h-2 bg-accent rounded-full"></span>
                {program.impact}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
