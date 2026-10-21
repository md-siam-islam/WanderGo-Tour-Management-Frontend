import { useState } from "react";
import { Link } from "react-router";
import {
  Compass,
  Heart,
  Award,
  Globe2,
  ArrowRight,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Headphones,
  Leaf,
  Target,
  Eye,
  Quote,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Calendar,
  Mountain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function About() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const stats = [
    {
      icon: Users,
      value: 15000,
      suffix: "+",
      label: "Happy Travelers",
      desc: "Smiles shared across every tour",
    },
    {
      icon: MapPin,
      value: 250,
      suffix: "+",
      label: "Tour Destinations",
      desc: "From peaks to ocean shores",
    },
    {
      icon: Star,
      value: 99,
      suffix: "%",
      label: "Satisfaction Rate",
      desc: "5-star reviews and testimonials",
    },
    {
      icon: Award,
      value: 12,
      suffix: "+",
      label: "Years of Mastery",
      desc: "Trusted travel excellence since 2014",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Exploration",
      desc: "We believe travel has the profound power to enrich lives, broaden horizons, and create unforgettable bonds between people and nature.",
    },
    {
      icon: ShieldCheck,
      title: "Safety & Reliability First",
      desc: "Every tour package is meticulously planned with certified local guides, vetted transportation, first-aid trained leads, and 24/7 emergency care.",
    },
    {
      icon: Globe2,
      title: "Sustainable & Ethical Tourism",
      desc: "We respect local communities, support indigenous heritage, leave zero trace on trails, and actively preserve Bangladesh's natural ecosystems.",
    },
    {
      icon: Award,
      title: "Excellence & Transparent Value",
      desc: "Honest all-inclusive pricing with zero hidden surcharges. We ensure every single traveler receives world-class hospitality and peace of mind.",
    },
  ];

  const milestones = [
    {
      year: "2014",
      badge: "Inception",
      title: "The Humble Trailblazers",
      desc: "Started by a team of passionate backpackers eager to open ethical, unmapped trails across Bandarban, Keokradong, and Sreemangal tea hills.",
      stat: "1st Ethical Route Launched",
    },
    {
      year: "2019",
      badge: "Expansion",
      title: "Nationwide Reach & Eco-Standards",
      desc: "Expanded across all 8 administrative divisions with 50+ hand-curated itineraries, certified guide academies, and zero-trace conservation practices.",
      stat: "50+ Active Tour Routes",
    },
    {
      year: "2023",
      badge: "Innovation",
      title: "Smart Travel & 24/7 Support",
      desc: "Launched our full-featured digital platform with instant booking, SSLCommerz security, real-time safety monitoring, and verified traveler reviews.",
      stat: "10,000+ Bookings Milestone",
    },
    {
      year: "2026",
      badge: "Excellence",
      title: "South Asia's Premier Travel Platform",
      desc: "Proudly empowering 15,000+ explorers worldwide with personalized expedition planning, community reinvestment, and an industry-leading 99% satisfaction rate.",
      stat: "15,000+ Happy Explorers",
    },
  ];

  const team = [
    {
      name: "Tanvir Rahman",
      role: "Founder & Chief Explorer",
      dept: "leadership",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      experience: "12+ Yrs Exp",
      badge: "WFR Certified",
      treks: "140+ Expeditions",
      specialty: "Highland Summits & Trail Architecture",
      region: "Bandarban & Rangamati",
      quote:
        "Travel isn't about simply reaching a peak; it's about seeing our world with humble, curious, and open eyes.",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:tanvir@wandergo.com",
        instagram: "#",
      },
    },
    {
      name: "Sabrina Hossain",
      role: "Head of Safety & Field Logistics",
      dept: "operations",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      experience: "9+ Yrs Exp",
      badge: "Red Cross First Aid",
      treks: "220+ Groups Guided",
      specialty: "Emergency Evacuation & Certified Lodgings",
      region: "All Divisions",
      quote:
        "Your peace of mind and physical safety are our non-negotiable promises on every single kilometer.",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:sabrina@wandergo.com",
        instagram: "#",
      },
    },
    {
      name: "Nafis Ahmed",
      role: "Senior Nature & Cultural Guide",
      dept: "guides",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      experience: "10+ Yrs Exp",
      badge: "Certified Naturalist",
      treks: "160+ Eco Tours",
      specialty: "Sundarbans Wildlife & Indigenous Heritage",
      region: "Sundarbans & Khulna",
      quote:
        "When we tread softly across sacred trails, the wilderness whispers secrets that remain in our hearts forever.",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:nafis@wandergo.com",
        instagram: "#",
      },
    },
    {
      name: "Amina Faruque",
      role: "Director of Traveler Experience",
      dept: "experience",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      experience: "8+ Yrs Exp",
      badge: "Hospitality Lead",
      treks: "5,000+ Guests Served",
      specialty: "Bespoke Family Treks & Corporate Escapes",
      region: "Sylhet & Cox's Bazar",
      quote:
        "Crafting seamless, stress-free journeys that exceed every expectation is what turns travelers into lifelong family.",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "mailto:amina@wandergo.com",
        instagram: "#",
      },
    },
  ];

  const filteredTeam =
    selectedDepartment === "all"
      ? team
      : team.filter((m) => m.dept === selectedDepartment);

  const whyChooseUs = [
    {
      icon: Users,
      title: "Certified Local Experts",
      desc: "Every expedition is led by native guides fluent in local customs, indigenous lore, and secret viewpoints.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious Travel",
      desc: "We practice zero-trace camping, support solar eco-lodges, and reinvest directly into remote host villages.",
    },
    {
      icon: Headphones,
      title: "24/7 Concierge Support",
      desc: "From route customisation to live on-trail assistance, our support team is always just a quick tap away.",
    },
    {
      icon: Sparkles,
      title: "Best Price & Value Guarantee",
      desc: "Top-tier curated accommodations and premium transit with upfront pricing and zero hidden surcharges.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* =========================================================================
          1. HERO BANNER
         ========================================================================= */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden border-b">
        {/* Background Travel Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
            alt="WanderGo Tour Adventure Banner"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Deep Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/70 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-6 relative z-10 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
            <Compass className="w-4 h-4 text-[#EF1A53]" />
            <span>Discover The WanderGo Spirit</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md font-nunito">
            Crafting Unforgettable Journeys Across{" "}
            <span className="text-[#EF1A53]">Bangladesh</span> & Beyond
          </h1>

          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            WanderGo was founded with a singular purpose: to make authentic, safe, and exhilarating
            travel accessible to everyone. From misty mountain ridges to untouched coastlines, we
            connect curious souls with pure wonder.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#EF1A53] hover:bg-[#d81548] text-white px-8 rounded-full shadow-lg hover:shadow-pink-500/25 transition-all text-base font-semibold"
            >
              <Link to="/tour" className="flex items-center gap-2">
                Explore Our Tours <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:text-white px-8 rounded-full transition-all text-base font-semibold"
            >
              <a href="#our-story">Our Story & Mission</a>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ANIMATED STATS BAR
         ========================================================================= */}
      <section className="relative z-20 -mt-10 sm:-mt-14 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-xl backdrop-blur-md">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-muted/40"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-pink-500/10 text-[#EF1A53] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm font-bold text-foreground mt-1">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. REDESIGNED SECTION: OUR STORY & EVOLUTION
         ========================================================================= */}
      <section id="our-story" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider">
              <Compass className="size-3.5" />
              <span>Our Story & Evolution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-nunito tracking-tight leading-tight">
              Born from a Deep Love for{" "}
              <span className="bg-gradient-to-r from-[#EF1A53] via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Authentic Wilderness
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              In 2014, a small band of intrepid explorers set out on an unmapped hike through the remote
              mountain ridges of Bandarban. Mesmerized by the raw beauty of Bangladesh and moved by
              the warmth of indigenous communities, WanderGo was founded on a simple promise: to
              connect curious souls with pure wonder—safely, sustainably, and unforgettably.
            </p>
          </div>

          {/* Grid Layout: Interactive Milestones Timeline (Left) & Asymmetric Image Showcase (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Modern Connected Timeline (7 Cols) */}
            <div className="lg:col-span-7 relative">
              {/* Connecting Gradient Track Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#EF1A53] via-pink-400 to-muted-foreground/30 hidden sm:block" />

              <div className="space-y-6">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative group bg-card hover:bg-card/90 rounded-3xl border border-border/70 hover:border-[#EF1A53]/40 p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 sm:pl-16"
                  >
                    {/* Glowing Pin Marker */}
                    <div className="absolute left-3.5 top-6 size-5 rounded-full bg-background border-4 border-[#EF1A53] shadow-md group-hover:scale-125 transition-transform duration-300 hidden sm:flex items-center justify-center z-10" />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-xl bg-[#EF1A53] text-white text-xs font-black tracking-wide shadow-sm">
                          {m.year}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[11px] font-bold uppercase tracking-wider text-[#EF1A53] border-[#EF1A53]/30 bg-[#EF1A53]/5"
                        >
                          {m.badge}
                        </Badge>
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                        <CheckCircle2 className="size-3 text-emerald-500" />
                        {m.stat}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground font-nunito group-hover:text-[#EF1A53] transition-colors mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Asymmetric Visual Showcase with Floating KPI Badges (5 Cols) */}
            <div className="lg:col-span-5 relative">
              {/* Ambient decorative glowing backdrops */}
              <div className="absolute -top-10 -right-10 size-64 bg-[#EF1A53]/15 rounded-full filter blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 size-64 bg-amber-500/15 rounded-full filter blur-3xl pointer-events-none" />

              <div className="relative space-y-4">
                {/* Main Image 1: Mountains & Treks */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/80 group">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
                    alt="Highland Mountain Trekking"
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-wider font-bold text-pink-300">
                      Sajek Valley & Bandarban
                    </p>
                    <p className="font-bold text-base sm:text-lg">Uncharted Ridge Expeditions</p>
                  </div>
                </div>

                {/* Sub Image 2: Coastal Waters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/80 group">
                    <img
                      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                      alt="Coastal Adventure"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-white drop-shadow">
                      Pristine Coastlines
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/80 group">
                    <img
                      src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"
                      alt="Tea Garden Trails"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute bottom-2.5 left-2.5 text-[11px] font-bold text-white drop-shadow">
                      Lush Tea Highlands
                    </span>
                  </div>
                </div>

                {/* Floating Glassmorphic Trust Card */}
                <div className="p-4 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/80 shadow-2xl flex items-center gap-3.5">
                  <div className="size-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">
                      Govt. Registered Tour Operator
                    </p>
                    <p className="text-sm font-extrabold text-foreground">
                      License #WGO-BD-2014 • 100% Insured
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Duo-Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-8 rounded-3xl bg-card border border-border/70 hover:border-[#EF1A53]/40 shadow-xs hover:shadow-lg transition-all flex gap-5">
              <div className="size-14 rounded-2xl bg-[#EF1A53]/10 text-[#EF1A53] border border-[#EF1A53]/20 flex items-center justify-center shrink-0">
                <Target className="size-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-foreground font-nunito">Our Mission</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To unlock extraordinary, safe, and transformative travel journeys while directly
                  uplifting indigenous host communities and protecting Bangladesh's delicate natural
                  ecosystems.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/70 hover:border-[#EF1A53]/40 shadow-xs hover:shadow-lg transition-all flex gap-5">
              <div className="size-14 rounded-2xl bg-blue-500/10 text-blue-600 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Eye className="size-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-foreground font-nunito">Our Vision</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be South Asia's most trusted, sustainable, and technology-empowered travel
                  ecosystem, where every journey leaves a positive legacy for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CORE VALUES
         ========================================================================= */}
      <section className="py-24 bg-muted/20 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF1A53]">
              Our Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-nunito">
              Values That Define Every Adventure
            </h2>
            <p className="text-muted-foreground text-sm">
              We hold ourselves to the highest standards of traveler hospitality, safety, and cultural
              integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:border-[#EF1A53]/30 transition-all flex gap-5"
                >
                  <div className="size-14 rounded-2xl bg-pink-500/10 text-[#EF1A53] border border-pink-500/20 flex items-center justify-center shrink-0">
                    <Icon className="size-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground font-nunito">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. REDESIGNED SECTION: PASSIONATE PROFESSIONALS (LEADERSHIP & TEAM)
         ========================================================================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              <span>World-Class Expedition Leaders</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-nunito tracking-tight">
              Meet Our Leadership & Expedition Team
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Guided by certified mountaineers, wilderness first responders, cultural historians, and
              hospitality maestros dedicated to ensuring your adventure is safe, thrilling, and
              unforgettable.
            </p>

            {/* Department Filter Pills */}
            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {[
                { id: "all", label: "All Leaders" },
                { id: "leadership", label: "Executive Leadership" },
                { id: "operations", label: "Safety & Operations" },
                { id: "guides", label: "Field Naturalists" },
                { id: "experience", label: "Guest Concierge" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedDepartment(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedDepartment === tab.id
                      ? "bg-[#EF1A53] text-white shadow-md"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modern Professional Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTeam.map((member, idx) => (
              <div
                key={idx}
                className="group bg-card rounded-3xl border border-border/70 hover:border-[#EF1A53]/50 shadow-xs hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between transform hover:-translate-y-2"
              >
                <div>
                  {/* Portrait Photo Container */}
                  <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-muted">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Dark gradient overlay for typography readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Floating Experience Pill (Top-Right) */}
                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white text-[11px] font-bold shadow-md">
                      {member.experience}
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <p className="text-lg font-bold font-nunito leading-snug truncate drop-shadow">
                        {member.name}
                      </p>
                      <p className="text-xs text-white/85 font-medium truncate">{member.role}</p>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-5 space-y-3.5">
                    {/* Certification Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#EF1A53]/10 text-[#EF1A53] text-[10px] font-bold border border-[#EF1A53]/20">
                        {member.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-muted text-foreground text-[10px] font-medium border border-border/60">
                        {member.treks}
                      </span>
                    </div>

                    {/* Specialty & Region */}
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        Specialty Area
                      </p>
                      <p className="text-xs font-semibold text-foreground line-clamp-1">
                        {member.specialty}
                      </p>
                    </div>

                    {/* Inspiring Philosophy Quote */}
                    <div className="relative p-3 rounded-2xl bg-muted/40 border border-border/50">
                      <Quote className="size-3 text-[#EF1A53] mb-1" />
                      <p className="text-[11px] text-muted-foreground italic leading-relaxed line-clamp-3">
                        "{member.quote}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Social Connect Row */}
                <div className="px-5 pb-5 pt-2 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Connect
                  </span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={member.socials.linkedin}
                      className="size-7 rounded-lg bg-muted/60 hover:bg-[#EF1A53] hover:text-white text-muted-foreground flex items-center justify-center transition-all"
                      title="LinkedIn"
                    >
                      <Linkedin className="size-3.5" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      className="size-7 rounded-lg bg-muted/60 hover:bg-[#EF1A53] hover:text-white text-muted-foreground flex items-center justify-center transition-all"
                      title="Twitter"
                    >
                      <Twitter className="size-3.5" />
                    </a>
                    <a
                      href={member.socials.email}
                      className="size-7 rounded-lg bg-muted/60 hover:bg-[#EF1A53] hover:text-white text-muted-foreground flex items-center justify-center transition-all"
                      title="Email Direct"
                    >
                      <Mail className="size-3.5" />
                    </a>
                    <a
                      href={member.socials.instagram}
                      className="size-7 rounded-lg bg-muted/60 hover:bg-[#EF1A53] hover:text-white text-muted-foreground flex items-center justify-center transition-all"
                      title="Instagram"
                    >
                      <Instagram className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE WANDERGO PILLARS
         ========================================================================= */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EF1A53]">
              The WanderGo Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-nunito">
              Why 15,000+ Explorers Choose Us
            </h2>
            <p className="text-muted-foreground text-sm">
              We eliminate the stress of travel planning so you can focus entirely on making
              unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-card border border-border/70 hover:border-[#EF1A53]/40 shadow-sm transition-all hover:scale-[1.02] text-center space-y-3"
                >
                  <div className="size-12 mx-auto rounded-2xl bg-[#EF1A53]/10 text-[#EF1A53] flex items-center justify-center">
                    <Icon className="size-6" />
                  </div>
                  <h4 className="font-bold text-base text-foreground font-nunito">{w.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. REDESIGNED SECTION: CALL TO ACTION BOX (WITH CRISP BACKGROUND IMAGE)
         ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-14 md:p-16 text-center text-white shadow-2xl border border-white/20">
            {/* Crisp Scenic Travel Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
                alt="Scenic Adventure Travel Road"
                className="w-full h-full object-cover scale-105 filter brightness-95"
              />
              {/* Multi-stage ambient gradients for maximum depth, vibrance, & readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/85" />
              <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/30 to-black/80" />
            </div>

            {/* CTA Box Content */}
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <Badge className="bg-[#EF1A53] text-white border-0 font-bold px-4 py-1.5 text-xs uppercase tracking-wider shadow-lg">
                <Sparkles className="size-3.5 mr-1.5 inline" /> Start Your Adventure
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-nunito drop-shadow-md leading-tight">
                Ready to Embark On Your Next Expedition?
              </h2>

              <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow">
                Join 15,000+ happy travelers who trust WanderGo to craft memories that last a
                lifetime. From misty hill summits to serene coastal tides—your dream tour is waiting.
              </p>

              {/* Trust Badges Row */}
              <div className="pt-2 pb-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/90">
                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  <CheckCircle2 className="size-3.5 text-emerald-400" /> Instant Confirmation
                </span>
                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  <ShieldCheck className="size-3.5 text-pink-400" /> 100% Verified Tours
                </span>
                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  <Star className="size-3.5 text-amber-400 fill-amber-400" /> Best Price Guarantee
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#EF1A53] hover:bg-[#d81548] text-white px-8 h-12 rounded-full shadow-xl font-bold text-sm sm:text-base transition-transform active:scale-95"
                >
                  <Link to="/tour" className="flex items-center gap-2">
                    <span>Find Your Dream Destination</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white bg-white/15 backdrop-blur-md hover:bg-white/25 hover:text-white px-8 h-12 rounded-full font-bold text-sm sm:text-base transition-transform active:scale-95"
                >
                  <Link to="/about">Talk to Tour Specialists</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}