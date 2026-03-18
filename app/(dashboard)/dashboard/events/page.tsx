'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Calendar, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees: number;
}

const initialEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Community Outreach Program',
    date: '2024-04-15',
    time: '10:00 AM',
    location: '123 Charity Street, City',
    category: 'Community',
    description: 'Join us for our quarterly community outreach program',
    status: 'upcoming',
    attendees: 0,
  },
  {
    id: 'event-2',
    title: 'Education Workshop',
    date: '2024-04-20',
    time: '2:00 PM',
    location: 'Community Center, Hall A',
    category: 'Education',
    description: 'Learn about our education initiatives and how to help',
    status: 'upcoming',
    attendees: 0,
  },
  {
    id: 'event-3',
    title: 'Volunteer Appreciation Night',
    date: '2024-03-25',
    time: '6:00 PM',
    location: 'Foundation Office',
    category: 'Volunteer',
    description: 'Celebrate and thank our amazing volunteers',
    status: 'completed',
    attendees: 45,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Event>>({});

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];
  const statuses = ['All', 'upcoming', 'ongoing', 'completed'];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus]);

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setEditData(event);
  };

  const handleSave = (id: string) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, ...editData } : event
    ));
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: 'upcoming' | 'ongoing' | 'completed') => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, status: newStatus } : event
    ));
  };

  const handleAddNew = () => {
    const newId = `event-${Date.now()}`;
    const newEvent: Event = {
      id: newId,
      title: 'New Event',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      location: 'Location TBD',
      category: 'General',
      description: 'Event description',
      status: 'upcoming',
      attendees: 0,
    };
    setEvents([...events, newEvent]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'ongoing':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Events Management</h2>
        <p className="text-foreground/70">Create, edit, and manage community events</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Events</p>
          <p className="text-3xl font-bold text-foreground">{events.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Upcoming</p>
          <p className="text-3xl font-bold text-blue-500">{events.filter(e => e.status === 'upcoming').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Ongoing</p>
          <p className="text-3xl font-bold text-green-500">{events.filter(e => e.status === 'ongoing').length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Attendees</p>
          <p className="text-3xl font-bold text-accent">{events.reduce((sum, e) => sum + e.attendees, 0)}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Events</label>
          <Input
            type="text"
            placeholder="Search by title or location..."
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
            + New Event
          </Button>
        </div>
      </div>

      {/* Events Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date & Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Attendees</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id} className="border-b border-border hover:bg-background/50">
                  <td className="px-6 py-4 text-foreground">
                    {editingId === event.id ? (
                      <Input
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="bg-background border-border"
                      />
                    ) : (
                      event.title
                    )}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {editingId === event.id ? (
                      <div className="space-y-2">
                        <Input
                          type="date"
                          value={editData.date || ''}
                          onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                          className="bg-background border-border text-sm"
                        />
                        <Input
                          value={editData.time || ''}
                          onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                          className="bg-background border-border text-sm"
                          placeholder="10:00 AM"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {event.date} {event.time}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {editingId === event.id ? (
                      <Input
                        value={editData.location || ''}
                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                        className="bg-background border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === event.id ? (
                      <Input
                        value={editData.category || ''}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="bg-background border-border"
                      />
                    ) : (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{event.category}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={event.status}
                      onChange={(e) => handleStatusChange(event.id, e.target.value as 'upcoming' | 'ongoing' | 'completed')}
                      className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${getStatusColor(event.status)}`}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">
                    {editingId === event.id ? (
                      <Input
                        type="number"
                        value={editData.attendees || 0}
                        onChange={(e) => setEditData({ ...editData, attendees: parseInt(e.target.value) })}
                        className="bg-background border-border w-20"
                      />
                    ) : (
                      event.attendees
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {editingId === event.id ? (
                        <>
                          <Button
                            onClick={() => handleSave(event.id)}
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
                            onClick={() => handleEdit(event)}
                            className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-foreground"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
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

      {filteredEvents.length === 0 && (
        <Card className="p-8 text-center">
          <Calendar size={48} className="mx-auto text-foreground/30 mb-4" />
          <p className="text-foreground/70">No events found matching your filters</p>
        </Card>
      )}
    </div>
  );
}
