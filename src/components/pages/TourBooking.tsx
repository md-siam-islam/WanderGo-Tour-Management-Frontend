import { useGetsingleTourMutation } from "@/redux/features/tour/tour.api";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
    //   CalendarDays, 
    Users,
    //   CreditCard, 
    MapPin,
    Clock,
    Building,
    Plane,
    Check,
    X,
    Heart,
    Share2,
    //   Calendar,
    User,
    Award,
    Shield,
    Star,
    Navigation
} from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useCreateBookingMutation } from "@/redux/features/Booking/booking.api";
// import { format } from "date-fns";

const TourBooking = () => {

    const [guests, setGuests] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);

    const [selectedImage, setSelectedImage] = useState(0);

    const [isFavorite, setIsFavorite] = useState(false);

    const [getSingleTour, { data, isLoading, isError }] = useGetsingleTourMutation();

    const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation()

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getSingleTour(id);
        }
    }, [id]);

    const tour = data?.data;

    const guestIncrement = () => {
        if (guests < tour?.maxGests) {
            setGuests(guests + 1);
        } else {
            toast.error(`Maximum ${tour?.maxGests} guests allowed`);
        }
    };

    const guestDecrement = () => {
        if (guests > 1) {
            setGuests(guests - 1);
        } else {
            toast.error("Minimum 1 guest required");
        }
    };

    useEffect(() => {
        if (!isLoading && !isError && tour?.costFrom) {
            setTotalAmount(guests * tour.costFrom);
        }
    }, [isLoading, isError, guests, tour?.costFrom]);

    // const formatDate = (date : any) => {
    //     if (!date) return "Not specified";
    //     return format(new Date(date), "PPP");
    // };

    const CreateBooking = async () => {

        
        const bookingData = {
            tour: id,
            guestCount: guests
        }
        
        // console.log(bookingData)

        try {

            const result = await createBooking(bookingData).unwrap()
            toast.success("Booking created successfully!")
            console.log("Booking result:", result);

        }catch (error : any) {
            toast.error(error?.data?.message || "Failed to create booking. Please try again.")
            console.error("Booking error:", error);
        }

    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[500px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="mt-6 text-lg text-gray-600">Loading tour details...</p>
                </div>
            </div>
        );
    }

    if (isError || !tour) {
        return (
            <div className="text-center py-16">
                <div className="text-red-500 text-6xl mb-6">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Tour Not Found</h3>
                <p className="text-gray-600 mb-8">The tour you're looking for is unavailable or doesn't exist.</p>
                <Button variant="default" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    //  const {data: userinfo , isLoading:UserInfoloading} = useUserInfoQuery(undefined)
    
            // if(!UserInfoloading && !userinfo?.data?.email){
            //     return <Navigate to="/login"/>
            // }

    return (
        <div className="bg-gray-100">

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-600">
                    <a href="/">Home</a> / <a href="/tour">Tours</a> / {tour.title}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tour Details (2/3 width) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tour Title and Actions */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-blue-100 text-[#EF1A53] rounded-full text-sm font-medium">
                                            {tour.tourType?.name || "Adventure"}
                                        </span>
                                        <span className="flex items-center gap-1 text-[#EF1A53]">
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} />
                                            <span className="text-gray-600 ml-1">(4.5)</span>
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{tour.title}</h1>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-[#EF1A53]" />
                                            <span>{tour.location || "Multiple Locations"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} className="text-[#EF1A53]" />
                                            <span>{tour.duration || "Flexible"} Days</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        <Heart
                                            size={22}
                                            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
                                        />
                                    </button>
                                    <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
                                        <Share2 size={22} className="text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {tour.images && tour.images.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex gap-2 mb-4">
                                {tour.images.slice(0, 4).map((img : any, index : any) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-1 h-24 overflow-hidden rounded-lg ${
                                            selectedImage === index ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Tour ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                            <div className="h-96 overflow-hidden rounded-xl">
                                <img
                                    src={tour.images[selectedImage]}
                                    alt="Tour main"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <p className="text-gray-700 leading-relaxed">
                                {tour.description || "No description available for this tour."}
                            </p>
                        </div>

                        {/* Tour Plan */}
                        {tour.tourPlan && tour.tourPlan.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Itinerary</h2>
                                <div className="space-y-6">
                                    {tour.tourPlan.map((plan: any, index: any) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 bg-[#EF1A53] text-white rounded-full flex items-center justify-center font-bold">
                                                    {index + 1}
                                                </div>
                                                {index < tour.tourPlan.length - 1 && (
                                                    <div className="w-0.5 h-full bg-gray-300 my-2"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-6">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Day {index + 1}</h3>
                                                <p className="text-gray-600">{plan}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        {tour.amenities && tour.amenities.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Facilities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {tour.amenities.map((amenity: any, index: any) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Award size={20} className="text-green-600" />
                                            <span className="text-gray-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Included/Excluded */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Included */}
                            {tour.included && tour.included.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-md p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Check className="text-green-600" />
                                        What's Included
                                    </h2>
                                    <ul className="space-y-3">
                                        {tour.included.map((item: any, index: any) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Excluded */}
                            {tour.excluded && tour.excluded.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-md p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <X className="text-red-600" />
                                        What's Excluded
                                    </h2>
                                    <ul className="space-y-3">
                                        {tour.excluded.map((item: any, index: any) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Booking Card (1/3 width) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                                {/* Booking Header */}
                                <div className="bg-[#EF1A53] p-6 text-white">
                                    <h2 className="text-2xl font-bold mb-2">Book This Tour</h2>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-white">Starting from</p>
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-bold">${tour.costFrom}</span>
                                                <span className="text-white/80 mb-1">per person</span>
                                            </div>
                                        </div>
                                        <Shield size={32} className="text-white/80" />
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="p-6 space-y-6">
                                    {/* Date Information */}
                                    <div className="space-y-4">

                                        {/* Location Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-pink-100 rounded-lg">
                                                <Plane className="text-[#EF1A53]" size={20} />
                                                <div>
                                                    <p className="text-sm text-black">Departure</p>
                                                    <p className="font-medium">{tour.departureLocation || "City Center"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                                                <Building className="text-[#EF1A53]" size={20} />
                                                <div>
                                                    <p className="text-sm text-black">Arrival</p>
                                                    <p className="font-medium">{tour.arrivalLocation || tour.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Guests Selector */}
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Users size={18} className="text-[#EF1A53]" />
                                                    <span className="font-medium text-gray-700">Number of Guests</span>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    Max: {tour.maxGests || "Unlimited"} guests
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                                                <button
                                                    onClick={guestDecrement}
                                                    disabled={guests <= 1}
                                                    className="w-12 h-12 rounded-full border-2 border-[#EF1A53] text-[#EF1A53] flex items-center justify-center hover:bg-red-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                                                >
                                                    <span className="text-2xl">-</span>
                                                </button>

                                                <div className="text-center">
                                                    <div className="text-5xl font-bold text-gray-900">{guests}</div>
                                                    <div className={`text-sm mt-1 ${guests === tour?.maxGests ? 'text-[#EF1A53]' : 'text-gray-500'
                                                        }`}>
                                                        {guests === tour?.maxGests
                                                            ? 'Maximum capacity reached'
                                                            : `${tour?.maxGests - guests} spots available`
                                                        }
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={guestIncrement}
                                                    disabled={guests >= (tour?.maxGests)}
                                                    className="w-12 h-12 rounded-full border-2 border-[#EF1A53] text-[#EF1A53] flex items-center justify-center hover:bg-green-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                                                >
                                                    <span className="text-2xl">+</span>
                                                </button>
                                            </div>

                                            {/* Age Requirement */}
                                            {tour.minAge && (
                                                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                                    <User size={14} />
                                                    <span>Minimum age requirement: {tour.minAge}+ years</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Price Breakdown */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h3 className="font-medium text-gray-700 mb-3">Price Breakdown</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-gray-600">
                                                    <span>${tour.costFrom} × {guests} guests</span>
                                                    <span>${tour.costFrom * guests}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-600">
                                                    <span>Service fee</span>
                                                    <span>$100</span>
                                                </div>
                                                <div className="border-t border-gray-300 pt-2 mt-2">
                                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                                        <span>Total Amount</span>
                                                        <span className="text-[#EF1A53]">${totalAmount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Button */}
                                    <Button onClick={CreateBooking}
                                        className="w-full py-6 text-lg font-semibold "
                                        size="lg"
                                    >
                                        <Navigation size={22} className="mr-2" />
                                        Book Now - ${totalAmount}
                                    </Button>

                                    {/* Additional Info */}
                                    <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
                                        <p>Free cancellation up to 24 hours before departure</p>
                                        <p className="mt-1">Instant confirmation • Best price guaranteed</p>
                                    </div>
                                </div>
                            </div>

                            {/* Safety Badges */}
                            <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Why Book With Us</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3">
                                        <Shield size={24} className="mx-auto text-blue-600 mb-2" />
                                        <p className="text-xs text-gray-600">Safe & Secure</p>
                                    </div>
                                    <div className="text-center p-3">
                                        <Check size={24} className="mx-auto text-[#EF1A53] mb-2" />
                                        <p className="text-xs text-gray-600">Verified Tours</p>
                                    </div>
                                    <div className="text-center p-3">
                                        <Clock size={24} className="mx-auto text-purple-600 mb-2" />
                                        <p className="text-xs text-gray-600">24/7 Support</p>
                                    </div>
                                    <div className="text-center p-3">
                                        <Star size={24} className="mx-auto text-yellow-600 mb-2" />
                                        <p className="text-xs text-gray-600">Best Price</p>
                                    </div>
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