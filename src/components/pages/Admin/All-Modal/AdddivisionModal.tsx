import SingleImageUploder from "@/components/SingleImageUploder"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/Division/division.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

export function Adddivision() {
    
const [isOpen, setIsOpen] = useState(false);
const [image , setImage] = useState<File | null>(null);

console.log("Selected image file from division: ", image);

  const tourTypeSchema = z.object({
    name: z.string().max(50, "Name must be at most 50 characters long"),
    description: z.string().max(500, "Description must be at most 200 characters long")
  })

  const form = useForm<z.infer<typeof tourTypeSchema>>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: { name: ""  , description: ""}
  })

  const [addDivision] = useAddDivisionMutation()


  const onsubmitHandle = async (data: z.infer<typeof tourTypeSchema>) => {

    const toastId = toast.loading("Adding division...");

        try {
            const fromData = new FormData();
            fromData.append("data" , JSON.stringify(data));
            fromData.append("file" , image as File);
            const result = await addDivision(fromData).unwrap();
            if(result.success){

                toast.success("Division added successfully!" , { id: toastId });
            }
            setIsOpen(false);
            form.reset();
        } catch (error) {
            toast.error("Failed to add division. Please try again.");
            console.error("Error adding division: ", error);
            return; 
        }
  }

  return (
    <div>
        <Button onClick={() => setIsOpen(true)}>Add Division</Button>

   {
    isOpen && (
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-card-foreground">Add Division</DialogTitle>
          {/* <DialogDescription>
            Add your Division.
          </DialogDescription> */}
        </DialogHeader>

        {/* Form Wrapper - Must be HERE */}
        <Form {...form}>
          <form className="space-y-5" id="type-form" onSubmit={form.handleSubmit(onsubmitHandle)}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Tour Type Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Textarea  placeholder="Write division details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </form>

          <SingleImageUploder onChange={setImage}/>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button form="type-form" type="submit">Add Division</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
   }
    </div>

  )
}
