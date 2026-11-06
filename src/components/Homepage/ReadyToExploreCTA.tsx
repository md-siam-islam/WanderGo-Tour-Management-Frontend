import { Link } from "react-router";

export const ReadyToExploreCTA = () => {
  return (
    <section className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center overflow-hidden py-16 sm:py-24 mt-6 mb-0">
      {/* =========================================================================
          1. SCENIC COASTAL MOUNTAIN & OCEAN BACKGROUND
         ========================================================================= */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Scenic Coastal Journey"
          className="w-full h-full object-cover object-bottom"
          loading="lazy"
        />

        {/* Seamless Top fade from page, and bottom blend into black footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
      </div>

      {/* =========================================================================
          2. CENTERED CALL-TO-ACTION CONTENT (MATCHING REFERENCE DESIGN)
         ========================================================================= */}
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl relative z-10 text-center space-y-2 sm:space-y-2">
        {/* Main Headline (Editorial Serif Typography) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-medium text-white tracking-tight leading-[1.2] drop-shadow-xs">
          Ready to Explore? Let's Chat <br className="hidden sm:inline" />
          About Your Dream Trip
        </h2>

        {/* Subtitle */}
        <p className="text-white text-sm sm:text-base font-nunito leading-relaxed max-w-lg mx-auto">
          Let your wanderlust soar. Start exploring today and let unforgettable experiences await!
        </p>

        {/* Pill CTA Button (Plan Your Trip) */}
        <div className="pt-2 sm:pt-4">
          <Link
            to="/tour"
            className="inline-flex items-center justify-center bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Plan Your Trip</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyToExploreCTA;

