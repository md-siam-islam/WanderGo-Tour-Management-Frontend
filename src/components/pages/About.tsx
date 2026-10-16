import { Link } from "react-router";
import {
  Compass,
  Heart,
  Shield,
  Award,
  Globe2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const stats = [
    { label: "Happy Travelers", value: "5,000+" },
    { label: "Handcrafted Tours", value: "120+" },
    { label: "Certified Guides", value: "45+" },
    { label: "Customer Satisfaction", value: "99%" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Exploration",
      desc: "We believe travel has the power to enrich lives, broaden horizons, and create unforgettable bonds.",
    },
    {
      icon: Shield,
      title: "Safety & Reliability First",
      desc: "Every tour package is thoroughly planned with verified guides, vetted transport, and 24/7 emergency care.",
    },
    {
      icon: Globe2,
      title: "Sustainable & Ethical Tourism",
      desc: "We respect local communities, support indigenous heritage, and strive to preserve Bangladesh's natural wonders.",
    },
    {
      icon: Award,
      title: "Excellence & Transparent Value",
      desc: "Honest pricing with zero hidden fees. We ensure every traveler receives world-class hospitality.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-pink-500/10 via-background to-background overflow-hidden border-b">
        <div className="container mx-auto px-4 max-w-5xl text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-[#EC003F] text-xs font-bold uppercase tracking-wider">
            <Compass className="size-4" /> Discover WanderGo
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground font-nunito tracking-tight leading-tight">
            Crafting Unforgettable Journeys Across{" "}
            <span className="text-[#EC003F]">Bangladesh</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            WanderGo was founded with a singular mission: to make authentic, safe, and breathtaking travel accessible to everyone. From misty hill tracts to pristine beaches, we connect you with pure wonder.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#EC003F] hover:bg-[#d30037] text-white px-8 rounded-full">
              <Link to="/tour" className="flex items-center gap-2">
                Explore Our Tours <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#EC003F] font-nunito">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EC003F]">
              Our Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground font-nunito">
              Values That Define Every Adventure
            </h2>
            <p className="text-muted-foreground text-sm">
              We hold ourselves to the highest standards of hospitality, safety, and cultural integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border bg-card text-card-foreground shadow-xs hover:shadow-lg transition-all flex gap-5"
                >
                  <div className="size-14 rounded-2xl bg-pink-500/10 text-[#EC003F] border border-pink-500/20 flex items-center justify-center shrink-0">
                    <Icon className="size-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-foreground font-nunito">
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

      {/* CTA Box */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground font-nunito">
            Ready to Embark On Your Next Expedition?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of travelers who trust WanderGo to craft memories that last a lifetime.
          </p>
          <Button asChild size="lg" className="bg-[#EC003F] hover:bg-[#d30037] text-white px-8 rounded-full">
            <Link to="/tour">Find Your Dream Destination</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}