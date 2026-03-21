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
  Mail,
  Phone,
  Users,
  ImagePlus,
  X,
  Loader,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { set } from "react-hook-form";
import { url } from "inspector";

interface StaffMember {
  _id: string;
  name: string;
  role: string;
  position: string;
  type: "staff" | "volunteer";
  email: string;
  phone: string;
  socialLinks: string[];
  joinDate: string;
  status: "active" | "inactive";
  imageUrl: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  subscribedDate: string;
  status: "active" | "unsubscribed";
}

const initialStaff: StaffMember[] = [
  {
    _id: "staff-1",
    name: "Sarah Johnson",
    role: "Executive Director",
    position: "Leadership",
    type: "staff",
    email: "sarah@seedsoflove.org",
    phone: "+1 (555) 123-4567",
    socialLinks: ["https://twitter.com/sarahjohnson"],
    joinDate: "2015-01-15",
    status: "active",
    imageUrl: "/placeholder-avatar.jpg",
  },
  {
    _id: "staff-2",
    name: "Michael Chen",
    role: "Program Manager",
    position: "Programs",
    type: "staff",
    email: "michael@seedsoflove.org",
    phone: "+1 (555) 234-5678",
    socialLinks: ["https://linkedin.com/in/michaelchen"],
    joinDate: "2018-03-20",
    status: "active",
    imageUrl: "/placeholder-avatar.jpg",
  },
  {
    _id: "vol-1",
    name: "Emma Davis",
    role: "Community Volunteer",
    position: "Outreach",
    type: "volunteer",
    email: "emma@example.com",
    phone: "+1 (555) 345-6789",
    socialLinks: ["https://facebook.com/emma.davis"],
    joinDate: "2024-01-10",
    status: "active",
    imageUrl: "/placeholder-avatar.jpg",
  },
];

const initialNewsletterSubscribers: NewsletterSubscriber[] = [
  {
    id: "sub-1",
    email: "john@example.com",
    name: "John Smith",
    subscribedDate: "2024-02-15",
    status: "active",
  },
  {
    id: "sub-2",
    email: "alice@example.com",
    name: "Alice Johnson",
    subscribedDate: "2024-02-20",
    status: "active",
  },
  {
    id: "sub-3",
    email: "bob@example.com",
    name: "Bob Williams",
    subscribedDate: "2024-01-30",
    status: "active",
  },
  {
    id: "sub-4",
    email: "carol@example.com",
    name: "Carol Brown",
    subscribedDate: "2024-03-01",
    status: "unsubscribed",
  },
];

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(
    initialNewsletterSubscribers,
  );
  const [activeTab, setActiveTab] = useState<
    "staff" | "volunteers" | "subscribers"
  >("staff");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<StaffMember>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [viewDetailsId, setViewDetailsId] = useState<string | null>(null);
  const [showAddSocialLink, setShowAddSocialLink] = useState<string | null>(
    null,
  );
  const [socialLinkForm, setSocialLinkForm] = useState({
    platform: "",
    url: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const roleOptions = [
    "Executive Director",
    "Program Manager",
    "Volunteer Coordinator",
    "Fundraising Manager",
    "Communications Manager",
    "Operations Manager",
    "Community Outreach",
    "Grant Writer",
  ];

  const [newMemberForm, setNewMemberForm] = useState({
    name: "",
    contact: "",
    role: "",
    position: "",
    email: "",
    photo: { url: "", public_id: "" },
  });

  const resetNewMemberForm = () => {
    setNewMemberForm({
      name: "",
      contact: "",
      role: "",
      position: "",
      email: "",
      photo: { url: "", public_id: "" },
    });
    setImagePreview(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setShowAddForm(open);
    if (!open) {
      resetNewMemberForm();
    }
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setNewMemberForm((prev) => ({ ...prev, imageFile: null }));
    setImagePreview(null);
    setSelectedImage(null);
  };

  useEffect(() => {}, []);

  const staffList = staff.filter((s) => s.type === "staff");
  const volunteerList = staff.filter((s) => s.type === "volunteer");
  const activeSubscribers = subscribers.filter((s) => s.status === "active");

  const filteredStaff = useMemo(() => {
    const list =
      activeTab === "staff"
        ? staffList
        : activeTab === "volunteers"
          ? volunteerList
          : [];
    return list.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [staff, activeTab, searchTerm]);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter(
      (sub) =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [subscribers, searchTerm]);

  const handleEdit = (member: StaffMember) => {
    setEditingId(member._id);
    setEditData(member);
  };

  const handleSave = (id: string) => {
    setStaff(
      staff.map((member) =>
        member._id === id ? { ...member, ...editData } : member,
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
    setStaff(staff.filter((member) => member._id !== id));
  };

  const handleAddMember = async () => {
    setSaving(true);
    try {
      let imageData = null;
      if (selectedImage) {
        imageData = await uploadImageToCloudinary(selectedImage);
      }

      const newMember = {
        name: newMemberForm.name,
        role: newMemberForm.role,
        position: newMemberForm.position,
        type: activeTab === "staff" ? "staff" : "volunteer",
        email: newMemberForm.email,
        phone: newMemberForm.contact,
        socialLinks: [],
        status: "active",
        photo: {
          url: imageData?.secure_url || "",
          public_id: imageData?.public_id || "",
        },
      };

      console.log("====================================");
      console.log(newMember);
      console.log("====================================");

      // setStaff([...staff, newMember]);
      // removeImage();
      // setNewMemberForm({
      //   name: "",
      //   contact: "",
      //   role: "",
      //   position: "",
      //   email: "",
      //   socialLinks: "",
      //   imageFile: null,
      // });
      // setShowAddForm(false);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
    setStaff(
      staff.map((member) =>
        member._id === id ? { ...member, status: newStatus } : member,
      ),
    );
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter((sub) => sub.id !== id));
  };

  const handleUnsubscribe = (id: string) => {
    setSubscribers(
      subscribers.map((sub) =>
        sub.id === id ? { ...sub, status: "unsubscribed" } : sub,
      ),
    );
  };

  async function uploadImageToCloudinary(file: File) {
    if (!file) {
      throw new Error("No file provided");
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "charity_uploads";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    return data;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Staff & Volunteers Management
        </h2>
        <p className="text-foreground/70">
          Manage your team members and newsletter subscribers
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => {
            setActiveTab("staff");
            setSearchTerm("");
            setShowAddForm(false);
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "staff"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => {
            setActiveTab("volunteers");
            setSearchTerm("");
            setShowAddForm(false);
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "volunteers"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
          }`}
        >
          Volunteers
        </button>
        <button
          onClick={() => {
            setActiveTab("subscribers");
            setSearchTerm("");
            setShowAddForm(false);
          }}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "subscribers"
              ? "border-primary text-primary"
              : "border-transparent text-foreground/60 hover:text-foreground"
          }`}
        >
          Newsletter Subscribers
        </button>
      </div>

      {/* Statistics */}
      {activeTab !== "subscribers" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">
              Total {activeTab === "staff" ? "Staff" : "Volunteers"}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {activeTab === "staff" ? staffList.length : volunteerList.length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Active</p>
            <p className="text-3xl font-bold text-accent">
              {
                (activeTab === "staff" ? staffList : volunteerList).filter(
                  (m) => m.status === "active",
                ).length
              }
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Inactive</p>
            <p className="text-3xl font-bold text-primary">
              {
                (activeTab === "staff" ? staffList : volunteerList).filter(
                  (m) => m.status === "inactive",
                ).length
              }
            </p>
          </Card>
        </div>
      )}

      {/* Newsletter Statistics */}
      {activeTab === "subscribers" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Total Subscribers</p>
            <p className="text-3xl font-bold text-foreground">
              {subscribers.length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Active</p>
            <p className="text-3xl font-bold text-accent">
              {activeSubscribers.length}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-foreground/60 text-sm mb-2">Unsubscribed</p>
            <p className="text-3xl font-bold text-primary">
              {subscribers.filter((s) => s.status === "unsubscribed").length}
            </p>
          </Card>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Search
          </label>
          <Input
            type="text"
            placeholder={
              activeTab === "subscribers"
                ? "Search by email or name..."
                : "Search by name, email, or role..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card text-foreground border-border"
          />
        </div>
        {activeTab !== "subscribers" && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          >
            + Add {activeTab === "staff" ? "Staff" : "Volunteer"}
          </Button>
        )}
      </div>

      {activeTab !== "subscribers" && (
        <Dialog open={showAddForm} onOpenChange={handleDialogOpenChange}>
          <DialogContent className="w-full bg-card max-w-xl">
            <DialogHeader>
              <DialogTitle>
                Add New {activeTab === "staff" ? "Staff Member" : "Volunteer"}
              </DialogTitle>
              <DialogDescription>
                Add the new member's details and upload an optional profile
                image.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Full Name"
                value={newMemberForm.name}
                onChange={(e) =>
                  setNewMemberForm({ ...newMemberForm, name: e.target.value })
                }
                className="bg-background border-border"
              />

              <Input
                placeholder="Contact"
                value={newMemberForm.contact}
                onChange={(e) =>
                  setNewMemberForm({
                    ...newMemberForm,
                    contact: e.target.value,
                  })
                }
                className="bg-background border-border"
              />

              <Input
                placeholder="Email"
                type="email"
                value={newMemberForm.email}
                onChange={(e) =>
                  setNewMemberForm({ ...newMemberForm, email: e.target.value })
                }
                className="bg-background border-border"
              />

              <Select
                value={newMemberForm.role}
                onValueChange={(value) =>
                  setNewMemberForm({ ...newMemberForm, role: value })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div
                className={`flex flex-col items-center justify-center gap-2 rounded-md border p-4 text-center transition ${
                  isDragging
                    ? "border-accent bg-accent/10"
                    : "border-border bg-background"
                }`}
                onClick={(e) => {
                  fileInputRef.current?.click();
                }}
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
                  setNewMemberForm((prev) => ({ ...prev, imageFile: file }));
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
                    setNewMemberForm((prev) => ({ ...prev, imageFile: file }));
                    setImagePreview(URL.createObjectURL(file));
                    setSelectedImage(file);
                  }}
                />
              </div>

              {newMemberForm.photo.url && imagePreview && (
                <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-background p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Selected preview"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={removeImage}>
                    <X className="size-4" />
                    Remove
                  </Button>
                </div>
              )}

              <Input
                placeholder="Position/Department (optional)"
                value={newMemberForm.position}
                onChange={(e) =>
                  setNewMemberForm({
                    ...newMemberForm,
                    position: e.target.value,
                  })
                }
                className="bg-background border-border"
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleDialogOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!newMemberForm.name || !newMemberForm.email || saving}
                onClick={() => {
                  if (!newMemberForm.name || !newMemberForm.email || saving)
                    return;
                  handleAddMember();
                }}
                className={`bg-accent ${saving ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/90"} text-accent-foreground font-medium`}
              >
                {saving ? (
                  <>
                    Saving... <Loader className="animate-spin" />
                  </>
                ) : (
                  `Add ${activeTab === "staff" ? "Staff" : "Volunteer"}`
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Staff/Volunteers Table */}
      {(activeTab === "staff" || activeTab === "volunteers") && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr
                    key={member._id}
                    className="border-b border-border hover:bg-background/50"
                  >
                    <td className="px-6 py-4 text-foreground">
                      {editingId === member._id ? (
                        <Input
                          value={editData.name || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="bg-background border-border"
                        />
                      ) : (
                        member.name
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member._id ? (
                        <Input
                          value={editData.role || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, role: e.target.value })
                          }
                          className="bg-background border-border"
                        />
                      ) : (
                        member.role
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member._id ? (
                        <Input
                          value={editData.position || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              position: e.target.value,
                            })
                          }
                          className="bg-background border-border"
                        />
                      ) : (
                        member.position
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member._id ? (
                        <Input
                          value={editData.email || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          className="bg-background border-border text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {member.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {editingId === member._id ? (
                        <Input
                          value={editData.phone || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                          className="bg-background border-border text-sm"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {member.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {member.joinDate}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={member.status}
                        onChange={(e) =>
                          handleStatusChange(
                            member._id,
                            e.target.value as "active" | "inactive",
                          )
                        }
                        className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${
                          member.status === "active"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {editingId === member._id ? (
                          <>
                            <Button
                              onClick={() => handleSave(member._id)}
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setViewDetailsId(member._id)}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(member)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setShowAddSocialLink(member._id)}
                              >
                                Add Social Link
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => handleDelete(member._id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Newsletter Subscribers Table */}
      {activeTab === "subscribers" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Subscribed Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-border hover:bg-background/50"
                  >
                    <td className="px-6 py-4 text-foreground">
                      {subscriber.name}
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {subscriber.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground/70">
                      {subscriber.subscribedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          subscriber.status === "active"
                            ? "bg-accent/10 text-accent"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {subscriber.status === "active" && (
                          <button
                            onClick={() => handleUnsubscribe(subscriber.id)}
                            className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500"
                            title="Mark as unsubscribed"
                          >
                            <Mail size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="p-2 hover:bg-background rounded transition-colors text-foreground/60 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {((activeTab !== "subscribers" && filteredStaff.length === 0) ||
        (activeTab === "subscribers" && filteredSubscribers.length === 0)) && (
        <Card className="p-8 text-center">
          <Users size={48} className="mx-auto text-foreground/30 mb-4" />
          <p className="text-foreground/70">
            {activeTab === "subscribers"
              ? "No subscribers found matching your search"
              : `No ${activeTab} members found matching your search`}
          </p>
        </Card>
      )}

      {/* View Details Dialog */}
      <Dialog
        open={viewDetailsId !== null}
        onOpenChange={(open) => {
          if (!open) setViewDetailsId(null);
        }}
      >
        <DialogContent className="w-full bg-card max-w-md">
          <DialogHeader>
            <DialogTitle>Staff Member Details</DialogTitle>
          </DialogHeader>
          {viewDetailsId && staff.find((s) => s._id === viewDetailsId) && (
            <div className="space-y-4">
              {(() => {
                const member = staff.find((s) => s._id === viewDetailsId);
                return member ? (
                  <>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Name
                      </p>
                      <p className="text-foreground">{member.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Role
                      </p>
                      <p className="text-foreground">{member.role}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Position
                      </p>
                      <p className="text-foreground">{member.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Email
                      </p>
                      <p className="text-foreground">{member.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Phone
                      </p>
                      <p className="text-foreground">{member.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Join Date
                      </p>
                      <p className="text-foreground">{member.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">
                        Status
                      </p>
                      <p className="text-foreground capitalize">
                        {member.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70 mb-2">
                        Social Links
                      </p>
                      {member.socialLinks && member.socialLinks.length > 0 ? (
                        <ul className="space-y-1">
                          {member.socialLinks.map((link, idx) => (
                            <li key={idx} className="text-foreground text-sm">
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-foreground/60 text-sm">
                          No social links added
                        </p>
                      )}
                    </div>
                  </>
                ) : null;
              })()}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsId(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Social Link Dialog */}
      <Dialog
        open={showAddSocialLink !== null}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddSocialLink(null);
            setSocialLinkForm({ platform: "", url: "" });
          }
        }}
      >
        <DialogContent className="w-full bg-card max-w-md">
          <DialogHeader>
            <DialogTitle>Add Social Link</DialogTitle>
            <DialogDescription>
              Add a social media link for this staff member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Platform (e.g., Twitter, LinkedIn, Facebook)"
              value={socialLinkForm.platform}
              onChange={(e) =>
                setSocialLinkForm({
                  ...socialLinkForm,
                  platform: e.target.value,
                })
              }
              className="bg-background border-border"
            />
            <Input
              placeholder="URL"
              value={socialLinkForm.url}
              onChange={(e) =>
                setSocialLinkForm({
                  ...socialLinkForm,
                  url: e.target.value,
                })
              }
              className="bg-background border-border"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddSocialLink(null);
                setSocialLinkForm({ platform: "", url: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (showAddSocialLink && socialLinkForm.url) {
                  setStaff(
                    staff.map((member) =>
                      member._id === showAddSocialLink
                        ? {
                            ...member,
                            socialLinks: [
                              ...member.socialLinks,
                              socialLinkForm.url,
                            ],
                          }
                        : member,
                    ),
                  );
                  setShowAddSocialLink(null);
                  setSocialLinkForm({ platform: "", url: "" });
                }
              }}
              disabled={!socialLinkForm.url}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
