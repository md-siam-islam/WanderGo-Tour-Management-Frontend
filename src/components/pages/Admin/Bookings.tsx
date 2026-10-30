import { useState } from "react";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} from "@/redux/features/Booking/booking.api";
import {
  CalendarCheck2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  MoreVertical,
  Trash2,
  Eye,
  RefreshCw,
  User,
  MapPin,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { toast } from "sonner";

export default function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const { data: bookingsData, isLoading, refetch } = useGetAllBookingsQuery(undefined);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();

  const allBookings = (bookingsData?.data || []) as any[];

  // Filter bookings
  const filteredBookings = allBookings.filter((b) => {
    const matchesStatus =
      statusFilter === "ALL" || b.status?.toUpperCase() === statusFilter;

    const userName = b.user?.name?.toLowerCase() || "";
    const userEmail = b.user?.email?.toLowerCase() || "";
    const tourTitle = b.tour?.title?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      userName.includes(term) || userEmail.includes(term) || tourTitle.includes(term);

    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const totalCount = allBookings.length;
  const completeCount = allBookings.filter((b) => b.status === "COMPLETE").length;
  const pendingCount = allBookings.filter((b) => b.status === "PENDING").length;
  const cancelCount = allBookings.filter(
    (b) => b.status === "CANCEL" || b.status === "FAILED"
  ).length;
  const totalRevenue = allBookings
    .filter((b) => b.status === "COMPLETE" || b.payment?.status === "PAID")
    .reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  // Status Change Handler
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const toastId = toast.loading(`Updating booking status to ${newStatus}...`);
    try {
      const res = await updateStatus({ bookingId, status: newStatus }).unwrap();
      if (res.success) {
        toast.success(`Booking status changed to ${newStatus}`, { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to update booking status", {
        id: toastId,
      });
    }
  };

  // Delete Handler
  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    const toastId = toast.loading("Deleting booking record...");
    try {
      const res = await deleteBooking(bookingToDelete).unwrap();
      if (res.success) {
        toast.success("Booking deleted successfully", { id: toastId });
        setBookingToDelete(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to delete booking", {
        id: toastId,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETE":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 gap-1.5 font-bold">
            <CheckCircle2 className="size-3.5" /> Complete
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 gap-1.5 font-bold">
            <Clock className="size-3.5" /> Pending
          </Badge>
        );
      case "CANCEL":
        return (
          <Badge className="bg-gray-500/15 text-gray-700 dark:text-gray-400 border-gray-500/30 gap-1.5 font-bold">
            <XCircle className="size-3.5" /> Cancelled
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 gap-1.5 font-bold">
            <AlertTriangle className="size-3.5" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarCheck2 className="size-3.5" />
            <span>Admin Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground font-nunito tracking-tight">
            All Traveler Bookings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review customer bookings, manage reservation statuses, and inspect travel confirmations.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          className="rounded-xl font-semibold gap-2 border-border/80"
        >
          <RefreshCw className="size-4" />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
            <CalendarCheck2 className="size-3.5 text-blue-500" /> Total Bookings
          </p>
          <p className="text-3xl font-black text-foreground font-nunito">{totalCount}</p>
          <p className="text-[11px] text-muted-foreground">All time reservations</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-emerald-600 tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5" /> Confirmed
          </p>
          <p className="text-3xl font-black text-emerald-600 font-nunito">{completeCount}</p>
          <p className="text-[11px] text-muted-foreground">Fully approved & paid</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-amber-600 tracking-wider flex items-center gap-1.5">
            <Clock className="size-3.5" /> Pending Action
          </p>
          <p className="text-3xl font-black text-amber-600 font-nunito">{pendingCount}</p>
          <p className="text-[11px] text-muted-foreground">Awaiting payment / approval</p>
        </div>

        <div className="p-5 rounded-3xl bg-card border border-border/70 shadow-xs space-y-1">
          <p className="text-xs uppercase font-bold text-[#EF1A53] tracking-wider flex items-center gap-1.5">
            <DollarSign className="size-3.5" /> Total Revenue
          </p>
          <p className="text-3xl font-black text-foreground font-nunito">
            ৳{totalRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground">Completed bookings</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/70 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search traveler, email, or tour..."
            className="pl-9 rounded-xl h-10 text-sm border-border/80"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "COMPLETE", "PENDING", "CANCEL", "FAILED"].map((status) => (
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
              {status === "ALL" ? "All Bookings" : status}
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
                <th className="py-4 px-6">Traveler</th>
                <th className="py-4 px-6">Tour & Destination</th>
                <th className="py-4 px-6 text-center">Guests</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="size-6 animate-spin text-[#EF1A53]" />
                      <span>Loading booking records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <p className="text-base font-semibold">No bookings found</p>
                    <p className="text-xs">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/30 transition-colors">
                    {/* Traveler */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gradient-to-tr from-[#EF1A53]/20 to-amber-500/20 text-[#EF1A53] flex items-center justify-center font-bold text-sm shrink-0 border border-border/60">
                          {b.user?.name ? b.user.name.charAt(0).toUpperCase() : <User className="size-4" />}
                        </div>
                        <div className="truncate max-w-[180px]">
                          <p className="font-bold text-foreground truncate">{b.user?.name || "Customer"}</p>
                          <p className="text-xs text-muted-foreground truncate">{b.user?.email || "No email"}</p>
                          {b.user?.phone && (
                            <p className="text-[11px] text-muted-foreground font-mono">{b.user.phone}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Tour */}
                    <td className="py-4 px-6">
                      <div className="max-w-[240px]">
                        <p className="font-bold text-foreground line-clamp-1">{b.tour?.title || "Tour Plan"}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="size-3 text-[#EF1A53]" />
                          <span>{b.tour?.location || "Bangladesh"}</span>
                        </p>
                      </div>
                    </td>

                    {/* Guests */}
                    <td className="py-4 px-6 text-center">
                      <Badge variant="secondary" className="font-mono font-semibold">
                        <Users className="size-3 mr-1 text-muted-foreground" />
                        {b.guestCount || 1}
                      </Badge>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-extrabold text-foreground font-nunito text-base">
                          ৳{(Number(b.totalAmount) || 0).toLocaleString()}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-medium">
                          {b.payment?.status === "PAID" ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Paid</span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold">● Unpaid</span>
                          )}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">{getStatusBadge(b.status)}</td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedBooking(b)}
                          className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                          title="View Details"
                        >
                          <Eye className="size-4" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuLabel className="text-xs">Update Status</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(b._id, "COMPLETE")}
                              className="text-emerald-600 font-medium text-xs cursor-pointer"
                            >
                              <CheckCircle2 className="size-3.5 mr-2" /> Mark Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(b._id, "PENDING")}
                              className="text-amber-600 font-medium text-xs cursor-pointer"
                            >
                              <Clock className="size-3.5 mr-2" /> Mark Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(b._id, "CANCEL")}
                              className="text-gray-600 font-medium text-xs cursor-pointer"
                            >
                              <XCircle className="size-3.5 mr-2" /> Cancel Booking
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setBookingToDelete(b._id)}
                              className="text-red-600 font-medium text-xs cursor-pointer"
                            >
                              <Trash2 className="size-3.5 mr-2" /> Delete Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-lg rounded-3xl p-6">
            <DialogHeader className="border-b border-border/60 pb-4">
              <DialogTitle className="text-xl font-bold font-nunito flex items-center justify-between">
                <span>Booking Details</span>
                {getStatusBadge(selectedBooking.status)}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Reservation ID: <span className="font-mono">{selectedBooking._id}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2 text-sm">
              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 space-y-1.5">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                  Tour Information
                </p>
                <p className="font-bold text-foreground text-base">
                  {selectedBooking.tour?.title || "Custom Tour"}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3 text-[#EF1A53]" />
                  <span>{selectedBooking.tour?.location || "Bangladesh"}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                    Traveler
                  </p>
                  <p className="font-bold text-foreground text-sm mt-1">
                    {selectedBooking.user?.name || "Customer"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {selectedBooking.user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedBooking.user?.phone || "No phone"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                    Payment Status
                  </p>
                  <p className="font-bold text-foreground text-base mt-1 font-nunito">
                    ৳{Number(selectedBooking.totalAmount || 0).toLocaleString()}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                    {selectedBooking.payment?.status || "UNPAID"}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guest Count:</span>
                  <span className="font-bold text-foreground">{selectedBooking.guestCount} Travelers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Cost:</span>
                  <span className="font-medium text-foreground">৳{selectedBooking.originalAmount || selectedBooking.totalAmount}</span>
                </div>
                {selectedBooking.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Applied:</span>
                    <span>-৳{selectedBooking.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border/60 pt-2 font-bold text-sm">
                  <span>Net Total:</span>
                  <span className="text-[#EF1A53]">৳{selectedBooking.totalAmount}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Alert */}
      <AlertDialog open={!!bookingToDelete} onOpenChange={() => setBookingToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-nunito font-bold">Delete this booking?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              This action cannot be undone. This will permanently remove the booking record from the platform database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl text-xs font-semibold">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBooking}
              className="rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
