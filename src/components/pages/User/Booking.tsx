import { useState } from "react";
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
} from "lucide-react";
import {
  useGetMyBookingsQuery,
  useCancelBookingMutation,
  useInitPaymentMutation,
} from "@/redux/features/Booking/booking.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  const { data, isLoading, refetch } = useGetMyBookingsQuery(undefined);
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const [initPayment, { isLoading: isPaying }] = useInitPaymentMutation();

  const bookings: IBookingItem[] = data?.data || [];

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
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
        toast.success("Redirecting to payment gateway...");
        window.location.href = paymentUrl;
      } else {
        toast.error(
          paymentUrl && paymentUrl !== "Payment URL not found"
            ? `Payment error: ${paymentUrl}`
            : "Payment initialization failed: Valid payment URL not generated. Please check SSLCommerz credentials."
        );
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Payment initiation failed");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === "ALL") return true;
    if (filter === "PENDING") return b.status === "PENDING";
    if (filter === "COMPLETE") return b.status === "COMPLETE";
    if (filter === "CANCEL") return b.status === "CANCEL";
    return true;
  });

  const totalSpent = bookings
    .filter((b) => b.status === "COMPLETE" || b.payment?.status === "PAID")
    .reduce((sum, b) => sum + (b.totalAmount || (b.tour?.costFrom || 0) * b.guestCount), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="size-3.5" /> Confirmed
          </Badge>
        );
      case "CANCEL":
        return (
          <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1">
            <XCircle className="size-3.5" /> Cancelled
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1">
            <AlertCircle className="size-3.5" /> Failed
          </Badge>
        );
      case "PENDING":
      default:
        return (
          <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Clock3 className="size-3.5" /> Pending
          </Badge>
        );
    }
  };

  const getPaymentBadge = (status?: string) => {
    if (status === "PAID") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <CreditCard className="size-3.5" /> Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
        <CreditCard className="size-3.5" /> Unpaid
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-nunito">
            My Tour Bookings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your travel itineraries, review payment statuses, and view trip details.
          </p>
        </div>
        <Button asChild className="bg-[#EC003F] hover:bg-[#d30037] text-white">
          <Link to="/tour" className="flex items-center gap-2">
            <Compass className="size-4" /> Explore New Tours
          </Link>
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Total Bookings</p>
          <p className="text-2xl font-bold mt-1">{bookings.length}</p>
        </div>
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Confirmed Trips</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">
            {bookings.filter((b) => b.status === "COMPLETE").length}
          </p>
        </div>
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Pending Approval</p>
          <p className="text-2xl font-bold mt-1 text-amber-600">
            {bookings.filter((b) => b.status === "PENDING").length}
          </p>
        </div>
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-xs">
          <p className="text-xs font-medium text-muted-foreground">Total Spent</p>
          <p className="text-2xl font-bold mt-1 text-[#EC003F]">
            ৳{totalSpent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b pb-3 overflow-x-auto">
        {[
          { key: "ALL", label: `All (${bookings.length})` },
          { key: "PENDING", label: `Pending (${bookings.filter((b) => b.status === "PENDING").length})` },
          { key: "COMPLETE", label: `Confirmed (${bookings.filter((b) => b.status === "COMPLETE").length})` },
          { key: "CANCEL", label: `Cancelled (${bookings.filter((b) => b.status === "CANCEL").length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
              filter === tab.key
                ? "bg-[#EC003F] text-white shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-xl border bg-card/50 animate-pulse"
            />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed bg-muted/20">
          <div className="size-14 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center text-[#EC003F]">
            <Compass className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No bookings found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1 mb-6">
            {filter === "ALL"
              ? "You haven't booked any tours yet. Explore breathtaking destinations and embark on your next journey!"
              : `No bookings matching the "${filter.toLowerCase()}" status.`}
          </p>
          <Button asChild className="bg-[#EC003F] hover:bg-[#d30037] text-white">
            <Link to="/tour">Find Your Next Adventure</Link>
          </Button>
        </div>
      ) : (
        /* Booking List */
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const tour = booking.tour;
            const cost = booking.totalAmount || (tour?.costFrom || 0) * booking.guestCount;
            const isUnpaid = booking.payment?.status !== "PAID" && booking.status !== "CANCEL";

            return (
              <div
                key={booking._id}
                className="group rounded-2xl border bg-card text-card-foreground p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Image & Tour Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  <div className="relative size-24 sm:size-28 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img
                      src={tour?.images?.[0] || "/placeholder.jpg"}
                      alt={tour?.title || "Tour"}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(booking.status)}
                      {getPaymentBadge(booking.payment?.status)}
                      {booking.couponCode && (
                        <Badge variant="outline" className="text-xs text-pink-600 border-pink-300">
                          Coupon: {booking.couponCode}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-bold text-lg text-foreground truncate font-nunito">
                      {tour?.title || "Custom Tour Booking"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground">
                      {tour?.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5 text-[#EC003F]" />
                          {tour.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        {booking.guestCount} {booking.guestCount > 1 ? "Guests" : "Guest"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        Booked: {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {booking.discountAmount ? (
                      <p className="text-xs text-emerald-600 font-medium">
                        Discount Applied: ৳{booking.discountAmount.toLocaleString()}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Right: Price & Actions */}
                <div className="flex sm:flex-row md:flex-col items-start md:items-end justify-between sm:justify-end gap-3 pt-4 sm:pt-0 border-t md:border-t-0">
                  <div className="md:text-right">
                    <p className="text-xs text-muted-foreground">Total Price</p>
                    <p className="text-xl sm:text-2xl font-black text-[#EC003F]">
                      ৳{cost.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {tour?._id && (
                      <Button asChild variant="outline" size="sm" className="h-9">
                        <Link to={`/tour-details/${tour._id}`}>
                          <ExternalLink className="size-3.5 mr-1.5" /> View Tour
                        </Link>
                      </Button>
                    )}

                    {isUnpaid && booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        onClick={() => handlePay(booking._id)}
                        disabled={isPaying}
                        className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CreditCard className="size-3.5 mr-1.5" /> Pay Now
                      </Button>
                    )}

                    {booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCancel(booking._id)}
                        disabled={isCancelling}
                        className="h-9 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
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