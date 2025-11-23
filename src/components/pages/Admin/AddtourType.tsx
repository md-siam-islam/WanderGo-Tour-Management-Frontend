import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourtypeQuery, useRemoveTourtypeMutation } from "@/redux/features/tour/tour.api";
import { Trash2, Pencil, Eye } from "lucide-react";
import { AddtourtypeModal } from "./Tour-type/AddtourtypeModal";
import { Deleteconfrimation } from "@/components/modules/All-Confrim-File/deleteconfrimation";
import { toast } from "sonner";

const AddtourType = () => {
  const { data } = useGetTourtypeQuery(undefined);

  const [deleteTourtype] = useRemoveTourtypeMutation();

  const handaleTourtypeDelete = async(tourId: string) => {
      const tostId = toast.loading("Deleting tour type...");
      try {
        const result = await deleteTourtype(tourId).unwrap();
        if(result.success){
          toast.success("Tour type deleted successfully", { id: tostId });
        }
      } catch (error) {
        toast.error("Failed to delete tour type", { id: tostId });
      }
  }

  return (
    <div className="flex  flex-col">
      <div className="flex justify-between my-4">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddtourtypeModal />
      </div>

      <div className="border border-accent-foreground my-8 rounded-xl shadow-sm p-4 bg-white dark:bg-neutral-900">

        <h2 className="text-xl font-semibold mb-4">Tour Type List<span> ({data?.data?.data?.length || 0}) </span></h2>

        <Table>

          {/* <TableCaption>Manage all tour types here</TableCaption> */}
          {/* Table Head */}

          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="font-semibold text-left">Name</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {data?.data?.data?.map(
              (item: { _id: string; name: string }) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-muted/30 transition-all"
                >
                  <TableCell className="font-medium">{item.name}</TableCell>

                  <TableCell className="text-right space-x-2">

                    {/* Edit Button */}
                    <Button variant="outline" size="sm" className="gap-1">
                      <Pencil size={16} />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye size={16} />
                      View
                    </Button>

                    {/* Delete Button */}
                    <Deleteconfrimation onConfirm={() => handaleTourtypeDelete(item._id)}>  
                      <Button variant="destructive" size="sm" className="gap-1">
                      <Trash2 size={16} />
                      Delete
                    </Button>
                    </Deleteconfrimation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddtourType;
