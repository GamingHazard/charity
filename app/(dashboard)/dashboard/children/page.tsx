"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Loader,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { SponsorshipProfile } from "@/lib/mock-data";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";
import { apiRequest } from "@/lib/query-client";
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
  guardianName: "",
  guardianContact: "",
  guardianRelation: "caretaker" as
    | "caretaker"
    | "mom"
    | "dad"
    | "sibling"
    | "uncle"
    | "aunt"
    | "grandparent",
  image: {
    url: "",
    public_id: "",
  },
  background: "",
  school: "",
  location: "",
  needsInput: "",
  monthlyNeed: "",
  education: {
    currentLevel: "",
    schoolName: "",
    currentClass: "",
    academicYear: "",
    lastTermResult: "",
    graduationTarget: "",
    estimatedGraduationYear: "",
    educationNotes: "",
  },
  reportCards: [] as Array<{
    name: string;
    url: string;
    public_id: string;
    fileType: string;
    uploadedAt: string;
  }>,
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

function formatList(value: any) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ") || "Not provided";
  }

  if (typeof value === "string") {
    return value.trim() || "Not provided";
  }

  return value || "Not provided";
}

function getSponsorLabel(child: SponsorshipProfile) {
  const sponsor = (child as any).sponsor;

  if (!sponsor) return "No sponsor yet";

  if (typeof sponsor === "string") return "Sponsor assigned";

  if (typeof sponsor === "object") {
    const sponsorProfile = sponsor.sponsor || sponsor;
    if (sponsorProfile?.name) return sponsorProfile.name;
  }

  return "Sponsor assigned";
}

function getSponsorProfile(child: SponsorshipProfile) {
  const sponsor = (child as any).sponsor;

  if (!sponsor || typeof sponsor !== "object") {
    return null;
  }

  return sponsor.sponsor || sponsor;
}

function formatDisplayDate(value?: string | Date | null) {
  if (!value) return "Not provided";

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return String(value);
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateGraduationYear(currentLevel: string, currentClass: string = "") {
  const raw = `${currentLevel} ${currentClass}`.toLowerCase();

  if (raw.includes("primary")) return String(new Date().getFullYear() + 5);
  if (raw.includes("secondary") || raw.includes("senior")) return String(new Date().getFullYear() + 4);
  if (raw.includes("college") || raw.includes("university") || raw.includes("tertiary")) return String(new Date().getFullYear() + 4);
  if (raw.includes("vocational")) return String(new Date().getFullYear() + 2);

  return String(new Date().getFullYear() + 3);
}

export default function ChildrenDashboard() {
  const router = useRouter();

  const {
    data: Profiles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["children", "profiles"],
  });

  const { data: sponsorRecords, isLoading: isLoadingSponsors } = useQuery({
    queryKey: ["sponsors", "sponsorship", "records"],
  });

  const [children, setChildren] = useState<SponsorshipProfile[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [editingChild, setEditingChild] = useState<SponsorshipProfile | null>(
    null,
  );
  const [viewingChild, setViewingChild] = useState<SponsorshipProfile | null>(
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
  const [publishState, setPublishState] = useState<Record<string, boolean>>({});
  const [assigningChild, setAssigningChild] =
    useState<SponsorshipProfile | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [assigningSponsor, setAssigningSponsor] = useState(false);
  const [sponsorshipHistory, setSponsorshipHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<
    "overview" | "education" | "family" | "sponsor" | "history" | "documents"
  >("overview");
  const [assignmentForm, setAssignmentForm] = useState({
    sponsorName: "",
    sponsorEmail: "",
    sponsorPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    amount: "",
    period: "Monthly",
    paymentMethod: "zelle",
    startDate: new Date().toISOString().slice(0, 10),
    selectedSponsorId: "",
  });

  useEffect(() => {
    if (Profiles) {
      setChildren(Profiles as SponsorshipProfile[]);
    }
  }, [Profiles]);

  const filteredChildren = useMemo(() => {
    return children.filter((child) => {
      const fullName = `${child.firstName || ""} ${child.secondName || ""}`.trim();

      const matchesSearch = [fullName, child.name, child.school, child.location]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || child.sponsorshipStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [children, searchTerm, statusFilter]);

  const sponsorOptions = useMemo(() => {
    if (!sponsorRecords) return [];

    const seen = new Set<string>();

    return sponsorRecords
      .filter((record: any) => record?.donor?.sponsor)
      .map((record: any) => {
        const sponsor = record.donor.sponsor;
        const key = `${sponsor.email || ""}-${sponsor.phone || ""}-${sponsor.name || ""}`;

        if (seen.has(key)) {
          return null;
        }

        seen.add(key);

        return {
          _id: record.donor?._id || record._id,
          ...sponsor,
        };
      })
      .filter(Boolean);
  }, [sponsorRecords]);

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

  const handleReportCardUpload = async (file: File) => {
    try {
      setFormError("");
      const result = await uploadImageToCloudinary(file);
      const nextCard = {
        name: file.name,
        url: result.secure_url,
        public_id: result.public_id,
        fileType: file.type || "image",
        uploadedAt: new Date().toISOString(),
      };

      setFormState((prevState) => ({
        ...prevState,
        reportCards: [...(prevState.reportCards || []), nextCard],
      }));
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Failed to upload report card",
      );
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

  const removeReportCard = (publicId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      reportCards: (prevState.reportCards || []).filter(
        (card) => card.public_id !== publicId,
      ),
    }));
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
      guardianName: child.guardianName || "",
      guardianContact: child.guardianContact || "",
      guardianRelation: child.guardianRelation || "caretaker",
      image: {
        url: child.image.url,
        public_id: child.image.public_id,
      },
      background: child.background,
      school: child.school,
      location: child.location,
      needsInput: child.needs.includes(", ")
        ? child.needs.split(", ").join(", ")
        : child.needs,
      monthlyNeed: child.monthlyNeed,
      education: {
        currentLevel: child.education?.currentLevel || "",
        schoolName: child.education?.schoolName || child.school || "",
        currentClass: child.education?.currentClass || "",
        academicYear: child.education?.academicYear || "",
        lastTermResult: child.education?.lastTermResult || "",
        graduationTarget: child.education?.graduationTarget || "",
        estimatedGraduationYear: child.education?.estimatedGraduationYear || "",
        educationNotes: child.education?.educationNotes || "",
      },
      reportCards: child.reportCards || [],
      progress: child.progress,
      sponsorshipStatus: child.sponsorshipStatus,
    });
    setImagePreview(child.image.url);
    setIsDialogOpen(true);
  };

  const openViewProfile = (child: SponsorshipProfile) => {
    router.push(`/dashboard/children/${child._id}`);
  };

  useEffect(() => {
    if (!viewingChild?._id) {
      setSponsorshipHistory([]);
      return;
    }

    let isMounted = true;

    const fetchHistory = async () => {
      setLoadingHistory(true);

      try {
        const response = await apiRequest("GET", `/sponsors/child/${viewingChild._id}`);
        if (!response.ok) {
          throw new Error("Failed to load child sponsorship history");
        }

        const data = await response.json();

        if (isMounted) {
          setSponsorshipHistory(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading child sponsorship history:", error);
        if (isMounted) {
          setSponsorshipHistory([]);
        }
      } finally {
        if (isMounted) {
          setLoadingHistory(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [viewingChild?._id]);

  const openAssignSponsor = (child: SponsorshipProfile) => {
    setAssigningChild(child);
    setAssignmentForm({
      sponsorName: "",
      sponsorEmail: "",
      sponsorPhone: "",
      address: child.location || "",
      city: "",
      state: "",
      zipCode: "",
      amount: child.monthlyNeed || "",
      period: "Monthly",
      paymentMethod: "zelle",
      startDate: new Date().toISOString().slice(0, 10),
      selectedSponsorId: "",
    });
    setIsAssignDialogOpen(true);
  };

  const handleAssignSponsor = async () => {
    if (!assigningChild) return;

    const selectedSponsor = sponsorOptions.find(
      (option: any) => option._id === assignmentForm.selectedSponsorId,
    );

    const sponsorPayload = selectedSponsor
      ? {
          name: selectedSponsor.name,
          email: selectedSponsor.email,
          phone: selectedSponsor.phone,
        }
      : {
          name: assignmentForm.sponsorName.trim(),
          email: assignmentForm.sponsorEmail.trim(),
          phone: assignmentForm.sponsorPhone.trim(),
        };

    if (!sponsorPayload.name || !sponsorPayload.email || !sponsorPayload.phone) {
      setFormError("Please provide a sponsor name, email and phone number.");
      return;
    }

    try {
      setAssigningSponsor(true);
      setFormError("");

      const payload = {
        childId: assigningChild._id,
        child: assigningChild._id,
        sponsorId: selectedSponsor?._id || undefined,
        sponsor: sponsorPayload,
        location: {
          address: assignmentForm.address.trim(),
          city: assignmentForm.city.trim(),
          state: assignmentForm.state.trim(),
          zipCode: assignmentForm.zipCode.trim(),
        },
        donation: {
          amount: Number(assignmentForm.amount || 0),
          period: assignmentForm.period,
          remindByEmail: true,
        },
        paymentMethod: assignmentForm.paymentMethod,
        startDate: assignmentForm.startDate,
        status: "Active",
      };

      const endpoint = assigningChild.sponsor ? "/sponsors/reassign" : "/sponsors/profile/new";
      const res = await apiRequest(
        assigningChild.sponsor ? "PATCH" : "POST",
        endpoint,
        payload,
      );
      const data = await res.json();

      const updatedChild = {
        ...assigningChild,
        sponsorshipStatus: "Sponsored",
        sponsor: data.sponsor || assigningChild.sponsor,
      };

      setChildren((current) =>
        current.map((child) =>
          child._id === assigningChild._id ? updatedChild : child,
        ),
      );

      setViewingChild((current) =>
        current && current._id === assigningChild._id ? updatedChild : current,
      );

      setAssigningChild(null);
      setIsAssignDialogOpen(false);
    } catch (error) {
      console.error("Error assigning sponsor:", error);
      setFormError("Failed to assign sponsor to this child.");
    } finally {
      setAssigningSponsor(false);
    }
  };

  const togglePublish = (childId: string) => {
    setPublishState((current) => ({
      ...current,
      [childId]: !current[childId],
    }));
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

      const nextEducation = {
        ...formState.education,
        schoolName: formState.education.schoolName || formState.school.trim(),
        estimatedGraduationYear:
          formState.education.estimatedGraduationYear ||
          estimateGraduationYear(
            formState.education.currentLevel,
            formState.education.currentClass,
          ),
      };

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
        guardianName: formState.guardianName.trim(),
        guardianContact: formState.guardianContact.trim(),
        guardianRelation: formState.guardianRelation,
        image: {
          url: formState.image.url || "",
          public_id: formState.image.public_id || "",
        },
        background: formState.background.trim(),
        school: formState.school.trim(),
        location: formState.location.trim(),
        needs: formState.needsInput
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        monthlyNeed: formState.monthlyNeed,
        education: nextEducation,
        reportCards: formState.reportCards || [],
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
              <Label htmlFor="guardianName">Guardian name</Label>
              <Input
                className="bg-white"
                id="guardianName"
                placeholder="Example: Jane Doe"
                value={formState.guardianName}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    guardianName: event.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianContact">Guardian contact</Label>
              <Input
                className="bg-white"
                id="guardianContact"
                placeholder="Phone number"
                value={formState.guardianContact}
                onChange={(event) =>
                  setFormState({ ...formState, guardianContact: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianRelation">Guardian relationship</Label>
              <Select
                value={formState.guardianRelation}
                onValueChange={(value) =>
                  setFormState({ ...formState, guardianRelation: value as typeof formState.guardianRelation })
                }
              >
                <SelectTrigger className="bg-white" id="guardianRelation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caretaker">Caretaker</SelectItem>
                  <SelectItem value="mom">Mom</SelectItem>
                  <SelectItem value="dad">Dad</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="uncle">Uncle</SelectItem>
                  <SelectItem value="aunt">Aunt</SelectItem>
                  <SelectItem value="grandparent">Grandparent</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="currentLevel">Education level</Label>
              <Input
                className="bg-white"
                id="currentLevel"
                placeholder="Primary, Secondary, University"
                value={formState.education.currentLevel}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      currentLevel: event.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentClass">Current class</Label>
              <Input
                className="bg-white"
                id="currentClass"
                placeholder="Primary 4, Senior 3"
                value={formState.education.currentClass}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      currentClass: event.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic year</Label>
              <Input
                className="bg-white"
                id="academicYear"
                value={formState.education.academicYear}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      academicYear: event.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedGraduationYear">Estimated graduation year</Label>
              <Input
                className="bg-white"
                id="estimatedGraduationYear"
                value={formState.education.estimatedGraduationYear}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      estimatedGraduationYear: event.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastTermResult">Last term result</Label>
              <Input
                className="bg-white"
                id="lastTermResult"
                value={formState.education.lastTermResult}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      lastTermResult: event.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduationTarget">Graduation target</Label>
              <Input
                className="bg-white"
                id="graduationTarget"
                value={formState.education.graduationTarget}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      graduationTarget: event.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="educationNotes">Education notes</Label>
              <Textarea
                id="educationNotes"
                value={formState.education.educationNotes}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    education: {
                      ...formState.education,
                      educationNotes: event.target.value,
                    },
                  })
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
                <Label>Report cards</Label>
                <div className="flex flex-col gap-3">
                  {(formState.reportCards || []).length > 0 ? (
                    <div className="grid gap-2 md:grid-cols-2">
                      {(formState.reportCards || []).map((card) => (
                        <div
                          key={card.public_id || card.url || card.name}
                          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-slate-50 p-2"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">
                              {card.name || "Report card"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(card.uploadedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeReportCard(card.public_id)}
                            className="text-xs text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No report cards uploaded yet.
                    </p>
                  )}

                  <div className="flex gap-2">
                    <input
                      className="bg-white hidden"
                      id="reportCardInput"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          await handleReportCardUpload(file);
                          event.target.value = "";
                        }
                      }}
                    />
                    <label htmlFor="reportCardInput" className="flex-1">
                      <Button asChild variant="secondary" className="w-full cursor-pointer">
                        <span>
                          <Upload size={16} className="mr-2" />
                          Upload report card
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <div className="flex flex-col gap-4">
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

      <div className="grid bg-background rounded-lg gap-6 lg:grid-cols-2">
        {filteredChildren.map((child, index) => (
          <Card
            key={child._id || index}
            className="overflow-hidden bg-card border-border transition-shadow hover:shadow-md"
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={child.image?.url || "/no-staff.avif"}
                alt={child.firstName || "Child profile"}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute left-4 top-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(child.sponsorshipStatus)}`}
                >
                  {child.sponsorshipStatus}
                </span>
              </div>

              <div className="absolute right-4 top-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 rounded-full bg-white/90 text-foreground hover:bg-white"
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuItem
                      onClick={() => openViewProfile(child)}
                      className="cursor-pointer"
                    >
                      <Eye size={14} className="mr-2" />
                      View profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => openAssignSponsor(child)}
                      className="cursor-pointer"
                    >
                      <Plus size={14} className="mr-2" />
                      Assign sponsor
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => openEditProfile(child)}
                      className="cursor-pointer"
                    >
                      <Edit size={14} className="mr-2" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleDeleteProfile(child._id)}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </DropdownMenuItem>

                    <div className="flex items-center justify-between px-2 py-2">
                      <span className="text-sm font-medium text-foreground">
                        Publish
                      </span>
                      <Switch
                        checked={!!publishState[child._id]}
                        onCheckedChange={() => togglePublish(child._id)}
                      />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {child.firstName} {child.secondName}
                    </h2>
                    <p className="text-sm text-white/80">
                      {child.age} years old
                    </p>
                  </div>

                  <div className="rounded-full bg-white/15 px-2 py-1 text-xs text-white/90 backdrop-blur-sm">
                    {getSponsorLabel(child)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={isAssignDialogOpen}
        onOpenChange={(open) => {
          setIsAssignDialogOpen(open);
          if (!open) {
            setAssigningChild(null);
            setFormError("");
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {assigningChild
                ? `Assign sponsor to ${assigningChild.firstName} ${assigningChild.secondName}`
                : "Assign sponsor"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {formError ? (
              <div className="rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {formError}
              </div>
            ) : null}

            {sponsorOptions.length > 0 ? (
              <div className="space-y-2">
                <Label htmlFor="existingSponsor">Choose an existing sponsor</Label>
                <Select
                  value={assignmentForm.selectedSponsorId}
                  onValueChange={(value) => {
                    const selected = sponsorOptions.find(
                      (option: any) => option._id === value,
                    );

                    setAssignmentForm((current) => ({
                      ...current,
                      selectedSponsorId: value,
                      sponsorName: selected?.name || current.sponsorName,
                      sponsorEmail: selected?.email || current.sponsorEmail,
                      sponsorPhone: selected?.phone || current.sponsorPhone,
                    }));
                  }}
                >
                  <SelectTrigger id="existingSponsor" className="bg-white">
                    <SelectValue placeholder="Select a sponsor" />
                  </SelectTrigger>
                  <SelectContent>
                    {sponsorOptions.map((option: any) => (
                      <SelectItem key={option._id} value={option._id}>
                        {option.name} ({option.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sponsorName">Sponsor name</Label>
                <Input
                  id="sponsorName"
                  className="bg-white"
                  value={assignmentForm.sponsorName}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      sponsorName: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sponsorEmail">Sponsor email</Label>
                <Input
                  id="sponsorEmail"
                  className="bg-white"
                  value={assignmentForm.sponsorEmail}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      sponsorEmail: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sponsorPhone">Sponsor phone</Label>
                <Input
                  id="sponsorPhone"
                  className="bg-white"
                  value={assignmentForm.sponsorPhone}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      sponsorPhone: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Donation amount</Label>
                <Input
                  id="amount"
                  type="number"
                  className="bg-white"
                  value={assignmentForm.amount}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      amount: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Sponsorship period</Label>
                <Select
                  value={assignmentForm.period}
                  onValueChange={(value) =>
                    setAssignmentForm({ ...assignmentForm, period: value })
                  }
                >
                  <SelectTrigger id="period" className="bg-white">
                    <SelectValue>{assignmentForm.period}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="3 Months">3 Months</SelectItem>
                    <SelectItem value="6 Months">6 Months</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start date</Label>
                <Input
                  id="startDate"
                  type="date"
                  className="bg-white"
                  value={assignmentForm.startDate}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      startDate: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment method</Label>
                <Select
                  value={assignmentForm.paymentMethod}
                  onValueChange={(value) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      paymentMethod: value,
                    })
                  }
                >
                  <SelectTrigger id="paymentMethod" className="bg-white">
                    <SelectValue>{assignmentForm.paymentMethod}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zelle">Zelle</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="ach">ACH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  className="bg-white"
                  value={assignmentForm.address}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      address: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  className="bg-white"
                  value={assignmentForm.city}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      city: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  className="bg-white"
                  value={assignmentForm.state}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      state: event.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="zipCode">Zip code</Label>
                <Input
                  id="zipCode"
                  className="bg-white"
                  value={assignmentForm.zipCode}
                  onChange={(event) =>
                    setAssignmentForm({
                      ...assignmentForm,
                      zipCode: event.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAssignDialogOpen(false)}
                disabled={assigningSponsor}
              >
                Cancel
              </Button>
              <Button onClick={handleAssignSponsor} disabled={assigningSponsor}>
                {assigningSponsor ? "Assigning..." : "Assign sponsor"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

      <Dialog
        open={Boolean(viewingChild)}
        onOpenChange={(open) => {
          if (!open) setViewingChild(null);
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Child profile details</DialogTitle>
          </DialogHeader>

          {viewingChild && (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src={viewingChild.image?.url || "/no-staff.avif"}
                  alt={viewingChild.firstName || "Child profile"}
                  className="h-72 w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {viewingChild.firstName} {viewingChild.secondName}
                    </h2>
                    <p className="text-sm text-foreground/70">
                      {viewingChild.school} • {viewingChild.location}
                    </p>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(viewingChild.sponsorshipStatus)}`}
                  >
                    {viewingChild.sponsorshipStatus}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs uppercase tracking-wide text-foreground/60">
                      Age
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {viewingChild.age}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs uppercase tracking-wide text-foreground/60">
                      Gender
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {viewingChild.gender}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs uppercase tracking-wide text-foreground/60">
                      Class
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {viewingChild.class}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs uppercase tracking-wide text-foreground/60">
                      Sponsor
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {getSponsorLabel(viewingChild)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setViewingChild(null);
                      openEditProfile(viewingChild);
                    }}
                  >
                    <Edit size={14} className="mr-2" />
                    Edit profile
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-2">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "overview", label: "Overview" },
                    { key: "education", label: "Education" },
                    { key: "family", label: "Family" },
                    { key: "sponsor", label: "Sponsor details" },
                    { key: "history", label: "Sponsorship history" },
                    { key: "documents", label: "Documents" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveProfileTab(tab.key as typeof activeProfileTab)}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        activeProfileTab === tab.key
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground/70 hover:bg-muted/80"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeProfileTab === "overview" && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">
                      Background
                    </h3>
                    <p className="text-sm leading-6 text-foreground/80">
                      {formatList(viewingChild.background)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">
                      Support needs
                    </h3>
                    <p className="text-sm leading-6 text-foreground/80">
                      {formatList(viewingChild.needs)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">
                      Family & school
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li>
                        <span className="font-medium text-foreground">Family status:</span>{" "}
                        {viewingChild.familyStatus}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Number of parents:</span>{" "}
                        {viewingChild.numberOfParents}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Nationality:</span>{" "}
                        {viewingChild.nationality}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Monthly need:</span>{" "}
                        {viewingChild.monthlyNeed || "Not provided"}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">
                      Other details
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li>
                        <span className="font-medium text-foreground">Date of birth:</span>{" "}
                        {formatDisplayDate(viewingChild.dateOfBirth)}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Age group:</span>{" "}
                        {viewingChild.ageGroup || "Not provided"}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Given name:</span>{" "}
                        {viewingChild.givenName || "Not provided"}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Preferred name:</span>{" "}
                        {viewingChild.name || "Not provided"}
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProfileTab === "education" && (
                <div className="space-y-4 rounded-xl border border-border bg-card p-4">
                  <h3 className="text-lg font-semibold text-foreground">Education tracking</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/60">Current level</p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        {viewingChild.education?.currentLevel || "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/60">Current class</p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        {viewingChild.education?.currentClass || "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/60">School</p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        {viewingChild.education?.schoolName || viewingChild.school || "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/60">Academic year</p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        {viewingChild.education?.academicYear || "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/60">Last term result</p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        {viewingChild.education?.lastTermResult || "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-xs uppercase tracking-wide text-foreground/60">Estimated graduation year</p>
                      <p className="mt-2 text-base font-semibold text-foreground">
                        {viewingChild.education?.estimatedGraduationYear || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-xs uppercase tracking-wide text-foreground/60">Graduation target</p>
                    <p className="mt-2 text-base font-semibold text-foreground">
                      {viewingChild.education?.graduationTarget || "Not provided"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-xs uppercase tracking-wide text-foreground/60">Education notes</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/80">
                      {viewingChild.education?.educationNotes || "No additional notes"}
                    </p>
                  </div>
                </div>
              )}

              {activeProfileTab === "family" && (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">
                      Guardian information
                    </h3>
                    <p className="text-sm leading-6 text-foreground/80">
                      {viewingChild.guardianName || "Not provided"}
                      <br />
                      {viewingChild.guardianContact || "Contact not provided"}
                      <br />
                      {viewingChild.guardianRelation || "Relationship not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold text-foreground">
                      Family details
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li><span className="font-medium text-foreground">Family status:</span> {viewingChild.familyStatus}</li>
                      <li><span className="font-medium text-foreground">Number of parents:</span> {viewingChild.numberOfParents}</li>
                      <li><span className="font-medium text-foreground">Nationality:</span> {viewingChild.nationality}</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeProfileTab === "sponsor" && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    Sponsorship details
                  </h3>

                  {getSponsorProfile(viewingChild) ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs uppercase tracking-wide text-foreground/60">Sponsor</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {getSponsorProfile(viewingChild)?.name?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{getSponsorProfile(viewingChild)?.name}</p>
                            <p className="text-sm text-foreground/70">{getSponsorProfile(viewingChild)?.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs uppercase tracking-wide text-foreground/60">Contact</p>
                        <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                          <li><span className="font-medium text-foreground">Phone:</span> {getSponsorProfile(viewingChild)?.phone || "Not provided"}</li>
                          <li><span className="font-medium text-foreground">Address:</span> {((viewingChild as any).sponsor?.location && typeof (viewingChild as any).sponsor.location === "object") ? [
                              (viewingChild as any).sponsor.location.address,
                              (viewingChild as any).sponsor.location.city,
                              (viewingChild as any).sponsor.location.state,
                              (viewingChild as any).sponsor.location.zipCode,
                            ].filter(Boolean).join(", ") || "Not provided" : "Not provided"}</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs uppercase tracking-wide text-foreground/60">Assigned on</p>
                        <p className="mt-3 text-base font-semibold text-foreground">
                          {formatDisplayDate((viewingChild as any).sponsor?.startDate)}
                        </p>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs uppercase tracking-wide text-foreground/60">Sponsorship plan</p>
                        <p className="mt-3 text-base font-semibold text-foreground">
                          {(viewingChild as any).sponsor?.donation?.period || "Monthly"}
                        </p>
                        <p className="text-sm text-foreground/70">
                          ${((viewingChild as any).sponsor?.donation?.amount || 0).toString()} per period
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-foreground/70">
                      No sponsor has been assigned to this child yet.
                    </div>
                  )}
                </div>
              )}

              {activeProfileTab === "history" && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Sponsorship history</h3>

                  {loadingHistory ? (
                    <div className="space-y-3">
                      <div className="h-12 animate-pulse rounded-lg bg-muted" />
                      <div className="h-12 animate-pulse rounded-lg bg-muted" />
                    </div>
                  ) : sponsorshipHistory.length > 0 ? (
                    <div className="space-y-3">
                      {sponsorshipHistory.map((record: any, index: number) => {
                        const donor = record.donor || {};
                        const sponsorName =
                          donor.profile?.fullName ||
                          donor.sponsor?.name ||
                          donor.name ||
                          "Unknown sponsor";
                        const amount =
                          Number(record.amount ?? record.donation?.amount ?? donor.donation?.amount ?? 0);
                        const status = record.status || "Pending";
                        const startDate = record.startDate
                          ? new Date(record.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Not provided";

                        return (
                          <div
                            key={record._id || `${sponsorName}-${index}`}
                            className="rounded-lg border border-border bg-muted/40 p-4"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="font-semibold text-foreground">{sponsorName}</p>
                                <p className="text-sm text-foreground/70">
                                  {record.frequency || donor.donation?.period || "Monthly"} sponsorship
                                </p>
                              </div>
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(status)}`}
                              >
                                {status}
                              </span>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                              <div className="rounded-md bg-background p-3">
                                <p className="text-xs uppercase tracking-wide text-foreground/60">Amount</p>
                                <p className="mt-2 font-semibold text-foreground">${amount}</p>
                              </div>
                              <div className="rounded-md bg-background p-3">
                                <p className="text-xs uppercase tracking-wide text-foreground/60">Started</p>
                                <p className="mt-2 font-semibold text-foreground">{startDate}</p>
                              </div>
                              <div className="rounded-md bg-background p-3">
                                <p className="text-xs uppercase tracking-wide text-foreground/60">Payments</p>
                                <p className="mt-2 font-semibold text-foreground">
                                  {Array.isArray(record.payments) ? record.payments.length : 0}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-foreground/70">
                      No sponsorship history is available yet for this child.
                    </div>
                  )}
                </div>
              )}

              {activeProfileTab === "documents" && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Documents</h3>
                  {(viewingChild.reportCards || []).length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {(viewingChild.reportCards || []).map((card, index) => (
                        <a
                          key={card.public_id || card.url || `${card.name || "document"}-${index}`}
                          href={card.url || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-border bg-muted p-3 text-sm text-foreground/80 hover:bg-muted/80"
                        >
                          <p className="font-medium text-foreground">{card.name || "Report card"}</p>
                          <p className="mt-1 text-xs text-foreground/60">
                            {card.fileType || "Document"}
                          </p>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-foreground/70">
                      No report cards have been uploaded for this child yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
