import { Link } from "react-router";
import { Search, CreditCard, Luggage, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Search,
      title: "Discover & Choose Your Dream Tour",
      description:
        "Filter by division, budget range, tour duration, and activities to find the ideal adventure that matches your passion.",
    },
    {
      step: "02",
      icon: CreditCard,
      title: "Instant Booking & SSL Payment",
      description:
        "Pick your guest count, apply active discount coupons, and complete your reservation with secure SSLCommerz payment gateway.",
    },
    {
      step: "03",
      icon: Luggage,
      title: "Pack Your Bags & Explore",
      description:
        "Receive instant booking confirmation and meet our expert tour guides at departure for a hassle-free, memorable voyage.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-pink-500/10 text-[#EC003F] text-xs font-bold uppercase tracking-wider inline-block">
            Simple 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-nunito tracking-tight">
            How WanderGo Works
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Booking your next unforgettable travel adventure is as easy as 1-2-3.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl border bg-card text-card-foreground shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="size-16 rounded-2xl bg-pink-500/10 text-[#EC003F] border border-pink-500/20 flex items-center justify-center">
                      <Icon className="size-8" />
                    </div>
                    <span className="text-4xl font-black font-nunito text-muted/80">
                      {st.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-foreground font-nunito mb-3">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t flex items-center gap-1.5 text-xs font-semibold text-[#EC003F]">
                  Step {st.step} Completed
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-[#EC003F] hover:bg-[#d30037] text-white px-8 rounded-full h-12 shadow-lg hover:shadow-pink-500/25">
            <Link to="/tour" className="flex items-center gap-2">
              Start Exploring Destinations <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
