"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/query-client";
import type { SponsorshipProfile } from "@/lib/mock-data";
import { ArrowLeft, Unlink } from "lucide-react";

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

function formatList(value: any) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(", ") || "Not provided";
  }

  if (typeof value === "string") {
    return value.trim() || "Not provided";
  }

  return value || "Not provided";
}

function getStatusBadgeClass(status?: string) {
  switch (status) {
    case "Available":
      return "bg-emerald-100 text-emerald-800";
    case "Sponsored":
      return "bg-sky-100 text-sky-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export default function ChildDetailPage() {
  const params = useParams();
  const router = useRouter();
  const childId = typeof params?.id === "string" ? params.id : "";

  const [profile, setProfile] = useState<SponsorshipProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "education" | "family" | "sponsor" | "history" | "documents"
  >("overview");
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<any>(null);
  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [unlinkError, setUnlinkError] = useState("");

  useEffect(() => {
    if (!childId) return;

    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);

      try {
        const response = await apiRequest(
          "GET",
          `/children/profile/${childId}`,
        );
        const data = await response.json();

        if (isMounted) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching child profile:", error);
        if (isMounted) {
          setProfile(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [childId]);

  useEffect(() => {
    if (!childId) {
      setHistory([]);
      return;
    }

    let isMounted = true;

    const fetchHistory = async () => {
      setHistoryLoading(true);

      try {
        const response = await apiRequest("GET", `/sponsors/child/${childId}`);
        const data = await response.json();

        if (isMounted) {
          setHistory(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading child sponsorship history:", error);
        if (isMounted) {
          setHistory([]);
        }
      } finally {
        if (isMounted) {
          setHistoryLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [childId]);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "education", label: "Education" },
    { key: "family", label: "Family" },
    { key: "sponsor", label: "Sponsor details" },
    { key: "history", label: "Sponsorship history" },
    { key: "documents", label: "Documents" },
  ] as const;

  const openEditDialog = () => {
    if (!profile) return;

    setFormState({
      firstName: profile.firstName || "",
      secondName: profile.secondName || "",
      givenName: profile.givenName || "",
      gender: profile.gender || "Female",
      dateOfBirth: profile.dateOfBirth || "",
      age: profile.age || 0,
      class: profile.class || "",
      nationality: profile.nationality || "",
      familyStatus: profile.familyStatus || "Single Parent",
      numberOfParents: profile.numberOfParents || 1,
      guardianName: profile.guardianName || "",
      guardianContact: profile.guardianContact || "",
      guardianRelation: profile.guardianRelation || "caretaker",
      background: profile.background || "",
      school: profile.school || "",
      location: profile.location || "",
      needsInput: Array.isArray(profile.needs)
        ? profile.needs.join(", ")
        : typeof profile.needs === "string"
          ? profile.needs
          : "",
      monthlyNeed: profile.monthlyNeed || "",
      sponsorshipStatus: profile.sponsorshipStatus || "Available",
      education: {
        currentLevel: profile.education?.currentLevel || "",
        currentClass: profile.education?.currentClass || "",
        schoolName: profile.education?.schoolName || profile.school || "",
        academicYear: profile.education?.academicYear || "",
        lastTermResult: profile.education?.lastTermResult || "",
        graduationTarget: profile.education?.graduationTarget || "",
        estimatedGraduationYear:
          profile.education?.estimatedGraduationYear || "",
        educationNotes: profile.education?.educationNotes || "",
      },
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!profile || !formState) return;

    setIsSaving(true);
    setFormError("");

    try {
      const payload = {
        firstName: formState.firstName.trim(),
        secondName: formState.secondName.trim(),
        givenName: formState.givenName.trim() || formState.firstName.trim(),
        gender: formState.gender,
        dateOfBirth: formState.dateOfBirth,
        age: Number(formState.age) || 0,
        class: formState.class,
        nationality: formState.nationality,
        familyStatus: formState.familyStatus,
        numberOfParents: Number(formState.numberOfParents) || 1,
        guardianName: formState.guardianName.trim(),
        guardianContact: formState.guardianContact.trim(),
        guardianRelation: formState.guardianRelation,
        image: profile.image || { url: "", public_id: "" },
        background: formState.background.trim(),
        school: formState.school.trim(),
        location: formState.location.trim(),
        needs: formState.needsInput
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean),
        monthlyNeed: formState.monthlyNeed,
        education: {
          ...profile.education,
          ...formState.education,
          schoolName: formState.education.schoolName || formState.school.trim(),
        },
        reportCards: profile.reportCards || [],
        sponsorshipStatus: formState.sponsorshipStatus,
      };

      const res = await apiRequest(
        "PUT",
        `/children/profile/${profile._id}/update`,
        payload,
      );
      const data = await res.json();
      setProfile((current) => ({
        ...(current || profile),
        ...data.profile,
        _id: profile._id,
      }));
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error saving child profile:", error);
      setFormError("Unable to save the profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnlinkSponsor = async () => {
    if (!childId) return;

    setIsUnlinking(true);
    setUnlinkError("");

    try {
      const response = await apiRequest(
        "PATCH",
        `/sponsors/child/${childId}/unlink`,
      );
      const data = await response.json();

      setProfile((current) =>
        current
          ? {
              ...current,
              ...data.child,
              sponsor: null,
              sponsorshipStatus: "Available",
            }
          : current,
      );
      setHistory((current) =>
        current.map((record) =>
          ["Active", "Pending"].includes(record.status)
            ? { ...record, status: "Cancelled" }
            : record,
        ),
      );
      setIsUnlinkDialogOpen(false);
    } catch (error) {
      console.error("Error unlinking sponsor:", error);
      setUnlinkError("Unable to unlink this sponsor. Please try again.");
    } finally {
      setIsUnlinking(false);
    }
  };

  const sponsorProfile = (profile as any)?.sponsor || null;
  const education = profile?.education || {};
  const reportCards = profile?.reportCards || [];
  const needsList = Array.isArray(profile?.needs)
    ? profile.needs
    : typeof profile?.needs === "string"
      ? profile.needs
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  if (loading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} /> Back
        </Button>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Child not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The child profile could not be loaded.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard/children")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2" size={16} /> Back to children
      </Button>

      <div className="mt-2 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <img
            src={profile.image?.url || "/no-staff.avif"}
            alt={profile.firstName || "Child profile"}
            className="h-full min-h-80 w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                Child profile
              </p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">
                {profile.firstName} {profile.secondName}
              </h1>
              <p className="mt-2 text-sm text-foreground/70">
                {profile.school} • {profile.location}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start">
              <Button variant="secondary" onClick={openEditDialog}>
                Edit profile
              </Button>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(profile.sponsorshipStatus)}`}
              >
                {profile.sponsorshipStatus}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Age
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {profile.age}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Class
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {profile.class}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Gender
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {profile.gender}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Sponsor
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {sponsorProfile?.name || "No sponsor yet"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="rounded-xl border border-border bg-card p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground/70 hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Background
              </h3>
              <p className="text-sm leading-6 text-foreground/80">
                {formatList(profile.background)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Support needs
              </h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                {needsList.length > 0 ? (
                  needsList.map((need, idx) => (
                    <li key={`${need}-${idx}`}>• {need}</li>
                  ))
                ) : (
                  <li>No needs provided yet.</li>
                )}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Family & school
              </h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <span className="font-medium text-foreground">
                    Family status:
                  </span>{" "}
                  {profile.familyStatus}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Number of parents:
                  </span>{" "}
                  {profile.numberOfParents}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Nationality:
                  </span>{" "}
                  {profile.nationality}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Monthly need:
                  </span>{" "}
                  {profile.monthlyNeed || "Not provided"}
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Other details
              </h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <span className="font-medium text-foreground">
                    Date of birth:
                  </span>{" "}
                  {formatDisplayDate(profile.dateOfBirth)}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Age group:
                  </span>{" "}
                  {profile.ageGroup}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Given name:
                  </span>{" "}
                  {profile.givenName || "Not provided"}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Preferred name:
                  </span>{" "}
                  {profile.name || "Not provided"}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-4 rounded-xl border border-border bg-card p-4">
            <h3 className="text-lg font-semibold text-foreground">
              Education tracking
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  Current level
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {education.currentLevel || "Not provided"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  Current class
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {education.currentClass || "Not provided"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  School
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {education.schoolName || profile.school || "Not provided"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  Academic year
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {education.academicYear || "Not provided"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  Last term result
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {education.lastTermResult || "Not provided"}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-foreground/60">
                  Estimated graduation
                </p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {education.estimatedGraduationYear || "Not provided"}
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Education notes
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/80">
                {education.educationNotes || "No additional notes"}
              </p>
            </div>
          </div>
        )}

        {activeTab === "family" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Guardian information
              </h3>
              <p className="text-sm leading-6 text-foreground/80">
                {profile.guardianName || "Not provided"}
                <br />
                {profile.guardianContact || "Contact not provided"}
                <br />
                {profile.guardianRelation || "Relationship not provided"}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Family details
              </h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <span className="font-medium text-foreground">
                    Family status:
                  </span>{" "}
                  {profile.familyStatus}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Number of parents:
                  </span>{" "}
                  {profile.numberOfParents}
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Nationality:
                  </span>{" "}
                  {profile.nationality}
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "sponsor" && (
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Sponsorship details
            </h3>
            {sponsorProfile ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    Sponsor
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {sponsorProfile?.profile?.fullName
                        ?.charAt(0)
                        ?.toUpperCase() || "S"}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {sponsorProfile?.profile?.fullName}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {sponsorProfile?.profile?.email}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4"
                      onClick={() => {
                        setUnlinkError("");
                        setIsUnlinkDialogOpen(true);
                      }}
                    >
                      <Unlink className="mr-2 size-4" />
                      Unlink sponsor
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    Contact
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    <li>
                      <span className="font-medium text-foreground">
                        Phone:
                      </span>{" "}
                      {sponsorProfile?.profile?.phone || "Not provided"}
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Address:
                      </span>{" "}
                      {[
                        (sponsorProfile as any)?.profile?.address,
                        (sponsorProfile as any)?.profile?.city,
                        (sponsorProfile as any)?.profile?.state,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Not provided"}
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Zip:</span>{" "}
                      {sponsorProfile?.profile?.zipCode || "Not provided"}
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Country:
                      </span>{" "}
                      {sponsorProfile?.profile?.country || "Not provided"}
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    Created on
                  </p>
                  <p className="mt-3 text-base font-semibold text-foreground">
                    {formatDisplayDate(sponsorProfile.createdAt)}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    Plan
                  </p>
                  <p className="mt-3 text-base font-semibold text-foreground">
                    {(profile as any).sponsor?.donation?.period || "Monthly"}
                  </p>
                  <p className="text-sm text-foreground/70">
                    $
                    {(
                      (profile as any).sponsor?.donation?.amount || 0
                    ).toString()}{" "}
                    per period
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

        <AlertDialog
          open={isUnlinkDialogOpen}
          onOpenChange={(open) => {
            setIsUnlinkDialogOpen(open);
            if (!open) setUnlinkError("");
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Unlink sponsor from this child?
              </AlertDialogTitle>
              <AlertDialogDescription>
                The current sponsorship will be cancelled, the child will become
                available, and all sponsorship and payment history will be
                preserved.
              </AlertDialogDescription>
              {unlinkError ? (
                <p className="text-sm text-destructive">{unlinkError}</p>
              ) : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isUnlinking}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(event) => {
                  event.preventDefault();
                  void handleUnlinkSponsor();
                }}
                disabled={isUnlinking}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isUnlinking ? "Unlinking..." : "Unlink sponsor"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {activeTab === "history" && (
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Sponsorship history
            </h3>
            {historyLoading ? (
              <div className="space-y-3">
                <div className="h-12 animate-pulse rounded-lg bg-muted" />
                <div className="h-12 animate-pulse rounded-lg bg-muted" />
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-3">
                {history.map((record: any, index: number) => {
                  const donor = record.donor || {};
                  const sponsorName =
                    donor.profile?.fullName ||
                    donor.sponsor?.name ||
                    donor.name ||
                    "Unknown sponsor";
                  const amount = Number(
                    record.amount ?? donor.donation?.amount ?? 0,
                  );
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
                          <p className="font-semibold text-foreground">
                            {sponsorName}
                          </p>
                          <p className="text-sm text-foreground/70">
                            {record.frequency ||
                              donor.donation?.period ||
                              "Monthly"}{" "}
                            sponsorship
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
                          <p className="text-xs uppercase tracking-wide text-foreground/60">
                            Amount
                          </p>
                          <p className="mt-2 font-semibold text-foreground">
                            ${amount}
                          </p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p className="text-xs uppercase tracking-wide text-foreground/60">
                            Started
                          </p>
                          <p className="mt-2 font-semibold text-foreground">
                            {startDate}
                          </p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p className="text-xs uppercase tracking-wide text-foreground/60">
                            Payments
                          </p>
                          <p className="mt-2 font-semibold text-foreground">
                            {Array.isArray(record.payments)
                              ? record.payments.length
                              : 0}
                          </p>
                        </div>
                      </div>
                      {Array.isArray(record.payments) &&
                      record.payments.length > 0 ? (
                        <div className="mt-4 border-t border-border pt-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/60">
                            Payment records
                          </p>
                          <div className="space-y-2">
                            {record.payments.map(
                              (payment: any, paymentIndex: number) => (
                                <div
                                  key={
                                    payment._id ||
                                    `${payment.transactionId || "payment"}-${paymentIndex}`
                                  }
                                  className="grid gap-2 rounded-md bg-background p-3 text-sm sm:grid-cols-5"
                                >
                                  <span>
                                    {payment.date
                                      ? formatDisplayDate(payment.date)
                                      : "Not provided"}
                                  </span>
                                  <span>
                                    {Number(
                                      payment.amount || 0,
                                    ).toLocaleString()}{" "}
                                    {payment.currency || "UGX"}
                                  </span>
                                  <span>
                                    {payment.method || "Not provided"}
                                  </span>
                                  <span>
                                    {payment.transactionId || "No reference"}
                                  </span>
                                  <span className="font-medium">
                                    {payment.status || "Completed"}
                                  </span>
                                  {payment.paymentGroupId ? (
                                    <span className="text-xs text-foreground/60 sm:col-span-5">
                                      Donation group: {payment.paymentGroupId}
                                    </span>
                                  ) : null}
                                  {payment.notes ? (
                                    <span className="text-xs text-foreground/60 sm:col-span-5">
                                      {payment.notes}
                                    </span>
                                  ) : null}
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      ) : null}
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

        {activeTab === "documents" && (
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              Child's Report cards{" "}
            </h3>
            {reportCards.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {reportCards.map((card: any, index: number) => (
                  <a
                    key={
                      card.public_id ||
                      card.url ||
                      `${card.name || "document"}-${index}`
                    }
                    href={card.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-border bg-muted p-3 text-sm text-foreground/80 hover:bg-muted/80"
                  >
                    <p className="font-medium text-foreground">
                      {card.name || "Report card"}
                    </p>
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

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit child profile</DialogTitle>
          </DialogHeader>

          {formState && (
            <div className="space-y-5 py-2">
              {formError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={formState.firstName}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        firstName: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondName">Second name</Label>
                  <Input
                    id="secondName"
                    value={formState.secondName}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        secondName: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="givenName">Preferred name</Label>
                  <Input
                    id="givenName"
                    value={formState.givenName}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        givenName: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    value={formState.gender}
                    onChange={(event) =>
                      setFormState({ ...formState, gender: event.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of birth</Label>
                  <Input
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
                    id="age"
                    type="number"
                    value={formState.age}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        age: Number(event.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={formState.class}
                    onChange={(event) =>
                      setFormState({ ...formState, class: event.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    value={formState.school}
                    onChange={(event) =>
                      setFormState({ ...formState, school: event.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formState.location}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        location: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="background">Background</Label>
                  <Textarea
                    id="background"
                    value={formState.background}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        background: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="needsInput">Needs</Label>
                  <Input
                    id="needsInput"
                    value={formState.needsInput}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        needsInput: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyNeed">Monthly need</Label>
                  <Input
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
                  <Label htmlFor="guardianName">Guardian name</Label>
                  <Input
                    id="guardianName"
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
                    id="guardianContact"
                    value={formState.guardianContact}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        guardianContact: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianRelation">Guardian relation</Label>
                  <Input
                    id="guardianRelation"
                    value={formState.guardianRelation}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        guardianRelation: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorshipStatus">Sponsorship status</Label>
                  <Input
                    id="sponsorshipStatus"
                    value={formState.sponsorshipStatus}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        sponsorshipStatus: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
