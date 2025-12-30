import { useState, useEffect } from "react";
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
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetsingleTourMutation } from "@/redux/features/tour/tour.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetTourtypeQuery } from "@/redux/features/tour/tourType.api";
import { useGetDivisionsQuery } from "@/redux/features/Division/division.api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const SingleTourDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [getSingleTour, { data, isLoading }] = useGetsingleTourMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tourTypeData } = useGetTourtypeQuery(undefined)
  const { data: DivisionData } = useGetDivisionsQuery(undefined)
  const tourType = tourTypeData?.data?.data;
  const division = DivisionData?.data?.data;

  useEffect(() => {
    if (id) {
      getSingleTour(id);
    }
  }, [id]);

  const tour = data?.data;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && tour) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  // loading thakle 
  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-96 w-full rounded-xl mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-6" />
          </div>
          <div>
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // tour jodi na thake
  if (!tour) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <X className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Tour Not Found</h2>
        <p className="text-gray-500 mb-8">The tour you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/tours')}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Tours
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={'/tour'}>
              <Button
                variant="outline"
                onClick={() => navigate('/tours')}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Tours
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="rounded-full"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="rounded-full"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </Button>

              {/* Tour type */}
              {
                tourType.map((item: { _id: string, name: string }) => item._id === tour.tourType && (
                  <Badge className="bg-blue-100 text-blue-800 border-0">
                    {item.name}
                  </Badge>
                ))
              }
              {/* Tour type */}

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tour Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* division  */}
            {
              division.map((item: {
                _id: String,
                name: String,
                description: String,
                slug: String,
                thumbnail: String
              }) => item._id === tour.division && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.name}
                </Badge>
              ))
            }

            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Max {tour.maxGests || 8} guests
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Age {tour.minAge || 5}+
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {tour.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
              <span className="ml-2 text-gray-600 font-medium">4.8 (128 reviews)</span>
            </div>

            <div className="flex items-center text-blue-600 font-semibold">
              <Navigation className="w-4 h-4 mr-1" />
              {tour.location}
            </div>
          </div>
        </div>
        {/* Image Gallery */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={tour.images?.[activeImageIndex] || "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                {activeImageIndex + 1} / {tour.images?.length || 1}
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {tour.images?.slice(0, 4).map((image: any, index: any) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative h-24 rounded-lg overflow-hidden ${activeImageIndex === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              >
                <img
                  src={image}
                  alt={`${tour.title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">Inclusions</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Tour Description</h3>
                    <p className="text-gray-700 leading-relaxed">{tour.description}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Location Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Departure</h4>
                        <p className="text-gray-600">{tour.departureLocation}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Arrival</h4>
                        <p className="text-gray-600">{tour.arrivalLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="itinerary">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">Tour Plan</h3>
                  <div className="space-y-4">
                    {tour.tourPlan?.map((plan: any, index: any) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          {index < tour.tourPlan.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-300 my-2"></div>
                          )}
                        </div>
                        <div className="pb-4 flex-1">
                          <h4 className="font-semibold text-lg mb-2">Day {index + 1}</h4>
                          <p className="text-gray-600">{plan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="included">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700">
                      <Check className="w-5 h-5" />
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {tour.included?.map((item: any, index: any) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-700">
                      <X className="w-5 h-5" />
                      What's Excluded
                    </h4>
                    <ul className="space-y-3">
                      {tour.excluded?.map((item: any, index: any) => (
                        <li key={index} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Amenities & Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tour.amenities?.map((amenity: any, index: any) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="font-medium text-gray-800">{amenity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl shadow-lg border p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">${tour.costFrom}</span>
                  <span className="text-gray-500">per person</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Taxes and fees included</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(tour.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(tour.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">
                      {Math.ceil((new Date(tour.endDate).getTime() - new Date(tour.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link className="mb-3" to={`/tour-booking/${tour._id}`}>
                <Button

                  className="w-full py-6 text-lg font-semibold"
                  size="lg"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                </Link>


                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 text-center">
                    Free cancellation up to 24 hours before tour starts
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Need help?</h4>
                <Button variant="ghost" className="w-full justify-start">
                  Frequently Asked Questions
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Contact Support
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Terms & Conditions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-6">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="font-bold text-blue-900 mb-2">Cancellation Policy</h4>
              <p className="text-blue-800">
                Free cancellation 24 hours before the tour. 50% refund for cancellations made 12 hours before.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="font-bold text-green-900 mb-2">Safety Measures</h4>
              <p className="text-green-800">
                All guides are certified and follow strict safety protocols. Emergency contact available 24/7.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="font-bold text-purple-900 mb-2">Meeting Point</h4>
              <p className="text-purple-800">
                {tour.departureLocation}. Please arrive 15 minutes before the scheduled start time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTourDetails;