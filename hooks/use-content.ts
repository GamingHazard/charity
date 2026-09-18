import { useQuery } from '@tanstack/react-query';
import { ContentItem, normalizeContentItem } from '@/lib/content-utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export function useContent(section?: string) {
  return useQuery<ContentItem[]>({
    queryKey: ['content', section || 'all', 'published'],
    queryFn: async () => {
      const params = new URLSearchParams({ status: 'published' });
      if (section) params.set('section', section);
      const response = await fetch(`${API_BASE_URL}/content?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch content');
      const items = await response.json();
      return items.map(normalizeContentItem);
    },
  });
}