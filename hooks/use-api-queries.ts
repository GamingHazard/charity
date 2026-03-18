import { useQuery, UseSuspenseQueryOptions } from '@tanstack/react-query';

/**
 * Hook to fetch blogs with TanStack Query
 * Usage in components:
 * const { data: blogs, isLoading, error } = useBlogs();
 */
export function useBlogs(options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json();
    },
    ...options,
  });
}

/**
 * Hook to fetch gallery images with TanStack Query
 */
export function useGallery(options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('Failed to fetch gallery');
      return response.json();
    },
    ...options,
  });
}

/**
 * Hook to fetch events with TanStack Query
 */
export function useEvents(options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
    ...options,
  });
}

/**
 * Hook to fetch staff members with TanStack Query
 */
export function useStaff(type?: 'staff' | 'volunteer', options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['staff', type],
    queryFn: async () => {
      // Replace with actual API call
      const url = type ? `/api/staff?type=${type}` : '/api/staff';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch staff');
      return response.json();
    },
    ...options,
  });
}

/**
 * Hook to fetch newsletter subscribers with TanStack Query
 */
export function useNewsletterSubscribers(options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/newsletter-subscribers');
      if (!response.ok) throw new Error('Failed to fetch subscribers');
      return response.json();
    },
    ...options,
  });
}

/**
 * Hook to fetch programs with TanStack Query
 */
export function usePrograms(options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/programs');
      if (!response.ok) throw new Error('Failed to fetch programs');
      return response.json();
    },
    ...options,
  });
}

/**
 * Hook to fetch donations with TanStack Query
 */
export function useDonations(options?: Partial<UseSuspenseQueryOptions>) {
  return useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      // Replace with actual API call
      const response = await fetch('/api/donations');
      if (!response.ok) throw new Error('Failed to fetch donations');
      return response.json();
    },
    ...options,
  });
}
