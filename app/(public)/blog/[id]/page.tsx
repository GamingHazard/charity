import { BlogDetail } from '@/components/public/blog-detail';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { mockBlogs } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = mockBlogs.find((b) => b._id === id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <BlogDetail {...blog} />
      </div>
      <Footer />
    </main>
  );
}

// Optional: Generate static params for better performance
export function generateStaticParams() {
  return mockBlogs.map((blog) => ({
    id: blog._id,
  }));
}
