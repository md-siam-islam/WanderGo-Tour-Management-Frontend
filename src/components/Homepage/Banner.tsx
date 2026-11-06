import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[780px] flex items-end overflow-hidden select-none pb-12 sm:pb-16 md:pb-20">
        {/* =========================================================================
            1. BRIGHT & SCENIC SUNLIT MOUNTAIN BACKDROP (REDUCED DARKNESS)
           ========================================================================= */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2600&q=85"
            alt="WanderGo Scenic Highlands"
            className="w-full h-full object-cover object-center scale-100 filter brightness-95"
          />
          {/* Gentle, light bottom vignette - keeps sky and mountain bright and natural */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        </div>

        {/* =========================================================================
            2. REFINED DEPTH TYPOGRAPHY ("WANDERGO" - PROPORTIONAL & CLEAN)
           ========================================================================= */}
        <div className="absolute top-20 sm:top-24 md:top-28 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-10 px-4">
          <span className="text-white/55 font-extrabold tracking-[0.2em] sm:tracking-[0.25em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase font-nunito block leading-none">
            WANDERGO
          </span>
        </div>

        {/* =========================================================================
            3. MINIMAL HERO CONTENT (BOTTOM-LEFT & BOTTOM-RIGHT ONLY)
           ========================================================================= */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8">
            {/* ----------------- BOTTOM-LEFT (CLEAN & MINIMAL) ----------------- */}
            <div className="max-w-xl space-y-3 sm:space-y-4">
              {/* Clean Eyebrow Pill */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/25 bg-black/20 backdrop-blur-md text-white/95 text-xs sm:text-sm font-medium">
                <span>— Welcome to WanderGo</span>
              </div>

              {/* Clean, Refined Heading (Proportional size, not huge) */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] font-nunito drop-shadow-md">
                Explore Beyond The <br />
                <span>Map With WanderGo</span>
              </h1>

              {/* Clean Pill Button with Circular Arrow Badge (Tourvia Style) */}
              <div className="pt-2">
                <Link
                  to="/tour"
                  className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-zinc-950 font-bold pl-5 pr-1.5 py-1.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-xs sm:text-sm group"
                >
                  <span>Explore Destination</span>
                  <span className="size-7 sm:size-8 rounded-full bg-[#EF1A53] group-hover:bg-[#d81548] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-3.5 sm:size-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* ----------------- BOTTOM-RIGHT (COMPACT VIDEO CARD) ----------------- */}
            <div className="self-end">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="group cursor-pointer rounded-2xl p-2 sm:p-2.5 bg-black/35 hover:bg-black/50 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 w-[220px] sm:w-[260px]"
              >
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
                    alt="Watch Video"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-9 rounded-full bg-white text-[#EF1A53] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="size-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-2 px-1 text-white text-xs font-semibold">
                  <span>• Watch the Video</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4K Cinematic Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/20 rounded-3xl shadow-2xl">
          <DialogTitle className="sr-only">WanderGo Showcase Video</DialogTitle>
          <div className="relative aspect-video w-full">
            {isVideoOpen && (
              <iframe
                src="https://www.youtube.com/embed/6m6YlXoXUq8?autoplay=1&mute=0&rel=0&modestbranding=1"
                title="WanderGo Showcase"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;