import { Headphones, Bus, CalendarCheck, TicketCheckIcon } from "lucide-react";

const features = [
  {
    icon: <Headphones className="size-5" />,
    title: "24-hour Support",
    desc: "Our team is always ready to help, any time of day or night, wherever you are.",
  },
  {
    icon: <TicketCheckIcon className="size-5" />,
    title: "No Hidden Fees",
    desc: "Transparent pricing from the start. What you see is exactly what you pay.",
  },
  {
    icon: <Bus className="size-5" />,
    title: "Included Transfers",
    desc: "Airport pickups, hotel drops — all transfers are covered in every package.",
  },
  {
    icon: <CalendarCheck className="size-5" />,
    title: "Booking Flexibility",
    desc: "Plans change. Reschedule or cancel easily with no stressful penalties.",
  },
];

const Support = () => {
  return (
    <div
      className="mb-20 mx-5 rounded-3xl overflow-hidden relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url('/src/assets/BannerImage/tent-3.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-10 flex items-center gap-10 lg:gap-12">

        {/* Vertical Label */}
        <div className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0">
          <div className="w-0.5 h-14 bg-gradient-to-b from-transparent to-[#EF1A53] rounded-full" />
          <span
            className="text-[#EF1A53] font-bold text-xs tracking-[4px] uppercase"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Why Us?
          </span>
          <div className="w-0.5 h-14 bg-gradient-to-b from-[#EF1A53] to-transparent rounded-full" />
        </div>

        {/* Heading */}
        <div className="hidden lg:block flex-shrink-0 max-w-[180px]">
          <h2 className="text-3xl font-bold text-white font-playfair leading-snug">
            Why Travel With{" "}
            <em className="not-italic text-[#EF1A53]">WanderGo?</em>
          </h2>
          <p className="text-white/50 text-sm mt-2 leading-relaxed">
            Everything you need for a stress-free, unforgettable adventure.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-40 bg-white/15 rounded-full flex-shrink-0" />

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {features.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 bg-white/[0.07] hover:bg-[#EF1A53]/10 border border-white/10 hover:border-[#EF1A53]/40 rounded-2xl p-5 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#EF1A53] flex items-center justify-center text-white">
                {item.icon}
              </div>
              {/* Text */}
              <div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Support;