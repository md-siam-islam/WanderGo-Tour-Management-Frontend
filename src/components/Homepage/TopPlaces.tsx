import { Link } from "react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

export const TopPlaces = () => {
  return (
    <section className="py-20 sm:py-20 lg:py-24 dark:bg-zinc-950/70 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header (Centered as per reference design) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16 space-y-2.5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground tracking-tight">
            Top Places To Travel
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-nunito">
            Explore Bangladesh's most scenic destinations and cultural wonders
          </p>
        </div>

        {/* 4-Column Bento Grid (Matching the reference layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:h-[560px]">
          {/* =========================================================================
              COLUMN 1: TALL FULL-HEIGHT CARD (COX'S BAZAR)
             ========================================================================= */}
          <Link
            to="/tour"
            className="group relative h-[340px] sm:h-[400px] lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 block"
          >
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
              alt="Cox's Bazar Beach"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Top-down dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

            {/* Destination Name & Division (Top Left) */}
            <div className="absolute top-5 left-5 z-10 space-y-0.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1 drop-shadow-sm">
                <MapPin className="size-3 text-[#EF1A53]" />
                CHATTOGRAM
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                Cox's Bazar
              </h3>
            </div>

            {/* Floating arrow on hover */}
            <div className="absolute bottom-4 right-4 size-9 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg">
              <ArrowUpRight className="size-4 text-[#EF1A53]" />
            </div>
          </Link>

          {/* =========================================================================
              COLUMN 2: TWO STACKED CARDS (SRIMANGAL & OLD DHAKA)
             ========================================================================= */}
          <div className="flex flex-col gap-4 sm:gap-5 h-full">
            {/* Top Card: Sreemangal Tea Gardens (Taller: ~58%) */}
            <Link
              to="/tour"
              className="group relative h-[250px] sm:h-[280px] lg:h-[58%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 block"
            >
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"
                alt="Sreemangal Tea Gardens"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

              <div className="absolute top-5 left-5 z-10 space-y-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1 drop-shadow-sm">
                  <MapPin className="size-3 text-[#EF1A53]" />
                  SYLHET
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                  Sreemangal
                </h3>
              </div>

              <div className="absolute bottom-4 right-4 size-9 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg">
                <ArrowUpRight className="size-4 text-[#EF1A53]" />
              </div>
            </Link>

            {/* Bottom Card: Old Dhaka Heritage (Shorter: ~42%) */}
            <Link
              to="/tour"
              className="group relative h-[200px] sm:h-[220px] lg:h-[42%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 block"
            >
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
                alt="Old Dhaka Heritage"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

              <div className="absolute top-4 left-4 z-10 space-y-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1 drop-shadow-sm">
                  <MapPin className="size-3 text-[#EF1A53]" />
                  DHAKA
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
                  Old Dhaka
                </h3>
              </div>

              <div className="absolute bottom-3 right-3 size-8 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg">
                <ArrowUpRight className="size-3.5 text-[#EF1A53]" />
              </div>
            </Link>
          </div>

          {/* =========================================================================
              COLUMN 3: TALL FULL-HEIGHT CARD (SUNDARBANS MANGROVE)
             ========================================================================= */}
          <Link
            to="/tour"
            className="group relative h-[340px] sm:h-[400px] lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 block"
          >
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
              alt="Sundarbans Mangrove Waters"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

            <div className="absolute top-5 left-5 z-10 space-y-0.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1 drop-shadow-sm">
                <MapPin className="size-3 text-[#EF1A53]" />
                KHULNA
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                Sundarbans
              </h3>
            </div>

            <div className="absolute bottom-4 right-4 size-9 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg">
              <ArrowUpRight className="size-4 text-[#EF1A53]" />
            </div>
          </Link>

          {/* =========================================================================
              COLUMN 4: TWO STACKED CARDS (BANDARBAN & SAJEK VALLEY)
             ========================================================================= */}
          <div className="flex flex-col gap-4 sm:gap-5 h-full">
            {/* Top Card: Bandarban Cloud Peaks (Taller: ~58%) */}
            <Link
              to="/tour"
              className="group relative h-[250px] sm:h-[280px] lg:h-[58%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 block"
            >
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Bandarban Nilgiri Mountains"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

              <div className="absolute top-5 left-5 z-10 space-y-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1 drop-shadow-sm">
                  <MapPin className="size-3 text-[#EF1A53]" />
                  HILL TRACTS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                  Bandarban
                </h3>
              </div>

              <div className="absolute bottom-4 right-4 size-9 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg">
                <ArrowUpRight className="size-4 text-[#EF1A53]" />
              </div>
            </Link>

            {/* Bottom Card: Sajek Valley (Shorter: ~42%) */}
            <Link
              to="/tour"
              className="group relative h-[200px] sm:h-[220px] lg:h-[42%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 block"
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                alt="Sajek Valley Cloud Kingdom"
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

              <div className="absolute top-4 left-4 z-10 space-y-0.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90 flex items-center gap-1 drop-shadow-sm">
                  <MapPin className="size-3 text-[#EF1A53]" />
                  RANGAMATI
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
                  Sajek Valley
                </h3>
              </div>

              <div className="absolute bottom-3 right-3 size-8 rounded-full bg-white/90 text-zinc-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-lg">
                <ArrowUpRight className="size-3.5 text-[#EF1A53]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPlaces;

