import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader for campaign cards (upcoming/completed)
 */
export function CampaignCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
      {/* Image skeleton */}
      <Skeleton className="h-96 w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for donor cards in the recognition section
 */
export function DonorCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
      <div className="flex items-center gap-3 flex-1">
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

/**
 * Skeleton loader for recent activity items
 */
export function ActivityItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  );
}

/**
 * Skeleton loader for campaigns section
 */
export function CampaignsSectionSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CampaignCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton loader for donor recognition section
 */
export function DonorRecognitionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Top Donors Card */}
      <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <DonorCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg p-6 space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ActivityItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton loader for milestones section
 */
export function MilestonesSectionSkeleton() {
  return (
    <div>
      <div className="text-center mb-12 space-y-4">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center space-y-4">
            <div className="flex justify-center">
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
            <div className="bg-white rounded-xl p-4 space-y-2">
              <Skeleton className="h-6 w-24 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
              <Skeleton className="h-3 w-28 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
