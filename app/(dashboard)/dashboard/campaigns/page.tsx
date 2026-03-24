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
import {
  Plus,
  Upload,
  X,
  Calendar,
  Target,
  Users,
  Loader,
  Trash2,
  Edit,
} from "lucide-react";
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
import { set } from "react-hook-form";

export default function CampaignsDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "ongoing" | "upcoming" | "completed"
  >("all");
  const [formData, setFormData] = useState<any>({
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
        image: imageData
          ? {
              url: imageData.secure_url,
              public_id: imageData.public_id,
            }
          : editingCampaign?.image ||
            formData.image || { url: formData.imageUrl || "", public_id: "" },
      };

      if (editingCampaign && editingCampaign._id) {
        await apiRequest(
          "PUT",
          `/campaigns/${editingCampaign._id}/update`,
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
        imageUrl: "",
        image: { url: "", public_id: "" },
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

  const handleEdit = (campaign: any) => {
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
      imageUrl: campaign.image ? campaign.image?.url : "",
      image: campaign.image || { url: "", public_id: "" },
    });
    setImagePreview(campaign.image?.url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setSaving(true);
      await apiRequest("DELETE", `/campaigns/${id}/delete`);
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setSaving(false);
    }
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
                      className="bg-background"
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
                      className="bg-background"
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
                    className="max-h-96 bg-background min-h-96"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Fundraising Goal ($)</Label>
                    <Input
                      className="bg-background"
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
                      className="bg-background"
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
                <div className="space-y-2 w-full md:w-1/2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="bg-background"
                        placeholder="Select category"
                      />
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                      <SelectItem className="bg-background" value="Education">
                        Education
                      </SelectItem>
                      <SelectItem className="bg-background" value="Nutrition">
                        Nutrition
                      </SelectItem>
                      <SelectItem className="bg-background" value="Health">
                        Health
                      </SelectItem>
                      <SelectItem className="bg-background" value="Environment">
                        Environment
                      </SelectItem>
                      <SelectItem className="bg-background" value="Community">
                        Community
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">ImageUrl</Label>
                  <Input
                    className="bg-background"
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
                      {imagePreview ||
                      formData?.imageUrl ||
                      formData.image?.url ? (
                        <div className="relative">
                          <Image
                            src={
                              imagePreview ||
                              formData?.imageUrl ||
                              formData.image?.url
                            }
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
                              setFormData({
                                ...formData,
                                imageUrl: "",
                                image: { url: "", public_id: "" },
                              });
                              setSelectedImage(null);
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
        <div className="grid bg-card p-10 flex-1 h-screen w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign._id}
              className="overflow-hidden pt-0  h-125 flex flex-col"
            >
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

              <div className="py-12 px-4">
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
                      Raised: $ {campaign.raised.toLocaleString() || 0.0}
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
                    <Edit /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(campaign._id)}
                  >
                    {saving ? (
                      <>
                        Deleting... <Loader className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2" /> Delete
                      </>
                    )}
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
