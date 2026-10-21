import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Users,
  MapPin,
  Clock,
  Check,
  X,
  Heart,
  Share2,
  Shield,
  Star,
  Ticket,
  CheckCircle2,
  ChevronLeft,
  PlaneTakeoff,
  PlaneLanding,
  ShieldCheck,
  Zap,
  Sparkles,
  Calendar,
  Lock,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { useGetsingleTourMutation } from "@/redux/features/tour/tour.api";
import { useCreateBookingMutation } from "@/redux/features/Booking/booking.api";
import { useApplyCouponMutation } from "@/redux/features/coupon/coupon.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useCheckWishlistStatusQuery,
  useToggleWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TourImageGallery from "../modules/Tour/TourImageGallery";

const TourBooking = () => {
  const [guests, setGuests] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const [getSingleTour, { data, isLoading, isError }] =
    useGetsingleTourMutation();
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [applyCoupon, { isLoading: isApplyingCoupon }] =
    useApplyCouponMutation();

  const { data: userData } = useUserInfoQuery(undefined);

  const { data: wishlistData, refetch: refetchWishlist } =
    useCheckWishlistStatusQuery(id as string, {
      skip: !id || !userData?.data?.email,
    });
  const [toggleWishlist, { isLoading: isTogglingWishlist }] =
    useToggleWishlistMutation();
  const isFavorite = wishlistData?.data?.isWishlisted || false;

  useEffect(() => {
    if (id) {
      getSingleTour(id);
    }
  }, [id, getSingleTour]);

  const tour = data?.data;

  const handleToggleFavorite = async () => {
    if (!userData?.data?.email) {
      toast.error("Please login to save this tour to your favorites");
      navigate("/login", { state: { from: `/tour-booking/${id}` } });
      return;
    }
    try {
      const res = await toggleWishlist(id as string).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Wishlist updated");
        refetchWishlist();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update wishlist");
    }
  };

  const handleShare = async () => {
    if (navigator.share && tour) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.description,
          url: window.location.href,
        });
        return;
      } catch (error) {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Tour booking link copied to clipboard!");
    } catch {
      toast.info("Link: " + window.location.href);
    }
  };

  const guestIncrement = () => {
    const max = tour?.maxGests || 10;
    if (guests < max) {
      setGuests((prev) => prev + 1);
    } else {
      toast.error(`Maximum ${max} guests allowed`);
    }
  };

  const guestDecrement = () => {
    if (guests > 1) {
      setGuests((prev) => prev - 1);
    } else {
      toast.error("Minimum 1 guest required");
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && tour?.costFrom) {
      const baseTotal = guests * tour.costFrom;
      setTotalAmount(Math.max(0, baseTotal - discountAmount));
    }
  }, [isLoading, isError, guests, tour?.costFrom, discountAmount]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    try {
      const res = await applyCoupon({
        code: couponCode.trim().toUpperCase(),
        amount: (tour?.costFrom || 0) * guests,
      }).unwrap();
      if (res?.success) {
        setAppliedCoupon(res.data.code);
        setDiscountAmount(res.data.discountAmount);
        toast.success(
          `Coupon "${res.data.code}" applied! You saved $${res.data.discountAmount}`
        );
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const CreateBooking = async () => {
    const bookingData: { tour?: string; guestCount: number; couponCode?: string } = {
      tour: id,
      guestCount: guests,
      couponCode: appliedCoupon || undefined,
    };

    try {
      const result = await createBooking(bookingData).unwrap();
      console.log("Booking result:", result);

      if (result?.success) {
        const paymentUrl = result?.data?.paymentUrl;
        if (
          paymentUrl &&
          (paymentUrl.startsWith("http://") || paymentUrl.startsWith("https://"))
        ) {
          toast.success("Booking created! Redirecting to secure payment...");
          window.location.href = paymentUrl;
        } else {
          toast.warning(
            paymentUrl && paymentUrl !== "Payment URL not found"
              ? `Payment notice: ${paymentUrl}`
              : "Booking was created! You can review or complete payment in My Bookings."
          );
          navigate("/user/booking");
        }
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to create booking. Please try again."
      );
      console.error("Booking error:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Flexible";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDuration = (start?: string, end?: string) => {
    if (!start || !end) return 1;
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  // Loading State
  if (isLoading || (!data && !isError)) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-2/3 rounded-lg mb-6" />
        <Skeleton className="h-[460px] w-full rounded-3xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !tour) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <X className="w-10 h-10 text-destructive" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Tour Not Found
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          The tour you are trying to book is unavailable or doesn't exist.
        </p>
        <Button asChild>
          <Link to="/tour">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Tours
          </Link>
        </Button>
      </div>
    );
  }

  const durationDays = calculateDuration(tour.startDate, tour.endDate);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header / Actions Bar */}
      <div className="border-b bg-card/60 backdrop-blur-md sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 rounded-full hover:bg-muted"
            >
              <Link to={`/tour-details/${id}`}>
                <ChevronLeft className="w-4 h-4" />
                <span>Tour Details</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleFavorite}
                disabled={isTogglingWishlist}
                className="rounded-full h-9 w-9 border-muted-foreground/20 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 transition-transform active:scale-125 ${
                    isFavorite
                      ? "fill-[#EC003F] text-[#EC003F]"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="rounded-full h-9 w-9 border-muted-foreground/20 hover:bg-muted"
                title="Share tour"
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/tour" className="hover:text-foreground transition-colors">
            Tours
          </Link>
          <span>/</span>
          <Link
            to={`/tour-details/${id}`}
            className="hover:text-foreground transition-colors truncate max-w-[200px]"
          >
            {tour.title}
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Booking</span>
        </div>

        {/* Main Grid: Tour Information (Left) + Booking & Payment Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Title Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 font-semibold text-xs px-3 py-1 rounded-full"
                >
                  {tour.tourType?.name || "Premium Adventure"}
                </Badge>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-500/10 px-3 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.8 (128 reviews)</span>
                </div>

                <Badge variant="outline" className="text-xs rounded-full">
                  <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                  {durationDays} Days
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{tour.location || "Multiple Destinations"}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Max {tour.maxGests || 8} Guests</span>
                </div>
              </div>
            </div>

            {/* Tour Image Gallery (Zero Cutoff Slider with Ambient Blur & Lightbox) */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Tour Photo Gallery
              </h3>
              <TourImageGallery images={tour.images} title={tour.title} />
            </div>

            {/* Tour Overview Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                Tour Description & Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {tour.description || "No description provided for this tour."}
              </p>

              {/* Departure & Arrival highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <PlaneTakeoff className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Departure Point
                    </p>
                    <p className="font-bold text-foreground text-sm mt-0.5">
                      {tour.departureLocation || "City Center Departure Hub"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <PlaneLanding className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Arrival Destination
                    </p>
                    <p className="font-bold text-foreground text-sm mt-0.5">
                      {tour.arrivalLocation || tour.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            {tour.tourPlan && tour.tourPlan.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-foreground">
                  Planned Itinerary
                </h2>
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  {tour.tourPlan.map((plan: string, index: number) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold ring-4 ring-card">
                        {index + 1}
                      </div>
                      <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          Day {index + 1}
                        </span>
                        <p className="text-foreground text-sm leading-relaxed mt-1">
                          {plan}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included & Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> What's Included
                </h3>
                <ul className="space-y-2.5">
                  {tour.included && tour.included.length > 0 ? (
                    tour.included.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground italic">
                      Standard tour transport & services included.
                    </li>
                  )}
                </ul>
              </div>

              <div className="p-6 rounded-3xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                  <X className="w-5 h-5" /> What's Excluded
                </h3>
                <ul className="space-y-2.5">
                  {tour.excluded && tour.excluded.length > 0 ? (
                    tour.excluded.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground italic">
                      Personal expenses & optional gratuities.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card (1/3 width) */}
          <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-6">
            <div className="rounded-3xl border border-border/80 bg-card shadow-2xl overflow-hidden">
              {/* Card Header Banner */}
              <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-primary-foreground">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                    Tour Booking
                  </span>
                  <ShieldCheck className="w-6 h-6 opacity-85" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight">
                    ${tour.costFrom}
                  </span>
                  <span className="text-sm font-medium opacity-90">/ person</span>
                </div>
                <p className="text-xs opacity-80 mt-1">
                  Guaranteed best rates & instant confirmation
                </p>
              </div>

              {/* Booking Configuration & Summary */}
              <div className="p-6 space-y-6">
                {/* Schedule Summary Box */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-2.5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Start Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatDate(tour.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/40">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> End Date
                    </span>
                    <span className="font-semibold text-foreground">
                      {formatDate(tour.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border/40">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> Duration
                    </span>
                    <span className="font-bold text-foreground">
                      {durationDays} {durationDays === 1 ? "Day" : "Days"}
                    </span>
                  </div>
                </div>

                {/* Interactive Guests Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-primary" /> Guests / Travelers
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Max: {tour.maxGests || 8} guests
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-muted/50 p-3.5 rounded-2xl border border-border/60">
                    <button
                      type="button"
                      onClick={guestDecrement}
                      disabled={guests <= 1}
                      className="w-11 h-11 rounded-full border-2 border-primary/40 text-primary hover:bg-primary/10 flex items-center justify-center font-bold text-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                      aria-label="Decrease guest count"
                    >
                      -
                    </button>

                    <div className="text-center">
                      <span className="text-3xl font-extrabold text-foreground">
                        {guests}
                      </span>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {guests === tour?.maxGests
                          ? "Max capacity reached"
                          : `${(tour?.maxGests || 8) - guests} spots left`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={guestIncrement}
                      disabled={guests >= (tour?.maxGests || 8)}
                      className="w-11 h-11 rounded-full border-2 border-primary/40 text-primary hover:bg-primary/10 flex items-center justify-center font-bold text-2xl transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                      aria-label="Increase guest count"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Separator />

                {/* Promo Coupon Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-primary" /> Promo / Discount Coupon
                  </h4>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-sm">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          Code: <strong>{appliedCoupon}</strong> (-${discountAmount})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code (e.g. SUMMER26)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary uppercase font-mono tracking-wider"
                      />
                      <Button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon}
                        variant="outline"
                        size="sm"
                        className="rounded-xl px-4 font-semibold"
                      >
                        {isApplyingCoupon ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown Calculation */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      ${tour.costFrom} × {guests} {guests === 1 ? "guest" : "guests"}
                    </span>
                    <span className="font-semibold text-foreground">
                      ${tour.costFrom * guests}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-3 border-t border-border/80">
                    <span className="text-base font-bold text-foreground">
                      Total Payable
                    </span>
                    <span className="text-2xl font-extrabold text-primary">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit / Pay CTA Button */}
                <Button
                  onClick={CreateBooking}
                  disabled={isBookingLoading}
                  className="w-full h-13 text-base font-bold rounded-2xl shadow-lg hover:shadow-primary/20 transition-all"
                  size="lg"
                >
                  {isBookingLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Securing Booking...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Book & Pay Now • ${totalAmount.toLocaleString()}
                    </>
                  )}
                </Button>

                {/* Trust Footer Notes */}
                <div className="space-y-2 text-center text-xs text-muted-foreground pt-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Instant confirmation upon payment</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Free cancellation up to 24 hours before start</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Book With WanderGo Card */}
            <div className="p-6 rounded-3xl bg-card border border-border/70 shadow-sm space-y-4">
              <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                WanderGo Traveler Guarantee
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>Secure SSL Checkout</span>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Verified Local Guides</span>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span>24/7 Helpline Support</span>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Best Price Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourBooking;