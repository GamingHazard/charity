"use client";

import { useMemo, useState } from "react";
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
import { Download, Users, DollarSign, ArrowUpRight } from "lucide-react";
import { mockSponsorshipRecords, SponsorshipRecord } from "@/lib/mock-data";

const initialPayment = {
  amount: "",
  method: "Bank Transfer",
  note: "",
};

function getStatusClasses(status: string) {
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
  const [records, setRecords] = useState<SponsorshipRecord[]>(
    mockSponsorshipRecords,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] =
    useState<SponsorshipRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState(initialPayment);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch = [
        record.childName,
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
    (sum, record) => sum + record.monthlyAmount,
    0,
  );
  const totalPaid = records.reduce((sum, record) => sum + record.totalPaid, 0);

  const openDetail = (record: SponsorshipRecord) => {
    setSelectedRecord(record);
    setPaymentForm(initialPayment);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (status: string) => {
    if (!selectedRecord) return;
    const updated = { ...selectedRecord, status };
    setSelectedRecord(updated);
    setRecords((current) =>
      current.map((record) => (record._id === updated._id ? updated : record)),
    );
  };

  const handleAddPayment = () => {
    if (!selectedRecord || !paymentForm.amount.trim()) {
      return;
    }

    const amountValue = Number(paymentForm.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    const newPayment = {
      id: `payment-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      amount: amountValue,
      method: paymentForm.method,
      status: "Completed",
      receiptId: `REC-${Date.now()}`,
      note: paymentForm.note.trim(),
    };

    const updatedRecord = {
      ...selectedRecord,
      totalPaid: selectedRecord.totalPaid + amountValue,
      lastPayment: newPayment.date,
      payments: [newPayment, ...selectedRecord.payments],
      status:
        selectedRecord.status === "Pending" ? "Active" : selectedRecord.status,
    };

    setSelectedRecord(updatedRecord);
    setRecords((current) =>
      current.map((record) =>
        record._id === updatedRecord._id ? updatedRecord : record,
      ),
    );
    setPaymentForm(initialPayment);
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
      record.childName,
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
      </div>

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
                onValueChange={(value) => setStatusFilter(value)}
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

      <Card className="overflow-hidden bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Monthly</TableHead>
              <TableHead>Last payment</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.childName}</TableCell>
                <TableCell>{record.donor.name}</TableCell>
                <TableCell>{record.plan}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClasses(record.status)}`}
                  >
                    {record.status}
                  </span>
                </TableCell>
                <TableCell>${record.monthlyAmount}</TableCell>
                <TableCell>{record.lastPayment}</TableCell>
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
                        {selectedRecord.childName}
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
                        {selectedRecord.donor.name}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {selectedRecord.donor.email}
                      </p>
                      <p className="text-sm text-foreground/70">
                        {selectedRecord.donor.phone}
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-slate-100 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Monthly
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                          ${selectedRecord.monthlyAmount}
                        </p>
                      </div>
                      <div className="rounded-lg bg-slate-100 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Paid
                        </p>
                        <p className="text-xl font-semibold text-foreground">
                          ${selectedRecord.totalPaid}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label htmlFor="recordStatus">Update status</Label>
                        <Select
                          value={selectedRecord.status}
                          onValueChange={handleUpdateStatus}
                          cl
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
                            <TableHead>Receipt</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedRecord.payments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>${payment.amount}</TableCell>
                              <TableCell>{payment.method}</TableCell>
                              <TableCell>{payment.status}</TableCell>
                              <TableCell>{payment.receiptId}</TableCell>
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
                          <SelectTrigger id="paymentMethod" className="w-full">
                            <SelectValue>{paymentForm.method}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bank Transfer">
                              Bank Transfer
                            </SelectItem>
                            <SelectItem value="Mobile Money">
                              Mobile Money
                            </SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
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
                      <Button onClick={handleAddPayment} className="w-full">
                        Add payment
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
