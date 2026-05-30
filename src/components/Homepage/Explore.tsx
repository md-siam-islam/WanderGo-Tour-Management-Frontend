import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight, MapPin } from "lucide-react";

const Explore = () => {
  return (
    <div className="my-20 flex items-stretch justify-between max-w-full gap-7 lg:flex-row flex-col px-5">

      {/* LEFT CARD */}
      <div className="bg-[#FFF5F7] border border-pink-100 w-full lg:w-[55%] p-8 rounded-4xl flex flex-col justify-between gap-6">
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-[#EF1A53] text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <MapPin className="size-3.5" />
            Why WanderGo
          </span>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold font-playfair leading-snug mt-2 mb-3 text-foreground">
            Adventures Built For{" "}
            <em className="not-italic text-[#EF1A53]">Every Explorer</em>
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-base leading-relaxed mb-5">
            From scenic mountain trails to cultural city tours, WanderGo crafts
            experiences that bring the world closer. Every trip is guided,
            comfortable, and unforgettable.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#EF1A53] hover:bg-[#c8143f] text-white border-0 font-bold rounded-xl"
          >
            <Link to="/about">
              Explore More <ArrowRight className="size-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Image */}
        <div className="w-full h-48 rounded-2xl overflow-hidden mt-2">
          <img
            className="w-full h-full object-cover"
            src="/src/assets/BannerImage/bannerimage.jpg"
            alt="Adventure"
          />
        </div>
      </div>

      {/* RIGHT STATS GRID */}
      <div className="w-full lg:w-[45%] grid grid-cols-2 gap-4">

        {[
          {
            icon: "https://img.icons8.com/?size=80&id=urSy1bOP-B8H&format=png",
            number: "45K+",
            label: "Happy Campers",
          },
          {
            icon: "https://img.icons8.com/?size=80&id=Xnmiupwu5Fp5&format=png",
            number: "1.5M+",
            label: "Trips Sold",
          },
          {
            icon: "https://img.icons8.com/?size=80&id=CsbZi65eJHuc&format=png",
            number: "60+",
            label: "Destinations",
          },
          {
            icon: "https://img.icons8.com/?size=50&id=RWMwpfcceJM2&format=png",
            number: "150+",
            label: "Travel Buddies",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(239,26,83,0.18)] hover:border-transparent border-2 border-[#EF1A53] rounded-3xl p-6 flex flex-col items-center text-center gap-2 bg-white"
          >
            <div className="bg-[#FFF0F3] rounded-full p-3.5 mb-1">
              <img className="w-9 h-9" src={item.icon} alt="" />
            </div>
            <h2 className="text-3xl font-bold text-[#EF1A53] font-playfair">
              {item.number}
            </h2>
            <div className="w-8 h-0.5 bg-[#EF1A53] rounded-full" />
            <p className="text-sm font-semibold text-gray-500">{item.label}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Explore;