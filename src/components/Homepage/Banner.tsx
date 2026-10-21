import { useState, useEffect, useCallback, useRef } from "react";
import {
  Star,
  Compass,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

interface SlideData {
  id: number;
  tag: string;
  location: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  image: string;
  primaryBtnText: string;
  primaryBtnUrl: string;
  secondaryBtnText: string;
  secondaryBtnUrl: string;
}

const bannerSlides: SlideData[] = [
  {
    id: 1,
    tag: "Highland Treks & Cloud Escapes",
    location: "Sajek Valley & Bandarban",
    headingPrefix: "Explore The World With",
    headingHighlight: "Confidence",
    headingSuffix: "",
    description:
      "Discover exclusive handcrafted tours crafted for unforgettable experiences — from misty mountain ridges to cloud-draped valleys, every journey designed for discovery.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85",
    primaryBtnText: "Explore All Tours",
    primaryBtnUrl: "/tour",
    secondaryBtnText: "About WanderGo",
    secondaryBtnUrl: "/about",
  },
  {
    id: 2,
    tag: "Tropical Coastlines & Island Escapes",
    location: "Cox's Bazar & St. Martin",
    headingPrefix: "Discover Pristine Shores &",
    headingHighlight: "Golden Sunsets",
    headingSuffix: "",
    description:
      "Stroll along the world's longest natural sea beach, cruise turquoise coral lagoons, and relax in luxury seaside eco-resorts under starlit skies.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
    primaryBtnText: "Book Beach Holidays",
    primaryBtnUrl: "/tour",
    secondaryBtnText: "View Itineraries",
    secondaryBtnUrl: "/tour",
  },
  {
    id: 3,
    tag: "Nature Escapes & Eco-Retreats",
    location: "Sreemangal, Sylhet",
    headingPrefix: "Breathe In The Serenity Of",
    headingHighlight: "Emerald Valleys",
    headingSuffix: "",
    description:
      "Lose yourself in the calming tranquility of rolling tea gardens, cascading waterfalls, and ancient rainforest trails guided by local specialists.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85",
    primaryBtnText: "Discover Tea Country",
    primaryBtnUrl: "/tour",
    secondaryBtnText: "Contact Us",
    secondaryBtnUrl: "/about",
  },
  {
    id: 4,
    tag: "Wild Mangrove Expeditions",
    location: "Sundarbans National Reserve",
    headingPrefix: "Venture Deep Into Untamed",
    headingHighlight: "Wilderness",
    headingSuffix: "",
    description:
      "Experience the raw thrill of the world's largest mangrove forest, home to the elusive Royal Bengal Tiger, spotted deer, and exotic river wildlife.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85",
    primaryBtnText: "Start Safari Adventure",
    primaryBtnUrl: "/tour",
    secondaryBtnText: "Learn More",
    secondaryBtnUrl: "/about",
  },
];

const reviewsData = {
  count: 200,
  rating: 5.0,
  avatars: [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      alt: "Traveler 1",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      alt: "Traveler 2",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      alt: "Traveler 3",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      alt: "Traveler 4",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      alt: "Traveler 5",
    },
  ],
};

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = bannerSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = bannerSlides[currentSlide];

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] flex flex-col justify-center items-center py-24 sm:py-32 overflow-hidden bg-zinc-950 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with Smooth Crossfade */}
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
              alt={item.headingHighlight}
              className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
            {/* Dark & Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
          </div>
        );
      })}

      {/* Floating Prev / Next Arrow Controls */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Hero Content Area */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl space-y-6">
        {/* Category & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/15 backdrop-blur-md text-white text-xs tracking-wider uppercase font-bold shadow-md">
            <Compass className="w-3.5 h-3.5 text-[#EC003F]" />
            <span>{slide.tag}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium shadow-md">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{slide.location}</span>
          </div>
        </div>

        {/* Dynamic Heading with Highlight */}
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-nunito leading-tight sm:leading-tight drop-shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            {slide.headingPrefix}{" "}
            <span className="text-[#EC003F] underline decoration-pink-500/40 underline-offset-8">
              {slide.headingHighlight}
            </span>{" "}
            {slide.headingSuffix}
          </h1>
        </div>

        {/* Dynamic Description */}
        <p className="mx-auto max-w-2xl text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed font-nunito drop-shadow animate-in fade-in duration-700">
          {slide.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2 items-center justify-center animate-in fade-in slide-in-from-bottom-3 duration-700">
          <Button
            asChild
            size="lg"
            className="bg-[#EC003F] hover:bg-[#d30037] text-white border-0 font-bold px-8 h-12 rounded-full shadow-xl hover:shadow-pink-500/30 transition-all text-base"
          >
            <Link to={slide.primaryBtnUrl} className="flex items-center gap-2">
              {slide.primaryBtnText} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            size="lg"
            className="border-white/40 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:text-white font-bold px-8 h-12 rounded-full transition-all text-base"
          >
            <Link to={slide.secondaryBtnUrl}>{slide.secondaryBtnText}</Link>
          </Button>
        </div>

        {/* Reviews Social Proof */}
        <div className="pt-4 mx-auto flex w-fit flex-col items-center gap-3 sm:flex-row text-white animate-in fade-in duration-1000">
          <span className="inline-flex items-center -space-x-3">
            {reviewsData.avatars.map((avatar, index) => (
              <Avatar
                key={index}
                className="w-10 h-10 border-2 border-white/80 shadow-md ring-2 ring-black/30"
              >
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-1 font-bold text-white text-sm">
                {reviewsData.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-white/80 text-xs sm:text-sm font-nunito">
              from {reviewsData.count}+ verified happy travelers
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Slider Navigation Bar & Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-full max-w-xl px-4">
        {/* Quick Jump Slide Pills (Desktop) */}
        <div className="hidden sm:flex items-center justify-center gap-2">
          {bannerSlides.map((item, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 border ${
                  isActive
                    ? "bg-[#EC003F] text-white border-pink-400/50 shadow-lg scale-105"
                    : "bg-black/40 text-white/70 border-white/10 hover:bg-black/60 hover:text-white"
                }`}
              >
                {item.location.split("&")[0].trim()}
              </button>
            );
          })}
        </div>

        {/* Progress Dots Indicator */}
        <div className="flex items-center gap-2">
          {bannerSlides.map((_, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-8 bg-[#EC003F] shadow-sm"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;