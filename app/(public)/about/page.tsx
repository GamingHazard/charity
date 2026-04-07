"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HandHeart, Medal, ShieldCheckIcon, ArrowRight } from "lucide-react";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import { AnimatedCounter } from "@/components/motion/animated-counter";

export default function About() {
  const metrics = [
    {
      title: "Compassion",
      description:
        "We approach every child with genuine empathy, understanding their unique circumstances and providing support that addresses both immediate needs and long-term potential.",
      icon: HandHeart,
      color: "red",
    },
    {
      title: "Integrity",
      description:
        "We maintain unwavering honesty in our operations, transparent reporting, and ethical decision-making that builds lasting trust with communities and donors.",
      icon: ShieldCheckIcon,
      color: "green",
    },
    {
      title: "Excellence",
      description:
        "We pursue the highest standards in program delivery, continuously improving our methods to maximize impact and ensure sustainable, measurable results.",
      icon: Medal,
      color: "yellow",
    },
  ];

  const testimonials = [
    {
      id: "test-1",
      name: "James Mwangi",
      role: "Program Beneficiary",
      quote:
        "Seeds of Love transformed my life by providing quality education. I now have opportunities I never dreamed of.",
      imageUrl: "/user.avif",
      rating: 5,
    },
    {
      id: "test-2",
      name: "Grace Okonkwo",
      role: "Community Leader",
      quote:
        "Working with this organization has brought real change to our community. Their commitment to transparency is remarkable.",
      imageUrl: "/user.avif",
      rating: 5,
    },
    {
      id: "test-3",
      name: "David Smith",
      role: "Volunteer",
      quote:
        "The team is incredibly dedicated and passionate. Every dollar donated truly makes a difference in people's lives.",
      imageUrl: "/user.avif",
      rating: 5,
    },
    {
      id: "test-4",
      name: "Asha Patel",
      role: "Program Participant",
      quote:
        "This organization gave me hope when I needed it most. I'm now empowered to help others in my community.",
      imageUrl: "/user.avif",
      rating: 5,
    },
  ];

  const teamMembers = [
    {
      id: "staff-1",
      name: "Sarah Johnson",
      role: "Executive Director",
      type: "staff",
      imageUrl:
        "https://content.fortune.com/wp-content/uploads/2017/09/afr-10-01-17-packnett.jpg",
    },
    {
      id: "staff-2",
      name: "Michael Chen",
      role: "Program Manager",
      type: "staff",
      imageUrl:
        "https://t4.ftcdn.net/jpg/05/35/49/09/360_F_535490924_ntlR1s9x6bRVV3TkgrGMJRgOvQ2YeGfW.jpg",
    },
    {
      id: "vol-1",
      name: "Emma Davis",
      role: "Community Volunteer",
      type: "volunteer",
      imageUrl:
        "https://img.freepik.com/free-photo/vertical-shot-attractive-african-american-male-smiling-camera_181624-36894.jpg",
    },
    {
      id: "vol-2",
      name: "Carlos Ramirez",
      role: "Event Volunteer",
      type: "volunteer",
      imageUrl:
        "https://media.istockphoto.com/id/117148115/photo/beautiful-cowgirl.jpg?s=612x612&w=0&k=20&c=G2w8lHvu6dqxuO1dU_0ag5rBgzuVrZW1K7nkMoR1HXU=",
    },
    {
      id: "vol-3",
      name: "Amina Patel",
      role: "Outreach Volunteer",
      type: "volunteer",
      imageUrl:
        "https://t3.ftcdn.net/jpg/01/87/83/26/360_F_187832626_Z0K54NuFDzPM10NZw6gWdRYMC763xJQM.jpg",
    },
    {
      id: "staff-3",
      name: "Olivia Brooks",
      role: "Communications Lead",
      type: "staff",
      imageUrl:
        "https://media.istockphoto.com/id/1742373297/photo/outdoor-portrait-of-senior-african-american-woman-at-home.jpg?s=612x612&w=0&k=20&c=EOUSAGPoOrDTukmi7vEaA2gOCGWffj5BKRw6vDyAznA=",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(4);

  return (
    <main className="min-h-screen -z-10 relative flex flex-1 flex-col bg-background">
      <Navbar />
      <section className="relative z-10 min-h-screen mb-6 sm:mb-8 md:mb-10 w-full flex items-center justify-center overflow-hidden pt-12 sm:pt-16">
        {/* Background Image */}
        <Image
          src="https://img.freepik.com/free-photo/african-kids-enjoying-life_23-2151438321.jpg"
          alt="Children learning in classroom"
          fill
          className="object-cover w-full"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900/75"></div>

        {/* Content */}
        <AnimatedElement variant="fadeInDown">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
              {/* Logo and Organization Name */}
              <div className="text-center">
                <Link href="/" className="inline-flex items-center gap-3 mb-6">
                  <img src="/logo.png" className="w-16 h-16 sm:w-20 sm:h-20" />
                  <div className="text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      ENSIGO OF LOVE
                    </p>
                    <p className="text-sm sm:text-base text-white/80">
                      We Rise By Lifting Others
                    </p>
                  </div>
                </Link>
              </div>

              {/* Main Heading */}
              <div className="text-center space-y-4 sm:space-y-6">
                <h1
                  style={{ fontFamily: "Quicksand" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg"
                >
                  Transforming Lives,
                  <br />
                  Building Futures
                </h1>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto text-balance drop-shadow-md"
                >
                  Since 2015, we've been nurturing growth and opportunity in
                  underserved communities through education, nutrition, and
                  sustainable development.
                </p>
              </div>

              {/* Key Stats */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1">
                    <AnimatedCounter value={2015} duration={2000} />
                  </div>
                  <p className="text-white/80 text-sm sm:text-base font-medium">
                    Founded
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1">
                    <AnimatedCounter value={200} duration={2000} suffix="+" />
                  </div>
                  <p className="text-white/80 text-sm sm:text-base font-medium">
                    Lives Transformed
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400 mb-1">
                    <AnimatedCounter value={20} duration={2000} suffix="+" />
                  </div>
                  <p className="text-white/80 text-sm sm:text-base font-medium">
                    Communities Served
                  </p>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="max-w-3xl mx-auto text-center">
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-lg sm:text-xl text-white/95 leading-relaxed drop-shadow-md"
                >
                  We compassionately serve and uplift vulnerable children by
                  providing inclusive care, protection, and essential support
                  systems that address both immediate and long-term needs.
                </p>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
                <Link href="/get-involved">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get Involved Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#impact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    See Our Impact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Decorative Elements - Simplified */}
        <img
          src="/circle-left.png"
          className="absolute hidden lg:inline-block -left-40 top-10 w-40 opacity-20"
        />
        <img
          src="/object-1-2.png"
          className="absolute hidden lg:inline-block bottom-0 right-10 w-60 opacity-20"
        />
      </section>

      <section className="flex-1 z-10 px-3 sm:px-4 md:px-8 max-w-6xl mx-auto w-full">
        <AnimatedContainer staggerDelay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 md:mb-12">
            <AnimatedElement variant="slideInLeft">
              <Card className="p-6 sm:p-8 bg-card border-border hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <HandHeart className="w-8 h-8 text-green-600" />
                  </div>
                  <h2
                    style={{ fontFamily: "Quicksand" }}
                    className="text-2xl sm:text-3xl font-bold text-foreground"
                  >
                    Our Mission
                  </h2>
                </div>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4"
                >
                  To compassionately serve and uplift vulnerable children by
                  providing inclusive care, protection, and essential support
                  systems that address both immediate and long-term needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground/70">
                      Education & Learning
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground/70">
                      Nutrition & Health
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground/70">
                      Family Support
                    </span>
                  </div>
                </div>
              </Card>
            </AnimatedElement>

            <AnimatedElement variant="slideInRight">
              <Card className="p-6 sm:p-8 bg-card border-border hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                    <Medal className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2
                    style={{ fontFamily: "Quicksand" }}
                    className="text-2xl sm:text-3xl font-bold text-foreground"
                  >
                    Our Vision
                  </h2>
                </div>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4"
                >
                  To nurture a generation of children who are deeply grounded in
                  spiritual values, academically empowered, and socially
                  confident to thrive in every sphere of life.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-foreground/70">
                      Empowered Leaders
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-foreground/70">
                      Sustainable Communities
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-foreground/70">
                      Lasting Change
                    </span>
                  </div>
                </div>
              </Card>
            </AnimatedElement>
          </div>
        </AnimatedContainer>

        <AnimatedElement variant="fadeInUp">
          <section className="py-8 z-10 sm:py-12 md:py-16 w-full shadow-lg rounded-md mb-5 px-3 sm:px-4 md:px-8 bg-card border-y border-border">
            <div className="max-w-6xl mx-auto w-full">
              <h2
                style={{ fontFamily: "Quicksand" }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground text-balance"
              >
                Core Values that Drive Our Impact
              </h2>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 md:mb-10 text-center text-foreground/70"
              >
                We believe in treating every person with dignity and respect
                while maintaining the highest standards of accountability.
              </p>

              <AnimatedContainer staggerDelay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {metrics.map((metric, index) => (
                    <AnimatedElement
                      key={index}
                      variant="scaleIn"
                      delay={index * 0.1}
                      className="border hover:border-secondary hover:shadow-2xl border-border rounded-lg p-3 sm:p-4 md:p-6 flex flex-col items-center justify-evenly bg-background"
                    >
                      <span
                        className={`p-2 sm:p-3 md:p-4 rounded-full bg-${metric.color}-100 text-${metric.color}-600 mb-2 sm:mb-3 md:mb-4`}
                      >
                        <metric.icon
                          className={`w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-${metric.color}-600 fill-${metric.color}-`}
                        />
                      </span>
                      <h3
                        style={{ fontFamily: "Quicksand" }}
                        className="text-base sm:text-lg md:text-xl font-bold text-foreground mt-2 sm:mt-3 md:mt-4 text-center"
                      >
                        {metric.title}
                      </h3>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-xs sm:text-sm text-foreground/70 text-center mt-2"
                      >
                        {metric.description}
                      </p>
                    </AnimatedElement>
                  ))}
                </div>
              </AnimatedContainer>
            </div>
          </section>
        </AnimatedElement>

        <AnimatedElement variant="fadeInUp">
          <section className="py-10 z-10 sm:py-14 w-full bg-card border-y border-border rounded-md mb-8 px-3 sm:px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <h2
                style={{ fontFamily: "Quicksand" }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground"
              >
                Meet Our Team
              </h2>
              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-xs sm:text-sm md:text-base text-center text-foreground/70 max-w-2xl mx-auto mt-3"
              >
                Our dedicated staff and volunteers bring passion and expertise
                to every program we run.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {teamMembers.slice(0, visibleCount).map((member) => (
                  <div
                    key={member.id}
                    className="relative overflow-hidden rounded-xl shadow-lg group h-72"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition" />
                    </div>
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white/90 bg-white/10 mb-2">
                        {member.type === "staff" ? "Staff" : "Volunteer"}
                      </span>
                      <h3
                        style={{ fontFamily: "Quicksand" }}
                        className="text-lg sm:text-xl font-semibold text-white"
                      >
                        {member.name}
                      </h3>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-sm text-white/80 mt-1"
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {teamMembers.length > 4 && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() =>
                      setVisibleCount((prev) =>
                        prev >= teamMembers.length
                          ? 4
                          : Math.min(teamMembers.length, prev + 4),
                      )
                    }
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                  >
                    {visibleCount >= teamMembers.length
                      ? "View Less"
                      : "View More"}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </AnimatedElement>
      </section>

      <AnimatedElement variant="slideInUp">
        <section
          id="impact"
          className="flex-1 mb-8 sm:mb-10 z-10 rounded-md shadow-md bg-card mx-auto w-full py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-8 max-w-6xl my-8 sm:my-10 md:my-10"
        >
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold mx-0 sm:mx-5 md:mx-10 mb-3 sm:mb-4 md:mb-5"
          >
            Our Impact On The Communities We Serve
          </p>
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-foreground/70 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10"
          >
            We are committed to making a lasting difference in the lives of
            those we serve, ensuring that every individual has the opportunity
            to thrive.
          </p>

          <AnimatedContainer staggerDelay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <AnimatedElement
                variant="scaleIn"
                className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-evenly bg-background"
              >
                <span className="p-2 sm:p-3 md:p-4 rounded-full bg-orange-100 text-orange-600 mb-2 sm:mb-3 md:mb-4">
                  <img
                    src="/counter-icon-1-1.png"
                    className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-orange-600 fill-orange-100"
                  />
                </span>
                <h3
                  style={{ fontFamily: "Quicksand" }}
                  className="text-base sm:text-lg md:text-xl text-center font-bold text-foreground mt-2 sm:mt-3 md:mt-4"
                >
                  <b className="text-2xl sm:text-3xl md:text-4xl">
                    <AnimatedCounter value={200} duration={2500} suffix="+" />
                  </b>{" "}
                  <br /> Lives Transformed
                </h3>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xs sm:text-sm text-foreground/70 mt-2 text-center"
                >
                  Through our education and nutrition programs, we have
                  positively impacted over 200 individuals country wide.
                </p>
              </AnimatedElement>

              <AnimatedElement
                variant="scaleIn"
                className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-evenly bg-background"
              >
                <span className="p-2 sm:p-3 md:p-4 rounded-full bg-blue-100 text-blue-600 mb-2 sm:mb-3 md:mb-4">
                  <Medal className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-blue-600 fill-blue-100" />
                </span>
                <h3
                  style={{ fontFamily: "Quicksand" }}
                  className="text-base sm:text-lg md:text-xl text-center font-bold text-foreground mt-2 sm:mt-3 md:mt-4"
                >
                  <b className="text-2xl sm:text-3xl md:text-4xl">
                    <AnimatedCounter value={90} duration={2500} suffix="%" />
                  </b>{" "}
                  <br /> Program Success Rate
                </h3>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xs sm:text-sm text-foreground/70 mt-2 text-center"
                >
                  Our initiatives have a 95% success rate in improving
                  educational outcomes and nutritional status among
                  participants.
                </p>
              </AnimatedElement>

              <AnimatedElement
                variant="scaleIn"
                className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col items-center justify-evenly bg-background col-span-1 sm:col-span-2 lg:col-span-1"
              >
                <span className="p-2 sm:p-3 md:p-4 rounded-full bg-green-100 text-green-600 mb-2 sm:mb-3 md:mb-4">
                  <ShieldCheckIcon className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-green-600 fill-green-100" />
                </span>
                <h3
                  style={{ fontFamily: "Quicksand" }}
                  className="text-base sm:text-lg md:text-xl text-center font-bold text-foreground mt-2 sm:mt-3 md:mt-4"
                >
                  <b className="text-2xl sm:text-3xl md:text-4xl">
                    <AnimatedCounter value={100} duration={2500} suffix="%" />
                  </b>{" "}
                  <br />
                  Accountability
                </h3>
                <p
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xs sm:text-sm text-foreground/70 mt-2 text-center"
                >
                  We maintain the highest standards of accountability, ensuring
                  that every coin donated is used effectively to create
                  meaningful change.
                </p>
              </AnimatedElement>
            </div>
          </AnimatedContainer>
        </section>
      </AnimatedElement>

      {/* Testimonials Section */}
      <AnimatedElement variant="fadeInUp">
        <section className="flex-1 mb-8 z-10  sm:mb-10 rounded-md shadow-md bg-card mx-auto w-full py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-8 max-w-6xl my-8 sm:my-10 md:my-10">
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold mx-0 sm:mx-5 md:mx-10 mb-3 sm:mb-4 md:mb-5"
          >
            What People Say About Us
          </p>
          <p
            style={{ fontFamily: "Quicksand" }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-foreground/70 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10"
          >
            Hear from the individuals whose lives have been touched by our
            programs and initiatives.
          </p>

          <AnimatedContainer staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {testimonials.map((testimonial, index) => (
                <AnimatedElement
                  key={testimonial.id}
                  variant="scaleIn"
                  delay={index * 0.1}
                  className="border border-border rounded-lg p-4 sm:p-5 md:p-6 flex flex-col bg-background hover:shadow-lg transition-shadow"
                >
                  {/* Stars Rating */}
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    style={{ fontFamily: "Quicksand" }}
                    className="text-sm md:text-base text-foreground/80 mb-4 sm:mb-5 italic flex-1"
                  >
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 sm:gap-4 mt-4 pt-4 border-t border-border">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4
                        style={{ fontFamily: "Quicksand" }}
                        className="text-base sm:text-lg font-semibold text-foreground"
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-xs sm:text-sm text-foreground/60"
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedContainer>
        </section>
      </AnimatedElement>

      {/* Subtle decorative elements */}
      <img
        src="/frame1-1.png"
        className="absolute -z-5 hidden xl:inline-block bottom-10 left-10 w-32 opacity-10"
      />
      <img
        src="/object1-1.png"
        className="absolute -z-5 hidden xl:inline-block top-1/3 right-10 w-24 opacity-10"
      />

      <Footer />
    </main>
  );
}
