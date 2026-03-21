"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Upload, X, Calendar, Target, Users, Loader } from "lucide-react";
import Image from "next/image";
import { apiRequest } from "@/lib/query-client";

interface Campaign {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  goal: string;
  raised: [string];
  endDate: string;
  status: "ongoing" | "upcoming" | "completed" | string;
  category: string;
  image?: {
    url: string;
    public_id: string;
  } | null;
}

import { useQuery } from "@tanstack/react-query";

export default function CampaignsDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ongoing" | "upcoming" | "completed"
  >("all");
  const [formData, setFormData] = useState<Campaign>({
    _id: "",
    title: "",
    tagline: "",
    description: "",
    goal: "",
    raised: ["0"],
    endDate: "",
    status: "upcoming" as const,
    category: "",
    imageUrl: "",
    image: { url: "", public_id: "" } as {
      url: string;
      public_id: string;
    } | null,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const {
    data: campaignData,
    isLoading,
    error,
  } = useQuery<Campaign[]>({
    queryKey: ["campaigns", "all"],
  });

  useEffect(() => {
    if (campaignData) {
      setCampaigns(campaignData);
    }
  }, [campaignData]);

  const filteredCampaigns =
    statusFilter === "all"
      ? campaigns
      : campaigns.filter((c) => c.status === statusFilter);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      let imageData = null;
      if (selectedImage) {
        imageData = await uploadImageToCloudinary(selectedImage);
      }

      const newCampaign = {
        title: formData.title,
        tagline: formData.tagline,
        description: formData.description,
        goal: Number(formData.goal),
        raised: Number(formData.raised),
        endDate: formData.endDate,
        status: formData.status,
        category: formData.category,
        imageUrl: formData.imageUrl || "",
        image: imageData
          ? {
              url: imageData.secure_url,
              public_id: imageData.public_id,
            }
          : {
              url: editingCampaign?.image?.url || "",
              public_id: editingCampaign?.image?.public_id || "",
            },
      };

      if (editingCampaign) {
        await apiRequest(
          "PUT",
          `/campaigns/${editingCampaign.id}/update`,
          newCampaign,
        );
      } else {
        await apiRequest("POST", "/campaigns/new", newCampaign);
      }

      // Reset form
      setFormData({
        title: "",
        tagline: "",
        description: "",
        goal: "",
        raised: 0,
        endDate: "",
        status: "upcoming",
        category: "",
      });
      setSelectedImage(null);
      setImagePreview(null);
      setIsDialogOpen(false);
      setEditingCampaign(null);
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      tagline: campaign.tagline,
      description: campaign.description,
      goal: campaign.goal,
      raised: campaign.raised,
      endDate: campaign.endDate,
      status: campaign.status,
      category: campaign.category,
      imageUrl: campaign.imageUrl,
    });
    setImagePreview(campaign.image?.url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Campaign Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Create and manage donation campaigns
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCampaign(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] bg-card overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Campaign Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter campaign title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={formData.tagline}
                      onChange={(e) =>
                        setFormData({ ...formData, tagline: e.target.value })
                      }
                      placeholder="Brief tagline"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Detailed campaign description"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Fundraising Goal ($)</Label>
                    <Input
                      id="goal"
                      type="number"
                      value={formData.goal}
                      onChange={(e) =>
                        setFormData({ ...formData, goal: e.target.value })
                      }
                      placeholder="50000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Nutrition">Nutrition</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">ImageUrl</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="Image URL (optional if uploading)"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Campaign Image</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <div className="text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <Image
                            src={imagePreview}
                            alt="Campaign preview"
                            width={200}
                            height={150}
                            className="rounded-lg mx-auto object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2"
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div className="mt-4">
                            <label
                              htmlFor="image-upload"
                              className="cursor-pointer"
                            >
                              <span className="mt-2 block text-sm font-medium text-foreground">
                                Upload campaign image
                              </span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                PNG, JPG up to 10MB
                              </span>
                            </label>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              className="hidden"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={`${saving ? "cursor-not-allowed opacity-10" : ""}`}
                    disabled={saving}
                    type="submit"
                  >
                    {saving ? (
                      <>
                        Saving... <Loader className="animate-spin" />
                      </>
                    ) : editingCampaign ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            className="px-4 py-2"
          >
            All Campaigns
          </Button>
          <Button
            variant={statusFilter === "ongoing" ? "default" : "outline"}
            onClick={() => setStatusFilter("ongoing")}
            className="px-4 py-2"
          >
            🔄 Ongoing
          </Button>
          <Button
            variant={statusFilter === "upcoming" ? "default" : "outline"}
            onClick={() => setStatusFilter("upcoming")}
            className="px-4 py-2"
          >
            ⏰ Upcoming
          </Button>
          <Button
            variant={statusFilter === "completed" ? "default" : "outline"}
            onClick={() => setStatusFilter("completed")}
            className="px-4 py-2"
          >
            ✅ Completed
          </Button>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign._id} className="overflow-hidden pt-0 ">
              <div className="relative h-48 p-0">
                <img
                  src={campaign.image?.url}
                  alt={campaign.title}
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {campaign.title}
                  </h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {campaign.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {campaign.tagline}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Goal: ${campaign.goal.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Raised: ${campaign.raised.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Ends: {new Date(campaign.endDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(campaign)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
