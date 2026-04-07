"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function NewsSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-card hover:shadow-2xl transition-all duration-300 rounded-lg overflow-hidden"
            >
              {/* Image skeleton */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-muted">
                <Skeleton className="w-full h-full" />
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>

              {/* Content skeleton */}
              <div className="p-4 sm:p-6">
                {/* Date skeleton */}
                <Skeleton className="h-4 w-24 mb-2" />

                {/* Title skeleton */}
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-3" />

                {/* Excerpt skeleton */}
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />

                {/* Author skeleton */}
                <Skeleton className="h-4 w-20 mb-4" />

                {/* Stats skeleton */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>

                {/* Button skeleton */}
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Skeleton className="h-12 w-40 mx-auto" />
        </div>
      </div>
    </section>
  );
}
