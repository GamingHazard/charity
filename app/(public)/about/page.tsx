'use client';

import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { HandHeart, Medal, ShieldCheckIcon } from 'lucide-react';
import { AnimatedElement, AnimatedContainer } from '@/components/motion/animated-elements';
import { AnimatedCounter } from '@/components/motion/animated-counter';

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
      <section className="relative z-10 min-h-screen mb-6 sm:mb-8 md:mb-10 w-full flex items-center justify-center overflow-hidden pt-12 sm:pt-16">
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
      <AnimatedElement variant="fadeInDown">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12">
            {/* Left: Text */}
            <div className="w-full text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h1  style={{fontFamily:'Quicksand'}} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-balance leading-tight drop-shadow-lg">
                 About us
                </h1>
                <p  style={{fontFamily:'Quicksand'}} className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto lg:mx-0 text-balance drop-shadow-md">
                   Founded in 2015, Seeds of Love Foundation has been dedicated to nurturing growth and opportunity in underserved communities around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedElement>

      <img src='/circle-left.png' className='absolute hidden md:inline-block -left-40 sm:-left-60 md:-left-70 top-10 sm:top-16 md:top-20 -mr-4'/>
      <img src='/object-1-2.png' className='absolute hidden md:inline-block bottom-0 '/>
    </section>
      
      <section className="flex-1 z-10 px-3 sm:px-4 md:px-8 max-w-6xl mx-auto w-full">
       

        <AnimatedContainer staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12">
            <AnimatedElement variant="slideInLeft">
              <Card className="p-4 sm:p-6 bg-card border-border">
                <h2  style={{fontFamily:'Quicksand'}} className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">Our Mission</h2>
                <p  style={{fontFamily:'Quicksand'}} className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  To empower individuals and communities through access to quality education and nutritious food, creating sustainable pathways out of poverty and enabling every person to reach their full potential.
                </p>
              </Card>
            </AnimatedElement>

            <AnimatedElement variant="slideInRight">
              <Card className="p-4 sm:p-6 bg-card border-border">
                <h2  style={{fontFamily:'Quicksand'}} className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">Our Vision</h2>
                <p  style={{fontFamily:'Quicksand'}} className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  A world where every child has access to education and proper nutrition, where communities are empowered to create lasting change, and where opportunity is not determined by circumstance of birth.
                </p>
              </Card>
            </AnimatedElement>
          </div>
        </AnimatedContainer>

        
          <AnimatedElement variant="fadeInUp">
            <section className="py-8 sm:py-12 md:py-16 w-full shadow-lg rounded-md mb-5 px-3 sm:px-4 md:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto w-full">
          <h2  style={{fontFamily:'Quicksand'}} className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground text-balance">
            Core Values that Drive Our Impact
              </h2>
              <p  style={{fontFamily:'Quicksand'}} className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 md:mb-10 text-center text-foreground/70">
                    We believe in treating every person with dignity and respect while maintaining the highest standards of accountability.
                  </p>

          <AnimatedContainer staggerDelay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {metrics.map((metric, index) => (
                <AnimatedElement key={index} variant="scaleIn" delay={index * 0.1} className="border hover:border-secondary hover:shadow-2xl border-border rounded-lg p-3 sm:p-4 md:p-6 flex flex-col items-center justify-evenly bg-background">
                  <span className={`p-2 sm:p-3 md:p-4 rounded-full bg-${metric.color}-100 text-${metric.color}-600 mb-2 sm:mb-3 md:mb-4`}>
                    <metric.icon   className={`w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-${metric.color}-600 fill-${metric.color}-`} />
                  </span>
                  <h3  style={{fontFamily:'Quicksand'}} className="text-base sm:text-lg md:text-xl font-bold text-foreground mt-2 sm:mt-3 md:mt-4 text-center">{metric.title}</h3>
                  <p  style={{fontFamily:'Quicksand'}} className="text-xs sm:text-sm text-foreground/70 text-center mt-2">{metric.description}</p>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>
          </AnimatedElement>
      </section>
      
      <AnimatedElement variant="slideInUp">
        <section className="flex-1 mb-8 sm:mb-10 rounded-md shadow-md bg-card mx-auto w-full py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-8 max-w-6xl my-8 sm:my-10 md:my-10">
          <p  style={{fontFamily:'Quicksand'}} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold mx-0 sm:mx-5 md:mx-10 mb-3 sm:mb-4 md:mb-5">Our Impact On The Communities We Serve</p>
          <p  style={{fontFamily:'Quicksand'}} className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-foreground/70 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10">We are committed to making a lasting difference in the lives of those we serve, ensuring that every individual has the opportunity to thrive.</p>
          
<AnimatedContainer staggerDelay={0.2}>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
    <AnimatedElement variant="scaleIn" className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-evenly bg-background">
      <span className="p-2 sm:p-3 md:p-4 rounded-full bg-orange-100 text-orange-600 mb-2 sm:mb-3 md:mb-4">
        <img src="/counter-icon-1-1.png" className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-orange-600 fill-orange-100" />
      </span>
      <h3  style={{fontFamily:'Quicksand'}} className="text-base sm:text-lg md:text-xl text-center font-bold text-foreground mt-2 sm:mt-3 md:mt-4"><b className='text-2xl sm:text-3xl md:text-4xl'><AnimatedCounter 
        value={200} 
        duration={2500}
        suffix="+" 
      /></b> <br /> Lives Transformed</h3>
      <p  style={{fontFamily:'Quicksand'}} className="text-xs sm:text-sm text-foreground/70 mt-2 text-center">Through our education and nutrition programs, we have positively impacted over 200 individuals country wide.</p>
    </AnimatedElement>

    <AnimatedElement variant="scaleIn" className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-evenly bg-background">
      <span className="p-2 sm:p-3 md:p-4 rounded-full bg-blue-100 text-blue-600 mb-2 sm:mb-3 md:mb-4">
        <Medal className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-blue-600 fill-blue-100" />
      </span>
      <h3  style={{fontFamily:'Quicksand'}} className="text-base sm:text-lg md:text-xl text-center font-bold text-foreground mt-2 sm:mt-3 md:mt-4"><b className='text-2xl sm:text-3xl md:text-4xl'><AnimatedCounter 
        value={90} 
        duration={2500}
        suffix="%" 
      /></b> <br /> Program Success Rate</h3>
      <p  style={{fontFamily:'Quicksand'}} className="text-xs sm:text-sm text-foreground/70 mt-2 text-center">Our initiatives have a 95% success rate in improving educational outcomes and nutritional status among participants.</p>
    </AnimatedElement>

    <AnimatedElement variant="scaleIn" className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-evenly bg-background col-span-1 sm:col-span-2 lg:col-span-1">
      <span className="p-2 sm:p-3 md:p-4 rounded-full bg-green-100 text-green-600 mb-2 sm:mb-3 md:mb-4">
        <ShieldCheckIcon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-green-600 fill-green-100" />
      </span>
      <h3  style={{fontFamily:'Quicksand'}} className="text-base sm:text-lg md:text-xl text-center font-bold text-foreground mt-2 sm:mt-3 md:mt-4"><b className='text-2xl sm:text-3xl md:text-4xl'><AnimatedCounter 
        value={100} 
        duration={2500}
        suffix="%" 
      /></b> <br />Accountability</h3>
      <p  style={{fontFamily:'Quicksand'}} className="text-xs sm:text-sm text-foreground/70 mt-2 text-center">We maintain the highest standards of accountability, ensuring that every coin donated is used effectively to create meaningful change.</p>
    </AnimatedElement>
  </div>
</AnimatedContainer>
          
      </section>
      </AnimatedElement>

      <img src='/frame1-1.png' className='absolute hidden md:inline-block bottom-0 -left-10 sm:-left-20 w-40 sm:w-60 md:w-80'/>
      <img src='/layer1-1.png' className='absolute hidden md:inline-block bottom-1/2 right-10 sm:right-16 md:right-20 w-20 sm:w-30 md:w-40 h-20 sm:h-30 md:h-40'/>
      <img src='/layer1-2.png' className='absolute hidden md:inline-block top-3/4 right-0 w-20 sm:w-30 md:w-40 h-20 sm:h-30 md:h-40'/>
      <img src='/object1-1.png' className='absolute hidden lg:inline-block top-1/2 left-0 w-[15%] sm:w-[18%] lg:w-[20%] h-[15%] sm:h-[18%] lg:h-[20%]'/>
      <img src='/news-1-shape-4.png' className='absolute hidden lg:inline-block top-1/2 left-1/4 w-[20%] sm:w-[25%] lg:w-[30%] h-[15%] sm:h-[18%] lg:h-[20%]'/>
      <img src='/shape1-2.png' className='absolute hidden md:inline-block bottom-1/5 left-0 w-20 sm:w-25 md:w-30 h-20 sm:h-25 md:h-30'/>
      <img src='/shape1-1.png' className='absolute hidden md:inline-block bottom-1/5 right-20 sm:right-30 md:right-40 w-20 sm:w-25 md:w-30 h-20 sm:h-25 md:h-30'/>
      <img src='/shape1-3.png' className='absolute hidden lg:inline-block bottom-0 right-0 w-[15%] sm:w-[18%] lg:w-[20%] h-[15%] sm:h-[18%] lg:h-[20%]'/>

      <Footer />
    </main>
  );
}
