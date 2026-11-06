import { MessageCircleMore, Smile, CheckCircle2, Bus } from "lucide-react";

export const TravelPartner = () => {
  const features = [
    {
      icon: MessageCircleMore,
      title: "25 Million+ Miles",
      description:
        "Over 25 million miles of handcrafted itineraries, scenic expeditions, and memorable journeys completed worldwide.",
    },
    {
      icon: Smile,
      title: "No Hidden Fees",
      description:
        "100% transparent pricing with all taxes, permits, and entry fees clearly itemized upfront — absolutely zero surprise charges.",
    },
    {
      icon: CheckCircle2,
      title: "Booking Flexibility",
      description:
        "Enjoy flexible trip scheduling, instant reservations, and hassle-free date changes with traveler-first cancellation policies.",
    },
    {
      icon: Bus,
      title: "Included Transfers",
      description:
        "Comfortable air-conditioned transport, complimentary airport pickups, and licensed local tour guides on every package.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Eyebrow & Main Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16 md:mb-20">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-[#EF1A53] block">
            GET TO KNOW US
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-medium text-foreground tracking-tight leading-[1.2]">
            Why We're Your Perfect <br className="hidden sm:inline" />
            Travel Partner
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-1 font-nunito">
            From breathtaking scenic escapes to carefully handcrafted itineraries, WanderGo delivers unforgettable travel memories with complete trust, safety, and care.
          </p>
        </div>

        {/* 4 Feature Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 xl:gap-12">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-start text-left"
              >
                {/* Soft Circular Icon Container */}
                <div className="size-20 sm:size-[84px] rounded-full bg-[#FFF5F6] dark:bg-[#EF1A53]/10 border border-[#EF1A53]/10 dark:border-[#EF1A53]/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-[#EF1A53]/15 transition-all duration-300 shadow-xs">
                  <Icon className="size-8 sm:size-9 text-zinc-900 dark:text-zinc-100 stroke-[1.5] group-hover:text-[#EF1A53] transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground font-nunito tracking-tight mb-2.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-nunito">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelPartner;

