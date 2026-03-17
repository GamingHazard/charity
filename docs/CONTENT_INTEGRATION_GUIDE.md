# Content Management - Integration Guide for Developers

## Overview

This guide explains how to integrate the Content Management Dashboard with the public website so that edited content automatically updates the website in real-time.

## Current State vs. Future State

### Current State (Standalone)
```
Content Management Dashboard
    ↓
   Component State (localStorage)
    ↓
Edit/Delete/Publish (UI only)
    ↗
No connection to public website
```

### Future State (Integrated)
```
Content Management Dashboard
    ↓
API Routes
    ↓
Database / Storage
    ↓
Public Website Pages
    ↓
Auto-revalidation (ISR)
```

## Step-by-Step Integration

### Step 1: Create API Routes

Create API endpoints to serve content to the public website.

**File: `/app/api/content/route.ts`**
```typescript
import { defaultContentItems } from '@/lib/content-utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const status = searchParams.get('status') || 'published';

  const items = defaultContentItems.filter(item => {
    if (status && item.status !== status) return false;
    if (section && item.section !== section) return false;
    return true;
  });

  return Response.json(items);
}
```

**File: `/app/api/content/[id]/route.ts`**
```typescript
import { defaultContentItems } from '@/lib/content-utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = defaultContentItems.find(i => i.id === params.id);
  
  if (!item) {
    return Response.json(
      { error: 'Content not found' },
      { status: 404 }
    );
  }

  return Response.json(item);
}
```

### Step 2: Create Content Fetching Hook

**File: `/hooks/use-content.ts`**
```typescript
import useSWR from 'swr';
import { ContentItem } from '@/lib/content-utils';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useContent(section?: string) {
  const params = new URLSearchParams();
  if (section) params.append('section', section);
  params.append('status', 'published');

  const { data, error, isLoading } = useSWR<ContentItem[]>(
    `/api/content?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    content: data || [],
    isLoading,
    error,
  };
}

// Single item hook
export function useContentItem(id: string) {
  const { data, error, isLoading } = useSWR<ContentItem>(
    `/api/content/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    item: data,
    isLoading,
    error,
  };
}
```

### Step 3: Update Public Pages to Use Content Hook

**File: `/app/(public)/about/page.tsx` (Example)**
```typescript
'use client';

import { useContent } from '@/hooks/use-content';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export default function AboutPage() {
  const { content, isLoading } = useContent('About');

  if (isLoading) return <div>Loading...</div>;

  const missionItem = content.find(item => item.id === 'mission');
  const visionItem = content.find(item => item.id === 'vision');

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {missionItem && (
          <section>
            <h2>{missionItem.title}</h2>
            <p>{missionItem.content}</p>
          </section>
        )}
        {visionItem && (
          <section>
            <h2>{visionItem.title}</h2>
            <p>{visionItem.content}</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
```

### Step 4: Move Content Data to Database

For production, store content in a database instead of hardcoded JSON.

**Example: Using Supabase**

1. Create a `content` table:
```sql
CREATE TABLE content (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT CHECK (status IN ('published', 'draft')),
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_section ON content(section);
CREATE INDEX idx_status ON content(status);
```

2. Update API route to fetch from database:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const status = 'published'; // Only show published items

  let query = supabase.from('content').select('*');

  if (section) {
    query = query.eq('section', section);
  }

  query = query.eq('status', status);

  const { data, error } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
```

### Step 5: Implement Revalidation Strategy

#### Option A: On-Demand ISR (Recommended)
```typescript
// In content management dashboard save handler
import { revalidatePath } from 'next/cache';

const handleSave = async (id: string) => {
  // ... save to database
  
  // Revalidate public pages that might use this content
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/programs');
  revalidatePath('/get-involved');
  revalidatePath('/contact');
};
```

#### Option B: Scheduled Revalidation
```typescript
// /app/api/revalidate/route.ts
export async function GET(request: Request) {
  // Verify secret
  if (request.headers.get('authorization') !== `Bearer ${process.env.REVALIDATE_SECRET}`) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Revalidate all content pages
  await Promise.all([
    revalidatePath('/'),
    revalidatePath('/about'),
    revalidatePath('/programs'),
    revalidatePath('/get-involved'),
    revalidatePath('/contact'),
  ]);

  return Response.json({ revalidated: true, now: Date.now() });
}
```

### Step 6: Add Content Publishing Restrictions

Update the dashboard to only allow viewing published content:

```typescript
// /lib/content-utils.ts (modify)
export function getPublishedContent(items: ContentItem[]) {
  return items.filter(item => item.status === 'published');
}
```

Update content page:
```typescript
// Show all content in dashboard
const allContent = [...];

// But when fetching for public use
const publicContent = getPublishedContent(allContent);
```

## Caching Strategy

### Recommended Approach: Hybrid Caching

```
┌─────────────────────────────────┐
│  Client Browser Cache (SWR)     │
│  (1 minute for most pages)      │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Next.js Cache (ISR)            │
│  (Revalidate on update)         │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│  Database (Source of Truth)     │
└─────────────────────────────────┘
```

## Environment Variables

Add these to your `.env.local`:

```bash
# Database (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key

# Revalidation
REVALIDATE_SECRET=your_secret

# Content API
NEXT_PUBLIC_CONTENT_API_URL=http://localhost:3000/api/content
```

## Error Handling

Add error handling for content fetching:

```typescript
export function useContent(section?: string) {
  const { data, error } = useSWR(
    `/api/content?section=${section}`,
    fetcher,
    {
      onError: (error) => {
        console.error('Failed to fetch content:', error);
      },
      fallbackData: [], // Return empty array on error
    }
  );

  return {
    content: data || [],
    error,
    hasError: !!error,
  };
}
```

## Fallback Content

Provide fallback content in case API fails:

```typescript
const DEFAULT_HERO = {
  id: 'hero-fallback',
  title: 'Hero Section',
  content: 'Planting Seeds of Love & Hope',
  section: 'Home',
  status: 'published',
  lastUpdated: '2024-01-01',
};

export function useContent(section?: string) {
  const { content = [] } = useSWR(...);
  
  // Return fallbacks if empty
  if (content.length === 0 && section === 'Home') {
    return { content: [DEFAULT_HERO] };
  }
  
  return { content };
}
```

## Testing Integration

### Manual Testing Checklist
- [ ] Fetch API returns correct content
- [ ] Public pages display fetched content
- [ ] Content updates appear within 1 minute
- [ ] Draft content doesn't appear on public site
- [ ] Published content appears immediately
- [ ] Unpublishing removes content from public site
- [ ] Deleting content removes from database
- [ ] Database constraints prevent invalid data
- [ ] Error handling shows fallback content
- [ ] Performance is acceptable (<200ms)

### Automated Testing Example
```typescript
// __tests__/content-api.test.ts
describe('Content API', () => {
  it('should return published content only', async () => {
    const res = await fetch('/api/content?section=Home');
    const content = await res.json();
    
    expect(content.every(item => item.status === 'published')).toBe(true);
  });

  it('should find content by ID', async () => {
    const res = await fetch('/api/content/hero');
    const item = await res.json();
    
    expect(item.id).toBe('hero');
  });
});
```

## Performance Optimization

### 1. Use Cache Headers
```typescript
export async function GET(request: Request) {
  const items = await fetchContent();
  
  return Response.json(items, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

### 2. Implement Pagination (for large datasets)
```typescript
const page = searchParams.get('page') || '1';
const limit = 20;
const offset = (parseInt(page) - 1) * limit;

const items = content.slice(offset, offset + limit);
```

### 3. Add Content Search API
```typescript
// /app/api/content/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  
  const results = content.filter(item =>
    item.title.includes(q) || item.content.includes(q)
  );
  
  return Response.json(results);
}
```

## Migration Path

### Phase 1: API Layer (Week 1)
- Create API routes
- Create fetching hooks
- Add error handling
- Test API endpoints

### Phase 2: Update Pages (Week 2)
- Update 1-2 public pages
- Test content updates
- Monitor performance
- Gather feedback

### Phase 3: Full Migration (Week 3)
- Update all public pages
- Remove hardcoded content
- Implement revalidation
- Go live

### Phase 4: Database (Week 4)
- Set up database
- Migrate content to DB
- Update API to use DB
- Archive hardcoded data

## Rollback Plan

If issues occur:

1. **Immediate**: Revert to hardcoded content (1 minute)
2. **Short-term**: Disable content API (5 minutes)
3. **Investigation**: Check error logs and database
4. **Fix**: Deploy corrected version
5. **Restore**: Re-enable API with fixes

## Monitoring & Analytics

Track these metrics:

```typescript
// Log content fetches
console.log({
  timestamp: new Date(),
  endpoint: '/api/content',
  duration: performance.now(),
  items: content.length,
});

// Monitor cache hits
if (response.headers.get('X-Cache') === 'HIT') {
  analytics.log('cache_hit');
}
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Content not updating | Check revalidation is working, clear cache |
| Slow page loads | Implement proper caching strategy |
| Draft content visible | Verify status filter in API |
| Database connection fails | Check environment variables |
| API rate limiting | Implement request throttling |

## Conclusion

This integration guide provides a complete roadmap for connecting the Content Management Dashboard to your public website. Start with Phase 1 (API Layer) and gradually progress through the phases as you gain confidence in the system.

For questions or issues, refer to the main documentation or contact the development team.

---

**Integration Status**: Ready to Implement
**Estimated Time**: 2-4 weeks
**Difficulty Level**: Intermediate
