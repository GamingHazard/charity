"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import GlassSurface from "../../../lib/glassSurface";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <section className="relative z-10 min-h-screen mb-5 w-full flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image */}
        <Image
          src="https://burst.shopifycdn.com/photos/contact-us-image.jpg?width=1000&format=pjpg&exif=0&iptc=0"
          alt="Children learning in classroom"
          fill
          className="object-cover w-full"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900/70"></div>

        {/* Content */}
        <div className="relative z-10   flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col text-right lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Left: Text */}
            <div
              style={{ fontFamily: "Quicksand" }}
              className="w-full  lg:text-right space-y-6 lg:space-y-8"
            >
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-3xl text-center sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg">
                  Contact Us
                </h1>
                <p className="text-lg   text-justify sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 text-balance drop-shadow-md">
                  We would love to hear from you! Whether you have questions
                  about our programs, want to get involved, or just want to say
                  hello, feel free to reach out. Our team is here to assist you
                  and provide any information you may need. Please reach us
                  through the provided contact details. We look forward to
                  connecting with you!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ fontFamily: "Quicksand" }}
          className="relative hidden sm:flex h-auto  gap-3 z-10 w-1/2 max-w-7xl mx-auto px-4 sm:px-0 lg:px-8"
        >
          <div className="flex flex-col w-1/2   lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Left: Text */}
            <div className="w-full  lg:text-left space-y-6  ">
              <div className="space-y-3 lg:space-y-4">
                <GlassSurface
                  width={"100%"}
                  height={570}
                  displace={0.5}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  brightness={50}
                  opacity={0.93}
                  mixBlendMode="screen"
                  className="relative"
                >
                  <div className="absolute -top-20 p-4">
                    <h3
                      style={{ fontFamily: "Quicksand" }}
                      className="text-2xl text-white text-center font-bold  "
                    >
                      Our Contact Information
                    </h3>
                    <div
                      style={{ fontFamily: "Quicksand" }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="font-semibold text-white">Email</h4>
                        <p className="text-accent">hello@seedsoflove.org</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Phone</h4>
                        <p className="text-accent">+256 7xx-xxx-xxx</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">Office</h4>
                        <p className="text-accent">
                          Gayaza Rd, Kumukaaga,
                          <br />
                          Opposite kumbuzi, Kyadondo East <br />
                          Wakiso District, Uganda
                        </p>
                      </div>
                      <div>
                        <h4
                          style={{ fontFamily: "Quicksand" }}
                          className="font-semibold text-white mb-4"
                        >
                          Follow Us
                        </h4>
                        <div
                          style={{ fontFamily: "Quicksand" }}
                          className="flex gap-4"
                        >
                          <a
                            href="#"
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            <span className="text-lg">f</span>
                          </a>
                          <a
                            href="#"
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            <span className="text-lg">𝕏</span>
                          </a>
                          <a
                            href="#"
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            <span className="text-lg">in</span>
                          </a>
                        </div>
                      </div>

                      <Button
                        variant={"ghost"}
                        className=" border-2 bg-white border-border hover:bg-green-800 w-full hover:text-white text-accent px-8 text-lg cursor-pointer font-bold rounded-lg p-5 mt-5"
                      >
                        <img src="/whats-app.png" className="w-10 h-10" /> Chat
                        with Us
                      </Button>
                    </div>
                  </div>
                </GlassSurface>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2   lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Left: Text */}
            <div className="w-full  lg:text-left space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <GlassSurface
                  width={"100%"}
                  height={570}
                  displace={0.5}
                  distortionScale={-180}
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  brightness={50}
                  opacity={0.93}
                  mixBlendMode="screen"
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute -top-20  items-center justify-center w-full px-4">
                    <h2
                      style={{ fontFamily: "Quicksand" }}
                      className="text-2xl text-center font-bold text-white "
                    >
                      Send Us a Message
                    </h2>
                    <form
                      style={{ fontFamily: "Quicksand" }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Name
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-background border-border text-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Email
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-background border-border text-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Subject
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-background border-border text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full p-2 bg-background border border-border rounded-md text-foreground resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        Send Message
                      </Button>
                    </form>
                  </div>
                </GlassSurface>
              </div>
            </div>
          </div>
        </div>

        <img
          src="/circle-left.png"
          className="absolute hidden sm:inline-block -left-70 top-20 -mr-4"
        />
        <img
          src="/object-1-2.png"
          className="absolute hidden sm:inline-block bottom-0 "
        />
      </section>

      <section
        style={{ fontFamily: "Quicksand" }}
        className="flex-1 lg:hidden py-16 px-4 md:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-5xl font-bold text-accent mb-4 text-balance">
            Write us a Message
          </h1>
          <p className="text-sm text-foreground/70 max-w-2xl mx-auto">
            We would love to hear from you! Whether you have questions about our
          </p>
        </div>

        <div className="grid items-center bg-card rounded-md justify-center h-auto pb-10 shadow-md w-full object-cover max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 py-5">
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Name
              </label>
              <Input
                placeholder="Enter your name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background border-border text-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Email
              </label>
              <Input
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background border-border text-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Subject
              </label>
              <Input
                placeholder="Enter your subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-background border-border text-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Type you message..."
                className="w-full p-2 bg-background border border-border rounded-md text-foreground resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
      <Card
        style={{ fontFamily: "Quicksand" }}
        className="lg:hidden p-6 mx-4 bg-card border-border"
      >
        <h3 className="text-2xl text-accent text-center font-bold  mb-6">
          Our Contact Information
        </h3>
        <div className="space-y-4 p-5">
          <div className="">
            <h4 className="font-semibold text-accent">Email</h4>
            <p className="text-muted-foreground">hello@seedsoflove.org</p>
          </div>
          <div>
            <h4 className="font-semibold text-accent">Phone</h4>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="font-semibold text-accent">Office</h4>
            <p className="text-muted-foreground">
              123 Main Street
              <br />
              New York, NY 10001
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-accent mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span className="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>

          <Button
            variant={"ghost"}
            className=" border-2 border-green-500 bg-white   w-full hover:text-accent text-green-500 px-8 text-lg cursor-pointer font-bold rounded-lg p-5 mt-5"
          >
            <img src="/whats-app.png" className="w-10 h-10" /> Chat with Us
          </Button>
        </div>
      </Card>
      <section
        style={{ fontFamily: "Quicksand" }}
        className="flex-1 py-16 px-4 md:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4 text-balance">
            Locate Us and Get in Touch
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Whether you want to visit our office, have questions about our work,
            or just want to say hello, we're here to connect. Find our contact
            details below and feel free to reach out. We look forward to hearing
            from you!
          </p>
        </div>

        <div className="flex items-center rounded-md justify-center h-96 shadow-md w-full object-cover max-w-4xl mx-auto">
          <iframe
            src={`https://www.google.com/maps?q=0.402749113762963,32.58166666859604&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Custom Map"
            data-testid="map"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
