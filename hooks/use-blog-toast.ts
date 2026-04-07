'use client'

import { useToast } from '@/hooks/use-toast'

/**
 * Custom hook for blog-specific toast notifications
 * Provides type-safe methods for common blog actions:
 * - Like/Unlike
 * - Comment operations
 * - Share operations
 * - Link copying
 */
export function useBlogToast() {
  const { toast } = useToast()

  return {
    /**
     * Show when user likes a blog post
     */
    liked: () => {
      toast({
        title: 'Liked',
        description: 'You liked this post.',
      })
    },

    /**
     * Show when user removes a like
     */
    unliked: () => {
      toast({
        title: 'Unliked',
        description: 'You unliked this post.',
      })
    },

    /**
     * Show when like operation fails
     */
    likeError: () => {
      toast({
        title: 'Error',
        description: 'Could not update like. Please try again.',
        variant: 'destructive',
      })
    },

    /**
     * Show when comment is successfully posted
     */
    commentPosted: () => {
      toast({
        title: 'Comment Posted',
        description: 'Your comment has been added!',
      })
    },

    /**
     * Show when comment posting fails
     */
    commentError: (message?: string) => {
      toast({
        title: 'Error',
        description: message || 'Could not post comment. Please try again.',
        variant: 'destructive',
      })
    },

    /**
     * Show when blog link is copied to clipboard
     */
    linkCopied: () => {
      toast({
        title: 'Link Copied',
        description: 'Blog link copied to clipboard!',
      })
    },

    /**
     * Show when link copy fails
     */
    copyError: () => {
      toast({
        title: 'Copy Failed',
        description: 'Could not copy link. Please try again.',
        variant: 'destructive',
      })
    },

    /**
     * Show when blog is shared for the first time
     */
    shared: () => {
      toast({
        title: 'Shared!',
        description: 'Blog link copied to clipboard. Thanks for sharing!',
      })
    },

    /**
     * Show when share operation fails
     */
    shareError: () => {
      toast({
        title: 'Share Failed',
        description: 'Could not share blog. Please try again.',
        variant: 'destructive',
      })
    },
  }
}
