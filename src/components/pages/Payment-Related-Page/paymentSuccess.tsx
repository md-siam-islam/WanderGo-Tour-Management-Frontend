import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ArrowRight,
  Home,
  ShieldCheck,
  Calendar,
  CreditCard,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<number>(5);
  const [isAutoRedirecting, setIsAutoRedirecting] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData } = useUserInfoQuery(undefined);

  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get('transactionId') || 'TXN-' + Date.now().toString().slice(-8);
  const amount = searchParams.get('amount') || '0';

  // Format amount cleanly
  const formattedAmount = Number(amount) ? `৳${Number(amount).toLocaleString()}` : `৳${amount}`;

  // Countdown timer for automatic redirection to /user/booking
  useEffect(() => {
    if (!isAutoRedirecting) return;

    if (countdown <= 0) {
      navigate('/user/booking?payment=success');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, isAutoRedirecting, navigate]);

  const handleCopyTransaction = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    toast.success('Transaction ID copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full space-y-6">
        {/* Main Success Card */}
        <div className="bg-card rounded-3xl border border-border/80 shadow-xl overflow-hidden">
          {/* Celebratory Emerald Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 sm:p-10 text-center text-white relative overflow-hidden">
            {/* Ambient background circles */}
            <div className="absolute -top-12 -right-12 size-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 size-48 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex size-20 rounded-full bg-white/20 backdrop-blur-md items-center justify-center border-2 border-white/30 shadow-lg animate-bounce">
                <CheckCircle2 className="size-10 text-white" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="size-3 text-amber-300" />
                  <span>Verified by SSLCommerz</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-nunito tracking-tight text-white">
                  Payment Successful!
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base max-w-md mx-auto">
                  Your tour booking has been confirmed and updated in your traveler dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Auto Redirect Countdown Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-foreground">
              <div className="flex items-center gap-2 font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {isAutoRedirecting ? (
                    <>
                      Redirecting to your booking dashboard in{' '}
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                        {countdown}
                      </strong>{' '}
                      seconds...
                    </>
                  ) : (
                    'Auto-redirect paused.'
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isAutoRedirecting ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAutoRedirecting(false)}
                    className="h-7 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Pause
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCountdown(5);
                      setIsAutoRedirecting(true);
                    }}
                    className="h-7 text-xs font-semibold text-emerald-600"
                  >
                    Resume
                  </Button>
                )}
                <Button
                  asChild
                  size="sm"
                  className="bg-[#EF1A53] hover:bg-[#d81548] text-white h-8 px-4 rounded-xl font-bold text-xs shadow-xs"
                >
                  <Link to="/user/booking?payment=success">
                    <span>Go Now</span>
                    <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Key Payment Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                  <CreditCard className="size-3 text-emerald-600" /> Amount Paid
                </p>
                <p className="text-2xl font-black text-foreground font-nunito">{formattedAmount}</p>
                <p className="text-[11px] text-muted-foreground">All taxes & fees included</p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3 text-blue-600" /> Transaction ID
                  </span>
                  <button
                    onClick={handleCopyTransaction}
                    className="text-[#EF1A53] hover:underline flex items-center gap-1 text-[10px] font-bold"
                  >
                    {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </p>
                <p className="text-xs font-mono font-bold text-foreground break-all pt-1">
                  {transactionId}
                </p>
                <p className="text-[11px] text-muted-foreground">Gateway: SSLCommerz Secure</p>
              </div>
            </div>

            {/* Transaction Receipt Details */}
            <div className="rounded-2xl border border-border/60 p-5 space-y-3 bg-card/60">
              <h3 className="text-sm font-bold text-foreground font-nunito pb-2 border-b border-border/50 flex items-center justify-between">
                <span>Receipt Summary</span>
                <span className="text-xs text-muted-foreground font-normal flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Payer Name:</span>
                  <span className="font-semibold text-foreground">
                    {userData?.data?.name || 'Valued Traveler'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Payer Email:</span>
                  <span className="font-semibold text-foreground">
                    {userData?.data?.email || 'customer@wandergo.com'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="font-bold text-emerald-600 uppercase">Paid / Complete</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Instant Booking Confirmation:</span>
                  <span className="font-semibold text-foreground">Active in Dashboard</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                asChild
                className="w-full sm:flex-1 h-11 rounded-2xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm shadow-md"
              >
                <Link to="/user/booking?payment=success" className="flex items-center justify-center gap-2">
                  <span>Go to My Bookings</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={handlePrint}
                className="w-full sm:w-auto h-11 rounded-2xl font-semibold text-xs border-border/80 text-foreground"
              >
                <Printer className="size-4 mr-1.5" />
                Print Receipt
              </Button>

              <Button
                asChild
                variant="ghost"
                className="w-full sm:w-auto h-11 rounded-2xl font-semibold text-xs text-muted-foreground hover:text-foreground"
              >
                <Link to="/" className="flex items-center justify-center gap-1.5">
                  <Home className="size-4" />
                  <span>Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Support Note */}
        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          Need assistance with your booking? Contact our 24/7 concierge at{' '}
          <Link to="/about" className="text-[#EF1A53] hover:underline font-semibold">
            Support Center
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;