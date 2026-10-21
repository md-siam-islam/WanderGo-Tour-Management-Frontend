import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useForgotPasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { KeyRound, Mail, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      const res = await forgotPassword({ email: values.email }).unwrap();
      if (res?.success) {
        setSubmittedEmail(values.email);
        setIsSubmitted(true);
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(res?.message || "Failed to send reset link.");
      }
    } catch (error: any) {
      const errorMsg =
        error?.data?.message || error?.message || "Failed to send reset link. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl p-8 border border-gray-200 dark:border-zinc-800 rounded-xl bg-card shadow-sm">
        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-bold text-foreground">Check Your Email</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              We have sent a password reset link to{" "}
              <span className="font-semibold text-foreground">{submittedEmail}</span>.
              Please check your inbox and click the link to reset your password.
            </p>

            <div className="p-3 bg-muted/60 rounded-lg text-xs text-muted-foreground max-w-md mx-auto">
              Tip: The link will expire in 10 minutes. If you do not see it, please check your Spam/Junk folder.
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
              >
                Send to another email
              </Button>
              <Button asChild>
                <Link to="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground">
                Forgot Your Password?
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
                No worries! Enter your registered email address and we'll send you a secure link to reset your password.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Enter your registered email"
                            className="pe-10"
                            {...field}
                          />
                          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
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
