import { Link } from "react-router";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Trash2,
} from "lucide-react";
import {
  useGetMyWishlistQuery,
  useToggleWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MyWishlist = () => {
  const { data, isLoading, refetch } = useGetMyWishlistQuery(undefined);
  const [toggleWishlist, { isLoading: isToggling }] = useToggleWishlistMutation();

  const wishlistItems = data?.data || [];

  const handleRemove = async (tourId: string) => {
    try {
      const res = await toggleWishlist(tourId).unwrap();
      if (res?.success) {
        toast.success("Removed from wishlist");
        refetch();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update wishlist");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-nunito flex items-center gap-2">
            <Heart className="size-7 text-[#EC003F] fill-[#EC003F]" /> My Saved Tours
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Keep track of dream destinations you want to visit and book them whenever you're ready.
          </p>
        </div>
        <Button asChild className="bg-[#EC003F] hover:bg-[#d30037] text-white">
          <Link to="/tour" className="flex items-center gap-2">
            <Compass className="size-4" /> Discover More Tours
          </Link>
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 rounded-2xl border bg-card/50 animate-pulse"
            />
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-2xl border border-dashed bg-muted/20">
          <div className="size-16 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center text-[#EC003F]">
            <Heart className="size-8" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Your wishlist is empty</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1 mb-6">
            You haven't added any tours to your favorites list yet. Click the heart icon on any tour to save it for later!
          </p>
          <Button asChild className="bg-[#EC003F] hover:bg-[#d30037] text-white">
            <Link to="/tour">Explore Amazing Tours</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => {
            const tour = item.tour;
            if (!tour) return null;

            return (
              <div
                key={item._id}
                className="group rounded-2xl border bg-card text-card-foreground overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={tour.images?.[0] || "/placeholder.jpg"}
                    alt={tour.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => handleRemove(tour._id)}
                    disabled={isToggling}
                    className="absolute top-3 right-3 size-9 rounded-full bg-white/90 backdrop-blur-sm text-[#EC003F] hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
                    title="Remove from favorites"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  {tour.location && (
                    <Badge className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white border-0 text-xs flex items-center gap-1">
                      <MapPin className="size-3 text-[#EC003F]" />
                      {tour.location}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-[#EC003F] transition-colors font-nunito">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
                      {tour.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-3 border-t">
                      {tour.maxGests && (
                        <span className="flex items-center gap-1">
                          <Users className="size-3.5" />
                          Up to {tour.maxGests} guests
                        </span>
                      )}
                      {tour.startDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3.5" />
                          {new Date(tour.startDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t">
                    <div>
                      <span className="text-[11px] text-muted-foreground">Starts from</span>
                      <p className="text-xl font-black text-[#EC003F]">
                        ৳{tour.costFrom?.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm" className="h-9">
                        <Link to={`/tour-details/${tour._id}`}>Details</Link>
                      </Button>
                      <Button asChild size="sm" className="h-9 bg-[#EC003F] hover:bg-[#d30037] text-white">
                        <Link to={`/tour-booking/${tour._id}`}>
                          Book <ArrowRight className="size-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
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

export default MyWishlist;
