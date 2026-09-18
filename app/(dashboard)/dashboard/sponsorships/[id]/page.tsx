"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const params = useParams();
  const sponsorId = typeof params?.id === "string" ? params.id : "";

  const [profile, setProfile] = useState<SponsorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "children" | "payments">("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
      childId: typeof sponsor.child === "string" ? sponsor.child : sponsor.child?._id || "",
      startDate: sponsor.startDate ? new Date(sponsor.startDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    setFormError("");
    setIsEditOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!sponsorId || !formState.fullName.trim() || !formState.email.trim() || !formState.phone.trim() || !formState.amount.trim()) {
      setFormError("Full name, email, phone, and donation amount are required.");
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
      const response = await apiRequest("PATCH", `/sponsors/profile/${sponsorId}`, {
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
      });

      const result = await response.json();
      setProfile((current) => current ? {
        ...current,
        sponsor: result.sponsor,
        profileStatus: result.profileStatus,
        profileCompletion: result.profileCompletion,
      } : current);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating sponsor profile:", error);
      setFormError("Unable to save the sponsor profile. Please try again.");
    } finally {
      setIsSaving(false);
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
              <Button variant="outline" onClick={() => router.push("/dashboard/sponsorships")} className="mb-6">
          <ArrowLeft className="mr-2" size={16} /> Back to sponsorships
        </Button>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Sponsor profile not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">The sponsor record could not be loaded.</p>
        </Card>
      </div>
    );
  }

  const sponsorName = sponsorProfile.fullName || sponsor.sponsor?.name || "Sponsor";
  const email = sponsorProfile.email || sponsor.sponsor?.email || "Not provided";
  const phone = sponsorProfile.phone || sponsor.sponsor?.phone || "Not provided";
  const location = sponsor.location || {};
  const cityState = [location.city, location.state, location.country].filter(Boolean).join(", ") || "Not provided";
  const totalPledged = Number(profile?.summary?.totalPledged || 0);
  const totalPaid = Number(profile?.summary?.totalPaid || 0);

  return (
    <div className="p-8">
              <Button variant="outline" onClick={() => router.push("/dashboard/sponsorships")} className="mb-6">
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
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Sponsor profile</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">{sponsorName}</h1>
              <p className="mt-2 text-sm text-foreground/70">{cityState}</p>
            </div>

            <div className="flex items-center gap-2 self-start">
              <Button variant="secondary" onClick={openEditDialog}>
                Edit profile
              </Button>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(profile.profileStatus || sponsor.profileStatus)}`}>
                {profile.profileStatus || sponsor.profileStatus || "Incomplete"}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">Email</p>
              <p className="mt-1 text-base font-semibold text-foreground">{email}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">Phone</p>
              <p className="mt-1 text-base font-semibold text-foreground">{phone}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">Children</p>
              <p className="mt-1 text-base font-semibold text-foreground">{sponsoredChildren.length}</p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs uppercase tracking-wide text-foreground/60">Payment method</p>
              <p className="mt-1 text-base font-semibold text-foreground">{sponsor.paymentMethod || "Not provided"}</p>
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
                <h3 className="text-lg font-semibold text-foreground">Profile overview</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li><span className="font-medium text-foreground">Name:</span> {sponsorName}</li>
                <li><span className="font-medium text-foreground">Email:</span> {email}</li>
                <li><span className="font-medium text-foreground">Phone:</span> {phone}</li>
                <li><span className="font-medium text-foreground">Location:</span> {cityState}</li>
                <li><span className="font-medium text-foreground">Bio:</span> {sponsorProfile.bio || "Not provided"}</li>
              </ul>
            </Card>

            <Card className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <Wallet className="size-4 text-emerald-600" />
                <h3 className="text-lg font-semibold text-foreground">Sponsorship summary</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">Total pledged</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">${totalPledged}</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs uppercase tracking-wide text-foreground/60">Total paid</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">${totalPaid}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "children" && (
          <Card className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Children this sponsor is supporting</h3>
            </div>

            {sponsoredChildren.length > 0 ? (
              <div className="space-y-3">
                {sponsoredChildren.map((entry: any, index: number) => {
                  const child = entry.child || {};
                  const childId = child._id || entry.childId;
                  const childName = child.firstName || child.name || "Unnamed child";
                  const amount = Number(entry.child.monthlyNeed ?? 0);
                  const status = entry.status || "Active";
                  const childImg = child?.image?.url

                  return (
                    <button
                      key={childId || `${childName}-${index}`}
                      type="button"
                      onClick={() => childId && router.push(`/dashboard/children/${childId}`)}
                      className="w-full rounded-lg border border-border bg-muted/40 p-4 text-left transition hover:bg-muted/60"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        
                        <div className="flex items-center justify-center gap-2 cursor-pointer">
                          <img src={childImg} alt={childName} className="size-16 rounded-full object-cover" />
                         <span> <p className="font-semibold text-accent">{childName}</p>
                          <p className="text-sm text-blue-600 underline">{entry.frequency || "view profile"}</p></span>
                        </div>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(status)}`}>
                          {status}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-md bg-background p-3">
                          <p className="text-xs uppercase tracking-wide text-foreground/60">Amount</p>
                          <p className="mt-2 font-semibold text-foreground">${amount}</p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p className="text-xs uppercase tracking-wide text-foreground/60">Paid</p>
                          <p className="mt-2 font-semibold text-foreground">${Number(entry.totalPaid || 0)}</p>
                        </div>
                        <div className="rounded-md bg-background p-3">
                          <p className="text-xs uppercase tracking-wide text-foreground/60">Last payment</p>
                          <p className="mt-2 font-semibold text-foreground">{entry.lastPayment ? new Date(entry.lastPayment).toLocaleDateString() : "No payment"}</p>
                        </div>
                      </div>
                    </button>
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
              <h3 className="text-lg font-semibold text-foreground">Sponsorship payment history</h3>
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
                        <tr key={`${payment.transactionId || payment._id || index}`} className="border-b border-border last:border-0">
                          <td className="py-3 pr-4">{payment.date ? new Date(payment.date).toLocaleDateString() : "Not provided"}</td>
                          <td className="py-3 pr-4">{child.firstName || child.name || payment.childName || "—"}</td>
                          <td className="py-3 pr-4">${Number(payment.amount || 0)}</td>
                          <td className="py-3 pr-4">{payment.method || payment.paymentMethod || "—"}</td>
                          <td className="py-3 pr-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusBadgeClass(payment.status)}`}>
                              {payment.status || "Completed"}
                            </span>
                          </td>
                          <td className="py-3 pr-4">{payment.transactionId || "—"}</td>
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
                onChange={(event) => setFormState((current) => ({ ...current, address: event.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSponsorPaymentMethod">Payment method</Label>
              <Select
                value={formState.paymentMethod}
                onValueChange={(value) => setFormState((current) => ({ ...current, paymentMethod: value }))}
              >
                <SelectTrigger id="editSponsorPaymentMethod" className="w-full"><SelectValue /></SelectTrigger>
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
                onChange={(event) => setFormState((current) => ({ ...current, amount: event.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editSponsorPeriod">Period</Label>
              <Select
                value={formState.period}
                onValueChange={(value) => setFormState((current) => ({ ...current, period: value }))}
              >
                <SelectTrigger id="editSponsorPeriod" className="w-full"><SelectValue /></SelectTrigger>
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
                onChange={(event) => setFormState((current) => ({ ...current, startDate: event.target.value }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="editSponsorChild">Link to child</Label>
              <Select
                value={formState.childId}
                onValueChange={(value) => setFormState((current) => ({ ...current, childId: value }))}
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
                onChange={(event) => setFormState((current) => ({ ...current, remindByEmail: event.target.checked }))}
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
                  setFormState((current) => ({ ...current, bio: event.target.value }))
                }
                className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            {formError ? (
              <p className="text-sm text-red-500 md:col-span-2">{formError}</p>
            ) : null}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save profile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
