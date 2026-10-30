import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Play, X, Compass, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SlideData {
  id: number;
  tag: string;
  headingLine1: string;
  headingLine2: string;
  image: string;
  location: string;
}

const bannerSlides: SlideData[] = [
  {
    id: 1,
    tag: "Welcome to WanderGo",
    headingLine1: "Explore Beyond The",
    headingLine2: "Map With WanderGo",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2600&q=85",
    location: "Sajek Valley & Bandarban Highlands",
  },
  {
    id: 2,
    tag: "Pristine Marine Escapes",
    headingLine1: "Uncover Secret Shores &",
    headingLine2: "Turquoise Lagoons",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2600&q=85",
    location: "St. Martin Island & Cox's Bazar",
  },
  {
    id: 3,
    tag: "Emerald Rainforest Trails",
    headingLine1: "Breathe In Untamed",
    headingLine2: "Verdant Wilderness",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2600&q=85",
    location: "Sreemangal Tea Country & Sylhet",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const totalSlides = bannerSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Gentle autoplay transition
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = bannerSlides[currentSlide];

  return (
    <>
      <section className="relative w-full min-h-[680px] sm:min-h-[760px] md:min-h-[840px] lg:min-h-[900px] flex items-end overflow-hidden bg-zinc-950 select-none pb-12 sm:pb-16 md:pb-20">
        {/* =========================================================================
            1. CINEMATIC BACKGROUND SLIDES WITH SMOOTH CROSSFADE
           ========================================================================= */}
        {bannerSlides.map((item, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10"
              }`}
            >
              <img
                src={item.image}
                alt={item.headingLine2}
                className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              {/* Cinematic Multi-layered Dark & Gradient Overlays */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-black/75" />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-transparent to-zinc-950/40" />
            </div>
          );
        })}

        {/* =========================================================================
            2. GIANT DEPTH TYPOGRAPHY (TOURVIA REFERENCE: "WANDERGO")
           ========================================================================= */}
        <div className="absolute top-20 sm:top-24 md:top-28 lg:top-32 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-10 overflow-hidden px-4">
          <span className="text-white/[0.18] dark:text-white/[0.14] font-black tracking-[0.18em] sm:tracking-[0.24em] text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[15rem] uppercase font-nunito block leading-none drop-shadow-sm">
            WANDERGO
          </span>
        </div>

        {/* =========================================================================
            3. MAIN CONTENT CONTAINER (BOTTOM-LEFT & BOTTOM-RIGHT LAYOUT)
           ========================================================================= */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 sm:gap-10">
            {/* ----------------- BOTTOM-LEFT HERO CONTENT ----------------- */}
            <div className="max-w-2xl space-y-4 sm:space-y-6">
              {/* Eyebrow Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs sm:text-sm font-medium shadow-xl">
                <span>— {slide.tag}</span>
              </div>

              {/* Massive Modern Heading */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-nunito drop-shadow-2xl">
                {slide.headingLine1} <br />
                <span className="text-white">{slide.headingLine2}</span>
              </h1>

              {/* Action Button: Pill Shape with Circular Arrow Badge (Tourvia Style) */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/tour"
                  className="inline-flex items-center gap-3 bg-white hover:bg-white/95 text-zinc-950 font-bold pl-6 pr-2 py-2 rounded-full shadow-2xl hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base group"
                >
                  <span>Explore Destination</span>
                  <span className="size-8 sm:size-9 rounded-full bg-[#EF1A53] group-hover:bg-[#d81548] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="size-4 sm:size-5" />
                  </span>
                </Link>

                {/* Quick Slide Progress Dots */}
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  {bannerSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        idx === currentSlide
                          ? "w-8 bg-[#EF1A53]"
                          : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ----------------- BOTTOM-RIGHT FLOATING VIDEO CARD ----------------- */}
            <div className="w-full sm:w-auto self-end">
              <div
                onClick={() => setIsVideoOpen(true)}
                className="group cursor-pointer rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-zinc-900/60 hover:bg-zinc-900/80 backdrop-blur-xl border border-white/25 shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-[280px] md:w-[320px]"
              >
                {/* Thumbnail Preview with Glowing Play Button */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    alt="Watch The Video"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-10 sm:size-12 rounded-full bg-white text-[#EF1A53] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="size-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Subtitle */}
                <div className="flex items-center justify-between pt-2.5 px-1 text-white text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>• Watch the Video</span>
                  </div>
                  <span className="text-[11px] text-white/70 font-normal">
                    4K Cinematic
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE 4K BANGLADESH CINEMATIC VIDEO MODAL
         ========================================================================= */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/20 rounded-3xl shadow-2xl">
          <DialogTitle className="sr-only">WanderGo Tour Showcase Video</DialogTitle>
          <div className="relative aspect-video w-full">
            {isVideoOpen && (
              <iframe
                src="https://www.youtube.com/embed/6m6YlXoXUq8?autoplay=1&mute=0&rel=0&modestbranding=1"
                title="WanderGo Cinematic Travel Showcase"
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