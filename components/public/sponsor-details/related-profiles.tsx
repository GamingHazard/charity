"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { SponsorshipProfile } from "@/lib/mock-data";

interface RelatedProfilesProps {
  profiles: SponsorshipProfile[];
  currentProfileId: string;
}

export default function RelatedProfiles({
  profiles,
  currentProfileId,
}: RelatedProfilesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, profiles.length - itemsPerView)
        : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= profiles.length - itemsPerView ? 0 : prevIndex + 1,
    );
  };

  const visibleProfiles = profiles.slice(
    currentIndex,
    currentIndex + itemsPerView,
  );

  return (
    <motion.section
      className="relative py-12 sm:py-16 bg-gradient-to-br from-gray-50/50 to-gray-50/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Meet More Children
            </h2>
            <p className="mt-3 text-gray-600">
              Other children in the same age group available for sponsorship
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="hidden sm:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-md"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNext}
              className="p-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition-all shadow-md"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {visibleProfiles.map((profile, idx) => (
              <motion.div
                key={profile._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                {/* Image container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                  <motion.img
                    src={profile.image.url}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Overlay info */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 sm:p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white text-sm sm:text-base leading-relaxed line-clamp-2">
                      {profile.story}
                    </p>
                  </motion.div>

                  {/* Support badge */}
                  {/* <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-md">
                    <Heart size={16} className="text-red-500" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">
                      {profile.progress}%
                    </span>
                  </div> */}
                </div>

                {/* Content section */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Name and age */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {profile.firstName}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      Age {profile.age} • {profile.gender}
                    </p>
                  </div>

                  {/* Info chips */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs sm:text-sm font-medium text-green-700">
                      {profile.class}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs sm:text-sm font-medium text-blue-700">
                      {profile.location}
                    </span>
                  </div>

                  {/* View button */}
                  <Link
                    href={`/donate/${profile._id}`}
                    className="block w-full text-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 mt-2"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile navigation */}
        <div className="flex sm:hidden gap-2 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPrevious}
            className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNext}
            className="p-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white transition-all"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({
            length: Math.max(1, profiles.length - itemsPerView + 1),
          }).map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? "w-8 h-2 bg-gradient-to-r from-green-600 to-emerald-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
