import { useMemo } from "react";
import { Link } from "react-router";
import {
  DollarSign,
  Users,
  Compass,
  CalendarCheck,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
  BarChart3,
  PieChart as PieIcon,
  Sparkles,
} from "lucide-react";
import {
  useGetDashboardStatsQuery,
  useGetMonthlyAnalyticsQuery,
} from "@/redux/features/stats/stats.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Analytics = () => {
  const { data: statsData, isLoading: isStatsLoading } = useGetDashboardStatsQuery(undefined);
  const { data: monthlyData, isLoading: isMonthlyLoading } = useGetMonthlyAnalyticsQuery(undefined);

  const stats = statsData?.data?.overview;
  const recentBookings = statsData?.data?.recentBookings || [];
  const monthlyRevenue = monthlyData?.data?.monthlyRevenue || [];

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Prepare monthly revenue data for Recharts
  const monthlyChartData = useMemo(() => {
    if (!monthlyRevenue || monthlyRevenue.length === 0) {
      return [{ month: "No Data", revenue: 0, count: 0 }];
    }
    return monthlyRevenue.map((item: any) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      revenue: item.revenue,
      count: item.count,
    }));
  }, [monthlyRevenue]);

  // Prepare booking status pie chart data
  const statusPieData = useMemo(() => {
    const list = [
      { name: "Confirmed", value: stats?.completedBookings || 0, color: "#10b981" },
      { name: "Pending", value: stats?.pendingBookings || 0, color: "#f59e0b" },
      { name: "Cancelled", value: stats?.cancelledBookings || 0, color: "#f43f5e" },
    ];
    return list.filter((item) => item.value > 0);
  }, [stats]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#EC003F]/10 text-[#EC003F] border border-[#EC003F]/20 mb-2">
            <Sparkles className="size-3.5" />
            <span>Admin Executive Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-nunito">
            Platform Analytics & Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time business performance, revenue streams, and customer reservation trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="h-9.5 rounded-xl font-medium border-border/80">
            <Link to="/admin/all-tour">
              <Compass className="size-4 mr-1.5 text-emerald-500" /> All Tours
            </Link>
          </Button>
          <Button asChild size="sm" className="h-9.5 rounded-xl bg-[#EC003F] hover:bg-[#d30037] text-white font-semibold shadow-xs gap-1.5">
            <Link to="/admin/add-tour">
              <PlusCircle className="size-4" /> New Tour
            </Link>
          </Button>
        </div>
      </div>

      {/* Main KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="size-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              ৳{(stats?.totalRevenue || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="size-3.5" />
              <span>৳{(stats?.last30DaysRevenue || 0).toLocaleString()} last 30 days</span>
            </p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="size-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <CalendarCheck className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              {(stats?.totalBookings || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <span>{stats?.completedBookings || 0} confirmed</span>
              <span>•</span>
              <span className="text-amber-600 font-medium">{stats?.pendingBookings || 0} pending</span>
            </p>
          </div>
        </div>

        {/* Active Tours */}
        <div className="p-6 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Tours
            </span>
            <div className="size-11 rounded-xl bg-pink-500/10 text-[#EC003F] flex items-center justify-center transition-transform group-hover:scale-110">
              <Compass className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              {(stats?.totalTours || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              Active tour packages on platform
            </p>
          </div>
        </div>

        {/* Total Users */}
        <div className="p-6 rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Travelers
            </span>
            <div className="size-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-transform group-hover:scale-110">
              <Users className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              {(stats?.totalUsers || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              Registered platform travelers
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Charts: Monthly Revenue Area Chart + Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Interactive Area Chart */}
        <div className="p-6 rounded-3xl border border-border/60 bg-card text-card-foreground shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-foreground font-nunito flex items-center gap-2">
                <BarChart3 className="size-5 text-emerald-500" />
                Monthly Revenue Growth
              </h3>
              <p className="text-xs text-muted-foreground">
                Revenue collected through online bookings over recent billing cycles.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Gateway Data
            </span>
          </div>

          {isMonthlyLoading ? (
            <div className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
          ) : (
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                      name === "revenue" ? `৳${Number(val).toLocaleString()}` : `${val} transactions`,
                      name === "revenue" ? "Revenue" : "Payments",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#adminRevenueGradient)"
                    activeDot={{ r: 6, fill: "#10b981" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Quick Monthly Summary Cards */}
          {monthlyRevenue.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2 border-t border-border/40">
              {monthlyRevenue.slice(-4).map((item: any, idx: number) => (
                <div key={idx} className="p-2.5 rounded-xl bg-muted/30 border border-border/40 text-center">
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {monthNames[item._id.month - 1]} {item._id.year}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    ৳{item.revenue.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.count} payments
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Status Donut Chart */}
        <div className="p-6 rounded-3xl border border-border/60 bg-card text-card-foreground shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-lg text-foreground font-nunito flex items-center gap-2">
              <PieIcon className="size-5 text-[#EC003F]" />
              Booking Distribution
            </h3>
            <p className="text-xs text-muted-foreground">
              Proportion of confirmed, pending, and cancelled trips.
            </p>
          </div>

          {statusPieData.length === 0 ? (
            <div className="py-16 text-center text-xs text-muted-foreground">
              No booking records available for chart.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {statusPieData.map((entry, index) => (
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

              {/* Status List */}
              <div className="space-y-2 pt-2 border-t border-border/40 text-xs">
                <div className="flex justify-between items-center p-2 rounded-xl bg-muted/30">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle className="size-3.5" /> Confirmed
                  </span>
                  <span className="font-bold">{stats?.completedBookings || 0}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-muted/30">
                  <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                    <Clock className="size-3.5" /> Pending
                  </span>
                  <span className="font-bold">{stats?.pendingBookings || 0}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-muted/30">
                  <span className="flex items-center gap-1.5 text-rose-600 font-semibold">
                    <XCircle className="size-3.5" /> Cancelled
                  </span>
                  <span className="font-bold">{stats?.cancelledBookings || 0}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="p-6 rounded-3xl border border-border/60 bg-card text-card-foreground shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground font-nunito">Recent Customer Bookings</h3>
            <p className="text-xs text-muted-foreground">Latest reservations submitted across the platform.</p>
          </div>
        </div>

        {isStatsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-2xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No bookings recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b border-border/60 bg-muted/30">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Customer</th>
                  <th className="py-3 px-4">Tour Package</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 rounded-r-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recentBookings.map((b: any) => (
                  <tr key={b._id} className="hover:bg-muted/15 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-foreground">{b.user?.name || "Anonymous Traveler"}</div>
                      <div className="text-xs text-muted-foreground">{b.user?.email || "No email"}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-foreground max-w-[200px] truncate">
                      {b.tour?.title || "Custom Tour"}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">{b.guestCount}</td>
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      ৳{(b.totalAmount || (b.tour?.costFrom || 0) * b.guestCount).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        className={
                          b.status === "COMPLETE"
                            ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
                            : b.status === "CANCEL"
                            ? "bg-rose-500/15 text-rose-600 border-rose-500/30"
                            : "bg-amber-500/15 text-amber-600 border-amber-500/30"
                        }
                      >
                        {b.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs font-semibold ${
                          b.payment?.status === "PAID" ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {b.payment?.status || "UNPAID"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;