'use client';

import { Hero } from '@/components/public/hero';
import { ImpactMetrics } from '@/components/public/impact-metrics';
import { ProgramsSection } from '@/components/public/programs-section';
import { GetInvolvedSection } from '@/components/public/get-involved-section';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import Marquee from "react-fast-marquee";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, CalendarClock, Facebook, Instagram, Linkedin, Mail, MapPin, PhoneCall, Send } from 'lucide-react';
import Link from 'next/link';
// import { mockEvents } from '@/lib/mock-data';
import ScrollStack,{ ScrollStackItem } from '@/lib/scrollStackJs';
import StackCards from '@/components/public/scroll-stack';
import { mockEvents } from '@/lib/mock-data';

export default function Home() {
  const impactMetrics = [
    { label: "Communities Impacted", value: "20+" ,img:'/counter-icon-1-1.png'},
    { label: "Meals Provided", value: "500+" ,img:'/counter-icon-1-2.png'},
      { label: "Children Supported", value: "100+" ,img:'/counter-icon-1-3.png'},
     { label: "transparency", value: "15+" ,img:'/counter-icon-1-4.png'},
  ]

  const donators = [
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-1.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-2.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-3.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-4.jpg"
  ]

  const quickdonations = [
    { amount: "$10", label: "Provide a Meal" },
    { amount: "$25", label: "Support a Child for a Week" },
    { amount: "$50", label: "Fund Educational Materials" },
    { amount: "$100", label: "Sponsor a Community Program" },
  ]
  const socialMediaLinks = [
    { icon: Facebook, url: "https://www.facebook.com/SeedsOfLove" },
    { icon: '', url: "https://twitter.com/SeedsOfLove" },
    { icon: Instagram, url: "https://www.instagram.com/SeedsOfLove" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/SeedsOfLove" },
  ]
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />


      <Hero />
      <Marquee className='bg-white gap-3 flex items-center justify-evenly'>
        <img src='/icon.svg' className='w-40   h-30 shadow-2xl' />
        <img src='/icon.svg' className='w-40   h-30 shadow-2xl' />
        <img src='/icon.svg' className='w-40   h-30 shadow-2xl' />
        <img src='/icon.svg' className='w-40   h-30 shadow-2xl' />
      </Marquee>
      <ImpactMetrics />
      <ProgramsSection />
      
      {/* Volunteer section */}
      <section className="py-14 sm:py-16 px-2 sm:px-4 mt-14 md:px-8 bg-card">
       {/* relative sm:mt-14 sm:flex z-10 max-w-6xl mx-auto */}
        <section className="py-16 text-right rounded-md relative sm:px-4 md:px-8 bg-green-900 h-96 sm:h-200 border-y sm:mx-10 border-green-800">
          <Link href="/contact" className='absolute flex items-center justify-center bg-primary  text-white rounded-lg  lg:hidden top-0 left-5  p-2'>
            Join Us  
          </Link  >
          <span className='  sm:absolute z-10 left-40 top-40'>
            <p className="text-2xl font-semibold sm:text-4xl text-white sm:font-bold mb-4 text-left pl-4 sm:text-center">
            VOLUNTEERS MAKING A <br /> DIFFERENCE 
          </p>
           
          </span>
          <span className='sm:absolute z-10 right-50 top-20'>
            <p className="text-xl lg:hidden text-xlg sm:text-4xl text-white font-semibold sm:font-bold mb-4 pl-4 text-left sm:text-center">
           With Over 20+ YEARS OF <br /> IMPACT 
          </p>
            <p className="text-xl text-xlg sm:text-4xl text-white font-semibold sm:font-bold mb-4 pl-4 text-left sm:text-center">
              With Over  <br />
              <b className='text-5xl font-bold'>100+</b>  
           <br />Volunteers   
          </p>
             
           
          </span>
        <img src='frame1-1.png' className='hidden sm:inline-block w-80 h-80 absolute top-0 left-70' />
        <img src='vec-1-1.png' className='hidden sm:inline-block w-50 h-70 absolute top-20 left-0' />
        <img src='shape1-4.png' className='hidden sm:inline-block w-[60%] h-[90%] text-green-300 absolute -right-5 -top-5' />
          <img src='/volunter-bg.jpg' className='w-[90%] sm:h-[70%] h-50 rounded-md absolute -bottom-[10%] right-[5%]' />
          <Button className='absolute  hidden sm:flex bottom-0 sm:-bottom-26 left-[50%]   bg-primary hover:bg-accent/90 text-white px-8 text-lg cursor-pointer font-bold rounded-lg p-5'>
            Join Us as a Volunteer
          </Button>
 
        </section>
        
        <span className='w-full    grid mt-20 sm:flex gap-2 items-center justify-center sm:mt-30 sm:justify-center h-auto sm:h-60 ' >
          {impactMetrics.map((metric, i) => (
            <div key={i} className='flex flex-col items-center justify-center mx-10'>
              <span className='flex items-center w-full gap-3'>
                <span className='flex items-center w-10 h-10  sm:w-20 sm:h-20 justify-center pt-3 rounded-full bg-orange-100 sm:pt-2'>
                  <img src={metric.img} className='w-5 h-5 sm:w-10 sm:h-10 mb-4' />
                </span>
                <span>
                  <p className='text-xl sm:text-4xl font-bold text-accent'>{metric.value}</p>
                  <p className='text-md sm:text-lg text-muted-foreground'>{metric.label}</p>
                </span>
                </span>
            </div>
          ))}
        </span>
      
      </section>
      
      {/* Donations */}
      <section className="py-5 sm:py-0 px-2 sm:px-4 sm:flex mt-14 md:px-8 bg-background relative">
        <img src='/donation-image.jpg' className='rounded-md hidden w-1/2 sm:inline-block' />
        <img src='/shape1-3.png' className='w-40   h-100  absolute hidden sm:inline-block right-20 bottom-0'/>
        <img src='/shape1-2.png' className='w-30 h-30 absolute hidden sm:inline-block right-10 top-20'/>
        <img src='/shape1-1.png' className='w-80 h-80 absolute hidden sm:inline-block bottom-20 left-20' />
        
        <div
          className="max-w-6xl  sm:absolute left-1/4 sm:top-15 py-0 z-10 mx-auto bg-card rounded-md h-auto sm:h-180 sm:flex items-center  ">
          <div className='sm:w-2/4 text-white rounded-md sm:rounded-l-md relative p-5 sm:p-20 h-auto sm:h-full bg-green-800'>
            <img src='/hand-shape.png' className='w-20 h-20 hidden sm:inline-block absolute top-10 right-10' />
            <p className='text-orange-300'>Help & Donate</p>
            <h1 className='text-2xl font-bold sm:text-6xl'>Your Small Contribution can Change a Life</h1>
            <p className='text-sm mx-5 sm:text-base'>Your generous donations help us maintain our work, provide community services, and educate future generations. Every contribution counts and is greatly appreciated.</p>

            <span className='  mt-10 flex  p-5 w-full border-[0.5px] border-muted-foreground rounded-full'>
              {donators.map((donator, i) => (
                <img key={i} src={donator} className='w-10 h-10 rounded-full -mx-1 border-2 border-green-800 inline-block ' />
              ))}

              <p className='text-sm flex-1 text-right font-semibold text-muted'>
               <b className='text-orange-400'> $ 3546</b> raised by <br />
                {donators.length} Donors
              </p>

            </span>
          </div> 

        
          <div className='w-auto sm:w-full flex-1 text-white rounded-r-md relative h-auto p-5 sm:p-20 sm:h-full  '>
            <h1 className='text-3xl text-accent font-bold'>Make A Donation</h1>

            <form className='grid gap-5'>
              <span className='w-full grid sm:flex items-center my-5 gap-3 px-3 '>
              <Input placeholder='Enter your Names' className='sm:flex-1 bg-background text-accent border-0 sm:p-5' />
              <Input placeholder='Enter your Email Address' className='sm:flex-1 bg-background text-accent border-0 sm:p-7' />
            </span>
            <Input placeholder='Company name (Optional)' className='sm:flex-1 bg-background text-accent border-0 sm:p-5 sm:my-3 mr-3' />
              <Input placeholder='Amount Donating' className='sm:flex-1 bg-background text-accent border-0 sm:p-5 my-3 mr-3' />
              <span className='flex w-full justify-evenly items-center gap-3'>
                 {quickdonations.map((donation, i) => (
                  <Button key={i} variant='outline' className='bg-transparent cursor-pointer border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white'>
                    {donation.amount}  
                  </Button>
                ))}
                </span>
              <span className='flex items-center gap-3'>
                <Input type='checkbox' className='w-5 h-5' />
                <p className='text-xs text-muted-foreground'>I want to receive updates about the impact of my donation</p>
              </span>
              <span className='flex items-center gap-3'>
                <Input type='checkbox' className='w-5 h-5' />
                <p className='text-xs text-muted-foreground'>I agree to the terms and conditions</p>
              </span>
            <Button className='bg-primary w-full hover:bg-accent/90 text-white px-8 text-lg cursor-pointer font-bold rounded-lg p-5 mt-5'>
              Donate Now
            </Button>
              </form>
          </div> 
          
      </div>
      </section>

      {/* Upcoming Events */}
      <section className='p-4  sm:px-10 bg-white relative mt-14 md:px-8'>
        <h1 className='text-sm     '>Our Events</h1>
        <h2 className='text-3xl sm:text-5xl font-bold   mb-2'>Be Part of our Upcoming Events</h2>
        <p className='mb-10 text-muted-foreground'>(Scroll 'UP'  the events to view more!)</p>
        
        <div
          className="w-full hidden  bg-background relative z-10 sm:mx-auto   rounded-md h-auto sm:h-150 sm:flex items-center  ">
    <ScrollStack className=' relative'>
        {mockEvents.map((event) => (
          <ScrollStackItem  key={event._id}>
           <span className=' text-wrap  items-center justify-evenly grid p-2 sm:w-30 rounded-full h-full bg-primary/10'>
              <span className='w-20 h-20 flex items-center justify-center ml-2 rounded-full bg-primary'>
                <CalendarClock size={50} className='text-white' />
              </span>
              <p className='text-lg text-primary'>{event.date}</p>
            </span>
            
            <span className='flex-1 flex items-center h-full gap-6 px-5'>
              <span className='w-[75%] h-full  '>
                <p className='text-4xl  font-bold'>{event.title}</p>
                <p className='text-lg'>{event.description}</p>
                <p className='text-sm  mt-4 font-semibold'><b className='text-primary'>Topic:</b> {event.topic}</p>
                <p className='text-sm  font-semibold'><b className='text-primary'>Time:</b> {event.time}</p>
                <p className='text-sm  font-semibold'><b className='text-primary'>Location:</b> {event.location.address}</p>

                <Button className='bg-primary/20 hover:bg-green-800 hover:text-white text-primary px-8 text-lg cursor-pointer font-bold rounded-lg p-5 mt-5'>
                  Join Now
                </Button>
              </span>
              <img src={`${event.image.url}`} className='w-flex h-full rounded-md ' />
            </span>
            
          </ScrollStackItem>
        ))}
          </ScrollStack>
          <img src='/event-image.png' className='w-1/2 h-full absolute hidden sm:inline-block -right-70' />
          <img src='/news-1-shape-1.png' className='w-50 h-50 absolute hidden sm:inline-block top-0 left-0' />
          <img src='/news-1-shape-2.png' className='w-50 h-50 absolute -z-20 hidden sm:inline-block bottom-0 left-0' />
          <img src='/news-1-shape-3.png' className='w-50 h-50 absolute -z-20 hidden sm:inline-block top-0 right-0' />
          {/* <img src='/news-1-shape-4.png' className='w-70 h-70 absolute hidden -z-20 sm:inline-block top-0 right-0' /> */}
          
        </div>
        <span className='lg:hidden w-full h-120 bg-card grid gap-2 items-center overflow-y-auto'>
          {mockEvents.map((event) => (
            <div
              key={event._id}
              className='w-80 lg:hidden  bg-background relative z-10 sm:mx-auto my-10   rounded-md  h-auto pb-2      mt-10'>
              <img src={`${event.image.url}`} className='w-full h-58 rounded-md   object-cover' />
              <p className='text-lg truncate line-clamp-2 mt-4 px-3 text-left font-bold'>{event.title}</p>
              <p className='text-sm truncate  text-wrap line-clamp-3 text-muted-foreground px-3 text-left  '>{event.description}</p>
              <span className='text-sm px-3 my-4 font-semibold'><b className='text-primary'>Topic:</b> {event.topic}</span> <br />
              <span className='text-sm px-3 my-4 font-semibold'><b className='text-primary'>Date:</b> {event.date}</span><br />
              <span className='text-sm px-3 my-4 font-semibold'><b className='text-primary'>Time:</b> {event.time}</span><br />
              <span className='text-sm truncate text-wrap line-clamp-2 px-3  mt-2 font-semibold'><b className='text-primary'>Location:</b> {event.location.address}</span><br />

              <Button className='bg-primary/20 hover:bg-green-800 hover:text-white text-primary  text-lg cursor-pointer font-bold rounded-lg    w-[90%] ml-4'>
                Join Now
              </Button>

          
          
          
          </div>
))}
        </span>
        
      </section>

      {/* Footer */}
      <footer className=" hidden mt-5 sm:flex shadow-lg relative  justify-center items-center flex-1 bg-pink-400">
        <img src="/footer-bg.jpg" className="  w-full h-full" />
      <div className="max-w-6xl gap-5 border-b border-muted text-white justify-evenly h-96 flex-1 flex items-center absolute     mx-auto">
        
          <div className="text-white    gap-4 h-full w-1/3">
            <span className="  items-center w-full ">
              <span className='flex items-center gap-2'>
                <span className='flex p-2 items-center border-4 border-white justify-center bg-primary rounded-full'><img src="https://html.kodesolution.com/2026/hopenest-html/images/resource/about-1-uni-icon.png" alt="Logo" className='w-10 h-10' />
                </span>
                <h2 className='text-white text-xl font-bold'>Seeds of Love</h2>
              </span>
              <p className='text-sm mt-4  text-muted'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
               
            </span>

            <span className='flex items-center gap-3 mt-5'>
              {socialMediaLinks.map((social, i) => (
                <Link key={i} href={social.url} target="_blank" className='w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white bg-primary hover:bg-green-800  hover:text-white'>
                  {social.icon ? <social.icon size={18} /> : <span className='text-sm font-bold'>𝕏</span>}
                </Link>
              ))}
            </span>
          </div>
         
          <div className="text-white    gap-4 h-full w-1/3">
            <span className="  items-center w-full ">
              <h2 className='text-white text-xl font-bold'>Quick Links</h2>
              <ul className='text-sm mt-4 text-justify text-muted'>
                <li><Link href="/about" className='hover:text-primary text-lg  mt-5 transition-colors'>About Us</Link></li>
                <li><Link href="/programs" className='hover:text-primary text-lg  mt-5 transition-colors'>Our Programs</Link></li>
                <li><Link href="/get-involved" className='hover:text-primary text-lg  mt-5 transition-colors'>Get Involved</Link></li>
                <li><Link href="/contact" className='hover:text-primary text-lg  mt-5 transition-colors'>Contact</Link></li>
              </ul>
            </span>
          </div>
           
          
          <div className="text-white    gap-4 h-full w-1/3">
            <span className="  items-center w-full font-bold text-accent">
              <h2 className='text-white font-bold'>Contact us</h2>
              <ul className='text-sm mt-4 text-justify text-muted'>
                <li className='flex mt-5 items-center gap-2'>
                  <span className='text-primary'><MapPin /></span>
                  <span>123 Charity Street, City, Country</span>
                </li>
                <li className='flex mt-5 items-center gap-2'>
                  <span className='text-primary'><PhoneCall/> </span>
                  <span>+1 (123) 456-7890</span>
                </li>
                <li className='flex mt-5 items-center gap-2'>
                  <span className='text-primary'><Mail /></span>
                  <span>info@seedsoflove.org</span>
                </li>
              </ul>
            </span>
          </div>

          
        
        </div>
        <span className='absolute border flex border-border rounded-full p-2 gap-2 bottom-40 right-100'>
          <Input placeholder='Subscribe to our newsletter'
            className='bg-transparent rounded-full  border-0 p-5 text-sm text-white w-80' />
          <Button className='bg-primary hover:bg-green-800 text-white px-8 text-lg cursor-pointer font-bold rounded-full p-5'>
            <Send size={18} />
          </Button>
        </span>

         <span className='text-sm text-muted w-1/4 mt-5 text-center   flex   justify-evenly absolute bottom-10 left-5'>
          <Link href="/privacy-policy" className='cursor-pointer  hover:text-primary transition-colors'>Privacy Policy</Link>
          <Link href="/terms-of-service" className='cursor-pointer hover:text-primary transition-colors'>Terms of Service</Link>
        </span>

        <span className='text-sm text-muted mt-5 text-center w-full absolute bottom-10'>
          &copy; {new Date().getFullYear()} Seeds of Love. All rights reserved.
        </span>
       
        
      </footer>
      
      <section className='lg:hidden'>
        <Footer />
      </section>
     
    </main>
  );
}
