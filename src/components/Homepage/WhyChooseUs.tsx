import {
  ShieldCheck,
  Compass,
  Award,
  Headphones,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      title: "100% Secure & Verified",
      description:
        "Every hotel, luxury transport, and guided itinerary is rigorously vetted to guarantee traveler safety and peace of mind.",
    },
    {
      icon: Award,
      color: "text-[#EC003F] bg-pink-500/10 border-pink-500/20",
      title: "Best Price Guarantee",
      description:
        "Zero hidden service fees. Enjoy transparent pricing with exclusive promotional discounts and promo coupons.",
    },
    {
      icon: Compass,
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      title: "Handcrafted Itineraries",
      description:
        "Designed by passionate travelers and local connoisseurs to immerse you in breathtaking landscapes and authentic culture.",
    },
    {
      icon: Headphones,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      title: "24/7 Dedicated Support",
      description:
        "Our multilingual travel specialists and emergency assistance team are always just a call or message away.",
    },
  ];

  return (
    <section className="py-24 bg-background border-t">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 text-[#EC003F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" /> Premium Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-nunito tracking-tight">
            Why Travel With WanderGo?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            We don't just book trips — we create transformative travel experiences crafted for safety, comfort, and discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl border bg-card text-card-foreground shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`size-14 rounded-2xl flex items-center justify-center border mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="size-7" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground font-nunito mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t flex items-center gap-2 text-xs font-semibold text-foreground/80">
                  <CheckCircle2 className="size-4 text-[#EC003F]" /> WanderGo Guarantee
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
