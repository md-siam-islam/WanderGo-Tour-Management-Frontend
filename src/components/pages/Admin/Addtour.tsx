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
import { useCreateTourMutation } from "@/redux/features/tour/tour.api";
import { useGetTourtypeQuery } from "@/redux/features/tour/tourType.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { Calendar1Icon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


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

  const [addTour] = useCreateTourMutation();

  const tourSchema = z.object({

    title: z.string().min(1, "Title is required"),
    location: z.string().min(1, "Location is required"),
    costFrom: z.coerce.number().min(1, "Cost must be a positive number"),
    maxGests: z.coerce.number().min(1, "Max guests must be a number"),
    minAge: z.coerce.number().min(1, "Min age is required"),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour type is required"),
    startDate: z.date("Start date is required").optional(),
    endDate: z.date("End date is required").optional(),
    departureLocation: z.string().min(1, "Departure location required"),
    arrivalLocation: z.string().min(1, "Arrival location required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    included: z.array(z.object({ value: z.string().min(1, "Included item is required") })),
    excluded: z.array(z.object({ value: z.string().min(1, "Excluded item is required") })),
    amenities: z.array(z.object({ value: z.string().min(1, "Excluded item is required") })),
  });


  const form = useForm({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      location: "",
      costFrom: 0,
      maxGests: 0,
      minAge: 0,
      division: "",
      tourType: "",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      departureLocation: "",
      arrivalLocation: "",
      description: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included"
  })
  const { fields: excludedFields, append: appendExcluded, remove: removeExcluded } = useFieldArray({
    control: form.control,
    name: "excluded"
  })
  const { fields: amenitiesFields, append: appendamenities, remove: removeamenities } = useFieldArray({
    control: form.control,
    name: "amenities"
  })


  const handlesubmit = async (data: z.infer<typeof tourSchema>) => {
    const tostId = toast.loading("Adding tour....")

    const tourData = {
      ...data,
      costFrom: Number(data.costFrom),
      maxGests: Number(data.maxGests),
      minAge: Number(data.minAge),
      startDate: data.startDate ? formatISO(data.startDate) : undefined,
      endDate: data.endDate ? formatISO(data.endDate) : undefined,
      included : data.included.map((item: {value : string}) => item.value),
      excluded : data.excluded.map((item: {value : string}) => item.value),
      amenities : data.excluded.map((item: {value : string}) => item.value),
    };

    console.log("Tour Data", tourData);

    const formData = new FormData();

    image.forEach((img) => {
      if (img instanceof File) {
        formData.append("files", img);
      }
    })

    formData.append("data", JSON.stringify(tourData));
    try {
      const result = await addTour(formData).unwrap()
      if (result.success) {
        toast.success("Tour added successfully!", { id: tostId });
      }
      form.reset()
      console.log(result)

    } catch (error) {
      toast.error("Failed to add tour.", { id: tostId });
      console.log(error)
    }

  };

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
                      <Input type="number" className="w-full" placeholder="Enter Tour CostFrom" {...field} />
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
                      <Input type="number" className="w-full" placeholder="Enter Tour Max Gests" {...field} value={field.value ?? ""} />
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
                      <Input type="number" className="w-full" placeholder="Enter Tour Min Gests" {...field} value={field.value ?? ""} />
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
            {/* Image Upload Section */}

             {/* Included part start  */}
            <div className="flex items-center gap-3">
              <p className="flex-1">Append Included </p>
              <Button variant="outline" type="button" onClick={() => append({ value: "" })}>
                <Plus size={15} />
              </Button>
            </div>

            <div>
              {
                fields.map((item, index) => (

                  <div className="flex items-center justify-center gap-2 mt-3">
                    <FormField
                      control={form.control}
                      name={`included.${index}.value`}
                      key={item.id}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" className="w-full" placeholder="Enter Included Item" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="button" onClick={ () => remove(index) } >
                      <Trash2 size={15} />
                    </Button>
                  </div>

                ))
              }
            </div>
            {/* Included part end  */}


             {/* Excluded part start */}
            <div className="flex items-center gap-3">
              <p className="flex-1">Append Excluded </p>
              <Button variant="outline" type="button" onClick={() => appendExcluded({ value: "" })}>
                <Plus size={15} />
              </Button>
            </div>

            <div>
              {
                excludedFields.map((item, index) => (

                  <div className="flex items-center justify-center gap-2 mt-3">
                    <FormField
                      control={form.control}
                      name={`excluded.${index}.value`}
                      key={item.id}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" className="w-full" placeholder="Enter Excluded Item" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="button" onClick={ () => removeExcluded(index) } >
                      <Trash2 size={15} />
                    </Button>
                  </div>

                ))
              }
            </div>

            {/* Excluded part end  */}

            <div className="flex items-center gap-3">
              <p className="flex-1">Append Excluded </p>
              <Button variant="outline" type="button" onClick={() => appendamenities({ value: "" })}>
                <Plus size={15} />
              </Button>
            </div>

              <div>
              {
                amenitiesFields.map((item:any, index) => (

                  <div className="flex items-center justify-center gap-2 mt-3">
                    <FormField
                      control={form.control}
                      name={`amenities.${index}.value`}
                      key={item.id}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input type="text" className="w-full" placeholder="Enter Excluded Item" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="button" onClick={ () => removeamenities(index) } >
                      <Trash2 size={15} />
                    </Button>
                  </div>

                ))
              }
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