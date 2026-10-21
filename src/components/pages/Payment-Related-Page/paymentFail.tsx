import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  AlertCircle,
  RotateCcw,
  CreditCard,
  HelpCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Home,
  Headphones,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const PaymentFail = () => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get('transactionId') || 'TXN-FAILED';
  const amount = searchParams.get('amount') || '0';
  const rawError = searchParams.get('error') || '';

  // Clean error message
  const errorMessage =
    rawError && rawError !== 'undefined'
      ? decodeURIComponent(rawError)
      : 'The payment transaction was declined or could not be completed by the payment gateway.';

  const formattedAmount = Number(amount) ? `৳${Number(amount).toLocaleString()}` : `৳${amount}`;

  const handleCopyTransaction = () => {
    navigator.clipboard.writeText(transactionId);
    setCopied(true);
    toast.success('Transaction ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full space-y-6">
        {/* Main Error Card */}
        <div className="bg-card rounded-3xl border border-red-500/30 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 p-8 sm:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute -top-12 -right-12 size-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 size-48 bg-red-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex size-20 rounded-full bg-white/20 backdrop-blur-md items-center justify-center border-2 border-white/30 shadow-lg animate-pulse">
                <AlertCircle className="size-10 text-white" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldAlert className="size-3 text-white" />
                  <span>Transaction Not Completed</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-nunito tracking-tight text-white">
                  Payment Failed
                </h1>
                <p className="text-rose-100 text-sm sm:text-base max-w-md mx-auto">
                  No funds were deducted from your account. You can review the details below and try
                  again safely.
                </p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Specific Diagnosis Alert Box */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                <AlertCircle className="size-4 shrink-0" />
                <span>Error Diagnosis</span>
              </div>
              <p className="text-sm text-foreground font-medium leading-relaxed pl-6">
                {errorMessage}
              </p>
            </div>

            {/* Transaction Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1">
                  <CreditCard className="size-3 text-[#EF1A53]" /> Attempted Amount
                </p>
                <p className="text-2xl font-black text-foreground font-nunito">{formattedAmount}</p>
                <p className="text-[11px] text-muted-foreground">Status: UNPAID</p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider flex items-center justify-between">
                  <span>Reference ID</span>
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
                <p className="text-[11px] text-muted-foreground">Gateway: SSLCommerz Sandbox/Live</p>
              </div>
            </div>

            {/* Troubleshooting Guide */}
            <div className="rounded-2xl border border-border/60 p-5 space-y-3 bg-card/60">
              <h3 className="text-sm font-bold text-foreground font-nunito flex items-center gap-2">
                <HelpCircle className="size-4 text-[#EF1A53]" />
                <span>How to resolve this issue:</span>
              </h3>

              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#EF1A53] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">Verify Account Balance & Limits:</strong> Ensure
                    sufficient balance and check if online e-commerce transactions are active on your
                    card or mobile wallet (bKash/Nagad).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#EF1A53] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">Check OTP / 2FA:</strong> Ensure you enter the
                    one-time password (OTP) sent by your bank before the timer expires.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#EF1A53] mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">Try Another Payment Option:</strong> You can
                    switch between Visa, Mastercard, bKash, or Nagad easily on the checkout gateway.
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                asChild
                className="w-full sm:flex-1 h-11 rounded-2xl bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm shadow-md"
              >
                <Link to="/user/booking" className="flex items-center justify-center gap-2">
                  <RotateCcw className="size-4" />
                  <span>Go to My Bookings & Retry</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-11 rounded-2xl font-semibold text-xs border-border/80 text-foreground"
              >
                <Link to="/about" className="flex items-center justify-center gap-1.5">
                  <Headphones className="size-4 text-[#EF1A53]" />
                  <span>Contact Support</span>
                </Link>
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

        {/* Reassurance Footer */}
        <p className="text-center text-xs text-muted-foreground leading-relaxed">
          Your booking is safely preserved in your dashboard under <strong>Pending Payments</strong>.
          You can complete it at any time without losing your reserved tour spot.
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;