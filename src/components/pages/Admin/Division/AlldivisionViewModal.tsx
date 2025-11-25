import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  division: {
    name?: string;
    slug?: string;
    description?: string;
    thumbnail?: string;
  } | null;
};

export function AlldivisionView({ open, onOpenChange, division }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        
        <DialogHeader>
          <DialogTitle>Division Details</DialogTitle>
          <DialogDescription>
            Here is information of this division.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input disabled defaultValue={division?.name || ""} />
          </div>

          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input disabled defaultValue={division?.slug || ""} />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea disabled defaultValue={division?.description || ""} />
          </div>

        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
