import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useAddTourtypeMutation } from "@/redux/features/tour/tour.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

export function AddtourtypeModal() {
    
const [isOpen, setIsOpen] = useState(false);
  const tourTypeSchema = z.object({
    name: z.string().max(50, "Name must be at most 50 characters long")
  })

  const form = useForm<z.infer<typeof tourTypeSchema>>({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: { name: "" }
  })

  const [Addtype] = useAddTourtypeMutation()

  const onsubmitHandle = async (data: z.infer<typeof tourTypeSchema>) => {
    
    try {
        const result = await Addtype({name : data.name}).unwrap()
        if(result.success){
            toast.success("Tour Type Add Successfull")
            form.reset()
            setIsOpen(false)
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
        <Button onClick={() => setIsOpen(true)}>Add Tour type</Button>

   {
    isOpen && (
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tour type</DialogTitle>
          <DialogDescription>
            Add your tour type name here.
          </DialogDescription>
        </DialogHeader>

        {/* Form Wrapper - Must be HERE */}
        <Form {...form}>
          <form id="type-form" onSubmit={form.handleSubmit(onsubmitHandle)}>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Tour Type Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button form="type-form" type="submit">Add Tour Type</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
   }
    </div>








    // <Dialog>
    //   <DialogTrigger onClick={() => setIsOpen(true)} asChild>
    //     <Button>Add Tour type</Button>
    //   </DialogTrigger>

    //   <DialogContent className="sm:max-w-[425px]">
    //     <DialogHeader>
    //       <DialogTitle>Add Tour type</DialogTitle>
    //       <DialogDescription>
    //         Add your tour type name here.
    //       </DialogDescription>
    //     </DialogHeader>

    //     {/* Form Wrapper - Must be HERE */}
    //     <Form {...form}>
    //       <form id="type-form" onSubmit={form.handleSubmit(onsubmitHandle)}>

    //         <FormField
    //           control={form.control}
    //           name="name"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Name</FormLabel>
    //               <FormControl>
    //                 <Input placeholder="Enter Tour Type Name" {...field} />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //       </form>
    //     </Form>

    //     <DialogFooter>
    //       <DialogClose asChild>
    //         <Button variant="outline">Cancel</Button>
    //       </DialogClose>

    //       <Button form="type-form" type="submit">Add Tour Type</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  )
}
