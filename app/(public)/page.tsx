"use client";

import { Hero } from "@/components/public/hero";
import { ImpactMetrics } from "@/components/public/impact-metrics";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowUp,
  CalendarClock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  Send,
} from "lucide-react";
import Link from "next/link";
// import { mockEvents } from '@/lib/mock-data';
import ScrollStack, { ScrollStackItem } from "@/lib/scrollStackJs";
import StackCards from "@/components/public/scroll-stack";
import { mockEvents } from "@/lib/mock-data";
import {
  AnimatedElement,
  AnimatedContainer,
  AnimatedCard,
} from "@/components/motion/animated-elements";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import ScrollReveal from "@/lib/fontAnimation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Home() {
  const impactMetrics = [
    {
      label: "Communities Impacted",
      value: "20+",
      img: "/counter-icon-1-1.png",
    },
    { label: "Meals Provided", value: "500+", img: "/counter-icon-1-2.png" },
    {
      label: "Children Supported",
      value: "100+",
      img: "/counter-icon-1-3.png",
    },
    { label: "transparency", value: "15+", img: "/counter-icon-1-4.png" },
  ];

  const galleryImages = [
    { src: "/donation-image.jpg", alt: "Community outreach program" },
    { src: "/event-image.png", alt: "Educational workshop" },
    { src: "/volunter-bg.jpg", alt: "Volunteer activities" },
    { src: "/hero-bg-1-1.jpg", alt: "School supplies distribution" },
    { src: "/hero-bg-1-2.jpg", alt: "Clean water initiative" },
    { src: "/hero-bg-1-3.jpg", alt: "Nutrition support program" },
  ];

  const donators = [
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-1.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-2.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-3.jpg",
    "https://html.kodesolution.com/2026/hopenest-html/images/resource/client-1-4.jpg",
  ];

  const quickdonations = [
    { amount: "$10", label: "Provide a Meal" },
    { amount: "$25", label: "Support a Child for a Week" },
    { amount: "$50", label: "Fund Educational Materials" },
    { amount: "$100", label: "Sponsor a Community Program" },
  ];
  const socialMediaLinks = [
    { icon: Facebook, url: "https://www.facebook.com/SeedsOfLove" },
    { icon: "", url: "https://twitter.com/SeedsOfLove" },
    { icon: Instagram, url: "https://www.instagram.com/SeedsOfLove" },
    { icon: Linkedin, url: "https://www.linkedin.com/company/SeedsOfLove" },
  ];
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <Hero />
      <Marquee className="bg-white gap-3 flex items-center justify-evenly">
        <a href="https://btm.ug/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqs4wL9zZB2_C6S3uHd7HrmvHapPu3NeM8w&s"
            className="w-40   h-30 shadow-lg mr-5 border-r-2 border-l-2 border-green-800"
          />
        </a>
        <a href="https://faithlifeministries-ug.vercel.app/" target="_blank">
          <img
            src="https://res.cloudinary.com/ghost150/image/upload/v1761738140/FAITHLIFE_LOGO_z9xkpt.png"
            className="w-40   h-30 shadow-lg mr-5  border-green-800"
          />
        </a>
        <a href="#">
          <img
            src="https://pbs.twimg.com/profile_images/1818999907979538432/lQW2Lplg_400x400.jpg"
            className="w-40   h-30 shadow-lg mr-5  border-green-800"
          />
        </a>
      </Marquee>
      <ImpactMetrics />

      {/* Gallery Section */}
      <AnimatedElement variant="fadeInUp">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                style={{ fontFamily: "Quicksand" }}
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              >
                Our Impact in Action
              </h2>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                See the difference we're making in communities around the world
                through our programs and initiatives.
              </p>
            </div>

            <Splide
              options={{
                type: "loop",
                perPage: 4,
                perMove: 1,
                gap: "1rem",
                autoplay: true,
                interval: 3000,
                pauseOnHover: true,
                breakpoints: {
                  768: {
                    perPage: 2,
                  },
                  640: {
                    perPage: 1,
                  },
                },
              }}
              className="gallery-slider"
            >
              {galleryImages.map((image, index) => (
                <SplideSlide key={index}>
                  <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-lg group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-center px-4 font-medium">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </section>
      </AnimatedElement>

      {/* Volunteer section */}
      <AnimatedElement variant="fadeInUp">
        <section className="py-14 sm:py-16  px-2 sm:px-4 mt-14 md:px-0 bg-card">
          {/* relative sm:mt-14 sm:flex z-10 max-w-6xl mx-auto */}
          <section className="py-16 text-right rounded-md relative sm:px-4 md:px-8 bg-green-900 h-96  sm:h-140   border-y sm:mx-10 border-green-800">
            <Link
              style={{ fontFamily: "Quicksand" }}
              href="/contact"
              className="absolute flex items-center justify-center bg-primary  text-white rounded-lg  lg:hidden top-0 left-5  p-2"
            >
              Join Us
            </Link>
            <span className="  sm:absolute z-10 left-40 md:left-10 top-20">
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-2xl font-bold sm:text-4xl text-white sm:font-bold mb-4 text-left pl-4 sm:text-center "
              >
                VOLUNTEERS MAKING A <br /> DIFFERENCE
              </p>
            </span>
            <span className="sm:absolute z-10 right-50 top-20">
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-xl lg:hidden text-xlg sm:text-4xl text-white font-bold sm:font-bold mb-4 pl-4 text-left sm:text-center"
              >
                With Over 20+ YEARS OF <br /> IMPACT
              </p>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-xl text-xlg sm:text-4xl text-white font-semibold sm:font-bold mb-4 pl-4 text-left sm:text-center"
              >
                With Over <br />
                <b className="text-5xl font-bold">
                  <AnimatedCounter value={100} duration={2500} suffix="+" />
                </b>
                <br />
                Volunteers
              </p>
            </span>
            <img
              src="frame1-1.png"
              className="hidden sm:inline-block w-60 h-60 absolute top-0 left-70"
            />
            <img
              src="vec-1-1.png"
              className="hidden sm:inline-block w-40 h-50 absolute top-20 left-0"
            />
            <img
              src="shape1-4.png"
              className="hidden sm:inline-block w-[60%] h-[90%] text-green-300 absolute -right-5 -top-5"
            />
            <img
              src="/volunter-bg.jpg"
              className="w-[90%] sm:h-[70%] h-50 rounded-md absolute -bottom-[10%] right-[5%]"
            />
            <Link
              style={{ fontFamily: "Quicksand" }}
              href="/contact"
              className="absolute  hidden sm:flex bottom-0 sm:-bottom-26 left-[50%]   bg-primary hover:bg-accent/90 text-white px-8 text-lg cursor-pointer font-bold rounded-full p-5"
            >
              Join Us
            </Link>
          </section>

          <AnimatedContainer staggerDelay={0.15}>
            <span className="w-full    grid mt-20 sm:flex gap-2 items-center justify-center sm:mt-30 sm:justify-center h-auto sm:h-60 ">
              {impactMetrics.map((metric, i) => (
                <AnimatedElement
                  key={i}
                  variant="scaleIn"
                  delay={i * 0.1}
                  className="flex flex-col items-center justify-center mx-10"
                >
                  <span className="flex items-center w-full gap-3">
                    <span className="flex items-center w-10 h-10  sm:w-20 sm:h-20 justify-center pt-3 rounded-full bg-orange-100 sm:pt-2">
                      <img
                        src={metric.img}
                        className="w-5 h-5 sm:w-10 sm:h-10 mb-4"
                      />
                    </span>
                    <span style={{ fontFamily: "Quicksand" }}>
                      <p className="text-xl sm:text-5xl font-bold text-accent">
                        <AnimatedCounter
                          value={parseInt(metric.value)}
                          duration={2500}
                          suffix="+"
                        />
                      </p>
                      <p className="text-md sm:text-lg text-muted-foreground">
                        {metric.label}
                      </p>
                    </span>
                  </span>
                </AnimatedElement>
              ))}
            </span>
          </AnimatedContainer>
        </section>
      </AnimatedElement>

      {/* Donations */}
      <AnimatedElement variant="slideInUp">
        <section className="py-5 sm:py-0 px-2 sm:px-4 sm:flex justify-center items-center mt-14 md:px-8 bg-card relative">
          <img
            src="/donation-image.jpg"
            className="rounded-md hidden w-1/2 sm:inline-block"
          />
          <div className="flex-1 bg-white w-1/2 h-full"></div>
          <img
            src="/shape1-3.png"
            className="w-20   h-50  absolute hidden sm:inline-block right-20 bottom-0"
          />
          <img
            src="/shape1-2.png"
            className="w-30 h-30 absolute hidden sm:inline-block right-5 top-10"
          />
          <img
            src="/shape1-1.png"
            className="w-40 h-40 absolute hidden sm:inline-block bottom-5 left-15"
          />

          <div className="w-full  max-w-5xl   h-auto  xl:h-120   sm:shadow-md   bg-card      rounded-2xl shadow-md overflow-hidden sm:absolute    flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div className="w-full sm:w-1/2 xl:w-1/2 bg-green-800 text-white p-6 sm:p-10 xl:p-10 relative flex flex-col justify-between">
              <img
                src="/hand-shape.png"
                className="w-16 h-16 hidden sm:block absolute top-6 right-6 opacity-80"
              />

              <div className="space-y-3">
                <p className="text-orange-300 text-sm">Help & Donate</p>

                <h1
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xl  lg:text-4xl  font-bold leading-snug"
                >
                  Your Small Contribution can Change a Life
                </h1>

                <p className="text-sm   sm:text-base text-gray-200">
                  Your generous donations help us maintain our work, provide
                  community services, and educate future generations. Every
                  contribution counts and is greatly appreciated.
                </p>
              </div>

              {/* DONATORS */}
              <div className="  flex border-2 border-border p-2 rounded-full px-5 items-center gap-3 flex-wrap">
                <div className="flex  rounded-full p-1">
                  {donators.map((donator, i) => (
                    <img
                      key={i}
                      src={donator}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full -ml-2 first:ml-0 border-2 border-green-800"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm ml-auto text-right">
                  <span className="text-orange-400 font-bold">
                    $ <AnimatedCounter value={3546} duration={2500} />
                  </span>
                  <br />
                  {donators.length} Donors
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-1/2 bg-background p-6 sm:p-10 flex flex-col justify-center">
              <h1
                style={{ fontFamily: "Quicksand" }}
                className="text-xl sm:text-2xl font-bold text-accent mb-4"
              >
                Make A Donation
              </h1>

              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Enter your Names"
                    className="flex-1 bg-card border-0"
                  />
                  <Input
                    placeholder="Enter your Email Address"
                    className="flex-1 bg-card border-0"
                  />
                </div>

                <Input
                  placeholder="Company name (Optional)"
                  className="bg-card border-0"
                />

                <Input
                  placeholder="Amount Donating"
                  className="bg-card border-0"
                />

                {/* QUICK DONATIONS */}
                <div className="flex flex-wrap gap-2">
                  {quickdonations.map((donation, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white"
                    >
                      {donation.amount}
                    </Button>
                  ))}
                </div>

                {/* CHECKBOXES */}
                <div className="flex items-start gap-2">
                  <Input type="checkbox" className="w-4 h-4 mt-1" />
                  <p className="text-xs text-muted-foreground">
                    I want to receive updates about the impact of my donation
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <Input type="checkbox" className="w-4 h-4 mt-1" />
                  <p className="text-xs text-muted-foreground">
                    I agree to the terms and conditions
                  </p>
                </div>

                <Button className="w-full bg-primary hover:bg-accent/90 text-white font-bold py-4 text-lg rounded-lg">
                  Donate Now
                </Button>
              </form>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Upcoming Events */}
      <AnimatedElement variant="fadeInUp">
        <section className="p-4  sm:px-5 bg-white relative mt-14 md:px-8">
          <h1 style={{ fontFamily: "Quicksand" }} className="text-sm     ">
            Our Events
          </h1>
          <h2
            style={{ fontFamily: "Quicksand" }}
            className="text-3xl sm:text-5xl font-bold text-accent  mb-2"
          >
            Be Part of our Upcoming Events
          </h2>
          <p
            style={{ fontFamily: "Quicksand" }}
            className="mb-10 text-muted-foreground"
          >
            (Scroll 'UP' the events to view more!)
          </p>

          <div className="w-full hidden flex-1 bg-background relative z-10 sm:mx-auto p-0  rounded-md h-auto sm:h-120 sm:flex items-center  ">
            <ScrollStack className=" relative">
              {mockEvents.map((event) => (
                <ScrollStackItem key={event._id}>
                  <span className=" text-wrap  items-center justify-evenly grid p-2 sm:w-20 rounded-full h-full bg-primary/10">
                    <span className="w-15 h-15 flex items-center justify-center   rounded-full bg-primary">
                      <CalendarClock size={30} className="text-white" />
                    </span>
                    <p
                      style={{ fontFamily: "Quicksand" }}
                      className="text-xs font-bold text-primary"
                    >
                      {event.date}
                    </p>
                  </span>

                  <span className="flex-1 flex items-center h-full gap-6 px-5">
                    <span className="w-[75%] h-full  ">
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className=" xl:text-2xl text-accent font-bold"
                      >
                        {event.title}
                      </p>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-md truncate line-clamp-2 text-wrap text-muted-foreground"
                      >
                        {event.description}
                      </p>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-xs  mt-4 font-semibold text-accent"
                      >
                        <b className="text-primary">Topic:</b> {event.topic}
                      </p>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-xs  font-semibold text-accent"
                      >
                        <b className="text-primary">Time:</b> {event.time}
                      </p>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-xs  xl:mb-3 font-semibold text-accent"
                      >
                        <b className="text-primary">Location:</b>{" "}
                        {event.location.address}
                      </p>

                      <span className="flex   gap-3">
                        <Link
                          href="/contact"
                          style={{ fontFamily: "Quicksand" }}
                          className="bg-primary/20 hover:bg-green-800 hover:text-white text-primary  p-2  text-lg cursor-pointer font-bold rounded-lg   "
                        >
                          Join Now
                        </Link>
                        <Link
                          href="/contact"
                          style={{ fontFamily: "Quicksand" }}
                          className="bg-accent/20 flex items-center justify-center hover:bg-green-800 hover:text-white text-accent  p-2  text-md cursor-pointer font-bold rounded-lg   "
                        >
                          See Details <ArrowRight />
                        </Link>
                      </span>
                    </span>
                    <img
                      src={`${event.image.url}`}
                      className="w-flex h-full rounded-md "
                    />
                  </span>
                </ScrollStackItem>
              ))}
            </ScrollStack>
            {/* <img
              src="/event-image.png"
              className="w-1/2 h-full absolute hidden sm:inline-block -right-50"
            />
            <img
              src="/news-1-shape-1.png"
              className="w-25 h-25 absolute hidden sm:inline-block top-0 left-0"
            />
            <img
              src="/news-1-shape-2.png"
              className="w-50 h-50 absolute -z-20 hidden sm:inline-block bottom-0 left-0"
            />
            <img
              src="/news-1-shape-3.png"
              className="w-25 h-25 absolute -z-20 hidden sm:inline-block top-0 right-0"
            /> */}
            {/* <img src='/news-1-shape-4.png' className='w-70 h-70 absolute hidden -z-20 sm:inline-block top-0 right-0' /> */}
          </div>
          <span className="lg:hidden w-full h-120 bg-card grid gap-2 items-center overflow-y-auto">
            {mockEvents.map((event) => (
              <div
                key={event._id}
                className="w-80 lg:hidden  bg-background relative z-10 sm:mx-auto my-10   rounded-md  h-auto pb-2      mt-10"
              >
                <img
                  src={`${event.image.url}`}
                  className="w-full h-58 rounded-md   object-cover"
                />
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-lg truncate line-clamp-2 mt-4 px-3 text-left font-bold"
                >
                  {event.title}
                </p>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-sm truncate  text-wrap line-clamp-3 text-muted-foreground px-3 text-left  "
                >
                  {event.description}
                </p>
                <span
                  style={{ fontFamily: "Quicksand" }}
                  className="text-sm px-3 my-4 font-semibold text-accent"
                >
                  <b className="text-primary">Topic:</b> {event.topic}
                </span>{" "}
                <br />
                <span
                  style={{ fontFamily: "Quicksand" }}
                  className="text-sm px-3 my-4 font-semibold text-accent"
                >
                  <b className="text-primary">Date:</b> {event.date}
                </span>
                <br />
                <span
                  style={{ fontFamily: "Quicksand" }}
                  className="text-sm px-3 my-4 font-semibold text-accent"
                >
                  <b className="text-primary">Time:</b> {event.time}
                </span>
                <br />
                <span
                  style={{ fontFamily: "Quicksand" }}
                  className="text-sm truncate text-wrap line-clamp-2 px-3  mt-2 font-semibold text-accent"
                >
                  <b className="text-primary">Location:</b>{" "}
                  {event.location.address}
                </span>
                <br />
                <Button
                  style={{ fontFamily: "Quicksand" }}
                  className="bg-primary/20 hover:bg-green-800 hover:text-white text-primary  text-lg cursor-pointer font-bold rounded-lg    w-[90%] ml-4"
                >
                  Join Now
                </Button>
              </div>
            ))}
          </span>
        </section>
      </AnimatedElement>

      {/* Footer */}
      <footer className=" hidden mt-5 sm:flex shadow-lg relative  justify-center items-center flex-1 bg-pink-400">
        <img src="/footer-bg.jpg" className="  w-full h-full" />
        <div className="max-w-6xl gap-5 border-b border-muted text-white justify-evenly h-96 flex-1 flex items-center absolute     mx-auto">
          <div className="text-white    gap-4 h-full w-1/3">
            <span className="  items-center w-full ">
              <span className="flex items-center gap-2">
                <span className="flex p-2 items-center border-4 border-white justify-center bg-primary rounded-full">
                  <img
                    src="https://html.kodesolution.com/2026/hopenest-html/images/resource/about-1-uni-icon.png"
                    alt="Logo"
                    className="w-10 h-10"
                  />
                </span>
                <h2
                  style={{ fontFamily: "Quicksand" }}
                  className="text-white text-xl font-bold"
                >
                  Seeds of Love
                </h2>
              </span>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-sm mt-4  text-muted"
              >
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </span>

            <span
              style={{ fontFamily: "Quicksand" }}
              className="flex items-center gap-3 mt-5"
            >
              {socialMediaLinks.map((social, i) => (
                <Link
                  style={{ fontFamily: "Quicksand" }}
                  key={i}
                  href={social.url}
                  target="_blank"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white bg-primary hover:bg-green-800  hover:text-white"
                >
                  {social.icon ? (
                    <social.icon size={18} />
                  ) : (
                    <span className="text-sm font-bold">𝕏</span>
                  )}
                </Link>
              ))}
            </span>
          </div>

          <div className="text-white    gap-4 h-full w-1/3">
            <span className="  items-center w-full ">
              <h2
                style={{ fontFamily: "Quicksand" }}
                className="text-white text-xl font-bold"
              >
                Quick Links
              </h2>
              <ul className="text-sm mt-4 text-justify text-muted">
                <li>
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    href="/about"
                    className="hover:text-primary text-lg  mt-5 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    href="/campaigns"
                    className="hover:text-primary text-lg  mt-5 transition-colors"
                  >
                    Our Campaigns
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    href="/blog"
                    className="hover:text-primary text-lg  mt-5 transition-colors"
                  >
                    Our News
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    href="/contact"
                    className="hover:text-primary text-lg  mt-5 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    href="/contact"
                    className="hover:text-primary text-lg  mt-5 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ fontFamily: "Quicksand" }}
                    href="/donate"
                    className="hover:text-primary text-lg  mt-5 transition-colors"
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </span>
          </div>

          <div className="text-white    gap-4 h-full w-1/3">
            <span className="  items-center w-full font-bold text-accent">
              <h2
                style={{ fontFamily: "Quicksand" }}
                className="text-white font-bold"
              >
                Contact us
              </h2>
              <ul className="text-sm mt-4 text-justify text-muted">
                <li className="flex mt-5 items-center gap-2">
                  <span className="text-primary"></span>
                  <p className="flex" style={{ fontFamily: "Quicksand" }}>
                    <MapPin
                      className="mr-2 text-primary
                    
                    <span><span>"
                    />
                    Gayaza Rd, Kumukaaga, <br />
                    Opposite kumbuzi, <br /> Kyadondo East,
                    <br />
                    Wakiso District, Uganda
                  </p>
                </li>
                <li className="flex mt-5 items-center gap-2">
                  <span className="text-primary">
                    <PhoneCall />{" "}
                  </span>
                  <span style={{ fontFamily: "Quicksand" }}>
                    +256 7xx-xxx-xxx
                  </span>
                </li>
                <li className="flex mt-5 items-center gap-2">
                  <span className="text-primary">
                    <Mail />
                  </span>
                  <span style={{ fontFamily: "Quicksand" }}>
                    info@seedsoflove.org
                  </span>
                </li>
              </ul>
            </span>
          </div>
        </div>
        <span className="absolute border flex border-border rounded-full p-2 gap-2 bottom-40 right-100">
          <Input
            style={{ fontFamily: "Quicksand" }}
            placeholder="Subscribe to our newsletter"
            className="bg-transparent rounded-full  border-0 p-5 text-sm text-white w-80"
          />
          <Button
            style={{ fontFamily: "Quicksand" }}
            className="bg-primary hover:bg-green-800 text-white px-8 text-lg cursor-pointer font-bold rounded-full p-5"
          >
            <Send size={18} />
          </Button>
        </span>

        <span className="text-sm text-muted w-1/4 mt-5 text-center   flex   justify-evenly absolute bottom-10 left-5">
          <Link
            style={{ fontFamily: "Quicksand" }}
            href="/privacy-policy"
            className="cursor-pointer  hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            style={{ fontFamily: "Quicksand" }}
            href="/terms-of-service"
            className="cursor-pointer hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
        </span>

        <span
          style={{ fontFamily: "Quicksand" }}
          className="text-sm text-muted mt-5 text-center w-full absolute bottom-10"
        >
          &copy; {new Date().getFullYear()} Seeds of Love. All rights reserved.
        </span>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 absolute bottom-5 cursor-pointer border-2 border-white hover:bg-accent right-10 rounded-full bg-primary flex items-center justify-center"
        >
          <ArrowUp size={18} className="text-white" />
        </span>
      </footer>

      <section className="lg:hidden">
        <Footer />
      </section>
    </main>
  );
}
