'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HandHeart, Medal, ShieldCheckIcon } from 'lucide-react';

export default function About() {
  const metrics = [
    
    {title: 'Compassion', description: 'We believe in treating every person with dignity and respect while maintaining the highest standards of accountability.', icon:HandHeart , color:'red'},
    { title: 'Intergrity', description: 'We believe in treating every person with dignity and respect while maintaining the highest standards of accountability.', icon:ShieldCheckIcon , color:'green'},
    {
     title:'Exellence',
     description: 'We believe in treating every person with dignity and respect while maintaining the highest standards of accountability.',
     icon: Medal,
     color:'yellow'
    },
     
  ];
  return (
    <main className="min-h-screen relative flex flex-1 flex-col bg-background">
      <Navbar />
      <section className="relative z-10 min-h-screen mb-10 w-full flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <Image
        src="/hero-bg-1-1.jpg"
        alt="Children learning in classroom"
        fill
        className="object-cover w-full"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left: Text */}
          <div className="w-full  lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg">
               About us
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 text-balance drop-shadow-md">
                 Founded in 2015, Seeds of Love Foundation has been dedicated to nurturing growth and opportunity in underserved communities around the world.
              </p>
            </div>

            
          </div>

       
        </div>
      </div>

      <img src='/circle-left.png' className='absolute hidden sm:inline-block -left-70 top-20 -mr-4'/>
      <img src='/object-1-2.png' className='absolute hidden sm:inline-block bottom-0 '/>
    </section>
      
      <section className="flex-1 z-10  px-4 md:px-8 max-w-6xl mx-auto w-full">
       

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

        
          <section className="py-16 w-full shadow-lg rounded-md mb-5 px-4 md:px-8 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground   text-balance">
          Core Values that Drive Our Impact
            </h2>
            <p className="text-lg mb-10 text-center text-foreground/70">
                  We believe in treating every person with dignity and respect while <br /> maintaining the highest standards of accountability.
                </p>

        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="border hover:border-secondary hover:shadow-2xl border-border rounded-lg p-6 flex flex-col items-center  justify-evenly bg-background">
              <span className={`p-4 rounded-full bg-${metric.color}-100 text-${metric.color}-600 mb-4`}>
                <metric.icon   className={`w-8 h-8 text-${metric.color}-600 fill-${metric.color}-`} />
              </span>
              <h3 className="text-xl font-bold text-foreground mt-4">{metric.title}</h3>
              <p className="text-foreground/70 text-justify mt-2">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      </section>
      
      <section className="flex-1 rounded-md shadow-md bg-card mx-auto h-100 w-full py-5 px-4 md:px-8 max-w-6xl my-10 ">
        <p className="text-4xl text-center font-bold mx-10">Our Impact On The Communities We Serve</p>
        <p className="text-lg text-center text-foreground/70 max-w-2xl mx-auto mb-10">We are committed to making a lasting difference in the lives of those we serve, ensuring that every individual has the opportunity to thrive.</p>
        
<div className="grid md:grid-cols-3 gap-6">
  <div className="border border-border rounded-lg p-6 flex flex-col items-center justify-evenly bg-background">
    <span className="p-4 rounded-full bg-orange-100 text-orange-600 mb-4">
      <img src="/counter-icon-1-1.png" className="w-12 h-12 text-orange-600 fill-orange-100" />
    </span>
    <h3 className="text-xl text-center font-bold text-foreground mt-4"><b className='text-4xl'>200+</b> <br /> Lives Transformed</h3>
    <p className="text-foreground/70 mt-2">Through our education and nutrition programs, we have positively impacted over 200 individuals country wide.</p>
  </div>

  <div className="border border-border rounded-lg p-6 flex flex-col items-center justify-evenly bg-background">
    <span className="p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
      <Medal className="w-8 h-8 text-blue-600 fill-blue-100" />
    </span>
    <h3 className="text-xl text-center font-bold text-foreground mt-4"> <b className='text-4xl'>90%</b> <br /> Program Success Rate</h3>
    <p className="text-foreground/70 mt-2">Our initiatives have a 95% success rate in improving educational outcomes and nutritional status among participants.</p>
  </div>

  <div className="border border-border rounded-lg p-6 flex flex-col items-center justify-evenly bg-background">
    <span className="p-4 rounded-full bg-green-100 text-green-600 mb-4">
      <ShieldCheckIcon className="w-8 h-8 text-green-600 fill-green-100" />
    </span>
    <h3 className="text-xl text-center font-bold text-foreground mt-4"><b className='text-4xl'>100% </b> <br />Accountability</h3>
    <p className="text-foreground/70 mt-2">We maintain the highest standards of accountability, ensuring that every coin donated is used effectively to create meaningful change.</p>
  </div>
</div>
        
      </section>

      <img src='/frame1-1.png' className='absolute hidden sm:inline-block bottom-0  -left-20'/>
      <img src='/layer1-1.png' className='absolute hidden sm:inline-block bottom-1/2  right-20 w-40 h-40'/>
      <img src='/layer1-2.png' className='absolute hidden sm:inline-block top-3/4  right-0 w-40 h-40'/>
      <img src='/object1-1.png' className='absolute hidden sm:inline-block top-1/2  left-0 w-[20%] h-[20%]'/>
      <img src='/news-1-shape-4.png' className='absolute hidden sm:inline-block top-1/2  left-1/4 w-[30%] h-[20%]'/>
      <img src='/shape1-2.png' className='absolute hidden sm:inline-block bottom-1/5  left- w-30 h-30'/>
      <img src='/shape1-1.png' className='absolute hidden sm:inline-block bottom-1/5  right-40  w-30 h-30'/>
      <img src='/shape1-3.png' className='absolute hidden sm:inline-block bottom-0  right-0  w-[20%] h-[20%]'/>

      <Footer />
    </main>
  );
}
