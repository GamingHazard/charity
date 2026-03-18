# TanStack Query Implementation Guide

TanStack Query (formerly React Query) has been installed and configured globally throughout the charity site. This document explains how to use it effectively.

## Installation & Setup

✅ **Already Configured:**

- Package installed: `@tanstack/react-query@5.91.0`
- Query client created: `lib/query-client.ts`
- Provider component: `components/providers/query-provider.tsx`
- Global provider: Integrated in `app/layout.tsx`

## Query Client Configuration

The query client is configured with sensible defaults in `lib/query-client.ts`:

```typescript
- Stale time: 0 (always consider data stale)
- Auto refetch on mount: true
- Auto refetch on window focus: true
- Retry attempts: 1 with exponential backoff
```

## Usage Examples

### 1. Fetching Data (Queries)

Import query hooks from `hooks/use-api-queries.ts`:

```typescript
'use client';

import { useBlogs } from '@/hooks/use-api-queries';

export function BlogList() {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {blogs?.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  );
}
```

### Available Query Hooks

- `useBlogs()` - Fetch all blogs
- `useGallery()` - Fetch gallery images
- `useEvents()` - Fetch events
- `useStaff(type?)` - Fetch staff (optionally filter by 'staff' or 'volunteer')
- `useNewsletterSubscribers()` - Fetch newsletter subscribers
- `usePrograms()` - Fetch programs
- `useDonations()` - Fetch donations

### 2. Creating/Updating/Deleting Data (Mutations)

Import mutation hooks from `hooks/use-api-mutations.ts`:

```typescript
'use client';

import { useCreateBlog } from '@/hooks/use-api-mutations';
import { toast } from 'sonner';

export function CreateBlogForm() {
  const { mutate: createBlog, isPending } = useCreateBlog({
    onSuccess: () => {
      toast.success('Blog created successfully!');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (formData) => {
    createBlog(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
}
```

### Available Mutation Hooks

**Blogs:**

- `useCreateBlog(options)` - Create new blog
- `useUpdateBlog(options)` - Update blog (takes { id, data })
- `useDeleteBlog(options)` - Delete blog

**Gallery:**

- `useUploadGalleryImage(options)` - Upload image (takes File)

**Events:**

- `useCreateEvent(options)` - Create event
- `useUpdateEvent(options)` - Update event (takes { id, data })
- `useDeleteEvent(options)` - Delete event

**Staff:**

- `useAddStaff(options)` - Add staff member
- `useUpdateStaff(options)` - Update staff (takes { id, data })
- `useDeleteStaff(options)` - Delete staff member

**Newsletter:**

- `useSubscribeNewsletter(options)` - Subscribe to newsletter

### 3. Advanced Query Options

Pass options to customize query behavior:

```typescript
const { data } = useBlogs({
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
  enabled: isAuthorized, // Only run if condition is true
  retry: 3, // Retry failed requests 3 times
});
```

### 4. Query Invalidation

Queries are automatically invalidated after mutations, but you can also manually invalidate:

```typescript
import { useQueryClient } from '@tanstack/react-query';

function MyComponent() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // Invalidate queries to force refetch
    queryClient.invalidateQueries({ queryKey: ['blogs'] });
  };

  return <button onClick={handleRefresh}>Refresh</button>;
}
```

### 5. Polling (Auto-refresh)

Enable automatic polling for real-time updates:

```typescript
const { data } = useEvents({
  refetchInterval: 30000, // Refresh every 30 seconds
});
```

## API Integration

The hooks expect API endpoints to be available:

```
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id

POST   /api/gallery/upload
GET    /api/gallery

POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

POST   /api/staff
PUT    /api/staff/:id
DELETE /api/staff/:id

POST   /api/newsletter/subscribe
GET    /api/newsletter-subscribers

GET    /api/programs
GET    /api/donations
```

Create these API routes in `app/api/` directory.

## Best Practices

### ✅ Do's

1. **Use error and loading states**

   ```typescript
   if (isLoading) return <Skeleton />;
   if (error) return <ErrorBoundary error={error} />;
   ```

2. **Handle mutations with callbacks**

   ```typescript
   const { mutate } = useCreateBlog({
     onSuccess: () => toast.success("Created!"),
     onError: (err) => toast.error(err.message),
   });
   ```

3. **Leverage automatic caching** - No need to manually manage state

4. **Use query keys consistently** - Invalidate related queries after mutations

### ❌ Don'ts

1. **Don't use TanStack Query for global UI state** - Use Zustand or Context for that
2. **Don't ignore loading states** - Always show feedback to users
3. **Don't create queries in loops** - Use array queries with dynamic keys instead
4. **Don't forget to invalidate** - Update your cache after mutations

## Debugging

Use React Query DevTools for development:

```bash
pnpm add @tanstack/react-query-devtools
```

Then add to your component:

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function RootLayout() {
  return (
    <>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

## Next Steps

1. **Create API routes** in `app/api/` for each resource
2. **Update components** to use query hooks instead of useState
3. **Test mutations** to ensure proper cache invalidation
4. **Monitor performance** with DevTools
5. **Add error boundaries** for better error handling

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Getting Started Guide](https://tanstack.com/query/latest/docs/react/overview)
- [Testing Guide](https://tanstack.com/query/latest/docs/react/testing)
