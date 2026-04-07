"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CampaignSkeleton() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="bg-background rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Campaign Image Skeleton */}
            <div className="relative h-64 lg:h-full min-h-[300px]">
              <Skeleton className="w-full h-full rounded-none" />
              <div className="absolute top-4 left-4">
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
            </div>

            {/* Campaign Content Skeleton */}
            <div className="p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />

                {/* Progress Section Skeleton */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-3 w-full mb-3" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>

                {/* End Date Skeleton */}
                <div className="flex items-center gap-2 mb-6">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
