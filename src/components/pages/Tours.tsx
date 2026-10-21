import type { ITourresponse } from '@/Alltypes/tour.type';
import { useGetAlltourQuery } from '@/redux/features/tour/tour.api';
import { Button } from '../ui/button';
import { MapPin, Users, Calendar, Star } from 'lucide-react';
import { useGetTourtypeQuery } from '@/redux/features/tour/tourType.api';
import { Link } from 'react-router';
import { useGetDivisionsQuery } from '@/redux/features/Division/division.api';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const Tours = () => {

  const priceRangeSchema = z.object({
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  })

  const [selectedDivision, setSelectedDivision] = useState<string | undefined>("");
  const [selectedtourType, setSelectedTourType] = useState<string | undefined>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log(currentPage);

  const form = useForm<z.infer<typeof priceRangeSchema>>({
    resolver: zodResolver(priceRangeSchema),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
    },
  })

  const priceRangeHandle = (data: z.infer<typeof priceRangeSchema>) => {
    console.log({
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
    });
  }

  const { data: toursData, isLoading: tourLoading } = useGetAlltourQuery({ division: selectedDivision || undefined, tourType: selectedtourType || undefined, minPrice: form.watch("minPrice") || undefined, maxPrice: form.watch("maxPrice") || undefined, page: currentPage, limit: 9 });

  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourtypeQuery(undefined);
  const { data: DivisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);



  const tours = toursData?.data?.data ?? [];

  const TotalPages = toursData?.data?.meta?.totalPage || 1;

  const tourType = tourTypeData?.data?.data ?? [];

  const tourtypeOptions = tourTypeData?.data?.data?.map((type: { _id: string, name: string }) => {

    return { value: type._id, label: type.name }

  })

  const divisionypeOptions = DivisionData?.data?.data?.map((type: { _id: string, name: string }) => {

    return { value: type._id, label: type.name }

  })



  return (
    <div className='mt-3'>
      {/* Header Section */}
      <div className="text-center mb-32 bg-cover bg-center bg-no-repeat w-full py-56" style={{ backgroundImage: "url('/src/assets/BannerImage/Tours-Banner.jpg')" }}>


        <h1 className="text-4xl font-bold text-white mb-4">Explore Amazing Tours</h1>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Discover unforgettable experiences and immersive adventures, carefully crafted to match your interests, passions, and travel dreams. From breathtaking destinations to unique cultural journeys, we bring you personalized tours that turn every moment into a lifelong memory.
        </p>

      </div>

      {/* full container before banner */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>

            {/* left side container */}

        <div className='md:col-span-3 p-5'>

          <div className='flex flex-col'>

            <div className='flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-5 border border-pink-300'> {/* Example background color */}

              {/* division filter */}

              <div className='w-full'>
                <Label className='mb-2'> Division to visit</Label>

                <Select value={selectedDivision} onValueChange={(value) => setSelectedDivision(value)} disabled={divisionLoading}>

                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>

                      <SelectLabel>Division</SelectLabel>
                      {
                        divisionypeOptions?.map(
                          (item: { value: string, label: string }) => (

                            <SelectItem key={item.value} value={item.value}>{item.label} </SelectItem>
                          ))
                      }
                    </SelectGroup>
                  </SelectContent>

                </Select>

              </div>

              {/* tour type filter */}
              <div className='w-full'>
                <Label className='mb-2'> Tour Type</Label>

                <Select value={selectedtourType} onValueChange={(value) => setSelectedTourType(value)} disabled={tourTypeLoading}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select a tour type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>

                      <SelectLabel>Tour Type</SelectLabel>
                      {
                        tourtypeOptions?.map(
                          (item: { value: string, label: string }) => (

                            <SelectItem key={item.value} value={item.value}>{item.label} </SelectItem>
                          ))
                      }
                    </SelectGroup>
                  </SelectContent>

                </Select>

              </div>

              <div className='w-full'>
                <Button onClick={() => { setSelectedDivision(""); setSelectedTourType(""); }} className=' px-6 py-3 w-full'>Reset</Button>
              </div>

            </div>

            {/* division price range */}
            <div className='mt-5 bg-white rounded-2xl py-5 px-2 border border-pink-300'>

              <Form {...form}>

                <form className='flex flex-col items-center justify-center gap-4 px-4' onSubmit={form.handleSubmit(priceRangeHandle)}>
                  <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                      <FormItem className='w-full flex-1'>
                        <Label className='mb-2'>Min Price</Label>
                        <FormControl>
                          <Input className='w-full' type="number" placeholder="Enter Your minPrice " {...field} />
                        </FormControl>
                      </FormItem>

                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                      <FormItem className='w-full flex-1'>
                        <Label className='mb-2'>Max Price</Label>
                        <FormControl>
                          <Input className='w-full' type="number" placeholder="Enter Your maxPrice " {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button onClick={() => form.reset()} type="button" className="flex-initial w-full px-6 mt-1">
                    Reset
                  </Button>

                </form>
              </Form>

            </div>

          </div>

        </div>


        {/* right ride container */}
        <div className='md:col-span-9 p-5 rounded-2xl '>

          <div className='w-full'>
              {/* Tours Grid */}
            <div className="px-4">


              {/* Tours Grid & Skeleton State */}
              {tourLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-xs animate-pulse"
                    >
                      <div className="h-56 bg-muted/60" />
                      <div className="p-6 space-y-4">
                        <div className="h-6 w-3/4 bg-muted/80 rounded-md" />
                        <div className="h-4 w-1/2 bg-muted/60 rounded-md" />
                        <div className="space-y-2 py-1">
                          <div className="h-3.5 w-full bg-muted/40 rounded-md" />
                          <div className="h-3.5 w-4/5 bg-muted/40 rounded-md" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="h-10 bg-muted/40 rounded-xl" />
                          <div className="h-10 bg-muted/40 rounded-xl" />
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-border/40">
                          <div className="h-4 w-20 bg-muted/40 rounded-md" />
                          <div className="h-9 w-28 bg-muted/60 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : tours && tours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour: ITourresponse) => (
                    <div
                      key={tour._id}
                      className="bg-card rounded-2xl border border-border/60 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                    >
                      {/* Tour Image */}
                      <div className="relative h-56 overflow-hidden bg-muted">
                        {tour.images && tour.images.length > 0 ? (
                          <img
                            src={tour.images[0]}
                            alt={tour.title}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt={tour.title}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        )}

                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-muted-foreground">From</span>
                            <span className="font-extrabold text-[#EF1A53] text-sm">৳{tour.costFrom?.toLocaleString()}</span>
                          </div>
                        </div>

                        {tourType.map((item: { _id: string, name: string }) => item._id === tour.tourType && (
                          <div key={item._id} className="absolute top-4 left-4">
                            <span className="bg-[#EF1A53] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                              {item.name || "General"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tour Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title and Location */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-foreground mb-1.5 line-clamp-1 font-nunito">{tour.title}</h3>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin className="w-4 h-4 mr-1.5 text-[#EF1A53] shrink-0" />
                              <span className="truncate">{tour.location}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground text-xs leading-relaxed mb-5 line-clamp-2">
                            {tour.description || "Discover unforgettable destinations and scenic views carefully curated for adventurous travelers."}
                          </p>

                          {/* Tour Details */}
                          <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-muted/40 border border-border/50">
                              <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg">
                                <Users className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Max Guests</p>
                                <p className="font-bold text-xs">{tour.maxGests || (tour as any).maxGuests || "1"} Guests</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-muted/40 border border-border/50">
                              <div className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Min Age</p>
                                <p className="font-bold text-xs">{tour.minAge ? `${tour.minAge}+ Yrs` : "All Ages"}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-between items-center pt-4 border-t border-border/60 mt-auto">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            ))}
                            <span className="ml-1.5 text-xs font-semibold text-muted-foreground">4.9</span>
                          </div>
                          <Link to={`/tour-details/${tour._id}`}>
                            <Button className="bg-[#EF1A53] hover:bg-[#d81548] text-white px-5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State: Only shown when search/filter returns 0 items and NOT loading */
                <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-border/80 bg-muted/15">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#EF1A53]/10 flex items-center justify-center text-[#EF1A53]">
                    <MapPin className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">No Matching Tours Found</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn't find any tours matching your active division or price filters. Try adjusting your search criteria.
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedDivision("");
                      setSelectedTourType("");
                      form.reset();
                    }}
                    className="px-6 py-2 rounded-xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-semibold text-xs"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}

            </div>

            {/* Pagination */}
            <div className='my-8'>

              {
                TotalPages > 1 && (
                  <Pagination>
                    <PaginationContent>

                      <PaginationItem>
                        <PaginationPrevious className={
                          currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                        } onClick={() => setCurrentPage((prev) => prev - 1)} />
                      </PaginationItem>

                      {Array.from({ length: TotalPages }, (_, i) => i + 1).map((page) => (

                        <PaginationItem>
                          <PaginationLink isActive={page === currentPage} onClick={() => setCurrentPage(page)}>{page}</PaginationLink>
                        </PaginationItem>

                      ))}


                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext className={
                          currentPage === TotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                        } onClick={() => setCurrentPage((prev) => prev + 1)} />
                      </PaginationItem>

                    </PaginationContent>
                  </Pagination>
                )
              }

            </div>

          </div>

        </div>

      </div>



    </div >
  );
};

export default Tours;