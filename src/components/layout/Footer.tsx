import { useState } from "react";
import { Link } from "react-router";
import wanderGoLogo from "@/assets/images/WanderGoLOgo2.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Send,
  ArrowRight,
  Compass,
  CreditCard,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to WanderGo Travel Deals!");
    setEmail("");
  };

  return (
    <footer className="bg-zinc-950 text-zinc-100 border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient gradient glow */}
      <div className="absolute top-0 left-1/4 size-96 bg-[#EF1A53]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* =========================================================================
          1. TOP VALUE TRUST STRIP
         ========================================================================= */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="size-10 rounded-full bg-[#EF1A53]/10 border border-[#EF1A53]/20 flex items-center justify-center text-[#EF1A53]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">100% Verified Tours</p>
                <p className="text-xs text-zinc-400">Rigorously vetted itineraries</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="size-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">No Hidden Fees</p>
                <p className="text-xs text-zinc-400">Transparent upfront pricing</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="size-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Compass className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Certified Guides</p>
                <p className="text-xs text-zinc-400">Expert local knowledge</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 justify-center sm:justify-start">
              <div className="size-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <CreditCard className="size-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Secure Payments</p>
                <p className="text-xs text-zinc-400">256-bit encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN FOOTER CONTENT GRID
         ========================================================================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Contact Column (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              to="/"
              className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={wanderGoLogo}
                alt="WanderGo"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              WanderGo is Bangladesh’s premier tour management platform. We craft
              unforgettable travel memories with certified guides, luxury transport,
              and authentic cultural discoveries.
            </p>

            <div className="space-y-3 pt-1 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-[#EF1A53] shrink-0" />
                <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-[#EF1A53] shrink-0" />
                <span>+880 1800-WANDER (926337)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-[#EF1A53] shrink-0" />
                <span>support@wandergo.travel</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-9 rounded-full bg-white/5 hover:bg-[#EF1A53] text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={s.label}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Top Destinations (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#EF1A53] pl-2.5">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              {[
                "Cox's Bazar Beach",
                "Sreemangal Tea Gardens",
                "Sundarbans Mangrove",
                "Bandarban & Nilgiri",
                "Sajek Cloud Valley",
                "Saint Martin Coral Isle",
              ].map((dest, i) => (
                <li key={i}>
                  <Link
                    to="/tour"
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <ArrowRight className="size-3 text-[#EF1A53]/80" />
                    <span>{dest}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tour Categories (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#EF1A53] pl-2.5">
              Tour Styles
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              {[
                "Adventure & Trekking",
                "Cultural & Heritage",
                "Family Friendly Trips",
                "Indulgence & Luxury",
                "Relaxation Escapes",
                "Wildlife Expeditions",
              ].map((cat, i) => (
                <li key={i}>
                  <Link
                    to="/tour"
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <ArrowRight className="size-3 text-[#EF1A53]/80" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#EF1A53] pl-2.5">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              {[
                { label: "About WanderGo", path: "/about" },
                { label: "All Tour Packages", path: "/tour" },
                { label: "Become a Tour Guide", path: "/user/apply-guide" },
                { label: "Traveler Reviews", path: "/#reviews" },
                { label: "Safety & Guidelines", path: "/about" },
                { label: "Login / Register", path: "/login" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <ArrowRight className="size-3 text-[#EF1A53]/80" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter & Deals (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#EF1A53] pl-2.5">
              Newsletter
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe to get exclusive seasonal discounts, promo coupons, and
              curated weekend travel tips.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#EF1A53] text-white placeholder:text-zinc-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Subscribe</span>
                <Send className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM COPYRIGHT & LEGAL BAR
         ========================================================================= */}
      <div className="border-t border-white/10 bg-black/40 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="text-center sm:text-left flex items-center gap-1">
            <span>© 2026 WanderGo Ltd. All rights reserved. Built with</span>
            <Heart className="size-3.5 text-[#EF1A53] fill-current inline" />
            <span>for passionate explorers.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Cancellation & Refund
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
