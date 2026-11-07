import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import SEO from "@/components/shared/SEO";
import wanderGoLogo from "@/assets/images/WanderGoLOgo2.png";
import {
  ShieldCheck,
  Mail,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Lock,
  ArrowLeft,
  KeyRound,
  Edit2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendotpMutation, useVerifyotpMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from query param or state
  const queryParams = new URLSearchParams(location.search);
  const initialEmail =
    location.state?.email ||
    (typeof location.state === "string" ? location.state : "") ||
    queryParams.get("email") ||
    "";

  const from = location.state?.from || "/";

  const [email, setEmail] = useState<string>(initialEmail);
  const [isEditingEmail, setIsEditingEmail] = useState<boolean>(!initialEmail);
  const [tempEmail, setTempEmail] = useState<string>(initialEmail);

  const [otpCode, setOtpCode] = useState<string>("");
  const [hasSentOtp, setHasSentOtp] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(4);

  const [sendOtp, { isLoading: isSending }] = useSendotpMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyotpMutation();

  // Timer countdown effect for OTP resend
  useEffect(() => {
    if (!hasSentOtp || countdown <= 0 || isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [hasSentOtp, countdown, isSuccess]);

  // Post-verification auto-redirect countdown
  useEffect(() => {
    if (!isSuccess) return;

    if (redirectCountdown <= 0) {
      navigate(from || "/", { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSuccess, redirectCountdown, navigate, from]);

  // Send OTP handler
  const handleSendOtp = async (targetEmail = email) => {
    const cleanEmail = targetEmail.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const toastId = toast.loading("Sending 6-digit verification code...");
    try {
      const res = await sendOtp({ email: cleanEmail }).unwrap();
      if (res.success) {
        setHasSentOtp(true);
        setCountdown(60);
        setIsEditingEmail(false);
        setEmail(cleanEmail);
        toast.success("Verification code sent! Please check your inbox.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("OTP send error:", error);
      const msg =
        error?.data?.message ||
        error?.message ||
        "Failed to send verification code. Please try again.";
      toast.error(msg, { id: toastId });
    }
  };

  // Submit OTP Verification
  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit verification code.");
      return;
    }

    const toastId = toast.loading("Verifying code...");
    try {
      const res = await verifyOtp({ email, otp: otpCode }).unwrap();
      if (res.success) {
        toast.success("Account successfully verified!", { id: toastId });
        setIsSuccess(true);
      }
    } catch (error: any) {
      console.error("OTP verify error:", error);
      const msg =
        error?.data?.message ||
        error?.message ||
        "Invalid or expired verification code. Please check and try again.";
      toast.error(msg, { id: toastId });
    }
  };

  const handleSaveEmail = () => {
    if (!tempEmail || !tempEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmail(tempEmail);
    setIsEditingEmail(false);
    handleSendOtp(tempEmail);
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-between py-10 px-4 sm:px-6 relative overflow-hidden font-sans">
      <SEO
        title="Verify Your Account | WanderGo"
        description="Verify your WanderGo account with a secure one-time passcode (OTP)."
      />
      {/* Decorative ambient background blur */}
      <div className="absolute -top-32 -left-32 size-96 bg-[#EF1A53]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between pb-6 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <img
            src={wanderGoLogo}
            alt="WanderGo"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <Link to="/login" className="flex items-center gap-1.5">
            <ArrowLeft className="size-3.5" />
            <span>Back to Login</span>
          </Link>
        </Button>
      </header>

      {/* Main Card Container */}
      <main className="max-w-lg w-full mx-auto relative z-10">
        <div className="bg-card rounded-3xl border border-border/80 shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Top Banner Gradient */}
          <div className="bg-gradient-to-r from-[#EF1A53] via-rose-600 to-amber-600 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 size-36 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="size-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-md">
                {isSuccess ? (
                  <CheckCircle2 className="size-8 text-emerald-300 animate-bounce" />
                ) : hasSentOtp ? (
                  <KeyRound className="size-8 text-white" />
                ) : (
                  <Mail className="size-8 text-white" />
                )}
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="size-3 text-amber-300" />
                  <span>
                    {isSuccess
                      ? "Verification Complete"
                      : hasSentOtp
                      ? "Step 2: Enter OTP"
                      : "Step 1: Confirm Email"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-nunito tracking-tight">
                  {isSuccess
                    ? "Account Verified!"
                    : hasSentOtp
                    ? "Enter Verification Code"
                    : "Verify Your Email"}
                </h1>
                <p className="text-white/90 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  {isSuccess
                    ? "Your traveler account is fully authenticated and ready for adventure."
                    : hasSentOtp
                    ? "We sent a 6-digit security code to your email inbox."
                    : "Confirm your email address below to receive your one-time verification code."}
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* SUCCESS STATE */}
            {isSuccess ? (
              <div className="space-y-6 text-center py-4">
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                  <div className="size-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <ShieldCheck className="size-8" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    Email Confirmed Successfully
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    Your email address <strong className="text-foreground">{email}</strong> has
                    been verified. You now have full access to bookings, wishlist, and reviews.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      Redirecting to dashboard in{" "}
                      <strong className="text-sm font-bold">{redirectCountdown}</strong> seconds...
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate(from || "/")}
                  className="w-full h-11 rounded-2xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm shadow-md"
                >
                  <span>Continue to WanderGo</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </div>
            ) : hasSentOtp ? (
              /* OTP INPUT STATE (STEP 2) */
              <form onSubmit={handleVerify} className="space-y-6">
                {/* Email Chip with Edit Option */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/70 text-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="size-8 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] flex items-center justify-center shrink-0">
                      <Mail className="size-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        Code sent to
                      </p>
                      <p className="font-semibold text-foreground truncate">{email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHasSentOtp(false);
                      setIsEditingEmail(true);
                      setTempEmail(email);
                    }}
                    className="text-[#EF1A53] hover:underline flex items-center gap-1 font-semibold text-xs shrink-0 ml-2"
                  >
                    <Edit2 className="size-3" />
                    <span>Change</span>
                  </button>
                </div>

                {/* 6-Digit OTP Field */}
                <div className="space-y-3 flex flex-col items-center">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Enter 6-Digit Code
                  </label>
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={(val) => setOtpCode(val)}
                    containerClassName="flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <InputOTPGroup className="gap-2 sm:gap-2.5">
                      <InputOTPSlot
                        index={0}
                        className="size-11 sm:size-12 rounded-xl border-2 border-border/80 focus:border-[#EF1A53] text-lg font-bold shadow-xs text-foreground"
                      />
                      <InputOTPSlot
                        index={1}
                        className="size-11 sm:size-12 rounded-xl border-2 border-border/80 focus:border-[#EF1A53] text-lg font-bold shadow-xs text-foreground"
                      />
                      <InputOTPSlot
                        index={2}
                        className="size-11 sm:size-12 rounded-xl border-2 border-border/80 focus:border-[#EF1A53] text-lg font-bold shadow-xs text-foreground"
                      />
                    </InputOTPGroup>

                    <span className="text-muted-foreground font-black text-sm px-0.5">•</span>

                    <InputOTPGroup className="gap-2 sm:gap-2.5">
                      <InputOTPSlot
                        index={3}
                        className="size-11 sm:size-12 rounded-xl border-2 border-border/80 focus:border-[#EF1A53] text-lg font-bold shadow-xs text-foreground"
                      />
                      <InputOTPSlot
                        index={4}
                        className="size-11 sm:size-12 rounded-xl border-2 border-border/80 focus:border-[#EF1A53] text-lg font-bold shadow-xs text-foreground"
                      />
                      <InputOTPSlot
                        index={5}
                        className="size-11 sm:size-12 rounded-xl border-2 border-border/80 focus:border-[#EF1A53] text-lg font-bold shadow-xs text-foreground"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Check your spam or promotions tab if code does not appear within a minute.
                  </p>
                </div>

                {/* Countdown & Resend Section */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                    <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                    {countdown > 0 ? (
                      <span>
                        Resend in{" "}
                        <strong className="text-foreground font-bold">
                          {Math.floor(countdown / 60)}:
                          {(countdown % 60).toString().padStart(2, "0")}
                        </strong>
                      </span>
                    ) : (
                      <span className="text-foreground">Code expired</span>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={countdown > 0 || isSending}
                    onClick={() => handleSendOtp()}
                    className="text-[#EF1A53] hover:text-[#d81548] font-bold text-xs h-8 px-2.5"
                  >
                    <RefreshCw className={`size-3.5 mr-1.5 ${isSending ? "animate-spin" : ""}`} />
                    <span>Resend Code</span>
                  </Button>
                </div>

                {/* Verify Button */}
                <Button
                  type="submit"
                  disabled={otpCode.length !== 6 || isVerifying}
                  className="w-full h-11 rounded-2xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="size-4 animate-spin" />
                      <span>Verifying Security Code...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <ShieldCheck className="size-4" />
                      <span>Verify & Complete Registration</span>
                      <ArrowRight className="size-4 ml-1" />
                    </div>
                  )}
                </Button>
              </form>
            ) : (
              /* CONFIRM EMAIL STATE (STEP 1) */
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Recipient Email Address
                    </label>
                    {!isEditingEmail && email && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingEmail(true);
                          setTempEmail(email);
                        }}
                        className="text-[#EF1A53] hover:underline text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit2 className="size-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {isEditingEmail ? (
                    <div className="space-y-2">
                      <Input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="h-10 rounded-xl text-sm"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        {email && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditingEmail(false)}
                            className="h-7 text-xs"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSaveEmail}
                          className="h-7 text-xs bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold rounded-lg"
                        >
                          <Check className="size-3 mr-1" />
                          <span>Save & Send</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] flex items-center justify-center shrink-0">
                        <Mail className="size-4" />
                      </div>
                      <p className="font-bold text-foreground text-sm break-all">
                        {email || "No email provided"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-border/50 p-4 space-y-2 text-xs text-muted-foreground bg-card/60">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      We use verification codes to keep traveler accounts safe and verify bookings.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lock className="size-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>The verification code expires automatically after 2 minutes.</span>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => handleSendOtp()}
                  disabled={!email || isSending || isEditingEmail}
                  className="w-full h-11 rounded-2xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm shadow-md"
                >
                  {isSending ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="size-4 animate-spin" />
                      <span>Sending 6-Digit Code...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="size-4" />
                      <span>Send 6-Digit Verification Code</span>
                      <ArrowRight className="size-4 ml-1" />
                    </div>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Help */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Having trouble receiving the code? Contact WanderGo concierge at{" "}
          <Link to="/about" className="text-[#EF1A53] hover:underline font-semibold">
            Support Center
          </Link>
          .
        </p>
      </main>

      {/* Empty Footer Spacer */}
      <div className="py-2" />
    </div>
  );
}
