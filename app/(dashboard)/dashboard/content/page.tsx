'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContentItemCard } from '@/components/dashboard/content-item-card';
import { ContentStats } from '@/components/dashboard/content-stats';
import { ContentItem, defaultContentItems, searchContent as filterContent, sortContent } from '@/lib/content-utils';

const initialContent: ContentItem[] = defaultContentItems;

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated');

  const sections = ['All', ...Array.from(new Set(content.map(item => item.section)))];
  const statuses = ['All', 'published', 'draft'];

  const filteredContent = useMemo(() => {
    const filtered = filterContent(content, searchTerm, selectedSection, selectedStatus);
    return sortContent(filtered, sortBy);
  }, [content, searchTerm, selectedSection, selectedStatus, sortBy]);

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setEditContent(item.content);
  };

  const handleSave = (id: string) => {
    setContent(content.map(item =>
      item.id === id
        ? { ...item, content: editContent, lastUpdated: new Date().toISOString().split('T')[0], status: 'published' }
        : item
    ));
    setEditingId(null);
    setEditContent('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (id: string) => {
    setContent(content.filter(item => item.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'draft') => {
    setContent(content.map(item =>
      item.id === id
        ? { ...item, status: newStatus }
        : item
    ));
  };

  const handleAddNew = () => {
    const newId = `content-${Date.now()}`;
    const newItem: ContentPage = {
      id: newId,
      title: 'New Content',
      section: selectedSection === 'All' ? 'Home' : selectedSection,
      content: 'Enter your content here...',
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'draft',
    };
    setContent([...content, newItem]);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Content Management</h2>
        <p className="text-foreground/70">Edit website content across different sections and manage publishing status</p>
      </div>

      {/* Statistics */}
      <ContentStats items={content} />

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Content</label>
          <Input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background text-foreground border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
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
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'updated' | 'created' | 'title')}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            <option value="updated">Last Updated</option>
            <option value="created">Created</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-foreground/70">
          Showing {filteredContent.length} of {content.length} content items
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
        >
          + Add New Content
        </Button>
      </div>

      {/* Content List */}
      {filteredContent.length === 0 ? (
        <Card className="p-12 text-center bg-card border-border">
          <p className="text-foreground/70">No content items found matching your filters.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredContent.map((item) => (
            <ContentItemCard
              key={item.id}
              item={item}
              isEditing={editingId === item.id}
              editContent={editContent}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onContentChange={setEditContent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
