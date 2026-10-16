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
} from "lucide-react";
import {
  useGetDashboardStatsQuery,
  useGetMonthlyAnalyticsQuery,
} from "@/redux/features/stats/stats.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-nunito">
            Admin Analytics & Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time business performance, revenue streams, and customer booking trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="outline" className="h-9">
            <Link to="/admin/all-tour">
              <Compass className="size-4 mr-1.5" /> All Tours
            </Link>
          </Button>
          <Button asChild size="sm" className="h-9 bg-[#EC003F] hover:bg-[#d30037] text-white">
            <Link to="/admin/add-tour">
              <PlusCircle className="size-4 mr-1.5" /> New Tour
            </Link>
          </Button>
        </div>
      </div>

      {/* Main KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              ৳{(stats?.totalRevenue || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 text-emerald-600 font-medium">
              <TrendingUp className="size-3.5" />
              ৳{(stats?.last30DaysRevenue || 0).toLocaleString()} in last 30 days
            </p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <CalendarCheck className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              {(stats?.totalBookings || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.completedBookings || 0} completed • {stats?.pendingBookings || 0} pending
            </p>
          </div>
        </div>

        {/* Active Tours */}
        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Tours
            </span>
            <div className="size-10 rounded-xl bg-pink-500/10 text-[#EC003F] flex items-center justify-center">
              <Compass className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              {(stats?.totalTours || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Active tour packages on platform
            </p>
          </div>
        </div>

        {/* Total Users */}
        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Travelers
            </span>
            <div className="size-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Users className="size-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black text-foreground font-nunito">
              {(stats?.totalUsers || 0).toLocaleString()}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Registered platform travelers
            </p>
          </div>
        </div>
      </div>

      {/* Booking Status Breakdown & Monthly Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Fulfillment Rates */}
        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs space-y-4">
          <h3 className="font-bold text-lg text-foreground font-nunito">Booking Breakdown</h3>
          <p className="text-xs text-muted-foreground">Distribution of customer reservations by current status.</p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle className="size-3.5" /> Completed / Confirmed
                </span>
                <span>{stats?.completedBookings || 0}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{
                    width: `${stats?.totalBookings ? ((stats.completedBookings || 0) / stats.totalBookings) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-amber-600">
                  <Clock className="size-3.5" /> Pending Confirmation
                </span>
                <span>{stats?.pendingBookings || 0}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{
                    width: `${stats?.totalBookings ? ((stats.pendingBookings || 0) / stats.totalBookings) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="flex items-center gap-1.5 text-rose-600">
                  <XCircle className="size-3.5" /> Cancelled Bookings
                </span>
                <span>{stats?.cancelledBookings || 0}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all"
                  style={{
                    width: `${stats?.totalBookings ? ((stats.cancelledBookings || 0) / stats.totalBookings) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Revenue History */}
        <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs lg:col-span-2 space-y-4">
          <h3 className="font-bold text-lg text-foreground font-nunito">Monthly Revenue Performance</h3>
          <p className="text-xs text-muted-foreground">Recent months revenue collected through online bookings.</p>

          {isMonthlyLoading ? (
            <div className="h-44 rounded-xl bg-muted/40 animate-pulse" />
          ) : monthlyRevenue.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No monthly revenue recorded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {monthlyRevenue.slice(-6).map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/30 border text-center">
                  <p className="text-xs font-medium text-muted-foreground">
                    {monthNames[item._id.month - 1]} {item._id.year}
                  </p>
                  <p className="text-base font-bold text-foreground mt-1">
                    ৳{item.revenue.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.count} payments
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground font-nunito">Recent Customer Bookings</h3>
            <p className="text-xs text-muted-foreground">Latest 5 bookings submitted on the platform.</p>
          </div>
        </div>

        {isStatsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No bookings recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b bg-muted/20">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Tour Package</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/10 transition-colors">
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