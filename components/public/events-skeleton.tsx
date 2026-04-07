"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function EventsSkeleton() {
  return (
    <section className="p-4 sm:px-5 bg-white relative mt-14 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeletons */}
        <Skeleton className="h-4 w-20 mb-3" />
        <Skeleton className="h-10 w-80 mb-3" />
        <Skeleton className="h-5 w-64 mb-10" />

        {/* Desktop Events Skeleton */}
        <div className="w-full hidden lg:flex bg-background relative z-10 p-4 rounded-lg h-96 items-center gap-6 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white rounded-lg shadow-md p-4 flex items-center gap-4 h-full"
              style={{ minWidth: "500px" }}
            >
              {/* Date/Icon section */}
              <div className="flex flex-col items-center justify-center p-4 bg-primary/10 rounded-full flex-shrink-0">
                <Skeleton className="w-12 h-12 rounded-full mb-2" />
                <Skeleton className="h-3 w-12" />
              </div>

              {/* Content section */}
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="space-y-1 pt-2">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
                <Skeleton className="h-9 w-24 mt-3" />
              </div>

              {/* Image section */}
              <Skeleton className="w-32 h-24 rounded-md flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Mobile Events Skeleton */}
        <div className="lg:hidden grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-background rounded-lg shadow-md overflow-hidden"
            >
              {/* Image */}
              <Skeleton className="w-full h-48" />

              {/* Content */}
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="space-y-2 pt-2">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-3/4" />
                </div>

                <Skeleton className="h-10 w-full mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
