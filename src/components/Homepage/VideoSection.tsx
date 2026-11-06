import { useState, useRef } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const VideoSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <section className="relative w-full min-h-[420px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden select-none my-6 sm:my-10">
        {/* =========================================================================
            1. TOUR-RELATED BACKGROUND VIDEO (SAFARI & WILDLIFE EXPEDITION)
           ========================================================================= */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover object-center filter brightness-90"
          >
            <source
              src="https://res.cloudinary.com/demo/video/upload/f_auto,q_auto/elephants.mp4"
              type="video/mp4"
            />
            {/* Fallback image if video fails to load or browser blocks video autoplay */}
            <img
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80"
              alt="WanderGo Safari Expedition"
              className="w-full h-full object-cover object-center"
            />
          </video>

          {/* Deep Cinematic Overlay: Darker on the left for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
          {/* Subtle top & bottom edge softening */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        </div>

        {/* =========================================================================
            2. FOREGROUND CONTENT (LEFT-ALIGNED AS PER REFERENCE DESIGN)
           ========================================================================= */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full py-16 sm:py-20">
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-bold tracking-[0.24em] uppercase text-white/90 block drop-shadow-sm">
              CONNECTING YOUR JOURNEY WITH PURPOSE
            </span>

            {/* Main Headline (Editorial Serif Typography) */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal sm:font-medium text-white tracking-tight leading-[1.14] drop-shadow-lg">
              Unforgettable Journeys <br className="hidden sm:inline" />
              That Make a Difference.
            </h2>

            {/* Play Button Trigger */}
            <div className="pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3.5 group cursor-pointer focus:outline-none"
                aria-label="Play tour video"
              >
                {/* Circular White Button with Play Icon */}
                <span className="size-12 sm:size-14 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 group-hover:bg-[#EF1A53] group-hover:text-white">
                  <Play className="size-5 fill-current ml-0.5 transition-colors duration-300" />
                </span>

                {/* PLAY VIDEO Label */}
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors drop-shadow-md">
                  PLAY VIDEO
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. INLINE AUDIO TOGGLE CONTROL (BOTTOM RIGHT)
           ========================================================================= */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20">
          <button
            type="button"
            onClick={toggleMute}
            className="size-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
            title={isMuted ? "Unmute background video" : "Mute background video"}
            aria-label={isMuted ? "Unmute background video" : "Mute background video"}
          >
            {isMuted ? (
              <VolumeX className="size-4 text-white/80" />
            ) : (
              <Volume2 className="size-4 text-[#EF1A53]" />
            )}
          </button>
        </div>
      </section>

      {/* =========================================================================
          4. 4K CINEMATIC MODAL POPUP (FULL SOUND EXPEDITION SHOWCASE)
         ========================================================================= */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/20 rounded-3xl shadow-2xl">
          <DialogTitle className="sr-only">WanderGo Safari & Expedition Showcase</DialogTitle>
          <div className="relative aspect-video w-full bg-black">
            {isVideoModalOpen && (
              <iframe
                src="https://www.youtube.com/embed/Pj17qZ2K9_I?autoplay=1&mute=0&rel=0&modestbranding=1"
                title="WanderGo Safari & Wildlife Expedition Showcase"
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

export default VideoSection;

