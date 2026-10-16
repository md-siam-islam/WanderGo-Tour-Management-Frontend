import { useState } from "react";
import {
  Ticket,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} from "@/redux/features/coupon/coupon.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdminCoupons = () => {
  const { data, isLoading, refetch } = useGetAllCouponsQuery(undefined);
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENTAGE" as "PERCENTAGE" | "FIXED",
    discountValue: 10,
    minBookingAmount: 1000,
    maxDiscountAmount: 500,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    usageLimit: 100,
  });

  const coupons = data?.data || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) {
      toast.error("Please provide a coupon code");
      return;
    }
    try {
      const res = await createCoupon({
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minBookingAmount: Number(form.minBookingAmount),
        maxDiscountAmount:
          form.discountType === "PERCENTAGE"
            ? Number(form.maxDiscountAmount)
            : undefined,
        expiryDate: new Date(form.expiryDate).toISOString(),
        usageLimit: Number(form.usageLimit),
      }).unwrap();

      if (res?.success) {
        toast.success("Coupon created successfully!");
        setIsModalOpen(false);
        setForm({
          code: "",
          discountType: "PERCENTAGE",
          discountValue: 10,
          minBookingAmount: 1000,
          maxDiscountAmount: 500,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          usageLimit: 100,
        });
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create coupon");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      const res = await deleteCoupon(id).unwrap();
      if (res?.success) {
        toast.success("Coupon deleted successfully");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete coupon");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-nunito flex items-center gap-2">
            <Ticket className="size-7 text-[#EC003F]" /> Discount Coupon Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage promotional discount codes for travelers to use during booking.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#EC003F] hover:bg-[#d30037] text-white flex items-center gap-2"
        >
          <Plus className="size-4" /> Create New Coupon
        </Button>
      </div>

      {/* Coupons List */}
      <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-xs space-y-4">
        <h3 className="font-bold text-lg text-foreground font-nunito">Active Promo Coupons</h3>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : coupons.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            No coupons found. Click "Create New Coupon" to add a promotional discount code.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-muted-foreground border-b bg-muted/20">
                <tr>
                  <th className="py-3 px-4">Coupon Code</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Min Spend</th>
                  <th className="py-3 px-4">Max Discount</th>
                  <th className="py-3 px-4">Usage Limit</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {coupons.map((c) => {
                  const isExpired = new Date(c.expiryDate) < new Date();
                  return (
                    <tr key={c._id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                        <span className="px-2.5 py-1 rounded-md bg-pink-500/10 text-[#EC003F] border border-pink-500/20">
                          {c.code}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-foreground">
                        {c.discountType === "PERCENTAGE"
                          ? `${c.discountValue}% OFF`
                          : `৳${c.discountValue} OFF`}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        ৳{c.minBookingAmount ? c.minBookingAmount.toLocaleString() : "0"}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {c.maxDiscountAmount ? `৳${c.maxDiscountAmount.toLocaleString()}` : "Unlimited"}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {c.usedCount || 0} / {c.usageLimit || "∞"}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">
                        {new Date(c.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4">
                        {isExpired ? (
                          <Badge className="bg-rose-500/15 text-rose-600 border-rose-500/30">
                            Expired
                          </Badge>
                        ) : c.isActive ? (
                          <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-500/30">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500/15 text-gray-600 border-gray-500/30">
                            Inactive
                          </Badge>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(c._id)}
                          disabled={isDeleting}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-xl text-foreground font-nunito flex items-center gap-2">
                <Ticket className="size-5 text-[#EC003F]" /> Create Promotional Coupon
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-sm">
              <div>
                <label className="font-medium text-foreground block mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. SUMMER2026, WANDER20"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground uppercase font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-foreground block mb-1">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e: any) => setForm({ ...form, discountType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (৳)</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-foreground block mb-1">Discount Value</label>
                  <input
                    type="number"
                    min={1}
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-foreground block mb-1">Min Booking Amount (৳)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.minBookingAmount}
                    onChange={(e) => setForm({ ...form, minBookingAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                  />
                </div>

                {form.discountType === "PERCENTAGE" && (
                  <div>
                    <label className="font-medium text-foreground block mb-1">Max Discount Cap (৳)</label>
                    <input
                      type="number"
                      min={1}
                      value={form.maxDiscountAmount}
                      onChange={(e) => setForm({ ...form, maxDiscountAmount: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-foreground block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                  />
                </div>

                <div>
                  <label className="font-medium text-foreground block mb-1">Total Usage Limit</label>
                  <input
                    type="number"
                    min={1}
                    value={form.usageLimit}
                    onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-background text-foreground focus:outline-hidden focus:ring-2 focus:ring-[#EC003F]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="bg-[#EC003F] hover:bg-[#d30037] text-white"
                >
                  {isCreating ? "Creating..." : "Save Coupon"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
