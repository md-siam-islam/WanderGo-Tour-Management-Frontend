import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router";
import Password from "@/components/ui/password";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must be at most 100 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!id || !token) {
      toast.error("Invalid reset link. Missing user ID or token.");
      return;
    }

    try {
      const res = await resetPassword({
        id,
        token,
        newPassword: values.newPassword,
      }).unwrap();

      if (res?.success) {
        setIsSuccess(true);
        toast.success("Password reset successfully! Please login with your new password.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res?.message || "Failed to reset password.");
      }
    } catch (error: any) {
      const errorMsg =
        error?.data?.message ||
        error?.message ||
        "Failed to reset password. The link may be invalid or expired.";
      toast.error(errorMsg);
    }
  };

  // If id or token is missing from URL query
  if (!id || !token) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-6xl p-8 border border-red-200 dark:border-red-950/50 rounded-xl bg-card shadow-sm text-center space-y-4">
          <div className="mx-auto w-14 h-14 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Invalid Reset Link</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            The password reset link is missing required parameters or has expired. Please request a new password reset link.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button asChild variant="outline">
              <Link to="/login">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
              </Link>
            </Button>
            <Button asChild>
              <Link to="/forgot-password">Request New Link</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl p-8 border border-gray-200 dark:border-zinc-800 rounded-xl bg-card shadow-sm">
        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Password Reset Successful!</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Your password has been reset successfully. Redirecting you to the login page...
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link to="/login">
                  Go to Login Now <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground">
                Set New Password
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
                Create a strong and secure password for your WanderGo account.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Password placeholder="Enter new password (min. 6 characters)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Password placeholder="Re-enter your new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-foreground hover:underline font-medium underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
