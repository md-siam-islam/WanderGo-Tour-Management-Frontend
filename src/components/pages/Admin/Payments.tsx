import { useState } from "react";
import SEO from "@/components/shared/SEO";
import { useGetAllPaymentsQuery } from "@/redux/features/payment/payment.api";
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  Eye,
  RefreshCw,
  User,
  MapPin,
  TrendingUp,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const { data: paymentsData, isLoading, refetch } = useGetAllPaymentsQuery(undefined);

  const allPayments = (paymentsData?.data || []) as any[];

  // Filter payments
  const filteredPayments = allPayments.filter((p) => {
    const matchesStatus =
      statusFilter === "ALL" || p.status?.toUpperCase() === statusFilter;

    const tranId = p.transactionId?.toLowerCase() || "";
    const userName = p.booking?.user?.name?.toLowerCase() || "";
    const userEmail = p.booking?.user?.email?.toLowerCase() || "";
    const tourTitle = p.booking?.tour?.title?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      tranId.includes(term) ||
      userName.includes(term) ||
      userEmail.includes(term) ||
      tourTitle.includes(term);

    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const totalVolume = allPayments
    .filter((p) => p.status === "PAID")
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const paidCount = allPayments.filter((p) => p.status === "PAID").length;
  const pendingCount = allPayments.filter((p) => p.status === "UNPAID").length;
  const failedCount = allPayments.filter(
    (p) => p.status === "FAILED" || p.status === "CANCEL"
  ).length;

  const handleCopy = (tranId: string) => {
    navigator.clipboard.writeText(tranId);
    setCopiedId(tranId);
    toast.success("Transaction ID copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PAID":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1 font-bold">
            <CheckCircle2 className="size-3" /> PAID
          </Badge>
        );
      case "UNPAID":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1 font-bold">
            <Clock className="size-3" /> UNPAID
          </Badge>
        );
      case "CANCEL":
        return (
          <Badge className="bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30 gap-1 font-bold">
            <XCircle className="size-3" /> CANCELLED
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 gap-1 font-bold">
            <AlertTriangle className="size-3" /> FAILED
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans">
      <SEO
        title="Payment Transactions | WanderGo Admin"
        description="Track gateway payment transactions, reconcile deposits, and verify traveler receipts."
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider mb-2">
            <CreditCard className="size-3.5" />
            <span>SSLCommerz Secure Payments</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground font-nunito tracking-tight">
            Financial Transactions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track gateway payment transactions, reconcile deposits, and verify traveler receipts.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="rounded-xl font-semibold gap-2 border-border/80"
        >
          <RefreshCw className="size-4" />
          <span>Refresh Records</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
            <TrendingUp className="size-3.5" /> Total Paid Volume
          </p>
          <p className="text-3xl font-black text-foreground font-nunito">
            ৳{totalVolume.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground">Successful settlements</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" /> Successful Transactions
          </p>
          <p className="text-3xl font-black text-emerald-600 font-nunito">{paidCount}</p>
          <p className="text-[11px] text-muted-foreground">Verified by gateway</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1.5">
            <Clock className="size-3.5" /> Unpaid Sessions
          </p>
          <p className="text-3xl font-black text-amber-600 font-nunito">{pendingCount}</p>
          <p className="text-[11px] text-muted-foreground">Initiated or in progress</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-red-600 tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="size-3.5" /> Failed / Cancelled
          </p>
          <p className="text-3xl font-black text-red-600 font-nunito">{failedCount}</p>
          <p className="text-[11px] text-muted-foreground">Declined or expired</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by transaction ID, traveler, tour..."
            className="pl-9 rounded-xl h-10 text-sm border-border/80"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "PAID", "UNPAID", "CANCEL", "FAILED"].map((status) => (
            <Button
              key={status}
              size="sm"
              variant={statusFilter === status ? "default" : "outline"}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl text-xs font-bold h-8 px-3 shrink-0 ${
                statusFilter === status
                  ? "bg-[#EF1A53] hover:bg-[#d81548] text-white"
                  : "border-border/70"
              }`}
            >
              {status === "ALL" ? "All Payments" : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card rounded-3xl border border-border/80 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border/60 text-xs font-bold uppercase text-muted-foreground tracking-wider">
              <tr>
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Payer</th>
                <th className="py-4 px-6">Tour Reservation</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="size-6 animate-spin text-[#EF1A53]" />
                      <span>Loading payment transactions...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    <p className="text-base font-semibold">No payment transactions found</p>
                    <p className="text-xs">Try adjusting your search criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p._id} className="hover:bg-muted/30 transition-colors">
                    {/* Transaction ID */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-foreground">
                          {p.transactionId}
                        </span>
                        <button
                          onClick={() => handleCopy(p.transactionId)}
                          className="text-muted-foreground hover:text-[#EF1A53] p-1 rounded-md"
                          title="Copy Transaction ID"
                        >
                          {copiedId === p.transactionId ? (
                            <Check className="size-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] text-muted-foreground">SSLCommerz Gateway</span>
                    </td>

                    {/* Payer */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5 max-w-[170px] truncate">
                        <div className="size-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {p.booking?.user?.name ? p.booking.user.name.charAt(0).toUpperCase() : <User className="size-3.5" />}
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-foreground text-xs truncate">
                            {p.booking?.user?.name || "Customer"}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {p.booking?.user?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Tour */}
                    <td className="py-4 px-6">
                      <div className="max-w-[200px] truncate">
                        <p className="font-semibold text-foreground text-xs truncate">
                          {p.booking?.tour?.title || "Tour Booking"}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          Guests: {p.booking?.guestCount || 1} Travelers
                        </p>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6">
                      <span className="font-extrabold text-foreground font-nunito text-base">
                        ৳{Number(p.amount || 0).toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">{getStatusBadge(p.status)}</td>

                    {/* Date */}
                    <td className="py-4 px-6 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(p.createdAt || Date.now()).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPayment(p)}
                        className="rounded-xl h-8 px-2.5 text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Eye className="size-3.5" />
                        <span>Inspect</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Inspector Modal */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-lg rounded-3xl p-6">
            <DialogHeader className="border-b border-border/60 pb-4">
              <DialogTitle className="text-xl font-bold font-nunito flex items-center justify-between">
                <span>Transaction Breakdown</span>
                {getStatusBadge(selectedPayment.status)}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Transaction ID:{" "}
                <span className="font-mono font-bold text-foreground">
                  {selectedPayment.transactionId}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                    Amount Paid
                  </p>
                  <p className="text-2xl font-black text-foreground font-nunito mt-1">
                    ৳{Number(selectedPayment.amount || 0).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Currency: BDT</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                    Payment Gateway
                  </p>
                  <p className="text-sm font-bold text-foreground mt-1 flex items-center gap-1">
                    <ShieldCheck className="size-4 text-blue-600" /> SSLCommerz V4
                  </p>
                  <p className="text-[11px] text-muted-foreground">Encrypted Settlement</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer Name:</span>
                  <span className="font-bold text-foreground">
                    {selectedPayment.booking?.user?.name || "Customer"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-foreground">
                    {selectedPayment.booking?.user?.email}
                  </span>
                </div>
                {selectedPayment.booking?.user?.phone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-mono text-foreground">
                      {selectedPayment.booking.user.phone}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border/60 pt-2">
                  <span className="text-muted-foreground">Tour Package:</span>
                  <span className="font-bold text-foreground line-clamp-1 max-w-[200px]">
                    {selectedPayment.booking?.tour?.title || "Custom Tour"}
                  </span>
                </div>
              </div>

              {/* Gateway Payload info if available */}
              {selectedPayment.paymentGatewayData && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                    Gateway Metadata
                  </p>
                  <pre className="p-3 rounded-xl bg-muted/60 border border-border/60 text-[11px] font-mono text-muted-foreground overflow-x-auto max-h-36">
                    {JSON.stringify(selectedPayment.paymentGatewayData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
