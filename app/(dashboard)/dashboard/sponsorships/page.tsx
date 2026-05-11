"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  Users,
  DollarSign,
  ArrowUpRight,
  Loader,
} from "lucide-react";
import {
  mockSponsorshipRecords,
  PaymentRecord,
  SponsorshipRecord,
} from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";
import { set } from "zod";
import { apiRequest } from "@/lib/query-client";

type SponsorshipStatus = SponsorshipRecord["status"];
type PaymentStatus = PaymentRecord["status"];

type PaymentForm = {
  amount: string;
  method: string;
  txnId: string;
  note: string;
};

const initialPayment: PaymentForm = {
  amount: "",
  method: "Select method",
  txnId: "",
  note: "",
};

function getStatusClasses(status: SponsorshipStatus | string) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-800";
    case "Pending":
      return "bg-amber-100 text-amber-800";
    case "Paused":
      return "bg-slate-100 text-slate-800";
    case "Completed":
      return "bg-sky-100 text-sky-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export default function SponsorshipsDashboard() {
  const { data: sponsorships, isLoading } = useQuery<SponsorshipRecord[]>({
    queryKey: ["sponsors", "sponsorship", "records"],
  });

  const [records, setRecords] = useState<SponsorshipRecord[]>(
    mockSponsorshipRecords,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SponsorshipStatus>(
    "all",
  );
  const [selectedRecord, setSelectedRecord] =
    useState<SponsorshipRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentForm, setPaymentForm] = useState(initialPayment);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = [
        record.child?.firstName,
        record.donor.name,
        record.donor.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  const totalActive = records.filter(
    (record) => record.status === "Active",
  ).length;

  const totalMonthly = records.reduce(
    (sum, record) => sum + (record.donor?.donation?.amount || 0),
    0,
  );
  const totalPaid = records.reduce(
    (sum, record) =>
      sum +
      (record?.payments?.length > 0
        ? record.payments.reduce(
            (paymentSum, payment) => paymentSum + (payment.amount || 0),
            0,
          )
        : 0),
    0,
  );

  const openDetail = (record: SponsorshipRecord) => {
    setSelectedRecord(record);
    setPaymentForm(initialPayment);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (status: SponsorshipStatus) => {
    if (!selectedRecord) return;
    const updated: SponsorshipRecord = { ...selectedRecord, status };
    setSelectedRecord(updated);
    setRecords((current) =>
      current.map((record) => (record._id === updated._id ? updated : record)),
    );
  };

  const handleAddPayment = async () => {
    if (!selectedRecord || !paymentForm.amount.trim()) {
      return;
    }

    setLoading(true);
    try {
      const amountValue = Number(paymentForm.amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        return;
      }

      const payLoad: any = {
        date: new Date().toISOString().slice(0, 10),
        amount: amountValue,
        method: paymentForm.method,
        status: "Completed" as PaymentStatus,
        transactionId: `REC-${Date.now()}`,
        note: paymentForm.note.trim(),
      };
      // const payLoad: any = {
      //   id: selectedRecord._id,
      //   date: new Date().toISOString().slice(0, 10),
      //   amount: amountValue,
      //   method: paymentForm.method,
      //   status: "Completed" as PaymentStatus,
      //   transactionId: `REC-${Date.now()}`,
      //   note: paymentForm.note.trim(),
      // };

      const res = await apiRequest(
        "POST",
        `/sponsors/sponsorship/${selectedRecord._id}/new/payment`,
        payLoad,
      );

      if (!res.ok) {
        throw new Error("Failed to add payment");
      }

      const newPayment: PaymentRecord = {
        date: payLoad.date,
        amount: payLoad.amount,
        method: payLoad.method,
        status: payLoad.status,
        transactionId: payLoad.transactionId,
        note: payLoad.note,
      };

      const updatedRecord: SponsorshipRecord = {
        ...selectedRecord,
        lastPayment: newPayment.date,
        payments: [newPayment, ...selectedRecord.payments],
        status:
          selectedRecord.status === "Pending"
            ? "Active"
            : selectedRecord.status,
      };

      setSelectedRecord(updatedRecord);
      setRecords((current) =>
        current.map((record) =>
          record._id === updatedRecord._id ? updatedRecord : record,
        ),
      );
      setPaymentForm(initialPayment);
    } catch (error) {
      console.error("Error adding payment:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = () => {
    const headers = [
      "Child",
      "Donor",
      "Plan",
      "MonthlyAmount",
      "Status",
      "TotalPaid",
      "LastPayment",
    ];
    const rows = records.map((record) => [
      record.child?.firstName,
      record.donor.name,
      record.plan,
      record.monthlyAmount.toString(),
      record.status,
      record.totalPaid.toString(),
      record.lastPayment,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "sponsorship-records.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (sponsorships) {
      setRecords(sponsorships || []);
    }
  }, [sponsorships]);

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Dashboard / Sponsorships
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            Sponsorship Tracking
          </h1>
          <p className="max-w-2xl text-foreground/70 mt-2">
            Track donors, payment history, and active sponsorship plans in one
            place.
          </p>
        </div>
        <Button onClick={downloadCsv} className="w-full md:w-auto">
          <Download className="mr-2" size={16} /> Export CSV
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {isLoading ? (
          <>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <Skeleton className="size-6 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <Skeleton className="size-6 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <Skeleton className="size-6 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <Users className="size-6 text-primary" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    Active sponsors
                  </p>
                  <p className="text-3xl font-semibold text-foreground">
                    {totalActive}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <DollarSign className="size-6 text-emerald-600" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    Monthly pledges
                  </p>
                  <p className="text-3xl font-semibold text-foreground">
                    ${totalMonthly}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4">
                <ArrowUpRight className="size-6 text-sky-600" />
                <div>
                  <p className="text-sm uppercase text-muted-foreground">
                    Total paid
                  </p>
                  <p className="text-3xl font-semibold text-foreground">
                    ${totalPaid}
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      {!isLoading && (
        <Card className="p-6 mb-8 bg-card border-border">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="search">Search sponsors</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  placeholder="Search by child or donor"
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statusFilter">Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) =>
                    setStatusFilter(value as "all" | SponsorshipStatus)
                  }
                >
                  <SelectTrigger id="statusFilter">
                    <SelectValue>{statusFilter}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Records</Label>
                <p className="text-sm text-foreground/70">
                  {filteredRecords.length} sponsorship records
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden bg-card border-border">
        {isLoading ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sponsorship Type</TableHead>
                <TableHead>Donation Amount</TableHead>
                <TableHead>Total Donations</TableHead>
                <TableHead>Last payment</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-16 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-primary">Child</TableHead>
                <TableHead className="font-bold text-primary">Donor</TableHead>
                <TableHead className="font-bold text-primary">Status</TableHead>
                <TableHead className="font-bold text-primary">
                  Sponsorship Type
                </TableHead>
                <TableHead className="font-bold text-primary">
                  Donation Amount
                </TableHead>
                <TableHead className="font-bold text-primary">
                  Total Donations
                </TableHead>
                <TableHead className="font-bold text-primary">
                  Last payment
                </TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <TableRow key={record._id || index}>
                  <TableCell>
                    {record.child?.firstName + " " + record.child?.secondName}
                  </TableCell>
                  <TableCell>{record.donor?.sponsor?.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClasses(record.status)}`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell>{record.donor?.donation?.period || 0}</TableCell>
                  <TableCell>${record.donor?.donation?.amount || 0}</TableCell>
                  <TableCell>
                    $
                    {record.payments
                      .map((p) => p.amount)
                      .reduce((sum, amount) => sum + amount, 0) || 0}
                  </TableCell>
                  <TableCell>
                    {record.payments.length > 0
                      ? new Date(
                          record.payments[record.payments.length - 1].date,
                        ).toLocaleDateString()
                      : "no payment"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openDetail(record)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-175 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sponsorship details</DialogTitle>
          </DialogHeader>
          {selectedRecord ? (
            <div className="space-y-6">
              <div className="grid gap-4 lg:grid-cols-1">
                <Card className="p-6 relative   bg-card border-border">
                  <div className="space-y-4">
                    <div className="absolute top-5 right-3">
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Status
                      </p>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(selectedRecord.status)}`}
                      >
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Child
                      </p>
                      <h2 className="text-xl font-semibold text-foreground">
                        {selectedRecord.child?.firstName}
                      </h2>
                      <p className="text-sm text-foreground/70">
                        {selectedRecord.plan}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Donor
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {selectedRecord.donor?.sponsor?.name}
                      </p>
                      <a
                        href={`mailto:${selectedRecord.donor?.sponsor?.email}`}
                        className="text-sm text-accent underline"
                      >
                        {selectedRecord.donor?.sponsor?.email}
                      </a>{" "}
                      - {selectedRecord.donor?.sponsor?.phone}
                      <p className="text-sm text-foreground/70">
                        {selectedRecord.donor?.phone}
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-slate-100 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {selectedRecord.donor?.donation?.period}
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                          ${selectedRecord?.donor?.donation?.amount || 0}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-100 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          All time Donations
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                          $
                          {selectedRecord.payments
                            .map((p) => p.amount)
                            .reduce((sum, amount) => sum + amount, 0)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label htmlFor="recordStatus">Update status</Label>
                        <Select
                          value={selectedRecord.status}
                          onValueChange={handleUpdateStatus}
                        >
                          <SelectTrigger id="recordStatus" className="w-full">
                            <SelectValue>{selectedRecord.status}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Paused">Paused</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid gap-4 lg:grid-cols-1">
                <Card className="p-6 bg-card border-border">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                          Payment history
                        </p>
                        <p className="text-foreground/70">
                          Latest contributions for this sponsorship.
                        </p>
                      </div>
                      <Badge className="bg-slate-100 text-slate-800">
                        {selectedRecord.payments.length} entries
                      </Badge>
                    </div>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Transaction ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedRecord.payments.map((payment, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {new Date(payment.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>${payment.amount}</TableCell>
                              <TableCell>{payment.method}</TableCell>
                              <TableCell>{payment.status}</TableCell>
                              <TableCell>{payment.transactionId}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-card border-border">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                        Record a payment
                      </p>
                      <p className="text-foreground/70">
                        Add a new donation or sponsor contribution.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentAmount">Amount</Label>
                        <Input
                          id="paymentAmount"
                          type="number"
                          value={paymentForm.amount}
                          placeholder="100"
                          onChange={(event) =>
                            setPaymentForm({
                              ...paymentForm,
                              amount: event.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Method</Label>
                        <Select
                          value={paymentForm.method}
                          onValueChange={(value) =>
                            setPaymentForm({ ...paymentForm, method: value })
                          }
                        >
                          <SelectTrigger id="paymentMethod" className="w-full ">
                            <SelectValue>{paymentForm.method}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Zelle">Zelle</SelectItem>
                            <SelectItem value="Stripe">Stripe</SelectItem>
                            <SelectItem value="Check">Check</SelectItem>
                            <SelectItem value="PayPal">PayPal</SelectItem>
                            <SelectItem value="ACH">ACH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentTxnId">Transaction ID</Label>
                        <Input
                          id="paymentTxnId"
                          type="text"
                          value={paymentForm.txnId}
                          placeholder="transaction ID / receipt No. from the payment method used"
                          onChange={(event) =>
                            setPaymentForm({
                              ...paymentForm,
                              txnId: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentNote">Note</Label>
                        <Input
                          id="paymentNote"
                          value={paymentForm.note}
                          placeholder="Gift update or memo"
                          onChange={(event) =>
                            setPaymentForm({
                              ...paymentForm,
                              note: event.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={handleAddPayment}
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            Adding payment...{" "}
                            <Loader className="animate-spin" />
                          </>
                        ) : (
                          "Add payment"
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-foreground/70">
              No sponsorship record selected.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
