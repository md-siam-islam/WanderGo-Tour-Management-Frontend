import { Link } from "react-router";
import {
  Compass,
  Heart,
  Shield,
  Award,
  Globe2,
  ArrowRight,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Headphones,
  Leaf,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function About() {
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
      title: "The Humble Beginning",
      desc: "Started by a group of passionate backpackers eager to showcase the untouched beauty of Bandarban and Sylhet to travelers.",
    },
    {
      year: "2019",
      title: "Nationwide Expansion",
      desc: "Expanded across all divisions with 50+ hand-curated itineraries, certified guide training, and strict eco-tourism standards.",
    },
    {
      year: "2026",
      title: "Premier Travel Platform",
      desc: "Empowering 15,000+ happy explorers with instant smart bookings, verified customer reviews, and personalized travel management.",
    },
  ];

  const team = [
    {
      name: "Tanvir Rahman",
      role: "Founder & Chief Explorer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      specialty: "Highland Treks & Expedition Strategy",
      quote: "Travel isn't about reaching a destination; it's about seeing the world with fresh eyes.",
    },
    {
      name: "Sabrina Hossain",
      role: "Head of Safety & Logistics",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      specialty: "Emergency Response & Verified Accommodations",
      quote: "Your comfort and safety are our highest commitment on every kilometer of the journey.",
    },
    {
      name: "Nafis Ahmed",
      role: "Senior Nature & Cultural Guide",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      specialty: "Sundarbans Wildlife & Indigenous Heritage",
      quote: "When we tread softly, nature whispers secrets that stay in our hearts forever.",
    },
    {
      name: "Amina Faruque",
      role: "Traveler Experience Manager",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      specialty: "Custom Itineraries & Group Experiences",
      quote: "Crafting customized journeys that exceed every expectation is what drives us every day.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Certified Local Experts",
      desc: "Every expedition is led by native guides fluent in local customs, wildlife, and secret viewpoints.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious Travel",
      desc: "We promote leave-no-trace ethics, support eco-resorts, and reinvest directly into indigenous host villages.",
    },
    {
      icon: Headphones,
      title: "24/7 Concierge Support",
      desc: "From trip planning to live on-trail assistance, our support team is always just a quick call away.",
    },
    {
      icon: Sparkles,
      title: "Best Price & Value Guarantee",
      desc: "Top-tier curated accommodations and transportation with upfront pricing and zero hidden fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Banner with Image Background */}
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
            <Compass className="w-4 h-4 text-[#EC003F]" />
            <span>Discover The WanderGo Spirit</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Crafting Unforgettable Journeys Across{" "}
            <span className="text-[#EC003F]">Bangladesh</span> & Beyond
          </h1>

          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
            WanderGo was founded with a singular purpose: to make authentic, safe, and exhilarating travel accessible to everyone. From misty mountain ridges to untouched coastlines, we connect curious souls with pure wonder.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#EC003F] hover:bg-[#d30037] text-white px-8 rounded-full shadow-lg hover:shadow-pink-500/25 transition-all text-base font-semibold"
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

      {/* 2. Interactive Animated Stats Counter Bar */}
      <section className="relative z-20 -mt-10 sm:-mt-14 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-card border border-border/70 shadow-xl backdrop-blur-md">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:bg-muted/40"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-pink-500/10 text-[#EC003F] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm font-bold text-foreground mt-1">
                  {s.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. NEW SECTION: Our Story & Journey Timeline */}
      <section id="our-story" className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Narrative & Milestones */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#EC003F]">
                  Our Story & Evolution
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                  Born from a Deep Love for Authentic Wilderness
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  More than a decade ago, our founders embarked on an unmapped hike through the rugged trails of Thanchi. What they discovered wasn't just stunning landscapes, but deep human warmth and stories waiting to be told.
                </p>
              </div>

              {/* Milestones list */}
              <div className="space-y-4 pt-2">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-muted/40 border border-border/60 hover:border-[#EC003F]/30 transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#EC003F] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                      {m.year}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground text-base">
                        {m.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Mountain Hiking Tour"
                  className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-lg hover:scale-[1.02] transition-transform duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  alt="Tropical Beach Expedition"
                  className="w-full h-64 sm:h-80 object-cover rounded-3xl shadow-lg mt-8 hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border/80 p-4 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Verified Tour Operator
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Govt. Registered & Insured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-24 bg-muted/20 border-y">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EC003F]">
              Our Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Values That Define Every Adventure
            </h2>
            <p className="text-muted-foreground text-sm">
              We hold ourselves to the highest standards of traveler hospitality, safety, and cultural integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:border-[#EC003F]/30 transition-all flex gap-5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-[#EC003F] border border-pink-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. NEW SECTION: Meet Our Expedition Leaders */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EC003F]">
              Passionate Professionals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Meet Our Leadership & Expedition Team
            </h2>
            <p className="text-muted-foreground text-sm">
              Guided by experienced explorers, certified safety officers, and nature enthusiasts dedicated to your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="rounded-3xl border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-lg font-bold truncate">{member.name}</p>
                      <p className="text-xs text-white/80">{member.role}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <Badge variant="outline" className="text-xs font-medium text-primary border-primary/20 bg-primary/5">
                      {member.specialty}
                    </Badge>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      "{member.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEW SECTION: Why Choose WanderGo Pillars */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EC003F]">
              The WanderGo Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Why 15,000+ Explorers Choose Us
            </h2>
            <p className="text-muted-foreground text-sm">
              We eliminate the stress of travel so you can focus entirely on making unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-card border border-border/70 hover:border-primary/40 shadow-sm transition-all hover:scale-[1.02] text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-foreground">
                    {w.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Call To Action Box */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center text-white bg-zinc-950 shadow-2xl border border-white/10">
            {/* Ambient Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
                alt=""
                className="w-full h-full object-cover filter blur-xs opacity-25 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
            </div>

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <Badge className="bg-[#EC003F] text-white border-0 font-semibold px-4 py-1 text-xs uppercase tracking-wider">
                Start Your Adventure
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Ready to Embark On Your Next Expedition?
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Join thousands of happy travelers who trust WanderGo to craft memories that last a lifetime. Book your dream tour today!
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#EC003F] hover:bg-[#d30037] text-white px-8 rounded-full shadow-lg font-bold text-base"
                >
                  <Link to="/tour">Find Your Dream Destination</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:text-white px-8 rounded-full font-bold text-base"
                >
                  <Link to="/about">Contact Tour Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}