import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

export const TrendingActivities = () => {
  const activities = [
    {
      id: 1,
      title: "City Tours",
      count: 1,
      label: "City Tours (1)",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      description: "Iconic cityscapes, historic architecture & vibrant streets",
    },
    {
      id: 2,
      title: "Cultural & Thematic Tours",
      count: 4,
      label: "Cultural & Thematic Tours (4)",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      description: "Authentic culinary feasts, heritage & cultural traditions",
    },
    {
      id: 3,
      title: "Family Friendly Tours",
      count: 1,
      label: "Family Friendly Tours (1)",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      description: "Sun-drenched beaches, turquoise lagoons & joyful boat trips",
    },
    {
      id: 4,
      title: "Indulgence & Luxury Tours",
      count: 2,
      label: "Indulgence & Luxury Tours (2)",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      description: "Scenic coastal hikes, premium resorts & majestic mountain vistas",
    },
    {
      id: 5,
      title: "Outdoor Activites",
      count: 3,
      label: "Outdoor Activites (3)",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      description: "Lush tropical rainforest trails, trekking & outdoor discovery",
    },
    {
      id: 6,
      title: "Relaxation Tours",
      count: 2,
      label: "Relaxation Tours (2)",
      image:
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
      description: "Serene alpine lakes, cozy wilderness retreats & peaceful nature",
    },
  ];

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header (Centered as per reference design) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground tracking-tight">
            Trending Activities
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-nunito">
            Choose one tour style you want
          </p>
        </div>

        {/* 6 Tour Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {activities.map((item) => (
            <Link
              key={item.id}
              to="/tour"
              className="group flex flex-col items-center cursor-pointer select-none"
            >
              {/* Rounded Portrait Card */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs group-hover:shadow-xl transition-all duration-500 bg-muted/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Explore arrow badge appearing on hover */}
                <div className="absolute bottom-3 right-3 size-8 rounded-full bg-white/95 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="size-4 text-[#EF1A53]" />
                </div>
              </div>

              {/* Text Label Below Card (Centered as in reference design) */}
              <span className="text-xs sm:text-sm font-semibold text-foreground/90 font-nunito group-hover:text-[#EF1A53] transition-colors duration-300 mt-3 text-center line-clamp-2 px-1">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingActivities;

