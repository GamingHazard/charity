"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  Edit2,
  Calendar,
  MapPin,
  ImagePlus,
  X,
  MoreVertical,
  Clock,
  Users,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  status: "upcoming" | "ongoing" | "completed";
  attendees: number;
  imageUrl?: string;
}

const initialEvents: Event[] = [
  {
    id: "event-1",
    title: "Community Outreach Program",
    date: "2024-04-15",
    time: "10:00 AM",
    location: "123 Charity Street, City",
    category: "Community",
    description: "Join us for our quarterly community outreach program",
    status: "upcoming",
    attendees: 0,
    imageUrl: "/placeholder-image.jpg",
  },
  {
    id: "event-2",
    title: "Education Workshop",
    date: "2024-04-20",
    time: "2:00 PM",
    location: "Community Center, Hall A",
    category: "Education",
    description: "Learn about our education initiatives and how to help",
    status: "upcoming",
    attendees: 0,
    imageUrl: "/placeholder-image.jpg",
  },
  {
    id: "event-3",
    title: "Volunteer Appreciation Night",
    date: "2024-03-25",
    time: "6:00 PM",
    location: "Foundation Office",
    category: "Volunteer",
    description: "Celebrate and thank our amazing volunteers",
    status: "completed",
    attendees: 45,
    imageUrl: "/placeholder-image.jpg",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Event>>({});
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const categoryOptions = ["Community", "Education", "Volunteer", "General"];

  const [newEventForm, setNewEventForm] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: "",
    imageFile: null as File | null,
  });

  const resetNewEventForm = () => {
    setNewEventForm({
      title: "",
      category: "",
      date: "",
      time: "",
      location: "",
      description: "",
      imageUrl: "",
      imageFile: null,
    });
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setShowAddDialog(open);
    if (!open) {
      resetNewEventForm();
    }
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setNewEventForm((prev) => ({ ...prev, imageFile: null }));
    setImagePreview(null);
  };

  const categories = [
    "All",
    ...Array.from(new Set(events.map((e) => e.category))),
  ];
  const statuses = ["All", "upcoming", "ongoing", "completed"];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || event.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus]);

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setEditData(event);
  };

  const handleSave = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, ...editData } : event,
      ),
    );
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleStatusChange = (
    id: string,
    newStatus: "upcoming" | "ongoing" | "completed",
  ) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: newStatus } : event,
      ),
    );
  };

  const handleViewEvent = (event: Event) => {
    setViewingEvent(event);
    setShowViewDialog(true);
  };

  const handleAddNew = () => {
    if (!newEventForm.title || !newEventForm.date) return;

    const newId = `event-${Date.now()}`;
    const newEvent: Event = {
      id: newId,
      title: newEventForm.title,
      date: newEventForm.date,
      time: newEventForm.time || "10:00 AM",
      location: newEventForm.location,
      category: newEventForm.category || "General",
      description: newEventForm.description,
      status: "upcoming",
      attendees: 0,
      imageUrl:
        imagePreview || newEventForm.imageUrl || "/placeholder-image.jpg",
    };

    setEvents([...events, newEvent]);
    resetNewEventForm();
    setShowAddDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700";
      case "ongoing":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Events Management
        </h2>
        <p className="text-foreground/70">
          Create, edit, and manage community events
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Events</p>
          <p className="text-3xl font-bold text-foreground">{events.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Upcoming</p>
          <p className="text-3xl font-bold text-blue-500">
            {events.filter((e) => e.status === "upcoming").length}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Ongoing</p>
          <p className="text-3xl font-bold text-green-500">
            {events.filter((e) => e.status === "ongoing").length}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-foreground/60 text-sm mb-2">Total Attendees</p>
          <p className="text-3xl font-bold text-accent">
            {events.reduce((sum, e) => sum + e.attendees, 0)}
          </p>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Events
          </label>
          <Input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background text-foreground border-border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={() => setShowAddDialog(true)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            + New Event
          </Button>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddDialog} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event with date, location, topic, and an optional image.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            <Input
              placeholder="Title"
              value={newEventForm.title}
              onChange={(e) =>
                setNewEventForm({ ...newEventForm, title: e.target.value })
              }
              className="bg-background border-border"
            />

            <Select
              value={newEventForm.category}
              onValueChange={(value) =>
                setNewEventForm({ ...newEventForm, category: value })
              }
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                value={newEventForm.date}
                onChange={(e) =>
                  setNewEventForm({ ...newEventForm, date: e.target.value })
                }
                className="bg-background border-border"
              />
              <Input
                placeholder="Time"
                value={newEventForm.time}
                onChange={(e) =>
                  setNewEventForm({ ...newEventForm, time: e.target.value })
                }
                className="bg-background border-border"
              />
            </div>

            <Input
              placeholder="Location"
              value={newEventForm.location}
              onChange={(e) =>
                setNewEventForm({ ...newEventForm, location: e.target.value })
              }
              className="bg-background border-border"
            />

            <Textarea
              placeholder="Description"
              value={newEventForm.description}
              onChange={(e) =>
                setNewEventForm({
                  ...newEventForm,
                  description: e.target.value,
                })
              }
              className="bg-background border-border"
            />

            <Input
              placeholder="Image URL (optional)"
              value={newEventForm.imageUrl}
              onChange={(e) => {
                setNewEventForm({ ...newEventForm, imageUrl: e.target.value });
                setImagePreview(e.target.value);
              }}
              className="bg-background border-border"
            />

            <div
              className={`flex flex-col items-center justify-center gap-2 rounded-md border p-4 text-center transition ${
                isDragging
                  ? "border-accent bg-accent/10"
                  : "border-border bg-background"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (!file) return;
                if (!file.type.startsWith("image/")) return;
                if (imagePreview) {
                  URL.revokeObjectURL(imagePreview);
                }
                setNewEventForm((prev) => ({ ...prev, imageFile: file }));
                setImagePreview(URL.createObjectURL(file));
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus className="text-foreground/60" />
                  <p className="text-sm text-foreground/70">
                    Drag & drop an image, or click to browse
                  </p>
                  <p className="text-xs text-foreground/50">
                    JPG, PNG, SVG up to 5MB
                  </p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                  }
                  setNewEventForm((prev) => ({ ...prev, imageFile: file }));
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
            </div>

            {newEventForm.imageFile && imagePreview && (
              <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Selected preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {newEventForm.imageFile.name}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {(newEventForm.imageFile.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={removeImage}>
                  <X className="size-4" />
                  Remove
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddNew}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            >
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Event Details Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewingEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {viewingEvent.title}
                </DialogTitle>
                <DialogDescription>{viewingEvent.category}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Event Image */}
                {viewingEvent.imageUrl && (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <img
                      src={viewingEvent.imageUrl}
                      alt={viewingEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground/70">
                    Status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      viewingEvent.status === "upcoming"
                        ? "bg-blue-100/20 text-blue-700"
                        : viewingEvent.status === "ongoing"
                          ? "bg-green-100/20 text-green-700"
                          : "bg-gray-100/20 text-gray-700"
                    }`}
                  >
                    {viewingEvent.status}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-foreground/70 mb-1">
                      Date
                    </p>
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar size={16} />
                      {new Date(viewingEvent.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground/70 mb-1">
                      Time
                    </p>
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock size={16} />
                      {viewingEvent.time}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs font-medium text-foreground/70 mb-1">
                    Location
                  </p>
                  <div className="flex items-start gap-2 text-foreground">
                    <MapPin size={16} className="mt-1 flex-shrink-0" />
                    <span>{viewingEvent.location}</span>
                  </div>
                </div>

                {/* Attendees */}
                <div>
                  <p className="text-xs font-medium text-foreground/70 mb-1">
                    Attendees
                  </p>
                  <div className="flex items-center gap-2 text-foreground">
                    <Users size={16} />
                    {viewingEvent.attendees} registered
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-2">
                    Description
                  </h4>
                  <p className="text-foreground/70 whitespace-pre-wrap">
                    {viewingEvent.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Events Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-border hover:bg-background/50"
                >
                  <td className="px-6 py-4 text-foreground">
                    {editingId === event.id ? (
                      <Input
                        value={editData.title || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
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
                          value={editData.date || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                          className="bg-background border-border text-sm"
                        />
                        <Input
                          value={editData.time || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, time: e.target.value })
                          }
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
                        value={editData.location || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
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
                        value={editData.category || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="bg-background border-border"
                      />
                    ) : (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                        {event.category}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={event.status}
                      onChange={(e) =>
                        handleStatusChange(
                          event.id,
                          e.target.value as
                            | "upcoming"
                            | "ongoing"
                            | "completed",
                        )
                      }
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
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            attendees: parseInt(e.target.value),
                          })
                        }
                        className="bg-background border-border w-20"
                      />
                    ) : (
                      event.attendees
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === event.id ? null : event.id,
                          )
                        }
                        className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-foreground"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === event.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 py-2">
                          {/* View Details */}
                          <button
                            onClick={() => {
                              handleViewEvent(event);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background/50 flex items-center gap-2 transition-colors"
                          >
                            <Calendar size={16} />
                            View Details
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => {
                              handleEdit(event);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-background/50 flex items-center gap-2 transition-colors"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>

                          {/* Delete */}
                          <div className="border-t border-border my-1"></div>
                          <button
                            onClick={() => {
                              handleDelete(event.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/10 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
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
          <p className="text-foreground/70">
            No events found matching your filters
          </p>
        </Card>
      )}
    </div>
  );
}
