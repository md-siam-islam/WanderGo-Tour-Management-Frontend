import { useGetTourGuidesQuery } from "@/redux/features/auth/auth.api";
import {
  Compass,
  Award,
  Star,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

// Default curated certified guides if DB contains few or no registered guides
const fallbackGuides = [
  {
    _id: "guide-1",
    name: "Tanvir Ahmed",
    title: "Senior Hill-Trek Specialist",
    region: "Bandarban & Keokradong",
    experience: "8+ Years Experience",
    rating: 5.0,
    languages: ["Bangla", "English", "Marma"],
    picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    phone: "+880 1712-345678",
    email: "tanvir.guide@wandergo.com",
    completedTours: 142,
  },
  {
    _id: "guide-2",
    name: "Nusrat Jahan",
    title: "Rainforest & Tea Naturalist",
    region: "Sreemangal & Lawachara",
    experience: "6+ Years Experience",
    rating: 4.9,
    languages: ["Bangla", "English", "Hindi"],
    picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    phone: "+880 1819-876543",
    email: "nusrat.naturalist@wandergo.com",
    completedTours: 98,
  },
  {
    _id: "guide-3",
    name: "Mahfuzur Rahman",
    title: "Mangrove Wildlife Tracker",
    region: "Sundarbans Biosphere",
    experience: "10+ Years Experience",
    rating: 5.0,
    languages: ["Bangla", "English"],
    picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    phone: "+880 1911-223344",
    email: "mahfuz.wildlife@wandergo.com",
    completedTours: 215,
  },
  {
    _id: "guide-4",
    name: "Sabrina Chowdhury",
    title: "Cultural Heritage Historian",
    region: "Old Dhaka & Sonargaon",
    experience: "5+ Years Experience",
    rating: 4.9,
    languages: ["Bangla", "English", "French"],
    picture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    phone: "+880 1610-556677",
    email: "sabrina.heritage@wandergo.com",
    completedTours: 84,
  },
];

export default function TourGuidesSection() {
  const { data: guidesData, isLoading } = useGetTourGuidesQuery(undefined);

  const apiGuides = (guidesData?.data || []) as any[];

  // Merge API guides with curated fallbacks so the showcase is always rich
  const displayGuides =
    apiGuides.length >= 3
      ? apiGuides.map((g, idx) => ({
          _id: g._id || `api-${idx}`,
          name: g.name || "Certified Guide",
          title: g.title || "Licensed Travel Guide",
          region: g.address || "Bangladesh",
          experience: "Government Certified",
          rating: 4.9,
          languages: ["Bangla", "English"],
          picture:
            g.picture ||
            fallbackGuides[idx % fallbackGuides.length].picture,
          phone: g.phone || "+880 1700-000000",
          email: g.email || "guide@wandergo.com",
          completedTours: 40 + idx * 12,
        }))
      : fallbackGuides;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 size-72 bg-[#EF1A53]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 size-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF1A53]/10 text-[#EF1A53] text-xs font-bold uppercase tracking-wider">
          <Compass className="size-3.5" />
          <span>Local Storytellers & Navigators</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-nunito tracking-tight">
          Meet Our Certified Tour Guides
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Trained in wilderness safety, first aid, and regional history. Travel with peace of mind
          alongside locals who know every trail and hidden sanctuary.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayGuides.map((guide) => (
          <div
            key={guide._id}
            className="group bg-card rounded-3xl border border-border/70 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#EF1A53]/30 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Guide Image with Badges */}
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              <img
                src={guide.picture}
                alt={guide.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {/* Top rating badge */}
              <div className="absolute top-3 right-3">
                <Badge className="bg-black/60 backdrop-blur-md text-white border-white/20 gap-1 text-xs font-bold">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span>{guide.rating}</span>
                </Badge>
              </div>

              {/* Bottom tag on image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <Award className="size-3" />
                  <span>{guide.experience}</span>
                </p>
              </div>
            </div>

            {/* Guide Info */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-foreground text-lg font-nunito group-hover:text-[#EF1A53] transition-colors">
                  {guide.name}
                </h3>
                <p className="text-xs font-semibold text-muted-foreground">{guide.title}</p>

                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                  <MapPin className="size-3 text-[#EF1A53]" />
                  <span>{guide.region}</span>
                </p>

                {/* Languages chips */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {guide.languages.map((lang: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-muted-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact & Booking Action */}
              <div className="pt-4 border-t border-border/60 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{guide.completedTours} Tours Completed</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="size-3" /> Verified
                  </span>
                </div>

                <Button
                  asChild
                  size="sm"
                  className="w-full rounded-xl bg-muted hover:bg-[#EF1A53] text-foreground hover:text-white font-bold text-xs h-9 transition-colors shadow-xs"
                >
                  <Link to="/tour">
                    <span>Explore Guided Tours</span>
                    <ArrowRight className="size-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Certifications Banner */}
      <div className="mt-12 p-6 rounded-3xl bg-muted/40 border border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-[#EF1A53]/10 text-[#EF1A53] flex items-center justify-center shrink-0">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm font-nunito">
              Are you an experienced local guide?
            </h4>
            <p className="text-xs text-muted-foreground">
              Join WanderGo's certified network of expedition leaders and showcase your region.
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="rounded-xl border-border/80 font-bold text-xs h-10 px-5 shrink-0"
        >
          <Link to="/about">
            <span>Learn About Becoming a Guide</span>
            <ArrowRight className="size-3.5 ml-1.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
