import { Link } from "react-router";
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useGetAlltourQuery } from "@/redux/features/tour/tour.api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FeaturedTours = () => {
  const { data, isLoading } = useGetAlltourQuery({ limit: 6 });
  const tours = data?.data?.data || [];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 text-[#EC003F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> Handpicked Adventures
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-nunito tracking-tight">
              Featured Tour Packages
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Explore our most sought-after travel itineraries, carefully designed for unforgettable memories, scenic bliss, and authentic experiences.
            </p>
          </div>

          <Button asChild variant="outline" className="self-start md:self-auto border-[#EC003F] text-[#EC003F] hover:bg-[#EC003F] hover:text-white transition-colors">
            <Link to="/tour" className="flex items-center gap-2">
              View All Tours <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Tour Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-3xl border bg-card/60 animate-pulse" />
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No tours available at the moment. Please check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(0, 6).map((tour) => (
              <div
                key={tour._id}
                className="group rounded-3xl border bg-card text-card-foreground overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  <img
                    src={tour.images?.[0] || "/placeholder.jpg"}
                    alt={tour.title}
                    className="size-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {tour.location && (
                    <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white border-0 text-xs flex items-center gap-1.5 shadow-md">
                      <MapPin className="size-3 text-[#EC003F]" />
                      {tour.location}
                    </Badge>
                  )}

                  <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-xs font-bold text-foreground">
                    ৳{tour.costFrom?.toLocaleString()} <span className="font-normal text-muted-foreground text-[10px]">/ person</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-xl text-foreground font-nunito line-clamp-1 group-hover:text-[#EC003F] transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                      {tour.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-3 border-t">
                      {tour.maxGests && (
                        <span className="flex items-center gap-1">
                          <Users className="size-3.5 text-[#EC003F]" />
                          Up to {tour.maxGests} guests
                        </span>
                      )}
                      {tour.startDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3.5 text-[#EC003F]" />
                          {new Date(tour.startDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3">
                    <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl h-10">
                      <Link to={`/tour-details/${tour._id}`}>Explore</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 rounded-xl h-10 bg-[#EC003F] hover:bg-[#d30037] text-white">
                      <Link to={`/tour-booking/${tour._id}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTours;
