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
  tourType: {
    name?: string;
  } | null;
};

export function AllTourTypeviewModal({ open, onOpenChange, tourType }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        
        <DialogHeader>
          <DialogTitle>Tour Type Details</DialogTitle>
          <DialogDescription>
            Here is information of this Tour Type.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input disabled defaultValue={tourType?.name || ""} />
          </div>

        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
