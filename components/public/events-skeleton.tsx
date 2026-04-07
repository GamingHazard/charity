"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function EventsSkeleton() {
  return (
    <section className="p-4 sm:px-5 bg-white relative mt-14 md:px-8">
      <Skeleton className="h-6 w-24 mb-4" />
      <Skeleton className="h-12 w-96 mb-2" />
      <Skeleton className="h-6 w-80 mb-10" />

      <div className="w-full hidden flex-1 bg-background relative z-10 sm:mx-auto p-0 rounded-md h-auto sm:h-120 sm:flex items-center">
        <div className="relative w-full h-120">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="absolute flex items-center h-full gap-6 px-5 bg-card rounded-md shadow-md"
              style={{
                left: `${index * 320}px`,
                width: "300px",
              }}
            >
              {/* Date/Icon section */}
              <div className="text-wrap items-center justify-evenly grid p-2 sm:w-20 rounded-full h-full bg-primary/10">
                <Skeleton className="w-15 h-15 rounded-full bg-primary mx-auto" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>

              {/* Content section */}
              <div className="flex-1 flex items-center h-full gap-6 px-5">
                <div className="w-[75%] h-full">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
                <Skeleton className="w-32 h-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile events skeleton */}
      <div className="lg:hidden w-full h-120 bg-card grid gap-2 items-center overflow-y-auto mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-80 bg-background relative z-10 my-10 rounded-md h-auto pb-2 mt-10"
          >
            <Skeleton className="w-full h-58 rounded-md mb-4" />
            <Skeleton className="h-6 w-3/4 mx-3 mb-2" />
            <Skeleton className="h-4 w-full mx-3 mb-1" />
            <Skeleton className="h-4 w-full mx-3 mb-1" />
            <Skeleton className="h-4 w-2/3 mx-3 mb-4" />
            <Skeleton className="h-4 w-24 mx-3 mb-2" />
            <Skeleton className="h-4 w-20 mx-3 mb-2" />
            <Skeleton className="h-4 w-32 mx-3 mb-4" />
            <Skeleton className="h-8 w-24 mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}
