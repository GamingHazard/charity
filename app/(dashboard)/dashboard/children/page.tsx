"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Loader,
} from "lucide-react";
import { mockSponsorshipProfiles, SponsorshipProfile } from "@/lib/mock-data";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";
import { apiRequest } from "@/lib/query-client";
import { log } from "console";
import { useQuery } from "@tanstack/react-query";

const initialFormState = {
  _id: "",
  name: "",
  firstName: "",
  secondName: "",
  givenName: "",
  gender: "Female" as "Female" | "Male",
  dateOfBirth: "",
  age: 0,
  ageGroup: "6-12" as "0-5" | "6-12" | "13-18",
  class: "Primary 1",
  nationality: "Ugandan",
  familyStatus: "Single Parent" as "Single Parent" | "Total Orphans",
  numberOfParents: 1 as 0 | 1 | 2,
  guardianNamesInput: "",
  image: {
    url: "",
    public_id: "",
  },
  story: "",
  background: "",
  hobbiesInput: "",
  interestsInput: "",
  school: "",
  location: "",
  needsInput: "",
  monthlyNeed: "",
  progress: 0,
  sponsorshipStatus: "Available",
};

type FormState = typeof initialFormState;

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "Available":
      return "bg-emerald-100 text-emerald-800";
    case "Sponsored":
      return "bg-sky-100 text-sky-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export default function ChildrenDashboard() {
  const {
    data: Profiles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["children", "profiles"],
  });

  const [children, setChildren] = useState<SponsorshipProfile[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [editingChild, setEditingChild] = useState<SponsorshipProfile | null>(
    null,
  );
  const [formState, setFormState] = useState<FormState>(
    editingChild ? { ...initialFormState, ...editingChild } : initialFormState,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "Available" | "Sponsored"
  >("all");
  const [formError, setFormError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (Profiles) {
      setChildren(Profiles as SponsorshipProfile[]);
    }
  }, [Profiles]);

  const filteredChildren = useMemo(() => {
    return children.filter((child) => {
      const matchesSearch = [child.name, child.school, child.location]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || child.sponsorshipStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [children, searchTerm, statusFilter]);

  const resetForm = () => {
    setFormState(initialFormState);
    setFormError("");
    setWizardStep(1);
    setEditingChild(null);
    setImagePreview("");
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploadingImage(true);
      setFormError("");
      const result = await uploadImageToCloudinary(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Set the image URL from Cloudinary response
      setFormState((prevState) => ({
        ...prevState,
        image: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      }));
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Failed to upload image",
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormState((prevState) => ({
      ...prevState,
      image: {
        url: "",
        public_id: "",
      },
    }));
    setImagePreview("");
  };

  const openNewProfile = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditProfile = (child: SponsorshipProfile) => {
    setEditingChild(child);
    setFormState({
      _id: child._id,
      name: child.name,
      firstName: child.firstName,
      secondName: child.secondName,
      givenName: child.givenName,
      gender: child.gender,
      dateOfBirth: child.dateOfBirth,
      age: child.age,
      ageGroup: child.ageGroup,
      class: child.class,
      nationality: child.nationality,
      familyStatus: child.familyStatus,
      numberOfParents: child.numberOfParents,
      guardianNamesInput: child.guardianNames.includes(", ")
        ? child.guardianNames.split(", ").join(", ")
        : child.guardianNames,
      image: {
        url: child.image.url,
        public_id: child.image.public_id,
      },
      story: child.story,
      background: child.background,
      hobbiesInput: child.hobbies.includes(", ")
        ? child.hobbies.split(", ").join(", ")
        : child.hobbies,
      interestsInput: child.interests.includes(", ")
        ? child.interests.split(", ").join(", ")
        : child.interests,
      school: child.school,
      location: child.location,
      needsInput: child.needs.includes(", ")
        ? child.needs.split(", ").join(", ")
        : child.needs,
      monthlyNeed: child.monthlyNeed,
      progress: child.progress,
      sponsorshipStatus: child.sponsorshipStatus,
    });
    setImagePreview(child.image.url);
    setIsDialogOpen(true);
  };

  const handleDeleteProfile = async (id: string) => {
    try {
      setDeleting(true);
      const res = await apiRequest("DELETE", `/children/profile/${id}/delete`);
      if (!res.ok) {
        throw new Error("Failed to delete child profile");
      }
      setChildren(children.filter((child) => child._id !== id));
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setDeleting(false);
    }
  };

  const validateStep = () => {
    if (wizardStep === 1) {
      if (!formState.firstName.trim() || !formState.secondName.trim()) {
        setFormError("Please enter the child’s full name.");
        return false;
      }
      if (!formState.dateOfBirth) {
        setFormError("Please select a date of birth.");
        return false;
      }
    }

    if (wizardStep === 2) {
      if (!formState.school.trim() || !formState.location.trim()) {
        setFormError("Please fill in school and location details.");
        return false;
      }
    }

    if (wizardStep === 3) {
      if (!formState.story.trim()) {
        setFormError("Please add the child’s story and monthly support needs.");
        return false;
      }
    }

    setFormError("");
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      return;
    }
    setWizardStep((current) => Math.min(current + 1, 3));
  };

  const handleBack = () => {
    setFormError("");
    setWizardStep((current) => Math.max(current - 1, 1));
  };

  const handleSaveProfile = async () => {
    if (!validateStep()) {
      return;
    }
    setLoading(true);
    try {
      let data: any = null;
      let newProfile: SponsorshipProfile = {} as SponsorshipProfile;
      let res = null;

      const payload: any = {
        firstName: formState.firstName.trim(),
        secondName: formState.secondName.trim(),
        givenName: formState.givenName.trim() || formState.firstName.trim(),
        gender: formState.gender,
        dateOfBirth: formState.dateOfBirth,
        age: Number(formState.age) || 0,
        ageGroup: formState.ageGroup,
        class: formState.class,
        nationality: formState.nationality,
        familyStatus: formState.familyStatus,
        numberOfParents: formState.numberOfParents,
        guardianNames: formState.guardianNamesInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        image: {
          url: formState.image.url || "",
          public_id: formState.image.public_id || "",
        },
        story: formState.story.trim(),
        background: formState.background.trim(),
        hobbies: formState.hobbiesInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: formState.interestsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        school: formState.school.trim(),
        location: formState.location.trim(),
        needs: formState.needsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        monthlyNeed: formState.monthlyNeed,

        sponsorshipStatus: formState.sponsorshipStatus,
      };
      if (editingChild) {
        payload._id = editingChild._id;
        res = await apiRequest(
          "PUT",
          `/children/profile/${editingChild._id}/update`,
          payload,
        );
      } else {
        res = await apiRequest("POST", `/children/profile/new`, payload);
      }
      data = await res.json();

      newProfile = {
        ...data.profile,
        _id: editingChild ? editingChild._id : data.profile._id,
        name:
          formState.name.trim() ||
          `${formState.firstName.trim()} ${formState.secondName.trim()}`,
        guardianNames: data.profile.guardianNames
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean),
        hobbies: formState.hobbiesInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: formState.interestsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        needs: formState.needsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        sponsor: data.profile.sponsor || null,
      };

      setChildren((current) => {
        if (editingChild) {
          return current.map((child) =>
            child._id === editingChild._id ? payload : child,
          );
        }
        return [newProfile, ...current];
      });

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
  };

  const stepContent = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                className="bg-white"
                id="firstName"
                value={formState.firstName}
                onChange={(event) =>
                  setFormState({ ...formState, firstName: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondName">Second name</Label>
              <Input
                className="bg-white"
                id="secondName"
                value={formState.secondName}
                onChange={(event) =>
                  setFormState({ ...formState, secondName: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="givenName">Preferred name</Label>
              <Input
                className="bg-white"
                id="givenName"
                value={formState.givenName}
                onChange={(event) =>
                  setFormState({ ...formState, givenName: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formState.gender}
                onValueChange={(value) =>
                  setFormState({
                    ...formState,
                    gender: value as "Female" | "Male",
                  })
                }
              >
                <SelectTrigger className="bg-white" id="gender">
                  <SelectValue>{formState.gender}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <Input
                className="bg-white"
                id="dateOfBirth"
                type="date"
                value={formState.dateOfBirth}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    dateOfBirth: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                className="bg-white"
                id="age"
                type="number"
                min={0}
                value={formState.age}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    age: Number(event.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageGroup">Age group</Label>
              <Select
                value={formState.ageGroup}
                onValueChange={(value) =>
                  setFormState({
                    ...formState,
                    ageGroup: value as "0-5" | "6-12" | "13-18",
                  })
                }
              >
                <SelectTrigger className="bg-white" id="ageGroup">
                  <SelectValue>{formState.ageGroup}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5">0-5</SelectItem>
                  <SelectItem value="6-12">6-12</SelectItem>
                  <SelectItem value="13-18">13-18</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Input
                className="bg-white"
                id="class"
                value={formState.class}
                onChange={(event) =>
                  setFormState({ ...formState, class: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                className="bg-white"
                id="nationality"
                value={formState.nationality}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    nationality: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="familyStatus">Family status</Label>
              <Select
                value={formState.familyStatus}
                onValueChange={(value) =>
                  setFormState({
                    ...formState,
                    familyStatus: value as "Single Parent" | "Total Orphans",
                  })
                }
              >
                <SelectTrigger className="bg-white" id="familyStatus">
                  <SelectValue>{formState.familyStatus}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single Parent">Single Parent</SelectItem>
                  <SelectItem value="Total Orphans">Total Orphans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfParents">Number of parents</Label>
              <Select
                value={String(formState.numberOfParents)}
                onValueChange={(value) =>
                  setFormState({
                    ...formState,
                    numberOfParents: Number(value) as 0 | 1 | 2,
                  })
                }
              >
                <SelectTrigger className="bg-white" id="numberOfParents">
                  <SelectValue>{String(formState.numberOfParents)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="guardianNamesInput">Guardian names</Label>
              <Input
                className="bg-white"
                id="guardianNamesInput"
                placeholder="Example: Jane Doe (Mother), John Doe (Father)"
                value={formState.guardianNamesInput}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    guardianNamesInput: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                className="bg-white"
                id="school"
                value={formState.school}
                onChange={(event) =>
                  setFormState({ ...formState, school: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                className="bg-white"
                id="location"
                value={formState.location}
                onChange={(event) =>
                  setFormState({ ...formState, location: event.target.value })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="needsInput">Needs</Label>
              <Input
                className="bg-white"
                id="needsInput"
                placeholder="Example: Education, Nutrition, Health"
                value={formState.needsInput}
                onChange={(event) =>
                  setFormState({ ...formState, needsInput: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hobbiesInput">Hobbies</Label>
              <Input
                className="bg-white"
                id="hobbiesInput"
                placeholder="Example: Reading, Drawing"
                value={formState.hobbiesInput}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    hobbiesInput: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestsInput">Interests</Label>
              <Input
                className="bg-white"
                id="interestsInput"
                placeholder="Example: Science, Soccer"
                value={formState.interestsInput}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    interestsInput: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="story">Personal story</Label>
              <Textarea
                id="story"
                value={formState.story}
                onChange={(event) =>
                  setFormState({ ...formState, story: event.target.value })
                }
                className="bg-white"
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="background">Background</Label>
              <Textarea
                id="background"
                value={formState.background}
                onChange={(event) =>
                  setFormState({ ...formState, background: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyNeed">Monthly support</Label>
              <Input
                className="bg-white"
                id="monthlyNeed"
                value={formState.monthlyNeed}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    monthlyNeed: event.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sponsorshipStatus">Sponsorship status</Label>
              <Select
                value={formState.sponsorshipStatus}
                onValueChange={(value) =>
                  setFormState({ ...formState, sponsorshipStatus: value })
                }
              >
                <SelectTrigger className="bg-white" id="sponsorshipStatus">
                  <SelectValue>{formState.sponsorshipStatus}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Sponsored">Sponsored</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4 md:col-span-2">
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex flex-col gap-4">
                  {/* Image Preview */}
                  {(imagePreview || formState.image.url) && (
                    <div className="relative inline-block">
                      <div className="h-48 w-48 rounded-lg overflow-hidden bg-slate-100 border border-border shadow-sm">
                        <img
                          src={imagePreview || formState.image.url}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex gap-2">
                    <input
                      className="bg-white hidden"
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageInputChange}
                      disabled={isUploadingImage}
                    />
                    <label htmlFor="imageInput" className="flex-1">
                      <Button
                        asChild
                        variant={
                          imagePreview || formState.image.url
                            ? "secondary"
                            : "default"
                        }
                        disabled={isUploadingImage}
                        className="w-full cursor-pointer"
                      >
                        <span>
                          <Upload size={16} className="mr-2" />
                          {isUploadingImage
                            ? "Uploading..."
                            : imagePreview || formState.image.url
                              ? "Change image"
                              : "Upload image"}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-8 ">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Dashboard / Children
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            Child Sponsorship Management
          </h1>
          <p className="max-w-2xl text-foreground/70 mt-2">
            Manage child profiles, edit sponsorship details, and keep a clean
            roster of supported children.
          </p>
        </div>
        <Button onClick={openNewProfile} className="w-full md:w-auto">
          <Plus className="mr-2" size={16} /> Add new child
        </Button>
      </div>

      <Card className="p-6 mb-8 bg-card border-border">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="search">Search children</Label>
              <Input
                className="bg-white"
                id="search"
                placeholder="Search by name, school or location"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="statusFilter">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as "all" | "Available" | "Sponsored")
                }
              >
                <SelectTrigger id="statusFilter">
                  <SelectValue>{statusFilter}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Sponsored">Sponsored</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Roster</Label>
              <p className="text-sm text-foreground/70">
                {filteredChildren.length} children matching current filters.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid bg-background  rounded-lg gap-6 lg:grid-cols-2">
        {filteredChildren.map((child, index) => (
          <Card
            key={child._id || index}
            className="overflow-hidden  bg-card border-border"
          >
            <div className="flex flex-col gap-4 p-6 sm:flex-row">
              <div className="min-h-45 w-full rounded-xl bg-slate-100/80 shadow-sm sm:w-44">
                <img
                  src={child.image.url}
                  alt={child.name}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {child.firstName} {child.secondName}{" "}
                        {child.givenName ? `(${child.givenName})` : ""}
                      </h2>
                      <p className="text-sm text-foreground/70">
                        {child.school} • {child.location}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(child.sponsorshipStatus)}`}
                    >
                      {child.sponsorshipStatus}
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="rounded-lg bg-muted p-3 text-sm text-foreground/80">
                      Age
                      <p className="text-base font-semibold text-foreground">
                        {child.age}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3 text-sm text-foreground/80">
                      Monthly need
                      <p className="text-base font-semibold text-foreground">
                        {child.monthlyNeed}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm text-foreground/70">
                  <p>
                    <span className="font-semibold text-foreground">
                      Guardian:
                    </span>{" "}
                    {child?.guardianNames.includes(",")
                      ? child?.guardianNames.split(", ").join(", ")
                      : child?.guardianNames}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Needs:
                    </span>{" "}
                    {child?.needs?.includes(",")
                      ? child?.needs?.split(", ").join(", ")
                      : child?.needs}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Interests:
                    </span>{" "}
                    {child?.interests?.split(", ").join(", ")}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditProfile(child)}
                  >
                    <Edit size={14} className="mr-2" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProfile(child._id)}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <span className="flex items-center">
                        <>
                          {" "}
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      </span>
                    ) : (
                      <>
                        <Trash2 size={14} className="mr-2" /> Delete
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editingChild ? "Edit child profile" : "New child profile"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-foreground/70">
              <div>
                <p className="font-semibold text-foreground">
                  Step {wizardStep} of 3
                </p>
                <p>
                  {wizardStep === 1
                    ? "Child details"
                    : wizardStep === 2
                      ? "Household and schooling"
                      : "Support plan"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <span
                  className={
                    wizardStep >= 1
                      ? "h-2 w-2 rounded-full bg-primary"
                      : "h-2 w-2 rounded-full bg-slate-300"
                  }
                />
                <span
                  className={
                    wizardStep >= 2
                      ? "h-2 w-2 rounded-full bg-primary"
                      : "h-2 w-2 rounded-full bg-slate-300"
                  }
                />
                <span
                  className={
                    wizardStep >= 3
                      ? "h-2 w-2 rounded-full bg-primary"
                      : "h-2 w-2 rounded-full bg-slate-300"
                  }
                />
              </div>
            </div>
            {formError ? (
              <div className="rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {formError}
              </div>
            ) : null}
            {stepContent()}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={wizardStep === 1}
                  onClick={handleBack}
                  className="bg-accent/10"
                >
                  <ChevronLeft size={16} /> Back
                </Button>
                {wizardStep < 3 ? (
                  <Button size="sm" onClick={handleNext}>
                    Next <ChevronRight size={16} className="ml-2" />
                  </Button>
                ) : null}
              </div>
              {wizardStep === 3 ? (
                <Button disabled={loading} onClick={handleSaveProfile}>
                  {editingChild ? (
                    loading ? (
                      <>
                        Saving... <Loader className="animate-spin" />
                      </>
                    ) : (
                      "Save changes"
                    )
                  ) : loading ? (
                    <>
                      Creating... <Loader className="animate-spin" />
                    </>
                  ) : (
                    "Create profile"
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
