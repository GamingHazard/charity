"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  ArrowLeft,
  CreditCard,
  Unlink,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/query-client";

type SponsorDetail = {
  sponsor: {
    _id: string;
    profile?: {
      fullName?: string;
      email?: string;
      phone?: string;
      bio?: string;
    };
    sponsor?: {
      name?: string;
      email?: string;
      phone?: string;
    };
    location?: {
      address?: string;
      country?: string;
      city?: string;
      state?: string;
      region?: string;
      zipCode?: string;
    };
    paymentMethod?: string;
    child?: string | { _id?: string };
    donation?: {
      amount?: number;
      period?: string;
      remindByEmail?: boolean;
    };
    startDate?: string;
    profileStatus?: string;
  };
  profileStatus?: string;
  profileCompletion?: number;
  children?: any[];
  paymentHistory?: any[];
  summary?: {
    totalChildren?: number;
    activeChildren?: number;
    pendingChildren?: number;
    totalPledged?: number;
    totalPaid?: number;
  };
};

function getStatusBadgeClass(status?: string) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-800";
    case "Pending":
      return "bg-amber-100 text-amber-800";
    case "Paused":
      return "bg-slate-100 text-slate-800";
    case "Completed":
      return "bg-sky-100 text-sky-800";
    case "Complete":
      return "bg-emerald-100 text-emerald-800";
    case "Incomplete":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export default function SponsorDetailPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useParams();
  const sponsorId = typeof params?.id === "string" ? params.id : "";

  const [profile, setProfile] = useState<SponsorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "children" | "payments"
  >("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveError, setArchiveError] = useState("");
  const [unlinkTarget, setUnlinkTarget] = useState<{
    childId: string;
    childName: string;
  } | null>(null);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [unlinkError, setUnlinkError] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isRecordingPayment, setIsRecordingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    currency: "UGX",
    date: new Date().toISOString().slice(0, 10),
    method: "Cash",
    transactionId: "",
    notes: "",
    allocationMode: "equal" as "equal" | "custom",
    selectedSponsorshipIds: [] as string[],
    customAmounts: {} as Record<string, string>,
  });
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    region: "",
    zipCode: "",
    bio: "",
    address: "",
    amount: "",
    period: "Monthly",
    remindByEmail: false,
    paymentMethod: "zelle",
    childId: "",
    startDate: new Date().toISOString().slice(0, 10),
  });
  const [childrenOptions, setChildrenOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!sponsorId) return;

    let isMounted = true;

    const fetchProfile = async () => {
      setLoading(true);

      try {
        const response = await apiRequest("GET", `/sponsors/${sponsorId}`);
        const data = await response.json();

        if (isMounted) {
          setProfile(data as SponsorDetail);
        }
      } catch (error) {
        console.error("Error loading sponsor profile:", error);
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

    apiRequest("GET", "/children/profiles")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) setChildrenOptions(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error loading child options:", error));

    return () => {
      isMounted = false;
    };
  }, [sponsorId]);

  const sponsor = profile?.sponsor || ({} as SponsorDetail["sponsor"]);
  const sponsorProfile = sponsor.profile || {};
  const sponsoredChildren = useMemo(
    () => (Array.isArray(profile?.children) ? profile.children : []),
    [profile],
  );

  const paymentHistory = useMemo(() => {
    return Array.isArray(profile?.paymentHistory) ? profile.paymentHistory : [];
  }, [profile]);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "children", label: "Children" },
    { key: "payments", label: "Payment history" },
  ] as const;

  const openEditDialog = () => {
    setFormState({
      fullName: sponsorProfile.fullName || sponsor.sponsor?.name || "",
      email: sponsorProfile.email || sponsor.sponsor?.email || "",
      phone: sponsorProfile.phone || sponsor.sponsor?.phone || "",
      country: sponsorProfile.country || location.country || "",
      city: sponsorProfile.city || location.city || "",
      state: sponsorProfile.state || location.state || "",
      region: sponsorProfile.region || location.region || "",
      zipCode: sponsorProfile.zipCode || location.zipCode || "",
      bio: sponsorProfile.bio || "",
      address: location.address || "",
      amount: String(sponsor.donation?.amount || ""),
      period: sponsor.donation?.period || "Monthly",
      remindByEmail: Boolean(sponsor.donation?.remindByEmail),
      paymentMethod: sponsor.paymentMethod || "zelle",
      childId:
        typeof sponsor.child === "string"
          ? sponsor.child
          : sponsor.child?._id || "",
      startDate: sponsor.startDate
        ? new Date(sponsor.startDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleSaveProfile = async () => {
    if (
      !sponsorId ||
      !formState.fullName.trim() ||
      !formState.email.trim() ||
      !formState.phone.trim() ||
      !formState.amount.trim()
    ) {
      setFormError(
        "Full name, email, phone, and donation amount are required.",
      );
      return;
    }

    const amount = Number(formState.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Please enter a valid donation amount.");
      return;
    }

    setIsSaving(true);
    setFormError("");

    try {
      const response = await apiRequest(
        "PATCH",
        `/sponsors/profile/${sponsorId}`,
        {
          profile: {
            fullName: formState.fullName.trim(),
            email: formState.email.trim(),
            phone: formState.phone.trim(),
            country: formState.country.trim(),
            city: formState.city.trim(),
            state: formState.state.trim(),
            region: formState.region.trim(),
            zipCode: formState.zipCode.trim(),
            bio: formState.bio.trim(),
          },
          location: {
            address: formState.address.trim(),
            country: formState.country.trim(),
            city: formState.city.trim(),
            state: formState.state.trim(),
            region: formState.region.trim(),
            zipCode: formState.zipCode.trim(),
          },
          donation: {
            amount,
            period: formState.period,
            remindByEmail: formState.remindByEmail,
          },
          paymentMethod: formState.paymentMethod,
          childId: formState.childId || undefined,
          startDate: formState.startDate,
        },
      );

      const result = await response.json();
      setProfile((current) =>
        current
          ? {
              ...current,
              sponsor: result.sponsor,
              profileStatus: result.profileStatus,
              profileCompletion: result.profileCompletion,
            }
          : current,
      );
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating sponsor profile:", error);
      setFormError("Unable to save the sponsor profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchiveProfile = async () => {
    if (!sponsorId) return;

    setIsArchiving(true);
    setArchiveError("");
    try {
      await apiRequest("DELETE", `/sponsors/profile/${sponsorId}`);
      await queryClient.invalidateQueries({
        queryKey: ["sponsors", "profiles", "all"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["children", "profiles"],
      });
      setIsArchiveDialogOpen(false);
      router.push("/dashboard/sponsorships");
    } catch (error) {
      console.error("Error archiving sponsor profile:", error);
      setArchiveError(
        "Unable to archive this sponsor profile. Please try again.",
      );
    } finally {
      setIsArchiving(false);
    }
  };

  const handleUnlinkChild = async () => {
    if (!unlinkTarget?.childId) return;

    setIsUnlinking(true);
    setUnlinkError("");

    try {
      await apiRequest(
        "PATCH",
        `/sponsors/child/${unlinkTarget.childId}/unlink`,
      );
      setProfile((current) =>
        current
          ? {
              ...current,
              children: current.children?.filter(
                (entry: any) =>
                  (entry.child?._id || entry.childId) !== unlinkTarget.childId,
              ),
            }
          : current,
      );
      await queryClient.invalidateQueries({
        queryKey: ["children", "profiles"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["sponsors", "profiles", "all"],
      });
      setUnlinkTarget(null);
    } catch (error) {
      console.error("Error unlinking child sponsor:", error);
      setUnlinkError("Unable to unlink this child. Please try again.");
    } finally {
      setIsUnlinking(false);
    }
  };

  const activeSponsoredChildren = sponsoredChildren.filter((entry: any) =>
    ["Active", "Pending"].includes(entry.status),
  );

  const openPaymentDialog = () => {
    setPaymentError("");
    setPaymentForm((current) => ({
      ...current,
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      transactionId: "",
      notes: "",
      allocationMode: "equal",
      selectedSponsorshipIds: [],
      customAmounts: {},
    }));
    setIsPaymentDialogOpen(true);
  };

  const togglePaymentChild = (sponsorshipId: string, checked: boolean) => {
    setPaymentForm((current) => ({
      ...current,
      selectedSponsorshipIds: checked
        ? [...current.selectedSponsorshipIds, sponsorshipId]
        : current.selectedSponsorshipIds.filter((id) => id !== sponsorshipId),
    }));
  };

  const getPaymentAllocations = () => {
    const selected = activeSponsoredChildren.filter((entry: any) =>
      paymentForm.selectedSponsorshipIds.includes(String(entry._id)),
    );
    const total = Number(paymentForm.amount);

    if (
      paymentForm.allocationMode === "equal" &&
      selected.length > 0 &&
      Number.isFinite(total)
    ) {
      const base = Math.floor(total / selected.length);
      const remainder = total % selected.length;
      return selected.map((entry: any, index) => ({
        sponsorshipId: String(entry._id),
        childId: String(entry.child?._id || entry.childId),
        childName: entry.child?.firstName || entry.child?.name || "Child",
        amount: base + (index < remainder ? 1 : 0),
      }));
    }

    return selected.map((entry: any) => ({
      sponsorshipId: String(entry._id),
      childId: String(entry.child?._id || entry.childId),
      childName: entry.child?.firstName || entry.child?.name || "Child",
      amount: Number(paymentForm.customAmounts[String(entry._id)] || 0),
    }));
  };

  const handleRecordPayment = async () => {
    const allocations = getPaymentAllocations();
    const total = Number(paymentForm.amount);
    const allocatedTotal = allocations.reduce(
      (sum, allocation) => sum + allocation.amount,
      0,
    );

    if (!Number.isInteger(total) || total <= 0) {
      setPaymentError("Enter a positive whole-number donation amount.");
      return;
    }
    if (allocations.length === 0) {
      setPaymentError("Select at least one child.");
      return;
    }
    if (allocatedTotal !== total) {
      setPaymentError("Allocated amounts must equal the donation total.");
      return;
    }

    setIsRecordingPayment(true);
    setPaymentError("");
    try {
      const response = await apiRequest(
        "POST",
        `/sponsors/${sponsorId}/payments/split`,
        {
          amount: total,
          currency: paymentForm.currency,
          date: paymentForm.date,
          method: paymentForm.method,
          transactionId: paymentForm.transactionId.trim() || undefined,
          notes: paymentForm.notes.trim(),
          allocationMode: paymentForm.allocationMode,
          allocations: allocations.map(
            ({ sponsorshipId, childId, amount }) => ({
              sponsorshipId,
              childId,
              amount,
            }),
          ),
        },
      );
      const result = await response.json();
      const createdPayments = result.payments || [];

      setProfile((current) =>
        current
          ? {
              ...current,
              children: current.children?.map((entry: any) => {
                const created = createdPayments.find(
                  (payment: any) =>
                    String(payment.sponsorshipId) === String(entry._id),
                );
                if (!created) return entry;
                return {
                  ...entry,
                  totalPaid:
                    Number(entry.totalPaid || 0) + Number(created.amount || 0),
                  lastPayment: paymentForm.date,
                  payments: [...(entry.payments || []), created.payment].filter(
                    Boolean,
                  ),
                };
              }),
              summary: current.summary
                ? {
                    ...current.summary,
                    totalPaid: Number(current.summary.totalPaid || 0) + total,
                  }
                : current.summary,
            }
          : current,
      );
      await queryClient.invalidateQueries({
        queryKey: ["children", "profiles"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["sponsors", "profiles", "all"],
      });
      setIsPaymentDialogOpen(false);
    } catch (error) {
      console.error("Error recording donation:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Unable to record donation.",
      );
    } finally {
      setIsRecordingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
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
          onClick={() => router.push("/dashboard/sponsorships")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} /> Back to sponsorships
        </Button>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Sponsor profile not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The sponsor record could not be loaded.
          </p>
        </Card>
      </div>
    );
  }

  const sponsorName =
    sponsorProfile.fullName || sponsor.sponsor?.name || "Sponsor";
  const email =
    sponsorProfile.email || sponsor.sponsor?.email || "Not provided";
  const phone =
    sponsorProfile.phone || sponsor.sponsor?.phone || "Not provided";
  const location = sponsor.location || {};
  const cityState =
    [location.city, location.state, location.country]
      .filter(Boolean)
      .join(", ") || "Not provided";
  const totalPledged = Number(profile?.summary?.totalPledged || 0);
  const totalPaid = Number(profile?.summary?.totalPaid || 0);

  return (
    <div className="p-8">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard/sponsorships")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2" size={16} /> Back to sponsorships
      </Button>

      <div className="mt-2 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <img
            src="/user.avif"
            alt={sponsorName}
            className="h-full min-h-80 w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                Sponsor profile
              </p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">
                {sponsorName}
              </h1>
              <p className="mt-2 text-sm text-foreground/70">{cityState}</p>
            </div>

            <div className="flex items-center gap-2 self-start">
              <Button
                variant="default"
                onClick={openPaymentDialog}
                disabled={activeSponsoredChildren.length === 0}
              >
                <Wallet className="mr-2 size-4" />
                Record donation
              </Button>
              <Button variant="secondary" onClick={openEditDialog}>
                Edit profile
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => setIsArchiveDialogOpen(true)}
              >
                <Archive className="mr-2 size-4" />
                Delete profile
              </Button>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(profile.profileStatus || sponsor.profileStatus)}`}
              >
                {profile.profileStatus || sponsor.profileStatus || "Incomplete"}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Email
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {email}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Phone
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {phone}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Children
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {sponsoredChildren.length}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                Payment method
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {sponsor.paymentMethod || "Not provided"}
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
            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Profile overview
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li>
                  <span className="font-medium text-foreground">Name:</span>{" "}
                  {sponsorName}
                </li>
                <li>
                  <span className="font-medium text-foreground">Email:</span>{" "}
                  {email}
                </li>
                <li>
                  <span className="font-medium text-foreground">Phone:</span>{" "}
                  {phone}
                </li>
                <li>
                  <span className="font-medium text-foreground">Location:</span>{" "}
                  {cityState}
                </li>
                <li>
                  <span className="font-medium text-foreground">Bio:</span>{" "}
                  {sponsorProfile.bio || "Not provided"}
                </li>
              </ul>
            </Card>

            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wallet className="size-4 text-emerald-600" />
                <h3 className="text-lg font-semibold text-foreground">
                  Sponsorship summary
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    Total pledged
                  </p>
                  <p className="mt-2 text-xl font-semibold text-foreground">
                    ${totalPledged}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    Total paid
                  </p>
                  <p className="mt-2 text-xl font-semibold text-foreground">
                    ${totalPaid}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "children" && (
          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Children this sponsor is supporting
              </h3>
            </div>

            {sponsoredChildren.length > 0 ? (
              <div className="space-y-3">
                {sponsoredChildren.map((entry: any, index: number) => {
                  const child = entry.child || {};
                  const childId = child._id || entry.childId;
                  const childName =
                    child.firstName || child.name || "Unnamed child";
                  const amount = Number(entry.child.monthlyNeed ?? 0);
                  const status = entry.status || "Active";
                  const childImg = child?.image?.url;

                  return (
                    <div
                      key={childId || `${childName}-${index}`}
                      onClick={() =>
                        childId && router.push(`/dashboard/children/${childId}`)
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          if (childId)
                            router.push(`/dashboard/children/${childId}`);
                        }
                      }}
                      className="w-full cursor-pointer rounded-lg border border-border bg-muted/40 p-4 text-left transition hover:bg-muted/60"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center justify-center gap-2 cursor-pointer">
                          <img
                            src={childImg}
                            alt={childName}
                            className="size-16 rounded-full object-cover"
                          />
                          <span>
                            {" "}
                            <p className="font-semibold text-accent">
                              {childName}
                            </p>
                            <p className="text-sm text-blue-600 underline">
                              {entry.frequency || "view profile"}
                            </p>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(status)}`}
                          >
                            {status}
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={(event) => {
                              event.stopPropagation();
                              setUnlinkError("");
                              setUnlinkTarget({ childId, childName });
                            }}
                          >
                            <Unlink className="mr-1 size-4" />
                            Unlink
                          </Button>
                        </div>
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
                            Paid
                          </p>
                          <p className="mt-2 font-semibold text-foreground">
                            ${Number(entry.totalPaid || 0)}
                          </p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p className="text-xs uppercase tracking-wide text-foreground/60">
                            Last payment
                          </p>
                          <p className="mt-2 font-semibold text-foreground">
                            {entry.lastPayment
                              ? new Date(entry.lastPayment).toLocaleDateString()
                              : "No payment"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-foreground/70">
                No children are currently assigned to this sponsor.
              </div>
            )}
          </Card>
        )}

        {activeTab === "payments" && (
          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Sponsorship payment history
              </h3>
            </div>

            {paymentHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-foreground/70">
                      <th className="pb-2 pr-4">Date</th>
                      <th className="pb-2 pr-4">Child</th>
                      <th className="pb-2 pr-4">Amount</th>
                      <th className="pb-2 pr-4">Method</th>
                      <th className="pb-2 pr-4">Status</th>
                      <th className="pb-2 pr-4">Transaction ID</th>
                      <th className="pb-2 pr-4">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment: any, index: number) => {
                      const child = payment.child || {};
                      return (
                        <tr
                          key={`${payment.transactionId || payment._id || index}`}
                          className="border-b border-border last:border-0"
                        >
                          <td className="py-3 pr-4">
                            {payment.date
                              ? new Date(payment.date).toLocaleDateString()
                              : "Not provided"}
                          </td>
                          <td className="py-3 pr-4">
                            {child.firstName ||
                              child.name ||
                              payment.childName ||
                              "—"}
                          </td>
                          <td className="py-3 pr-4">
                            ${Number(payment.amount || 0)}
                          </td>
                          <td className="py-3 pr-4">
                            {payment.method || payment.paymentMethod || "—"}
                          </td>
                          <td className="py-3 pr-4">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusBadgeClass(payment.status)}`}
                            >
                              {payment.status || "Completed"}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            {payment.transactionId || "—"}
                          </td>
                          <td className="py-3 pr-4">{payment.notes || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-background p-4 text-sm text-foreground/70">
                No payment history is available for this sponsor yet.
              </div>
            )}
          </Card>
        )}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit sponsor profile</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2 md:grid-cols-2">
            {[
              ["fullName", "Full name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["country", "Country"],
              ["city", "City"],
              ["state", "State"],
              ["region", "Region"],
              ["zipCode", "Zip code"],
            ].map(([field, label]) => (
              <div className="space-y-2" key={field}>
                <Label htmlFor={`editSponsor${field}`}>{label}</Label>
                <Input
                  id={`editSponsor${field}`}
                  type={field === "email" ? "email" : "text"}
                  value={formState[field as keyof typeof formState]}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      [field]: event.target.value,
                    }))
                  }
                />
              </div>
            ))}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="editSponsorAddress">Address</Label>
              <Input
                id="editSponsorAddress"
                value={formState.address}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    address: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSponsorPaymentMethod">Payment method</Label>
              <Select
                value={formState.paymentMethod}
                onValueChange={(value) =>
                  setFormState((current) => ({
                    ...current,
                    paymentMethod: value,
                  }))
                }
              >
                <SelectTrigger id="editSponsorPaymentMethod" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zelle">Zelle</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="ach">ACH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSponsorAmount">Amount</Label>
              <Input
                id="editSponsorAmount"
                type="number"
                value={formState.amount}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    amount: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSponsorPeriod">Period</Label>
              <Select
                value={formState.period}
                onValueChange={(value) =>
                  setFormState((current) => ({ ...current, period: value }))
                }
              >
                <SelectTrigger id="editSponsorPeriod" className="w-full">
                  <SelectValue />
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
              <Label htmlFor="editSponsorStartDate">Start date</Label>
              <Input
                id="editSponsorStartDate"
                type="date"
                value={formState.startDate}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    startDate: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="editSponsorChild">Link to child</Label>
              <Select
                value={formState.childId}
                onValueChange={(value) =>
                  setFormState((current) => ({ ...current, childId: value }))
                }
              >
                <SelectTrigger id="editSponsorChild" className="w-full">
                  <SelectValue placeholder="Select a child (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {childrenOptions.map((child) => (
                    <SelectItem key={child._id} value={child._id}>
                      {child.firstName} {child.secondName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <input
                id="editRemindByEmail"
                type="checkbox"
                checked={formState.remindByEmail}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    remindByEmail: event.target.checked,
                  }))
                }
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <Label htmlFor="editRemindByEmail">Send reminders by email</Label>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="editSponsorBio">Bio</Label>
              <textarea
                id="editSponsorBio"
                value={formState.bio}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    bio: event.target.value,
                  }))
                }
                className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            {formError ? (
              <p className="text-sm text-red-500 md:col-span-2">{formError}</p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save profile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPaymentDialogOpen}
        onOpenChange={(open) => {
          if (!isRecordingPayment) setIsPaymentDialogOpen(open);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record donation</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {paymentError ? (
              <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {paymentError}
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="donationAmount">Total amount</Label>
                <Input
                  id="donationAmount"
                  type="number"
                  min="1"
                  step="1"
                  value={paymentForm.amount}
                  onChange={(event) =>
                    setPaymentForm((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  placeholder="e.g. 150000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationCurrency">Currency</Label>
                <Input
                  id="donationCurrency"
                  value={paymentForm.currency}
                  onChange={(event) =>
                    setPaymentForm((current) => ({
                      ...current,
                      currency: event.target.value.toUpperCase(),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationDate">Date received</Label>
                <Input
                  id="donationDate"
                  type="date"
                  value={paymentForm.date}
                  onChange={(event) =>
                    setPaymentForm((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationMethod">Payment method</Label>
                <Select
                  value={paymentForm.method}
                  onValueChange={(value) =>
                    setPaymentForm((current) => ({ ...current, method: value }))
                  }
                >
                  <SelectTrigger id="donationMethod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Cash",
                      "Bank Transfer",
                      "Mobile Money",
                      "Check",
                      "Other",
                    ].map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="font-medium text-foreground">Split donation</p>
                <p className="text-sm text-muted-foreground">
                  Allocate this donation across linked children.
                </p>
              </div>
              <Switch
                checked={paymentForm.selectedSponsorshipIds.length > 0}
                onCheckedChange={(checked) => {
                  if (!checked) {
                    setPaymentForm((current) => ({
                      ...current,
                      selectedSponsorshipIds: [],
                    }));
                  } else if (activeSponsoredChildren.length === 1) {
                    setPaymentForm((current) => ({
                      ...current,
                      selectedSponsorshipIds: [
                        String(activeSponsoredChildren[0]._id),
                      ],
                    }));
                  }
                }}
                aria-label="Split donation across children"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Children receiving this donation
              </p>
              {activeSponsoredChildren.map((entry: any) => {
                const entryId = String(entry._id);
                const childName =
                  entry.child?.firstName ||
                  entry.child?.name ||
                  "Unnamed child";
                const selected =
                  paymentForm.selectedSponsorshipIds.includes(entryId);
                return (
                  <div
                    key={entryId}
                    className="rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selected}
                        onCheckedChange={(checked) =>
                          togglePaymentChild(entryId, checked === true)
                        }
                        aria-label={`Select ${childName}`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {childName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Paid so far:{" "}
                          {Number(entry.totalPaid || 0).toLocaleString()} UGX
                        </p>
                      </div>
                      {selected && paymentForm.allocationMode === "custom" ? (
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          className="w-36"
                          value={paymentForm.customAmounts[entryId] || ""}
                          onChange={(event) =>
                            setPaymentForm((current) => ({
                              ...current,
                              customAmounts: {
                                ...current.customAmounts,
                                [entryId]: event.target.value,
                              },
                            }))
                          }
                          placeholder="Amount"
                        />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant={
                  paymentForm.allocationMode === "equal" ? "default" : "outline"
                }
                onClick={() =>
                  setPaymentForm((current) => ({
                    ...current,
                    allocationMode: "equal",
                  }))
                }
              >
                Split equally
              </Button>
              <Button
                type="button"
                variant={
                  paymentForm.allocationMode === "custom"
                    ? "default"
                    : "outline"
                }
                onClick={() => {
                  const equalAmounts = getPaymentAllocations().reduce<
                    Record<string, string>
                  >(
                    (amounts, allocation) => ({
                      ...amounts,
                      [allocation.sponsorshipId]: String(allocation.amount),
                    }),
                    {},
                  );
                  setPaymentForm((current) => ({
                    ...current,
                    allocationMode: "custom",
                    customAmounts: {
                      ...equalAmounts,
                      ...current.customAmounts,
                    },
                  }));
                }}
              >
                Custom amounts
              </Button>
              <p className="text-sm text-muted-foreground">
                Allocated:{" "}
                {getPaymentAllocations()
                  .reduce((sum, allocation) => sum + allocation.amount, 0)
                  .toLocaleString()}{" "}
                / {Number(paymentForm.amount || 0).toLocaleString()}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="donationReference">Reference</Label>
                <Input
                  id="donationReference"
                  value={paymentForm.transactionId}
                  onChange={(event) =>
                    setPaymentForm((current) => ({
                      ...current,
                      transactionId: event.target.value,
                    }))
                  }
                  placeholder="Optional receipt/reference"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationNotes">Notes</Label>
                <Input
                  id="donationNotes"
                  value={paymentForm.notes}
                  onChange={(event) =>
                    setPaymentForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  placeholder="Optional notes"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentDialogOpen(false)}
              disabled={isRecordingPayment}
            >
              Cancel
            </Button>
            <Button onClick={handleRecordPayment} disabled={isRecordingPayment}>
              {isRecordingPayment ? "Recording..." : "Record donation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(unlinkTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setUnlinkTarget(null);
            setUnlinkError("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Unlink {unlinkTarget?.childName}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the child&apos;s active sponsorship and make the
              child available again. Sponsorship and payment history will be
              preserved.
            </AlertDialogDescription>
            {unlinkError ? (
              <p className="text-sm text-destructive">{unlinkError}</p>
            ) : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUnlinking}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleUnlinkChild();
              }}
              disabled={isUnlinking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isUnlinking ? "Unlinking..." : "Unlink child"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isArchiveDialogOpen}
        onOpenChange={setIsArchiveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete sponsor profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This will release the sponsor&apos;s active children and hide the
              profile from active lists. Sponsorship and payment history will be
              preserved.
            </AlertDialogDescription>
            {archiveError ? (
              <p className="text-sm text-destructive">{archiveError}</p>
            ) : null}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isArchiving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleArchiveProfile();
              }}
              disabled={isArchiving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isArchiving ? "Deleting..." : "Delete profile"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
