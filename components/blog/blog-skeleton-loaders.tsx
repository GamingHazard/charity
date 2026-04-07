import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader for blog hero image
 */
export function BlogHeroSkeleton() {
  return <Skeleton className="w-full h-64 sm:h-96 md:h-[500px] rounded-none" />;
}

/**
 * Skeleton loader for blog header meta info
 */
export function BlogHeaderSkeleton() {
  return (
    <header className="mb-8 md:mb-12 space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-4/5" />
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
      </div>

      {/* Meta Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 sm:gap-6 ml-0 sm:ml-auto">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </header>
  );
}

/**
 * Skeleton loader for blog content paragraphs
 */
export function BlogContentSkeleton() {
  return (
    <div className="space-y-6 mb-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for comments section
 */
export function BlogCommentsSkeleton() {
  return (
    <div className="mb-8 md:mb-12">
      <Skeleton className="h-8 w-40 mb-6" />

      {/* Add Comment Form */}
      <div className="mb-8 p-4 sm:p-6 bg-card rounded-lg border border-border space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-6 bg-card rounded-lg border border-border space-y-3"
          >
            <div className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton loader for engagement section
 */
export function BlogEngagementSkeleton() {
  return (
    <div className="border-t border-b border-border py-6 sm:py-8 mb-8 md:mb-12">
      <div className="flex gap-4 w-full">
        <Skeleton className="h-10 flex-1 sm:flex-none sm:w-32 rounded-md" />
        <Skeleton className="h-10 flex-1 sm:flex-none sm:w-32 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Complete blog detail page skeleton loader
 */
export function BlogDetailPageSkeleton() {
  return (
    <article className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-border py-2 px-3 sm:px-6 md:px-10">
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Hero Image */}
      <BlogHeroSkeleton />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <BlogHeaderSkeleton />
        <BlogEngagementSkeleton />
        <BlogContentSkeleton />
        <BlogCommentsSkeleton />

        {/* Related Articles CTA */}
        <div className="mt-12 md:mt-16 p-6 sm:p-8 md:p-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 space-y-4">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </article>
  );
}
