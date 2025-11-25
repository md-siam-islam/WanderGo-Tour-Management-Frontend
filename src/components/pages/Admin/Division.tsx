import { Button } from "@/components/ui/button";
import { Adddivision } from "./All-Modal/AdddivisionModal";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetDivisionsQuery } from "@/redux/features/Division/division.api";
import { sl, th } from "zod/v4/locales";
import { Deleteconfrimation } from "@/components/modules/All-Confrim-File/deleteconfrimation";

const Division = () => {


  const handleDelete = (divisionId: string) => {
    console.log("Delete division with ID: ", divisionId);
  }

  type divisiondataType = {
    _id: String,
    name: String,
    description: String,
    slug: String,
    thumbnail: String
  }

  const { data } = useGetDivisionsQuery(undefined);
  console.log("Division data: ", data?.data);

  return (
    <div className="">

      <div className="bg-white rounded-xl shadow-sm border p-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Divisions</h2>
    <Adddivision />
  </div>

  <Table className="min-w-full">
    <TableHeader>
      <TableRow className="bg-muted/40">
        <TableHead className="font-semibold text-left">Name</TableHead>
        <TableHead className="font-semibold text-left">Description</TableHead>
        <TableHead className="font-semibold text-center">Slug</TableHead>
        <TableHead className="font-semibold text-center w-[180px]">Action</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {data?.data?.data?.map((item: divisiondataType) => (
        <TableRow
          key={item._id as string}
          className="hover:bg-gray-50 transition duration-150"
        >
          <TableCell className="font-medium">{item.name}</TableCell>

          <TableCell className="text-gray-600 line-clamp-2">
            {item.description || "—"}
          </TableCell>

          <TableCell className="text-center text-gray-700">
            {item.slug}
          </TableCell>

          <TableCell>
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Pencil size={15} />
                Edit
              </Button>

              <Button variant="outline" size="sm" className="gap-1 text-primary">
                <Eye size={15} />
                View
              </Button>

              <Deleteconfrimation
                onConfirm={() => handleDelete(item._id as string)}
              >
                <Button variant="destructive" size="sm" className="gap-1">
                  <Trash2 size={15} />
                  Delete
                </Button>
              </Deleteconfrimation>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

    </div>
  );
};

export default Division;