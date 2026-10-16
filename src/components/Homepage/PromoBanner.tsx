import { Link } from "react-router";
import { Ticket, Copy, Check, Sparkles, Compass } from "lucide-react";
import { useState } from "react";
import { useGetActiveCouponsQuery } from "@/redux/features/coupon/coupon.api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const PromoBanner = () => {
  const { data } = useGetActiveCouponsQuery(undefined);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeCoupons = data?.data || [];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#1a050f] to-[#3b0314] text-white p-8 sm:p-12 lg:p-16 border border-pink-500/20 shadow-2xl">
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 size-96 rounded-full bg-[#EC003F]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 size-96 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 text-[#EC003F] text-xs font-bold uppercase tracking-wider border border-pink-500/30">
                <Sparkles className="size-3.5" /> Limited Time Deals
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-nunito leading-tight">
                Unlock Exclusive Travel Discounts With Promo Coupons
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
                Planning your next adventure? Use active promo codes during checkout to enjoy massive savings on premium Bangladesh tour packages.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="bg-[#EC003F] hover:bg-[#d30037] text-white px-8 rounded-full h-12 shadow-lg hover:shadow-pink-500/25">
                  <Link to="/tour" className="flex items-center gap-2">
                    <Compass className="size-4" /> Book Tour With Discount
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Coupons Showcase */}
            <div className="lg:col-span-5 space-y-4">
              {activeCoupons.length > 0 ? (
                activeCoupons.slice(0, 2).map((c) => (
                  <div
                    key={c._id}
                    className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Ticket className="size-4 text-[#EC003F]" />
                        <span className="font-mono font-black text-lg tracking-wider text-pink-300">
                          {c.code}
                        </span>
                      </div>
                      <p className="text-xs text-white/80">
                        Get{" "}
                        <strong className="text-white">
                          {c.discountType === "PERCENTAGE"
                            ? `${c.discountValue}% OFF`
                            : `৳${c.discountValue} FLAT OFF`}
                        </strong>{" "}
                        on your tour booking
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(c.code)}
                      className="px-3.5 py-2 rounded-xl bg-white text-gray-900 text-xs font-bold hover:bg-white/90 flex items-center gap-1.5 transition-transform active:scale-95 shadow-md shrink-0"
                    >
                      {copiedCode === c.code ? (
                        <>
                          <Check className="size-3.5 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center space-y-2">
                  <Ticket className="size-8 text-pink-400 mx-auto" />
                  <h4 className="font-bold text-white text-base">Travel Promo Code</h4>
                  <p className="text-xs text-white/70">
                    Use code <span className="font-mono font-bold text-pink-300">WANDERGO</span> at checkout to grab special seasonal discount rates!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
