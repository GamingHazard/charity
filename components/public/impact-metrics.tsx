"use client";

import { useData } from "@/lib/data-context";
import { Apple, AppleIcon,DropletIcon,GraduationCap,StethoscopeIcon  } from "lucide-react";
import { title } from "process";

export function ImpactMetrics() {
  const { programs, donations } = useData();

  const metrics = [
    
    {title: 'Medical help', description: 'A good health care system is essential for any society', icon:StethoscopeIcon , color:'green'},
    { title: 'Education', description: 'We are committed to providing quality education to underprivileged children', icon:GraduationCap , color:'yellow'},
    {
     title:'Clean Water',
     description: 'Access to clean water is a fundamental human right, and we work to ensure that everyone has access to safe and clean drinking water',
     icon: DropletIcon,
     color:'blue'
    },
    {
      title: 'Healthy Food',
      description: ' A balanced diet is crucial for growth and development, and we work to provide nutritious meals to those in need',
      icon: Apple,
      color:'red'
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 text-balance">
          A Trusted Charity Focused  <br />on Children’s Well-Being
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="border hover:border-secondary hover:shadow-2xl border-border rounded-lg p-6 flex flex-col items-center text-center bg-background">
              <span className={`p-4 rounded-full bg-${metric.color}-100 text-${metric.color}-600 mb-4`}>
                <metric.icon   className={`w-8 h-8 text-${metric.color}-600 fill-${metric.color}-`} />
              </span>
              <h3 className="text-xl font-bold text-foreground mt-4">{metric.title}</h3>
              <p className="text-foreground/70 mt-2">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
