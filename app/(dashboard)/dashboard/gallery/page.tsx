'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Upload, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
  uploadDate: string;
  size: string;
  featured: boolean;
}

const initialImages: GalleryImage[] = [
  {
    id: 'img-1',
    title: 'Community Gathering 2024',
    category: 'Events',
    url: '/donation-image.jpg',
    uploadDate: '2024-03-15',
    size: '2.5MB',
    featured: true,
  },
  {
    id: 'img-2',
    title: 'Educational Program',
    category: 'Education',
    url: '/hero-bg-1-1.jpg',
    uploadDate: '2024-03-10',
    size: '1.8MB',
    featured: false,
  },
  {
    id: 'img-3',
    title: 'Volunteer Team',
    category: 'Volunteers',
    url: '/volunter-bg.jpg',
    uploadDate: '2024-03-05',
    size: '3.1MB',
    featured: false,
  },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<GalleryImage>>({});

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  const filteredImages = useMemo(() => {
    return images.filter(image => {
      const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [images, searchTerm, selectedCategory]);

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditData(image);
  };

  const handleSave = (id: string) => {
    setImages(images.map(image =>
      image.id === id ? { ...image, ...editData } : image
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setImages(images.map(image =>
      image.id === id ? { ...image, featured: !image.featured } : image
    ));
  };

  const handleAddNew = () => {
    const newId = `img-${Date.now()}`;
    const newImage: GalleryImage = {
      id: newId,
      title: 'New Image',
      category: 'General',
      url: '/placeholder.jpg',
      uploadDate: new Date().toISOString().split('T')[0],
      size: '0MB',
      featured: false,
    };
    setImages([...images, newImage]);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Gallery Management</h2>
        <p className="text-foreground/70">Manage gallery images and organize by category</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Images</p>
          <p className="text-3xl font-bold text-foreground">{images.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Featured</p>
          <p className="text-3xl font-bold text-accent">{images.filter(i => i.featured).length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Size</p>
          <p className="text-3xl font-bold text-primary">
            {(images.reduce((sum, img) => sum + parseFloat(img.size), 0)).toFixed(1)}MB
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Images</label>
          <Input
            type="text"
            placeholder="Search by title..."
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
        <div className="flex items-end">
          <Button
            onClick={handleAddNew}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium flex items-center justify-center gap-2"
          >
            <Upload size={16} /> Upload Image
          </Button>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video bg-background overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {image.featured && (
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              {editingId === image.id ? (
                <>
                  <Input
                    value={editData.title || ''}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Image title"
                    className="bg-background border-border text-sm"
                  />
                  <Input
                    value={editData.category || ''}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    placeholder="Category"
                    className="bg-background border-border text-sm"
                  />
                  <Input
                    value={editData.url || ''}
                    onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                    placeholder="Image URL"
                    className="bg-background border-border text-sm"
                  />
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-foreground">{image.title}</h3>
                  <div className="flex justify-between items-center text-sm text-foreground/70">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                      {image.category}
                    </span>
                    <span>{image.uploadDate}</span>
                  </div>
                  <p className="text-xs text-foreground/60">{image.size}</p>
                </>
              )}
              <div className="flex gap-2 pt-2 border-t border-border">
                {editingId === image.id ? (
                  <>
                    <Button
                      onClick={() => handleSave(image.id)}
                      className="flex-1 bg-accent hover:bg-accent/90 text-xs"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 text-xs"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleToggleFeatured(image.id)}
                      className="flex-1 p-2 hover:bg-background rounded transition-colors text-sm text-foreground/60 hover:text-foreground border border-border"
                    >
                      {image.featured ? '⭐ Featured' : '☆ Feature'}
                    </button>
                    <button
                      onClick={() => handleEdit(image)}
                      className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-foreground border border-border"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500 border border-border"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <Card className="p-8 text-center">
          <ImageIcon size={48} className="mx-auto text-foreground/30 mb-4" />
          <p className="text-foreground/70">No images found matching your filters</p>
        </Card>
      )}
    </div>
  );
}
