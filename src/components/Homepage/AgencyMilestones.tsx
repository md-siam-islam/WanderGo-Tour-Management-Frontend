import { Smile, MapPin, Star, Plane } from "lucide-react";

export const AgencyMilestones = () => {
  const stats = [
    {
      id: 1,
      number: "45K+",
      label: "Happy Traveller",
      icon: Smile,
      badgeBg: "bg-[#EBE5F5] dark:bg-purple-950/40",
      badgeText: "text-[#7C5CBF] dark:text-purple-300",
      badgeBorder: "border-[#DCD3EE] dark:border-purple-800/40",
      // Relative offset to align with the wave curve (percentage vertical translation)
      curveOffset: "translate-y-2 sm:translate-y-3",
    },
    {
      id: 2,
      number: "240",
      label: "Destinations",
      icon: MapPin,
      badgeBg: "bg-[#FDE7E3] dark:bg-rose-950/40",
      badgeText: "text-[#EF1A53] dark:text-rose-400",
      badgeBorder: "border-[#F8CEC6] dark:border-rose-800/40",
      curveOffset: "-translate-y-1 sm:-translate-y-2",
    },
    {
      id: 3,
      number: "98%",
      label: "5* Rating",
      icon: Star,
      badgeBg: "bg-[#FEF5D7] dark:bg-amber-950/40",
      badgeText: "text-[#D89F0E] dark:text-amber-400",
      badgeBorder: "border-[#FDE8A5] dark:border-amber-800/40",
      curveOffset: "translate-y-6 sm:translate-y-8",
    },
    {
      id: 4,
      number: "850+",
      label: "Trips and Tours",
      icon: Plane,
      badgeBg: "bg-[#E5F5EC] dark:bg-emerald-950/40",
      badgeText: "text-[#2D9F65] dark:text-emerald-400",
      badgeBorder: "border-[#C6ECD4] dark:border-emerald-800/40",
      curveOffset: "-translate-y-2 sm:-translate-y-3",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Centered Header (Matching reference design) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-20 space-y-2.5">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#EF1A53] block">
            ABOUT TRAVEL AGENCY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground tracking-tight">
            Why We're Your Perfect Travel Partner
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-nunito leading-relaxed max-w-xl mx-auto pt-1">
            Dedicated to inspiring and facilitating unforgettable journeys across Bangladesh and beyond, crafted with passion and trust.
          </p>
        </div>

        {/* =========================================================================
            MILESTONES TIMELINE WITH UNDULATING DASHED FLIGHT PATH
           ========================================================================= */}
        <div className="relative pt-6 pb-12 sm:pb-16 select-none">
          {/* Responsive SVG Dashed Wave Trail running across all stats */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-2 w-full pointer-events-none hidden md:block">
            <svg
              viewBox="0 0 1200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-24 sm:h-28 overflow-visible text-zinc-300 dark:text-zinc-700"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,75 C 80,70 120,62 150,60 C 220,54 380,44 450,50 C 530,56 680,82 750,82 C 820,82 980,45 1050,45 C 1110,45 1160,60 1200,65"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 4 Milestone Stats Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-6 relative z-10">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-center text-center group transition-transform duration-300 md:${item.curveOffset}`}
                >
                  {/* Number & Stat Label (Above the pin) */}
                  <div className="mb-4 sm:mb-5 space-y-1 transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-nunito tracking-tight">
                      {item.number}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground font-nunito">
                      {item.label}
                    </p>
                  </div>

                  {/* Circular Pin Badge on the Wave Path */}
                  <div
                    className={`size-11 sm:size-12 rounded-full ${item.badgeBg} ${item.badgeText} border ${item.badgeBorder} flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-115 group-hover:shadow-md ring-4 ring-background`}
                  >
                    <Icon className="size-5 sm:size-5.5 stroke-[2]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyMilestones;

