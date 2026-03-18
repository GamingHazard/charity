import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AnimatedElement } from '@/components/motion/animated-elements';
import ScrollReveal from '../../lib/fontAnimation'

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <Image
        src="/hero-bg-1-3.jpg"
        alt="Children learning in classroom"
        fill
        className="object-cover "
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left: Text */}
          <AnimatedElement variant="slideInLeft">
            <div className="w-full lg:w-3/5 xl:w-2/3 text-center lg:text-left space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                
                <h1 style={{fontFamily: 'Quicksand'}} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg ">
                  Planting Seeds of Love & Hope
                </h1>
                <p style={{fontFamily:'Quicksand'}} className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 text-balance drop-shadow-md">
                  Empowering communities through education, nutrition, and sustainable development. One seed at a time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 lg:pt-4">
                <Link href="/contact">
                  <Button  style={{fontFamily:'Quicksand'}} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 lg:px-8 text-base lg:text-lg font-semibold w-full sm:w-auto">
                    Get Involved Today
                  </Button>
                </Link>
                <Link href="/about">
                  <Button  style={{fontFamily:'Quicksand'}} size="lg" className="px-6 lg:px-8 text-base lg:text-lg font-semibold bg-white hover:bg-white/90 text-foreground w-full sm:w-auto">
                    Learn Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedElement>

          {/* Right: SVG Elements */}
          <AnimatedElement variant="slideInRight">
            <div className="w-full hidden sm:inline-block lg:w-2/5 xl:w-1/3  justify-center lg:justify-end items-center relative">
           
            <div className="pointer-events-none w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-md lg:h-md xl:w-lg xl:h-lg transform rotate-12 lg:rotate-22 origin-center">
              <svg viewBox="0 0 210 470" className="w-full h-full" aria-hidden="true">
                <defs>
                  <clipPath id="heroClipPrimary">
                    <path
                      d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                      fill="#ffffff"
                    />
                  </clipPath>
                </defs>

                <image
                  href="/hero-bg-1-1.jpg"
                  width="210"
                  height="470"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#heroClipPrimary)"
                  opacity="0.95"
                />

                <rect
                  width="100%"
                  height="100%"
                  fill="rgba(0,0,0,0.15)"
                  clipPath="url(#heroClipPrimary)"
                />

                <path
                  d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="6"
                />
              </svg>
            </div>

            {/* Secondary SVG (Smaller, positioned behind) */}
            {/* <div className="pointer-events-none w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[20rem] lg:h-[20rem] xl:w-[24rem] xl:h-[24rem] transform rotate-12 lg:rotate-22 origin-center absolute -top-4 -right-4 lg:-top-8 lg:-right-8 z-0">
              <svg viewBox="0 0 210 470" className="w-full h-full" aria-hidden="true">
                <defs>
                  <clipPath id="heroClipSecondary">
                    <path
                      d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                      fill="#ffffff"
                    />
                  </clipPath>
                </defs>

                <image
                  href="/hero-bg-1-2.jpg"
                  width="210"
                  height="470"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#heroClipSecondary)"
                  opacity="0.8"
                />

                <rect
                  width="100%"
                  height="100%"
                  fill="rgba(0,0,0,0.2)"
                  clipPath="url(#heroClipSecondary)"
                />

                <path
                  d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="5"
                />
              </svg>
            </div> */}
          </div>
          </AnimatedElement>
        </div>
      </div>

      <img src='/circle-left.png' className='absolute hidden sm:inline-block -left-70 top-20 -mr-4'/>
      <img src='/object-1-2.png' className='absolute hidden sm:inline-block bottom-0 '/>
    </section>
  );
}
