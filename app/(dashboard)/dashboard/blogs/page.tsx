'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Eye, EyeOff } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: 'published' | 'draft';
  excerpt: string;
  content: string;
}

const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Making a Difference in Our Community',
    author: 'John Doe',
    category: 'Impact',
    date: '2024-03-15',
    status: 'published',
    excerpt: 'Learn how our initiatives are creating lasting change...',
    content: 'Full blog content here...',
  },
  {
    id: 'blog-2',
    title: 'Education Program Success Stories',
    author: 'Jane Smith',
    category: 'Education',
    date: '2024-03-10',
    status: 'published',
    excerpt: 'Celebrating our students achievements and growth...',
    content: 'Full blog content here...',
  },
  {
    id: 'blog-3',
    title: 'Upcoming Events and Volunteering Opportunities',
    author: 'Mike Johnson',
    category: 'Events',
    date: '2024-03-05',
    status: 'draft',
    excerpt: 'Join us for upcoming community events...',
    content: 'Full blog content here...',
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<BlogPost>>({});

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];
  const statuses = ['All', 'published', 'draft'];

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || blog.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [blogs, searchTerm, selectedCategory, selectedStatus]);

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setEditData(blog);
  };

  const handleSave = (id: string) => {
    setBlogs(blogs.map(blog =>
      blog.id === id
        ? { ...blog, ...editData }
        : blog
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft') => {
    setBlogs(blogs.map(blog =>
      blog.id === id ? { ...blog, status: newStatus } : blog
    ));
  };

  const handleAddNew = () => {
    const newId = `blog-${Date.now()}`;
    const newBlog: BlogPost = {
      id: newId,
      title: 'New Blog Post',
      author: 'Your Name',
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      excerpt: 'Enter your blog excerpt...',
      content: 'Enter your blog content...',
    };
    setBlogs([...blogs, newBlog]);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Blog Management</h2>
        <p className="text-foreground/70">Create, edit, and manage blog posts</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Posts</p>
          <p className="text-3xl font-bold text-foreground">{blogs.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Published</p>
          <p className="text-3xl font-bold text-accent">{blogs.filter(b => b.status === 'published').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Drafts</p>
          <p className="text-3xl font-bold text-primary">{blogs.filter(b => b.status === 'draft').length}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Posts</label>
          <Input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background text-foreground border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleAddNew}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            + New Blog Post
          </Button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Author</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="border-b border-border hover:bg-background/50">
                  <td className="px-6 py-4 text-foreground">
                    {editingId === blog.id ? (
                      <Input
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="bg-background border-border"
                      />
                    ) : (
                      blog.title
                    )}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {editingId === blog.id ? (
                      <Input
                        value={editData.author || ''}
                        onChange={(e) => setEditData({ ...editData, author: e.target.value })}
                        className="bg-background border-border"
                      />
                    ) : (
                      blog.author
                    )}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {editingId === blog.id ? (
                      <Input
                        value={editData.category || ''}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="bg-background border-border"
                      />
                    ) : (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{blog.category}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{blog.date}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusChange(blog.id, blog.status === 'published' ? 'draft' : 'published')}
                      className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                        blog.status === 'published'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {blog.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                      {blog.status}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {editingId === blog.id ? (
                        <>
                          <Button
                            onClick={() => handleSave(blog.id)}
                            className="bg-accent hover:bg-accent/90 text-xs px-3"
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="text-xs px-3"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-foreground"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredBlogs.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-foreground/70">No blog posts found matching your filters</p>
        </Card>
      )}
    </div>
  );
}
