import MultupulImageUpload from "@/components/MultupulImageUpload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/Division/division.api";
import { useGetTourtypeQuery } from "@/redux/features/tour/tourType.api";
import { format, formatISO } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";


const Addtour = () => {

  const [image, setImage] = useState<(File | FileMetadata)[]>([]);

  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourtypeLOading } = useGetTourtypeQuery(undefined);

  const divisiondataQuery = divisionData?.data?.data?.map((item: { _id: string, name: string }) => ({
    value: item._id,
    leable: item.name
  }))
  const TourtypedataQuery = tourTypeData?.data?.data.map((item: { _id: string, name: string }) => ({
    value: item._id,
    leable: item.name
  }))

  console.log("divisiondata", divisionData)

  const handlesubmit = (data: any) => {

    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
    }
     
    const formData = new FormData();

  image.forEach((img) => {
  if (img instanceof File) {
    formData.append("files", img);
  }

  formData.append("data", JSON.stringify(tourData));


});

    console.log("tourData", tourData)
    console.log("Image from create", image)
  }

  const form = useForm({
    defaultValues: {
      title: "",
      location: "",
      costFrom: "",
      maxGests: "",
      minAge: "",
      division: "",
      tourType: "",
      startDate: undefined,
      endDate: undefined,
      departureLocation: "",
      arrivalLocation: "",
      description: ""
    }
  })
  return (
    <div className=" flex justify-center items-center border border-accent-foregroundrounded rounded-2xl mt-5">

      <div className="max-w-7xl w-full mx-auto p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlesubmit)} className="space-y-6">
            {/* tour name  */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Tour Tutle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              {/* location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter Tour Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* costFrom */}
              <FormField
                control={form.control}
                name="costFrom"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CostFrom</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter Tour CostFrom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-5">
              {/* maxGests */}
              <FormField
                control={form.control}

                name="maxGests"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Max Gests</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter Tour Max Gests" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* minAge */}
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Min Gests</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter Tour Min Gests" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Division</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>

                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Division" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>

                        {divisiondataQuery?.map((item: { value: string, leable: string }) => (
                          <SelectItem disabled={divisionLoading} value={item.value}>{item.leable}</SelectItem>
                        ))}

                      </SelectContent>
                      <FormMessage />

                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tour Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>

                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Tour Type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>

                        {TourtypedataQuery?.map((item: { value: string, leable: string }) => (
                          <SelectItem disabled={tourtypeLOading} value={item.value}>{item.leable}</SelectItem>
                        ))}

                      </SelectContent>
                      <FormMessage />

                    </Select>
                  </FormItem>
                )}
              />


            </div>

            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a Date</span>
                            )}
                            <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a Date</span>
                            )}
                            <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>



            <div className="flex gap-5">
              {/* departureLocation */}
              <FormField
                control={form.control}
                name="departureLocation"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Departure Location</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter Tour Departure Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* arrivalLocation */}
              <FormField
                control={form.control}
                name="arrivalLocation"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Arrival Location</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter Tour Arrival Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            {/* description + images section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[250px]"
                        placeholder="Enter Tour Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload Section */}
              <div className="flex-1">
                <FormLabel className="block mb-2">Upload Images</FormLabel>

                <div className="border rounded-xl p-4 bg-muted/30 min-h-[250px]">
                  <MultupulImageUpload onChange={setImage} />
                </div>
              </div>
            </div>


            <Button type="submit" className="w-full">
              Add Tour
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default Addtour;