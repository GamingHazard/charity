# TanStack Query - Quick Reference

## Installation ✅

```bash
pnpm add @tanstack/react-query
```

## Files Created

1. **Query Client Config**
   - `lib/query-client.ts` - Configured query client with defaults

2. **Provider**
   - `components/providers/query-provider.tsx` - QueryClientProvider wrapper

3. **Query Hooks**
   - `hooks/use-api-queries.ts` - Read operations (GET)
   - `hooks/use-api-mutations.ts` - Write operations (POST, PUT, DELETE)

4. **Documentation**
   - `docs/TANSTACK_QUERY_GUIDE.md` - Full implementation guide

## Quick Examples

### Fetch Data

```typescript
import { useBlogs } from "@/hooks/use-api-queries";

const { data, isLoading, error } = useBlogs();
```

### Create Data

```typescript
import { useCreateBlog } from "@/hooks/use-api-mutations";

const { mutate, isPending } = useCreateBlog({
  onSuccess: () => toast.success("Created!"),
  onError: (err) => toast.error(err.message),
});

mutate({ title: "My Blog", content: "..." });
```

### Update Data

```typescript
import { useUpdateBlog } from "@/hooks/use-api-mutations";

const { mutate } = useUpdateBlog();
mutate({ id: "blog-1", data: { title: "Updated" } });
```

### Delete Data

```typescript
import { useDeleteBlog } from "@/hooks/use-api-mutations";

const { mutate } = useDeleteBlog();
mutate("blog-1");
```

## Available Hooks

### Queries (Reads)

- `useBlogs()`
- `useGallery()`
- `useEvents()`
- `useStaff(type?)`
- `useNewsletterSubscribers()`
- `usePrograms()`
- `useDonations()`

### Mutations (Writes)

- `useCreateBlog(options)`
- `useUpdateBlog(options)`
- `useDeleteBlog(options)`
- `useUploadGalleryImage(options)`
- `useCreateEvent(options)`
- `useUpdateEvent(options)`
- `useDeleteEvent(options)`
- `useAddStaff(options)`
- `useUpdateStaff(options)`
- `useDeleteStaff(options)`
- `useSubscribeNewsletter(options)`

## Global Setup

✅ **Already configured in `app/layout.tsx`:**

```typescript
<QueryProvider>
  <AuthProvider>
    <DataProvider>
      {children}
    </DataProvider>
  </AuthProvider>
</QueryProvider>
```

## Next Step: Create API Routes

Add these endpoints to `app/api/`:

```
/api/blogs - POST, GET
/api/blogs/:id - PUT, DELETE
/api/gallery - GET
/api/gallery/upload - POST
/api/events - POST, GET
/api/events/:id - PUT, DELETE
/api/staff - POST, GET
/api/staff/:id - PUT, DELETE
/api/newsletter/subscribe - POST
/api/newsletter-subscribers - GET
/api/programs - GET
/api/donations - GET
```

## Key Features

✅ Automatic caching
✅ Smart refetching on mount & window focus
✅ Built-in error handling & retries
✅ Optimistic updates support
✅ Pagination support
✅ Infinite queries support
✅ DevTools available for debugging

## Tips

1. Use `isPending` for loading, not `isLoading` for mutations
2. Queries auto-invalidate after successful mutations
3. Use `enabled` option to conditionally run queries
4. Use `staleTime` to control when data is considered stale
5. Access `queryClient` via `useQueryClient()` for manual control
