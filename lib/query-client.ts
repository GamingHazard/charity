import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want the lowest stale time possible.
        staleTime: 0,
        // This ensures that the data will be re-fetched on mount automatically
        refetchOnMount: true,
        // Refetch data on window focus for better UX
        refetchOnWindowFocus: true,
        // Better error handling
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });
};

// Create a single instance for client-side code
export const queryClient = createQueryClient();
