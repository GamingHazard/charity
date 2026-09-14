"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

type GalleryItem = {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  image?: {
    url?: string;
  };
  url?: string;
  videoUrl?: string;
  type?: "image" | "video";
};

function getMediaUrl(item: GalleryItem) {
  if (item.type === "video" && item.videoUrl) return item.videoUrl;
  if (item.image?.url) return item.image.url;
  if (item.url) return item.url;
  return "";
}

function isVideoItem(item: GalleryItem) {
  if (item.type === "video") return true;

  const mediaUrl = getMediaUrl(item);

  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(mediaUrl);
}

export default function CampaignPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data: galleryData, isLoading } = useQuery<any[]>({
    queryKey: ["gallery", "all"],
  });

  useEffect(() => {
    if (galleryData) {
      setGallery(galleryData as GalleryItem[]);
      setVisibleCount(12);
    }
  }, [galleryData]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        gallery
          .map((item) => item.category)
          .filter((category): category is string => Boolean(category)),
      ),
    );

    return ["All", ...uniqueCategories];
  }, [gallery]);

  const filteredGallery = useMemo(() => {
    if (activeCategory === "All") return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [gallery, activeCategory]);

  const visibleGallery = filteredGallery.slice(0, visibleCount);

  useEffect(() => {
    if (!loadMoreRef.current || visibleCount >= filteredGallery.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 6, filteredGallery.length));
        }
      },
      {
        rootMargin: "260px",
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [filteredGallery.length, visibleCount]);

  useEffect(() => {
    const videoNodes = document.querySelectorAll<HTMLVideoElement>(
      'video[data-gallery-video="true"]',
    );

    if (!videoNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.muted = true;
            video.playsInline = true;
            video.play().catch(() => {});
            return;
          }

          video.pause();
        });
      },
      {
        threshold: 0.35,
      },
    );

    videoNodes.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [visibleGallery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(12);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="px-4 pb-10 pt-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-green-600">
            Gallery
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Our Stories in Motion
          </h1>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A curated collection of moments, community work, and impact from our
            recent initiatives.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                type="button"
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className={
                  activeCategory === category
                    ? "bg-green-700 hover:bg-green-800"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="mb-4 h-72 animate-pulse rounded-2xl bg-muted"
                />
              ))}
            </div>
          ) : visibleGallery.length > 0 ? (
            <>
              <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                {visibleGallery.map((item, index) => {
                  const mediaUrl = getMediaUrl(item);
                  const itemIsVideo = isVideoItem(item);

                  if (!mediaUrl) return null;

                  return (
                    <motion.div
                      key={item._id ?? item.id ?? `${item.title}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="block w-full text-left"
                      >
                        {itemIsVideo ? (
                          <video
                            data-gallery-video="true"
                            className="block w-full h-auto max-h-[90vh] bg-black object-contain"
                            src={mediaUrl}
                            muted
                            playsInline
                            loop
                            autoPlay
                            controls={false}
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={mediaUrl}
                            alt={item.title ?? "Gallery item"}
                            className="block w-full h-auto object-contain"
                          />
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div>
                            <p className="text-sm font-semibold">
                              {item.title || "Gallery item"}
                            </p>

                            {item.category ? (
                              <p className="text-xs text-white/80">
                                {item.category}
                              </p>
                            ) : null}
                          </div>

                          {itemIsVideo ? (
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                              <Play className="ml-0.5 h-4 w-4 fill-current" />
                            </span>
                          ) : null}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              <div ref={loadMoreRef} className="h-8" />

              {visibleCount >= filteredGallery.length &&
              filteredGallery.length > 0 ? (
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  You’ve reached the end of the gallery.
                </p>
              ) : null}
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-xl font-semibold">No gallery items found</p>
              <p className="mt-2 text-muted-foreground">
                Check back later for new images and videos.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-background">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[85vh] overflow-auto">
              {isVideoItem(selectedItem) ? (
                <video
                  key={selectedItem._id ?? selectedItem.id ?? "selected-video"}
                  className="max-h-[85vh] w-full bg-black object-contain"
                  src={getMediaUrl(selectedItem)}
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={getMediaUrl(selectedItem)}
                  alt={selectedItem.title ?? "Selected gallery item"}
                  className="max-h-[85vh] w-full object-contain"
                />
              )}
            </div>

            <div className="border-t border-border bg-card p-5">
              <h3 className="text-xl font-semibold">
                {selectedItem.title || "Gallery item"}
              </h3>

              {selectedItem.category ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedItem.category}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </main>
  );
}
