import { Button } from "@/components/ui/button";
import { Trash2, Edit, MapPin, Calendar, Users, DollarSign, Eye, UserMinus, Navigation, Building, FileText, CheckCircle, XCircle, Mountain, Umbrella, Tent, Car, Ship, Castle, UmbrellaOff } from "lucide-react";
import { useGetAlltourQuery } from "@/redux/features/tour/tour.api";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const AllTour = () => {
  const { data, isLoading } = useGetAlltourQuery(undefined);

  // ট্যুর টাইপ অনুযায়ী ইমেজ/আইকন ম্যাপিং
  const tourTypeImages = {
    'adventure': {
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Mountain,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    },
    'beach': {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Umbrella,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    'mountain': {
      image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Mountain,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    'camping': {
      image: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Tent,
      color: 'from-brown-500 to-amber-700',
      bgColor: 'bg-amber-50'
    },
    'road trip': {
      image: 'https://images.unsplash.com/photo-1542228262-3d663b306a53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Car,
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-50'
    },
    'cruise': {
      image: 'https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Ship,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    'historical': {
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Castle,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50'
    },
    'ski': {
      image: 'https://images.unsplash.com/photo-1533285277535-154b1c6d0b65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: UmbrellaOff,
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-50'
    }
  };

  // ডিফল্ট ইমেজ/আইকন
  const defaultTourType = {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    icon: FileText,
    color: 'from-gray-400 to-gray-600',
    bgColor: 'bg-gray-50'
  };

  const getTourTypeConfig = (tourType: string) => {
    if (!tourType) return defaultTourType;
    
    const typeKey = tourType.toLowerCase();
    return tourTypeImages[typeKey as keyof typeof tourTypeImages] || defaultTourType;
  };

  if (isLoading) {
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

  const tours = data?.data?.data || [];

  if (tours.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No Tours Available</h2>
        <p className="text-muted-foreground mb-6">Create your first tour to get started</p>
        <Button>Create Tour</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tour Management</h1>
          <p className="text-muted-foreground mt-2">
            Discover and manage amazing tour experiences
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Badge variant="secondary" className="text-sm">
            {tours.length} Tours Available
          </Badge>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Add New Tour
          </Button>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour: any & { _id: string }) => {
          const tourConfig = getTourTypeConfig(tour.tourType);
          const TourIcon = tourConfig.icon;
          
          return (
            <Card key={tour._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2">
              {/* Tour Header with Image */}
              <div className="relative h-48 overflow-hidden">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${tourConfig.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
                
                {/* Tour Type Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${tourConfig.bgColor} backdrop-blur-sm border-0 text-gray-800 hover:${tourConfig.bgColor}/80 gap-1`}>
                    <TourIcon className="h-3 w-3" />
                    {tour.tourType || "General"}
                  </Badge>
                </div>
                
                {/* Price Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-lg text-green-600">{tour.costFrom?.toLocaleString() || "0"}</span>
                  </div>
                  <p className="text-xs text-gray-500">Starting from</p>
                </div>
                
                {/* Title and Location */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{tour.title}</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white/90" />
                    <span className="text-sm text-white/90">{tour.location}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Quick Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-sm">{tour.maxGests || 0} Max Guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <UserMinus className="h-5 w-5 text-green-500" />
                      <span className="font-semibold text-sm">{tour.minAge || 5}+ Min Age</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {tour.startDate ? format(new Date(tour.startDate), 'MMM dd') : 'TBD'} -{' '}
                      {tour.endDate ? format(new Date(tour.endDate), 'MMM dd') : 'TBD'}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Tour Details */}
                <div className="space-y-4">
                  {/* Locations */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Navigation className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Departure</p>
                        <p className="text-sm text-muted-foreground">{tour.departureLocation || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Arrival</p>
                        <p className="text-sm text-muted-foreground">{tour.arrivalLocation || "Not specified"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Division */}
                  {tour.division && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Region</p>
                        <Badge variant="outline" className="text-xs">
                          {tour.division}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Included/Excluded Summary */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className={`p-2 rounded-lg ${tourConfig.bgColor} flex items-center gap-2 border-foreground-primary border`}>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-600">Included</p>
                        <p className="text-sm font-semibold text-green-600">{tour.included?.length || 0} items</p>
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 flex items-center gap-2 border-foreground-primary border">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-xs text-gray-600">Excluded</p>
                        <p className="text-sm font-semibold text-red-600">{tour.excluded?.length || 0} items</p>
                      </div>
                    </div>
                  </div>

                  {/* Description Preview */}
                  {tour.description && (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{tour.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => console.log("View tour", tour._id)}
                >
                  <Eye className="h-4 w-4" />
                  Details
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => console.log("Edit tour", tour._id)}
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="gap-2"
                  size="icon"
                  onClick={() => console.log("Delete tour", tour._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Tour Type Legend */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Tour Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {Object.entries(tourTypeImages).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div
                key={key}
                className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className={`h-10 w-10 rounded-full ${config.bgColor} flex items-center justify-center mb-2`}>
                  <Icon className="h-5 w-5 text-gray-700" />
                </div>
                <span className="text-xs font-medium capitalize">{key}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllTour;