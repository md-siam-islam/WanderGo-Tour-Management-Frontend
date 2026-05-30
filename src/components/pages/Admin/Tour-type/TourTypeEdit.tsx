import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditTourtypeMutation} from "@/redux/features/tour/tourType.api";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  tourType: {
    _id: string;
    name: string;
  } | null;
};

const ToutTypeUpdateSchema = z.object({
  name: z.string().min(2, "Name is required"),
});

export function TourTypeEdit({
  open,
  onOpenChange,
  tourType,
}: Props) {

  const form = useForm<z.infer<typeof ToutTypeUpdateSchema>>({
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    if (tourType) {
      form.reset({
        name: tourType.name || "",
      });
    }
  }, [tourType, form]);

  const [editTourtype] = useEditTourtypeMutation();

  const onSubmit = async (data: z.infer<typeof ToutTypeUpdateSchema>) => {
    try {

      if (!tourType?._id) {
        console.log("Tour Type ID not found");
        toast.error("Tour Type ID not found");
        return;
      }

      const updatedData = {
        name: data.name
      };

      const result = await editTourtype({
        id: tourType._id,
        tourTypeData: updatedData,
      }).unwrap();

      onOpenChange(false);
      toast.success("Tour type updated successfully!");

    } catch (error) {
      console.error("Failed to update tour type", error);
      toast.error("Failed to update tour type");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="sm:max-w-[450px]">

        <DialogHeader>
          <DialogTitle>
            Tour Type Details
          </DialogTitle>

          <DialogDescription>
            Here is information of this Tour Type.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">

          <Form {...form}>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >

              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (

                    <FormItem>

                      <FormLabel className="mb-2">
                        Name
                      </FormLabel>

                      <FormControl>

                        <Input
                          type="text"
                          className="pl-4 pr-4 py-6 border-2 border-gray-200 hover:border-pink-300 focus:border-pink-400 transition-all rounded-xl"
                          {...field}
                        />

                      </FormControl>

                    </FormItem>

                  )}
                />

              </div>

              <div className="flex gap-3">

                <Button type="submit">
                  Update
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>

              </div>

            </form>

          </Form>

        </div>

      </DialogContent>

    </Dialog>
  );
}

export default TourTypeEdit;