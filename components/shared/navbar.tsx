"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeBtn, setActiveBtn] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change at 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Blogs" },
    // { href: "/get-involved", label: "Get Involved" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 font-bold text-xl transition-colors ${
              isScrolled
                ? "text-foreground hover:text-primary"
                : "text-white hover:text-white/80 drop-shadow-lg"
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors  bg-primary text-primary-foreground`}
            >
              🌱
            </span>
            Seeds of Love
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                onClick={()=>setActiveBtn(link.label)}
                key={link.href}
                href={link.href}
                className={`transition-colors ${activeBtn === link.label ? " border-b border-primary" : " "} font-medium ${
                  isScrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/90 hover:text-white drop-shadow-md"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className={`transition-all ${
                isScrolled
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
              }`}
            >
              Donate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled
                ? "text-foreground hover:text-primary"
                : "text-white hover:text-white/80 drop-shadow-lg"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden pb-4 space-y-2 transition-all ${
              isScrolled
                ? "bg-card/95 backdrop-blur-md border-t border-border"
                : "bg-black/20 backdrop-blur-md"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isScrolled
                    ? "text-foreground/70 hover:text-foreground hover:bg-background"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className={`w-full mt-2 transition-all ${
                isScrolled
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
              }`}
            >
              Donate
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
