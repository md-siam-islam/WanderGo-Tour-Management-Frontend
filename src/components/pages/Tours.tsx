import type { ITourresponse } from '@/Alltypes/tour.type';
import { useGetAlltourQuery } from '@/redux/features/tour/tour.api';
import { Button } from '../ui/button';
import { MapPin, Users, Calendar, DollarSign, Star } from 'lucide-react';
import { useGetTourtypeQuery } from '@/redux/features/tour/tourType.api';

const Tours = () => {
  const { data: toursData } = useGetAlltourQuery(undefined);
  const { data: tourTypeData } = useGetTourtypeQuery(undefined)
  const tours = toursData?.data?.data;
  const tourType = tourTypeData?.data?.data;

  return (
    <div className='mt-3'>
      {/* Header Section */}
      <div className="text-center mb-32 bg-cover bg-center bg-no-repeat w-full py-56" style={{ backgroundImage : "url('/src/assets/BannerImage/Tours-Banner.jpg')"}}>


        <h1 className="text-4xl font-bold text-white mb-4">Explore Amazing Tours</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Discover unforgettable experiences and immersive adventures, carefully crafted to match your interests, passions, and travel dreams. From breathtaking destinations to unique cultural journeys, we bring you personalized tours that turn every moment into a lifelong memory.
        </p>

      </div>

      <div className="container mx-auto my-10 px-4">

        {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {tours?.map((tour: ITourresponse) => (
          <div
            key={tour._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Tour Image */}
            <div className="relative h-56 overflow-hidden">
              {tour.images && tour.images.length > 0 ? (
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              )}

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-700">{tour.costFrom}</span>
                </div>
              </div>

              {
                tourType.map((item: { _id: string, name: string }) => item._id === tour.tourType && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.name || "Genarel"}
                    </span>
                  </div>
                ))
              }



            </div>

            {/* Tour Content */}
            < div className="p-6" >
              {/* Title and Location */}
              <div className="mb-4" >
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{tour.title}</h3>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{tour.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 line-clamp-2">
                {tour.description}
              </p>

              {/* Tour Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Max Guests</p>
                    <p className="font-semibold">{tour.maxGests || 10} </p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Calendar className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Min Age</p>
                    <p className="font-semibold">{tour.minAge}+</p>
                  </div>
                </div>
              </div>

              {/* Amenities Preview */}
              {tour.amenities && tour.amenities.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {tour.amenities.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        +{tour.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Included/Excluded Preview */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-semibold text-green-700 mb-1">Included:</p>
                    <ul className="space-y-1">
                      {tour.included?.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-600 line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 mb-1">Excluded:</p>
                    <ul className="space-y-1">
                      {tour.excluded?.slice(0, 2).map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-gray-600 line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-gray-300 fill-current" />
                  <span className="ml-2 text-sm text-gray-500">4.8</span>
                </div>
                <Button className="bg-[#FF2056] from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                  View Details
                </Button>
              </div>
            </div>
          </div >
        ))}
      </div >

      {/* Load More Button (Optional) */}
      {
        tours && tours.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-2 border-blue-#FF2056 text-blue-600 hover:bg-blue-50"
            >
              Load More Tours
            </Button>
          </div>
        )
      }

      {/* Empty State */}
      {
        (!tours || tours.length === 0) && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Tours Available</h3>
            <p className="text-gray-500 mb-8">Check back later for exciting tour packages!</p>
            <Button className="px-6 py-3">Refresh</Button>
          </div>
        )
      }

      </div>

      
    </div >
  );
};

export default Tours;