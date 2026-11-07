import { useState } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/shared/SEO";
import {
  Trash2,
  Edit,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Eye,
  UserMinus,
  Navigation,
  Building,
  FileText,
  CheckCircle,
  XCircle,
  Mountain,
  Umbrella,
  Tent,
  Car,
  Ship,
  Castle,
  UmbrellaOff,
  PlusCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import {
  useGetAlltourQuery,
  useDeleteTourMutation,
} from "@/redux/features/tour/tour.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { All_Role } from "@/components/utlis/getSidebaritems";
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
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useGetDivisionsQuery } from "@/redux/features/Division/division.api";
import { useGetTourtypeQuery } from "@/redux/features/tour/tourType.api";
import type { ITourresponse } from "@/Alltypes/tour.type";
import { Link } from "react-router";
import { toast } from "sonner";

const AllTour = () => {
  const { data: toursData, isLoading: tourLoading } = useGetAlltourQuery(undefined);
  const tours = toursData?.data?.data;

  const { data: userData } = useUserInfoQuery(undefined);
  const userRole = userData?.data?.role;
  const canDelete = userRole === All_Role.admin || userRole === All_Role.superAdmin;

  const [tourToDelete, setTourToDelete] = useState<any | null>(null);
  const [deleteTour, { isLoading: isDeleting }] = useDeleteTourMutation();

  const { data: DivisionData } = useGetDivisionsQuery(undefined);
  const { data: tourTypeData } = useGetTourtypeQuery(undefined);

  const tourTypeImages = {
    adventure: {
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Mountain,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
    },
    beach: {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Umbrella,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    mountain: {
      image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Mountain,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300",
    },
    camping: {
      image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Tent,
      color: "from-brown-500 to-amber-700",
      bgColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    },
    "road trip": {
      image: "https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Car,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50 text-gray-700 dark:bg-gray-950/40 dark:text-gray-300",
    },
    cruise: {
      image: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Ship,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
    },
    historical: {
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Castle,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    },
    ski: {
      image: "https://images.unsplash.com/photo-1533285277535-154b1c6d0b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: UmbrellaOff,
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
    },
  };

  const defaultTourType = {
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: FileText,
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300",
  };

  // Safe helper to extract tour type name whether it's an object, string ID, or direct string
  const getTourTypeName = (rawTourType: any): string => {
    if (!rawTourType) return "General";
    if (typeof rawTourType === "object") {
      return rawTourType.name || "General";
    }
    if (typeof rawTourType === "string") {
      const matched = tourTypeData?.data?.data?.find(
        (item: any) =>
          item._id === rawTourType ||
          (item.name && item.name.toLowerCase() === rawTourType.toLowerCase())
      );
      if (matched?.name) return matched.name;
      if (/^[0-9a-fA-F]{24}$/.test(rawTourType)) return "General";
      return rawTourType;
    }
    return "General";
  };

  // Safe helper to extract division name whether it's an object, string ID, or direct string
  const getDivisionName = (rawDivision: any): string => {
    if (!rawDivision) return "";
    if (typeof rawDivision === "object") {
      return rawDivision.name || "";
    }
    if (typeof rawDivision === "string") {
      const matched = DivisionData?.data?.data?.find(
        (item: any) =>
          item._id === rawDivision ||
          (item.name && item.name.toLowerCase() === rawDivision.toLowerCase())
      );
      if (matched?.name) return matched.name;
      if (/^[0-9a-fA-F]{24}$/.test(rawDivision)) return "";
      return rawDivision;
    }
    return "";
  };

  const getTourTypeConfig = (rawTourType: any) => {
    const typeName = getTourTypeName(rawTourType);
    const normalizedKey = (typeof typeName === "string" ? typeName : "general")
      .toLowerCase()
      .trim();

    // Direct key match
    if (tourTypeImages[normalizedKey as keyof typeof tourTypeImages]) {
      return {
        ...tourTypeImages[normalizedKey as keyof typeof tourTypeImages],
        typeName,
      };
    }

    // Substring match
    for (const key of Object.keys(tourTypeImages)) {
      if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
        return {
          ...tourTypeImages[key as keyof typeof tourTypeImages],
          typeName,
        };
      }
    }

    return {
      ...defaultTourType,
      typeName,
    };
  };

  // Delete tour handler (Admin and Super Admin only)
  const handleDeleteTour = async () => {
    if (!tourToDelete) return;
    const toastId = toast.loading(`Deleting "${tourToDelete.title}"...`);
    try {
      const res = await deleteTour(tourToDelete._id).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Tour package deleted successfully!", { id: toastId });
      } else {
        toast.success("Tour package deleted successfully!", { id: toastId });
      }
      setTourToDelete(null);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Failed to delete tour package. Please try again.",
        { id: toastId }
      );
    }
  };

  if (tourLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!tours || tours.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No Tours Available</h2>
        <p className="text-muted-foreground mb-6">Create your first tour package to get started.</p>
        <Button asChild className="bg-[#EF1A53] hover:bg-[#d81548] text-white font-semibold">
          <Link to="/admin/add-tour">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Tour
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Manage All Tours | WanderGo Admin"
        description="Inspect, manage, and delete tour packages, availability, and itineraries on WanderGo."
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tour Management</h1>
          <p className="text-muted-foreground mt-2">
            Discover, edit, and manage all tour packages across Bangladesh.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm px-3 py-1 font-semibold">
            {tours.length} {tours.length === 1 ? "Tour" : "Tours"} Available
          </Badge>
          <Button asChild className="bg-[#EF1A53] hover:bg-[#d81548] text-white font-semibold rounded-xl gap-1.5 shadow-sm">
            <Link to="/admin/add-tour">
              <PlusCircle className="size-4" /> Add Tour
            </Link>
          </Button>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour: any) => {
          const tourConfig = getTourTypeConfig(tour.tourType);
          const TourIcon = tourConfig.icon;
          const divisionName = getDivisionName(tour.division);
          const tourImage = tour.images?.[0] || tourConfig.image;

          return (
            <Card
              key={tour._id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/80 flex flex-col justify-between"
            >
              <div>
                {/* Tour Header with Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${tourImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  </div>

                  {/* Tour Type Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge
                      className={`${tourConfig.bgColor} backdrop-blur-md border border-white/20 font-semibold gap-1.5 shadow-sm text-xs`}
                    >
                      <TourIcon className="h-3.5 w-3.5" />
                      <span>{tourConfig.typeName}</span>
                    </Badge>
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md">
                    <div className="flex items-center gap-0.5">
                      <span className="text-xs text-muted-foreground mr-0.5">৳</span>
                      <span className="font-bold text-base text-emerald-600 dark:text-emerald-400">
                        {tour.costFrom?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-none">Starting from</p>
                  </div>

                  {/* Title and Location */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 drop-shadow-sm">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#EF1A53]" />
                      <span className="truncate">{tour.location || "Bangladesh"}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5 space-y-4">
                  {/* Quick Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 font-medium text-foreground">
                        <Users className="h-3.5 w-3.5 text-blue-500" />
                        <span>{tour?.maxGests || 0} Max</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium text-foreground">
                        <UserMinus className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{tour.minAge || 5}+ Age</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-foreground">
                        {tour.startDate ? format(new Date(tour.startDate), "MMM dd") : "TBD"} -{" "}
                        {tour.endDate ? format(new Date(tour.endDate), "MMM dd") : "TBD"}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Tour Details */}
                  <div className="space-y-3">
                    {/* Locations */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-start gap-2">
                        <Navigation className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Departure: </span>
                          <span className="font-medium text-foreground">
                            {tour.departureLocation || "Flexible"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-muted-foreground">Arrival: </span>
                          <span className="font-medium text-foreground">
                            {tour.arrivalLocation || "Destination"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Division */}
                    {divisionName && (
                      <div className="flex items-center gap-2 pt-1">
                        <Building className="h-4 w-4 text-purple-500 shrink-0" />
                        <span className="text-xs text-muted-foreground">Region:</span>
                        <Badge variant="outline" className="text-xs font-medium py-0 px-2">
                          {divisionName}
                        </Badge>
                      </div>
                    )}

                    {/* Included/Excluded Summary */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground">Included</p>
                          <p className="font-bold text-emerald-600">{tour.included?.length || 0} items</p>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground">Excluded</p>
                          <p className="font-bold text-red-600">{tour.excluded?.length || 0} items</p>
                        </div>
                      </div>
                    </div>

                    {/* Description Preview */}
                    {tour.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 pt-1">
                        {tour.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </div>

              {/* Action Buttons */}
              <CardFooter className="p-5 pt-0 flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl text-xs font-semibold gap-1.5 hover:bg-muted"
                >
                  <Link to={`/tour-details/${tour._id}`}>
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>View Itinerary</span>
                  </Link>
                </Button>

                {/* Delete Tour Button for Admin & Super Admin */}
                {canDelete && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTourToDelete(tour)}
                    className="rounded-xl text-xs font-semibold gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/60 transition-colors"
                    title="Delete tour package"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={!!tourToDelete} onOpenChange={(open) => !open && setTourToDelete(null)}>
        <AlertDialogContent className="rounded-3xl max-w-md">
          <AlertDialogHeader className="space-y-3">
            <div className="size-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto sm:mx-0">
              <AlertTriangle className="size-6" />
            </div>
            <AlertDialogTitle className="font-nunito text-xl font-bold">
              Delete "{tourToDelete?.title}"?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to delete this tour package? This action cannot be undone. This will permanently remove the tour package, its itineraries, and all related booking associations from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 pt-2">
            <AlertDialogCancel
              disabled={isDeleting}
              className="rounded-xl text-xs font-semibold"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTour}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl text-xs font-bold gap-1.5 shadow-sm"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="size-3.5" />
                  <span>Yes, Delete Tour</span>
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllTour;
