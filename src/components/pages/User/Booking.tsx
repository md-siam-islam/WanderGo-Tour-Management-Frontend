import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Users,
  MapPin,
  CreditCard,
  AlertCircle,
  ExternalLink,
  Ban,
  CheckCircle2,
  XCircle,
  Clock3,
  Compass,
  Search,
  TrendingUp,
  Wallet,
  Luggage,
  Sparkles,
  ArrowUpDown,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Tag,
  Loader2,
} from "lucide-react";
import {
  useGetMyBookingsQuery,
  useCancelBookingMutation,
  useInitPaymentMutation,
} from "@/redux/features/Booking/booking.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface IBookingItem {
  _id: string;
  tour?: {
    _id: string;
    title: string;
    location: string;
    images?: string[];
    costFrom: number;
    startDate?: string;
    endDate?: string;
  };
  guestCount: number;
  totalAmount?: number;
  originalAmount?: number;
  discountAmount?: number;
  couponCode?: string;
  status: "PENDING" | "COMPLETE" | "CANCEL" | "FAILED" | string;
  payment?: {
    _id: string;
    amount: number;
    status: "PAID" | "UNPAID" | "FAILED" | string;
    transactionId?: string;
  };
  createdAt: string;
}

const Booking = () => {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showCharts, setShowCharts] = useState<boolean>(true);
  const [chartTab, setChartTab] = useState<"spending" | "status" | "destinations">("spending");

  const { data, isLoading, refetch } = useGetMyBookingsQuery(undefined);
  const { data: userData } = useUserInfoQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [initPayment, { isLoading: isPaying }] = useInitPaymentMutation();

  const user = userData?.data;
  const bookings: IBookingItem[] = data?.data || [];

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this tour booking?")) return;
    try {
      const res = await cancelBooking(bookingId).unwrap();
      if (res?.success) {
        toast.success("Booking cancelled successfully");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel booking");
    }
  };

  const handlePay = async (bookingId: string) => {
    try {
      const res = await initPayment(bookingId).unwrap();
      const paymentUrl = res?.data?.paymentUrl;
      if (paymentUrl && (paymentUrl.startsWith("http://") || paymentUrl.startsWith("https://"))) {
        toast.success("Redirecting to secure payment gateway...");
        window.location.href = paymentUrl;
      } else {
        toast.error(
          res?.message ||
          "Payment initialization failed: Valid payment URL could not be generated."
        );
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Payment initiation failed");
    }
  };

  // KPI Calculations
  const totalBookingsCount = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === "COMPLETE").length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const cancelledCount = bookings.filter((b) => b.status === "CANCEL").length;

  const totalSpent = bookings
    .filter((b) => b.status === "COMPLETE" || b.payment?.status === "PAID")
    .reduce((sum, b) => sum + (b.totalAmount || (b.tour?.costFrom || 0) * b.guestCount), 0);

  const totalGuests = bookings.reduce((sum, b) => sum + (b.guestCount || 1), 0);
  const completionRate = totalBookingsCount > 0 ? Math.round((confirmedCount / totalBookingsCount) * 100) : 0;

  // Monthly Spending & Activity Chart Data
  const monthlyChartData = useMemo(() => {
    const monthMap: Record<string, { month: string; spent: number; bookings: number; sortKey: number }> = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    bookings.forEach((b) => {
      const date = new Date(b.createdAt);
      if (isNaN(date.getTime())) return;
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const label = `${months[date.getMonth()]} ${date.getFullYear()}`;
      const amount = b.status === "COMPLETE" || b.payment?.status === "PAID"
        ? (b.totalAmount || (b.tour?.costFrom || 0) * b.guestCount)
        : 0;

      if (!monthMap[key]) {
        monthMap[key] = {
          month: label,
          spent: amount,
          bookings: 1,
          sortKey: date.getFullYear() * 12 + date.getMonth(),
        };
      } else {
        monthMap[key].spent += amount;
        monthMap[key].bookings += 1;
      }
    });

    const list = Object.values(monthMap).sort((a, b) => a.sortKey - b.sortKey);
    // If fewer than 2 data points, add placeholder context so chart renders nicely
    if (list.length === 0) {
      return [{ month: "Current", spent: 0, bookings: 0 }];
    }
    return list;
  }, [bookings]);

  // Status Breakdown Pie Chart Data
  const statusChartData = useMemo(() => {
    return [
      { name: "Confirmed", value: confirmedCount, color: "#10b981" },
      { name: "Pending", value: pendingCount, color: "#f59e0b" },
      { name: "Cancelled", value: cancelledCount, color: "#f43f5e" },
    ].filter((item) => item.value > 0);
  }, [confirmedCount, pendingCount, cancelledCount]);

  // Destination Breakdown Bar Chart Data
  const destinationChartData = useMemo(() => {
    const destMap: Record<string, number> = {};
    bookings.forEach((b) => {
      const loc = b.tour?.location ? b.tour.location.split(",")[0].trim() : "Custom Trip";
      destMap[loc] = (destMap[loc] || 0) + 1;
    });

    return Object.entries(destMap)
      .map(([destination, count]) => ({ destination, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [bookings]);

  // Filtered & Sorted Bookings List
  const filteredBookings = useMemo(() => {
    return bookings
      .filter((b) => {
        // Status filter
        if (filter === "PENDING" && b.status !== "PENDING") return false;
        if (filter === "COMPLETE" && b.status !== "COMPLETE") return false;
        if (filter === "CANCEL" && b.status !== "CANCEL") return false;

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = b.tour?.title?.toLowerCase() || "";
          const loc = b.tour?.location?.toLowerCase() || "";
          const tran = b.payment?.transactionId?.toLowerCase() || "";
          const coupon = b.couponCode?.toLowerCase() || "";
          return title.includes(q) || loc.includes(q) || tran.includes(q) || coupon.includes(q);
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === "price-high") {
          const costA = a.totalAmount || (a.tour?.costFrom || 0) * a.guestCount;
          const costB = b.totalAmount || (b.tour?.costFrom || 0) * b.guestCount;
          return costB - costA;
        }
        if (sortBy === "price-low") {
          const costA = a.totalAmount || (a.tour?.costFrom || 0) * a.guestCount;
          const costB = b.totalAmount || (b.tour?.costFrom || 0) * b.guestCount;
          return costA - costB;
        }
        if (sortBy === "guests") {
          return b.guestCount - a.guestCount;
        }
        return 0;
      });
  }, [bookings, filter, searchQuery, sortBy]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="size-3.5" /> Confirmed
          </Badge>
        );
      case "CANCEL":
        return (
          <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1 font-semibold">
            <XCircle className="size-3.5" /> Cancelled
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1 font-semibold">
            <AlertCircle className="size-3.5" /> Failed
          </Badge>
        );
      case "PENDING":
      default:
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 font-semibold">
            <Clock3 className="size-3.5" /> Pending
          </Badge>
        );
    }
  };

  const getPaymentBadge = (status?: string) => {
    if (status === "PAID") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <CreditCard className="size-3" /> Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
        <CreditCard className="size-3" /> Unpaid
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* 1. Hero Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-card via-card to-primary/5 border border-border/70 p-6 sm:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-6 size-36 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EC003F]/10 text-[#EC003F] border border-[#EC003F]/20">
              <Sparkles className="size-3.5" />
              <span>Traveler Analytics & Bookings Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground font-nunito">
              Welcome back, {user?.name?.split(" ")[0] || "Explorer"}! ✈️
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Track your upcoming tour schedules, review payment confirmations, inspect travel spending charts, and explore new horizons.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCharts((prev) => !prev)}
              className="h-10 rounded-xl font-medium border-border/80 shadow-xs gap-2"
            >
              <BarChart3 className="size-4 text-primary" />
              <span>{showCharts ? "Hide Visual Charts" : "Show Visual Charts"}</span>
              {showCharts ? <ChevronUp className="size-3.5 opacity-60" /> : <ChevronDown className="size-3.5 opacity-60" />}
            </Button>

            <Button
              asChild
              className="h-10 rounded-xl bg-[#EC003F] hover:bg-[#d30037] text-white shadow-md shadow-[#EC003F]/20 font-semibold gap-2"
            >
              <Link to="/tour">
                <Compass className="size-4" /> Explore Destinations
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Interactive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Bookings */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Bookings
            </span>
            <div className="size-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Luggage className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground font-nunito">
                {totalBookingsCount}
              </span>
              <span className="text-xs text-muted-foreground font-medium">Reservations</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <Users className="size-3.5 text-blue-500" />
              <span>{totalGuests} total travelers booked</span>
            </p>
          </div>
        </div>

        {/* Confirmed Trips */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Confirmed Trips
            </span>
            <div className="size-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-nunito">
                {confirmedCount}
              </span>
              <span className="text-xs text-emerald-600/80 font-semibold">
                ({completionRate}% fulfilled)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-emerald-500" />
              <span>Ready for travel & adventure</span>
            </p>
          </div>
        </div>

        {/* Pending Actions / Approval */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Pending Payments
            </span>
            <div className="size-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Clock3 className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-nunito">
                {pendingCount}
              </span>
              <span className="text-xs text-muted-foreground font-medium">Awaiting Pay</span>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium flex items-center gap-1.5">
              <AlertCircle className="size-3.5" />
              <span>{pendingCount > 0 ? "Complete payment to secure seat" : "All payments up-to-date"}</span>
            </p>
          </div>
        </div>

        {/* Total Travel Spent */}
        <div className="p-5 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Spent
            </span>
            <div className="size-11 rounded-xl bg-pink-500/10 text-[#EC003F] flex items-center justify-center transition-transform group-hover:scale-110">
              <Wallet className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-[#EC003F] font-nunito">
                ৳{totalSpent.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
              <CreditCard className="size-3.5 text-[#EC003F]" />
              <span>Safe payment via SSLCommerz</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Visual Charts Section (Collapsible) */}
      {showCharts && (
        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-xs space-y-6 transition-all animate-in fade-in-50 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground font-nunito flex items-center gap-2">
                <BarChart3 className="size-5 text-[#EC003F]" />
                Interactive Travel Analytics
              </h2>
              <p className="text-xs text-muted-foreground">
                Real-time breakdown of your tour expenses, reservation lifecycle, and favorite destinations.
              </p>
            </div>

            {/* Chart Sub-Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-muted/60 border border-border/60 self-start sm:self-auto">
              <button
                onClick={() => setChartTab("spending")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  chartTab === "spending"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Spending Timeline
              </button>
              <button
                onClick={() => setChartTab("status")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  chartTab === "status"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Status Share
              </button>
              <button
                onClick={() => setChartTab("destinations")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  chartTab === "destinations"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Top Locations
              </button>
            </div>
          </div>

          {/* Chart Display Area */}
          <div className="pt-2">
            {chartTab === "spending" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Monthly Investment (BDT ৳) & Trips Taken</span>
                  <span className="font-semibold text-foreground">
                    Total: ৳{totalSpent.toLocaleString()} across {totalBookingsCount} bookings
                  </span>
                </div>
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="userSpendingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EC003F" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#EC003F" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#88888820" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#88888870" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#88888870" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "1rem",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                          fontSize: "12px",
                        }}
                        formatter={(val: any, name: any) => [
                          name === "spent" ? `৳${Number(val).toLocaleString()}` : `${val} bookings`,
                          name === "spent" ? "Spent" : "Total Bookings",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="spent"
                        stroke="#EC003F"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#userSpendingGradient)"
                        activeDot={{ r: 6, fill: "#EC003F" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {chartTab === "status" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={5}
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "0.75rem",
                          fontSize: "12px",
                        }}
                        formatter={(val: any) => [`${val} Bookings`, "Count"]}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                  <h4 className="text-sm font-bold text-foreground">Booking Lifecycle Status</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-card">
                      <span className="flex items-center gap-2 text-emerald-600 font-semibold">
                        <span className="size-2 rounded-full bg-emerald-500" /> Confirmed
                      </span>
                      <span className="font-bold">{confirmedCount}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-card">
                      <span className="flex items-center gap-2 text-amber-600 font-semibold">
                        <span className="size-2 rounded-full bg-amber-500" /> Pending Approval / Pay
                      </span>
                      <span className="font-bold">{pendingCount}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-card">
                      <span className="flex items-center gap-2 text-rose-600 font-semibold">
                        <span className="size-2 rounded-full bg-rose-500" /> Cancelled
                      </span>
                      <span className="font-bold">{cancelledCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chartTab === "destinations" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Top Booked Travel Destinations</span>
                  <span>{destinationChartData.length} unique regions</span>
                </div>
                {destinationChartData.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-10 text-center">No destination data recorded yet.</p>
                ) : (
                  <div className="h-64 sm:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={destinationChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#88888820" />
                        <XAxis dataKey="destination" tick={{ fontSize: 11 }} stroke="#88888870" />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="#88888870" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.75rem",
                            fontSize: "12px",
                          }}
                          formatter={(val: any) => [`${val} times booked`, "Bookings"]}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Interactive Search, Filters, and Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-border/60 bg-card">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tour name, location, or transaction..."
            className="pl-9 h-10 rounded-xl bg-muted/40 border-border/60 text-sm focus-visible:ring-[#EC003F]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/50">
            {[
              { key: "ALL", label: "All", count: totalBookingsCount },
              { key: "PENDING", label: "Pending", count: pendingCount },
              { key: "COMPLETE", label: "Confirmed", count: confirmedCount },
              { key: "CANCEL", label: "Cancelled", count: cancelledCount },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filter === tab.key
                    ? "bg-[#EC003F] text-white shadow-xs"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  filter === tab.key ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 pl-2">
            <ArrowUpDown className="size-3.5 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-2.5 rounded-xl text-xs font-medium bg-muted/40 border border-border/60 text-foreground focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="guests">Guests Count</option>
            </select>
          </div>
        </div>
      </div>

      {/* 5. Booking Cards List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 rounded-2xl border border-border/50 bg-card/40 animate-pulse" />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-border/80 bg-muted/15">
          <div className="size-16 mx-auto mb-4 rounded-2xl bg-[#EC003F]/10 flex items-center justify-center text-[#EC003F]">
            <Compass className="size-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground font-nunito">No bookings found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1.5 mb-6">
            {searchQuery
              ? `No travel itineraries match "${searchQuery}". Try a different keyword.`
              : filter === "ALL"
              ? "You haven't reserved any tours yet. Explore breathtaking destinations and embark on your next unforgettable journey!"
              : `No tour reservations currently matching the "${filter.toLowerCase()}" filter.`}
          </p>
          <Button asChild className="h-10 rounded-xl bg-[#EC003F] hover:bg-[#d30037] text-white font-semibold">
            <Link to="/tour">Discover Incredible Tours</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const tour = booking.tour;
            const cost = booking.totalAmount || (tour?.costFrom || 0) * booking.guestCount;
            const isUnpaid = booking.payment?.status !== "PAID" && booking.status !== "CANCEL";

            return (
              <div
                key={booking._id}
                className="group rounded-2xl border border-border/60 bg-card text-card-foreground p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Thumbnail & Tour Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4.5 flex-1 min-w-0">
                  <div className="relative size-24 sm:size-28 rounded-2xl overflow-hidden bg-muted shrink-0 border border-border/50">
                    <img
                      src={tour?.images?.[0] || "/placeholder.jpg"}
                      alt={tour?.title || "Tour Destination"}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      {booking.status === "COMPLETE" && (
                        <span className="size-2 rounded-full bg-emerald-500 block ring-2 ring-white" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.payment?.status)}
                      {booking.couponCode && (
                        <Badge variant="outline" className="text-xs text-pink-600 border-pink-300 dark:border-pink-800 bg-pink-50 dark:bg-pink-950/20 flex items-center gap-1">
                          <Tag className="size-3" /> {booking.couponCode}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-bold text-lg text-foreground truncate font-nunito group-hover:text-primary transition-colors">
                      {tour?.title || "Custom Adventure Booking"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-muted-foreground">
                      {tour?.location && (
                        <span className="flex items-center gap-1.5 font-medium text-foreground/80">
                          <MapPin className="size-3.5 text-[#EC003F]" />
                          {tour.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Users className="size-3.5" />
                        {booking.guestCount} {booking.guestCount > 1 ? "Travelers" : "Traveler"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        Booked: {new Date(booking.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>

                    {booking.discountAmount ? (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        Coupon Discount Saved: ৳{booking.discountAmount.toLocaleString()}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Right: Pricing & Actions */}
                <div className="flex sm:flex-row md:flex-col items-start md:items-end justify-between sm:justify-end gap-3.5 pt-4 sm:pt-0 border-t border-border/40 md:border-t-0 shrink-0">
                  <div className="md:text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Total Amount
                    </span>
                    <span className="text-2xl font-black text-[#EC003F] font-nunito">
                      ৳{cost.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {tour?._id && (
                      <Button asChild variant="outline" size="sm" className="h-9 rounded-xl border-border/80 text-xs font-semibold">
                        <Link to={`/tour-details/${tour._id}`}>
                          <ExternalLink className="size-3.5 mr-1.5" /> View Details
                        </Link>
                      </Button>
                    )}

                    {isUnpaid && booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        onClick={() => handlePay(booking._id)}
                        disabled={isPaying}
                        className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all gap-1.5"
                      >
                        {isPaying ? (
                          <>
                            <Loader2 className="size-3.5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <CreditCard className="size-3.5" />
                            <span>Pay Now</span>
                          </>
                        )}
                      </Button>
                    )}

                    {booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCancel(booking._id)}
                        disabled={isCancelling}
                        className="h-9 rounded-xl text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        <Ban className="size-3.5 mr-1" /> Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Booking;