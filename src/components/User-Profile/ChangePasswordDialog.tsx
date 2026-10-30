import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Lock, Eye, EyeOff, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ChangePasswordDialogProps {
  triggerButton?: React.ReactNode;
}

export default function ChangePasswordDialog({ triggerButton }: ChangePasswordDialogProps) {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword) {
      toast.error("Please enter your current password.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    const toastId = toast.loading("Updating password...");
    try {
      const res = await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success(res?.message || "Password updated successfully!", { id: toastId });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (err: any) {
      console.error("Change password error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to update password", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-border/80 text-xs font-semibold gap-1.5"
          >
            <KeyRound className="size-3.5 text-[#EF1A53]" />
            <span>Change Password</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-3xl p-6 font-sans">
        <DialogHeader className="space-y-1">
          <div className="size-10 rounded-2xl bg-[#EF1A53]/10 text-[#EF1A53] flex items-center justify-center mb-1">
            <Lock className="size-5" />
          </div>
          <DialogTitle className="text-xl font-bold font-nunito">
            Change Account Password
          </DialogTitle>
          <DialogDescription className="text-xs">
            Enter your current password and choose a secure new password for your account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Current Password */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">Current Password</Label>
            <div className="relative">
              <Input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="pr-10 rounded-xl h-10 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showOld ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">New Password</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter at least 6 characters"
                className="pr-10 rounded-xl h-10 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-foreground">Confirm New Password</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="pr-10 rounded-xl h-10 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Password Security Tip */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Use a unique password with a mixture of letters, numbers, and symbols.</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !oldPassword || !newPassword || !confirmPassword}
            className="w-full h-10 rounded-xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-xs shadow-md mt-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="size-4 animate-spin" />
                <span>Updating Password...</span>
              </div>
            ) : (
              <span>Save New Password</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
