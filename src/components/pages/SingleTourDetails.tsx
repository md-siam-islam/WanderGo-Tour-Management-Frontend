import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  DollarSign,
  Star,
  Check,
  X,
  ChevronLeft,
  Share2,
  Heart,
  Navigation,
  Compass,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Info,
  HelpCircle,
  PlaneTakeoff,
  PlaneLanding,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetsingleTourMutation } from "@/redux/features/tour/tour.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetTourtypeQuery } from "@/redux/features/tour/tourType.api";
import { useGetDivisionsQuery } from "@/redux/features/Division/division.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { TourReviews } from "../modules/Tour/TourReviews";
import {
  useCheckWishlistStatusQuery,
  useToggleWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import TourImageGallery from "../modules/Tour/TourImageGallery";

const SingleTourDetails = () => {
  const [getSingleTour, { data, isLoading }] = useGetsingleTourMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userData } = useUserInfoQuery(undefined);

  const { data: wishlistData, refetch: refetchWishlist } =
    useCheckWishlistStatusQuery(id as string, {
      skip: !id || !userData?.data?.email,
    });
  const [toggleWishlist, { isLoading: isTogglingWishlist }] =
    useToggleWishlistMutation();
  const isFavorite = wishlistData?.data?.isWishlisted || false;

  const handleToggleFavorite = async () => {
    if (!userData?.data?.email) {
      toast.error("Please login to save this tour to your favorites");
      navigate("/login", { state: { from: `/tour-details/${id}` } });
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

  const { data: tourTypeData } = useGetTourtypeQuery(undefined);
  const { data: DivisionData } = useGetDivisionsQuery(undefined);
  const tourType = tourTypeData?.data?.data;
  const division = DivisionData?.data?.data;

  useEffect(() => {
    if (id) {
      getSingleTour(id);
    }
  }, [id, getSingleTour]);

  const tour = data?.data;

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
        // Fallback to copy if user cancelled or not allowed
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Tour link copied to clipboard!");
    } catch {
      toast.info("Link: " + window.location.href);
    }
  };

  const handleBookNow = () => {
    if (!userData?.data?.email) {
      toast.error("You need to login to book this tour.");
      navigate("/login", { state: { from: `/tour-booking/${tour?._id}` } });
      return;
    }
    navigate(`/tour-booking/${tour?._id}`);
  };

  // Loading Skeleton State
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-36 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
        <div className="mb-8 space-y-3">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <Skeleton className="h-12 w-3/4 rounded-lg" />
          <Skeleton className="h-5 w-1/3 rounded-lg" />
        </div>
        <Skeleton className="h-[480px] w-full rounded-3xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <X className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tour Not Found</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          The tour you are looking for does not exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/tour">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to All Tours
          </Link>
        </Button>
      </div>
    );
  }

  const durationDays = calculateDuration(tour.startDate, tour.endDate);
  const matchedDivision = division?.find(
    (item: any) => item._id === tour.division
  );
  const matchedTourType = tourType?.find(
    (item: any) => item._id === tour.tourType
  );

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
              <Link to="/tour">
                <ChevronLeft className="w-4 h-4" />
                <span>All Tours</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2 sm:gap-3">
              {matchedTourType && (
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 font-medium px-3 py-1 rounded-full text-xs hidden sm:inline-flex"
                >
                  {matchedTourType.name}
                </Badge>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleFavorite}
                disabled={isTogglingWishlist}
                className="rounded-full h-9 w-9 border-muted-foreground/20 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 transition-transform active:scale-125 ${isFavorite
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
                title="Share this tour"
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tour Details Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl mt-12 ">
        {/* Tour Meta & Title Header */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {matchedDivision && (
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border-primary/30 text-primary bg-primary/5"
              >
                <MapPin className="w-3.5 h-3.5" />
                {matchedDivision.name}
              </Badge>
            )}

            <Badge
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            >
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              {durationDays} {durationDays === 1 ? "Day" : "Days"}
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            >
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              Max {tour.maxGests || 8} guests
            </Badge>

            <Badge
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
              Age {tour.minAge || 5}+
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {tour.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground ">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-200/50 text-amber-200/50"
                      }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.8</span>
              <span>(128 reviews)</span>
            </div>

            <span className="text-muted-foreground/40">•</span>

            <div className="flex items-center gap-1.5 text-primary font-medium ">
              <Navigation className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
          </div>
        </div>

        {/* Professional Image Gallery & Slider */}
        <TourImageGallery images={tour.images} title={tour.title} />

        {/* Main Grid: Details (Left) + Booking Sticky Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mt-8">
          {/* Left Column: Comprehensive Tour Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-muted/40 border border-border/50">
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold text-foreground">
                    {durationDays} Days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Group Size</p>
                  <p className="text-sm font-semibold text-foreground">
                    Max {tour.maxGests || 8}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <PlaneTakeoff className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Departure</p>
                  <p className="text-sm font-semibold text-foreground truncate max-w-[110px]" title={tour.departureLocation}>
                    {tour.departureLocation || "City Center"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                  <PlaneLanding className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Arrival</p>
                  <p className="text-sm font-semibold text-foreground truncate max-w-[110px]" title={tour.arrivalLocation}>
                    {tour.arrivalLocation || "Destination"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tour Tabs Navigation */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 sm:grid-cols-5 p-1 bg-muted/60 rounded-xl h-auto gap-1">
                <TabsTrigger
                  value="overview"
                  className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1.5 text-xs sm:text-sm font-medium"
                >
                  <Compass className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1.5 text-xs sm:text-sm font-medium"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Itinerary</span>
                </TabsTrigger>
                <TabsTrigger
                  value="included"
                  className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1.5 text-xs sm:text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Inclusions</span>
                </TabsTrigger>
                <TabsTrigger
                  value="amenities"
                  className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1.5 text-xs sm:text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Amenities</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-lg py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1.5 text-xs sm:text-sm font-medium col-span-3 sm:col-span-1"
                >
                  <Star className="w-4 h-4" />
                  <span>Reviews</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    About This Tour
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                    {tour.description}
                  </p>
                </div>

                {/* Location Details Route Cards */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    Route & Travel Points
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <PlaneTakeoff className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                          Departure Location
                        </h4>
                        <p className="text-base font-bold text-foreground">
                          {tour.departureLocation || "Not specified"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Meeting point instructions will be provided upon booking.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <PlaneLanding className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                          Arrival / Destination
                        </h4>
                        <p className="text-base font-bold text-foreground">
                          {tour.arrivalLocation || "Not specified"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Primary tour base and activity center.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 2: Itinerary */}
              <TabsContent value="itinerary" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Daily Itinerary
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Carefully planned day-by-day experience crafted by our travel experts.
                  </p>
                </div>

                {tour.tourPlan && tour.tourPlan.length > 0 ? (
                  <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
                    {tour.tourPlan.map((plan: string, index: number) => (
                      <div key={index} className="relative group">
                        {/* Step Marker */}
                        <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-background">
                          {index + 1}
                        </div>

                        {/* Step Card */}
                        <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold tracking-wider uppercase text-primary">
                              Day {index + 1}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Planned Activity
                            </Badge>
                          </div>
                          <p className="text-foreground text-sm sm:text-base leading-relaxed">
                            {plan}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-muted/40 rounded-2xl border border-dashed text-muted-foreground text-sm">
                    Detailed itinerary will be sent to your email after booking confirmation.
                  </div>
                )}
              </TabsContent>

              {/* Tab 3: Included & Excluded */}
              <TabsContent value="included" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    What's Included & Excluded
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Clear breakdown of everything provided during the tour with no hidden fees.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Included Card */}
                  <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 shadow-sm space-y-4">
                    <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {tour.included && tour.included.length > 0 ? (
                        tour.included.map((item: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2.5 text-sm text-foreground/90"
                          >
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground italic">
                          Standard tour guide & transport included.
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Excluded Card */}
                  <div className="p-6 rounded-2xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 shadow-sm space-y-4">
                    <h4 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                      <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      What's Excluded
                    </h4>
                    <ul className="space-y-3">
                      {tour.excluded && tour.excluded.length > 0 ? (
                        tour.excluded.map((item: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start gap-2.5 text-sm text-foreground/90"
                          >
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground italic">
                          Personal expenses & optional activities.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 4: Amenities */}
              <TabsContent value="amenities" className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Amenities & Services
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Complimentary facilities available during this tour package.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {tour.amenities && tour.amenities.length > 0 ? (
                    tour.amenities.map((amenity: string, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-card border border-border/70 hover:border-primary/40 shadow-sm text-center flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-xs sm:text-sm text-foreground">
                          {amenity}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full p-8 text-center text-muted-foreground text-sm bg-muted/40 rounded-2xl border border-dashed">
                      Standard tour amenities provided.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Tab 5: Reviews */}
              <TabsContent value="reviews" className="mt-6">
                <TourReviews tourId={id as string} currentUser={userData?.data} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1 lg:sticky lg:top-32">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-xl space-y-6">
              {/* Price Banner */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-foreground">
                      ${tour.costFrom}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      / person
                    </span>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold text-xs px-2.5 py-1">
                    Best Price
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  All taxes & local fees included
                </p>
              </div>

              <Separator />

              {/* Schedule Info Box */}
              <div className="space-y-3 bg-muted/40 p-4 rounded-2xl border border-border/50 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Start Date
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatDate(tour.startDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-border/40">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> End Date
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatDate(tour.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-border/40">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Total Duration
                  </span>
                  <span className="font-bold text-foreground">
                    {durationDays} {durationDays === 1 ? "Day" : "Days"}
                  </span>
                </div>
              </div>

              {/* Call to Action */}
              <div className="space-y-3">
                <Button
                  className="w-full h-12 text-base font-bold shadow-lg hover:shadow-primary/20 transition-all rounded-xl"
                  onClick={handleBookNow}
                >
                  <DollarSign className="w-5 h-5 mr-1" /> Book This Tour Now
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                  <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Instant confirmation upon booking</span>
                </div>
              </div>

              <Separator />

              {/* Guarantees & Features */}
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Free cancellation up to 24 hours prior</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Verified professional English-speaking guide</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>24/7 Traveler assistance and concierge support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information Cards Section */}
        <div className="mt-16 pt-10 border-t">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              Essential Tour Policies
            </h3>
            <p className="text-sm text-muted-foreground">
              Everything you need to know before joining the tour
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 space-y-2">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold">
                <Info className="w-5 h-5" />
                <h4>Cancellation Policy</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enjoy 100% full refund when cancelled 24 hours prior to departure. 50% refund applies if cancelled 12 hours before start.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <h4>Safety & Health Protocols</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All licensed tour guides adhere to national safety guidelines. Emergency first-aid kits and 24/7 hotline support included.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold">
                <MapPin className="w-5 h-5" />
                <h4>Meeting Point & Arrival</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tour.departureLocation || "Designated departure hub"}. Please arrive at least 15 minutes before scheduled departure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTourDetails;