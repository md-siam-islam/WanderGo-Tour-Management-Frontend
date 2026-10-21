import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourImageGalleryProps {
  images?: string[];
  title?: string;
  className?: string;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80";

export const TourImageGallery: React.FC<TourImageGalleryProps> = ({
  images,
  title = "Tour Image",
  className = "",
}) => {
  const validImages =
    Array.isArray(images) && images.length > 0 ? images : [FALLBACK_IMAGE];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Safe navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
  }, [validImages.length]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isLightboxOpen]);

  return (
    <div className={`w-full ${className}`}>
      {/* Main Image Slider View */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[520px] rounded-3xl overflow-hidden shadow-lg border border-border/60 bg-zinc-950 flex items-center justify-center group select-none">
        {/* Ambient Blurred Backdrop to smoothly fill the container without cutting off anything */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={validImages[currentIndex]}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter blur-3xl opacity-35 scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Foreground Main Image: object-contain ensures NO head, footer, or edges are cut off */}
        <img
          src={validImages[currentIndex]}
          alt={`${title} - Photo ${currentIndex + 1}`}
          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain cursor-pointer transition-transform duration-500 ease-out group-hover:scale-[1.01] drop-shadow-2xl"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Floating Navigation Controls (Prev / Next) */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/85 text-white backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 sm:opacity-90 sm:group-hover:opacity-100 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/85 text-white backdrop-blur-md shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 sm:opacity-90 sm:group-hover:opacity-100 z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Bottom Left: Counter & Camera Pill */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full border border-white/15 shadow">
          <Camera className="w-4 h-4 text-primary-foreground" />
          <span>
            {currentIndex + 1} / {validImages.length}
          </span>
        </div>

        {/* Bottom Right: Fullscreen / View All Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/85 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">View Fullscreen</span>
          <span className="sm:hidden">Zoom</span>
        </button>

        {/* Top Right: Click to preview hint */}
        <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 bg-black/40 text-white/85 text-xs px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none border border-white/10">
          <Eye className="w-3.5 h-3.5" />
          <span>Click image to expand</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
          {validImages.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToIndex(idx)}
                className={`relative flex-shrink-0 h-20 sm:h-24 md:h-28 w-28 sm:w-36 md:w-44 rounded-2xl overflow-hidden transition-all duration-300 focus:outline-none bg-zinc-950 flex items-center justify-center ${
                  isActive
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02] shadow-md opacity-100"
                    : "opacity-60 hover:opacity-100 hover:scale-[1.01]"
                }`}
              >
                {/* Thumbnail Ambient Blur */}
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-40"
                />

                {/* Thumbnail Foreground Image: object-contain to avoid cutting off */}
                <img
                  src={img}
                  alt={`${title} - Thumbnail ${idx + 1}`}
                  className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-1"
                />

                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none z-20" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar: Title & Close Button */}
          <div
            className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white">
              <h3 className="text-base sm:text-lg font-semibold truncate max-w-xs sm:max-w-md md:max-w-xl">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-white/60">
                Photo {currentIndex + 1} of {validImages.length}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Center Area: Large Preview with Controls */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button in Lightbox */}
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-2 sm:left-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            {/* Active Lightbox Image: object-contain ensures 100% of photo is visible */}
            <img
              src={validImages[currentIndex]}
              alt={`${title} - Preview ${currentIndex + 1}`}
              className="max-h-[70vh] sm:max-h-[78vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl transition-all duration-300"
            />

            {/* Next Button in Lightbox */}
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-2 sm:right-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Thumbnail Strip in Lightbox */}
          {validImages.length > 1 && (
            <div
              className="w-full max-w-4xl mx-auto flex gap-2 sm:gap-3 overflow-x-auto py-2 justify-center scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((img, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToIndex(idx)}
                    className={`flex-shrink-0 h-14 sm:h-16 w-20 sm:w-24 rounded-xl overflow-hidden transition-all duration-200 bg-zinc-950 flex items-center justify-center ${
                      isActive
                        ? "ring-2 ring-primary scale-105 opacity-100"
                        : "opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TourImageGallery;
