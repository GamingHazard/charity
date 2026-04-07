"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Eye, User2 } from "lucide-react";
import { AnimatedElement } from "@/components/motion/animated-elements";
import { apiRequest } from "@/lib/query-client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface BlogCardProps {
  _id: string;
  title: string;
  excerpt: string;
  image: {
    url: string;
    public_id: string;
  };
  author: string;
  date: string;
  likes: string[];
  views: string[];
  comments: any[];
  createdAt: string;
}

export function BlogCard({
  _id,
  title,
  excerpt,
  image,
  author,
  createdAt,
  likes,
  views,
  comments,
}: BlogCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = uuidv4();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, []);
  const logView = async () => {
    try {
      const res = await apiRequest("POST", `/blogs/${_id}/log-view`, {
        uuid: userId,
      });
      if (!res.ok) {
        console.error("Failed to log view");
      }
    } catch (error) {}
  };

  return (
    <Link onClick={logView} href={`/blog/${_id}`}>
      <AnimatedElement variant="scaleIn">
        <div className="bg-card hover:shadow-2xl transition-all duration-300 rounded-lg overflow-hidden cursor-pointer transform hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-muted">
            <Image
              src={image.url || "/no-images3.png"}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {/* Date */}
            <p
              style={{ fontFamily: "Quicksand" }}
              className="text-xs sm:text-sm text-muted-foreground mb-2"
            >
              {formattedDate}
            </p>

            {/* Title */}
            <h3
              style={{ fontFamily: "Quicksand" }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-accent mb-3 line-clamp-2 hover:text-primary transition-colors"
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p
              style={{ fontFamily: "Quicksand" }}
              className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-2"
            >
              {excerpt}
            </p>

            {/* Author */}
            <p
              style={{ fontFamily: "Quicksand" }}
              className="text-xs flex gap-2 sm:text-sm text-muted-foreground mb-4 font-semibold"
            >
              <User2 size={16} className="text-muted-foreground " />{" "}
              <span className="text-primary">{author}</span>
            </p>

            {/* Stats */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye size={16} className="text-primary" />
                {views?.length}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={16} className="text-primary" />
                {likes?.length}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} className="text-primary" />
                {comments?.length}
              </span>
            </div>

            {/* Read More Button */}
            <Button
              style={{ fontFamily: "Quicksand" }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors"
            >
              Read Full Article →
            </Button>
          </div>
        </div>
      </AnimatedElement>
    </Link>
  );
}
