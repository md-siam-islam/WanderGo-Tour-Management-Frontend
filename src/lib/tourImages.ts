import React from "react";

/**
 * Curated high-resolution, dependable travel images for tour fallbacks.
 * Featuring scenic Bangladesh & world landscapes (hills, tea gardens, beaches, heritage, rivers).
 */
export const TOUR_FALLBACK_IMAGES: string[] = [
  // 0: Lush tropical hills / Sajek Valley vibe
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
  // 1: Scenic mountain road / adventure
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80",
  // 2: Coastal beach / Cox's Bazar sea view
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  // 3: Green tea gardens / Sreemangal Sylhet landscape
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
  // 4: Heritage palace / architectural wonder (Lalbagh / Tajhat style)
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
  // 5: Riverboat cruise / Sundarbans waters
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
  // 6: Misty mountains & clouds / Bandarban Nilgiri
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
  // 7: Camping adventure under sunset sky
  "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
  // 8: Cultural festival / vibrant historic city
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
];

export const DEFAULT_TOUR_FALLBACK = TOUR_FALLBACK_IMAGES[0];

/**
 * Returns a deterministic fallback image based on the tour title, ID, or index.
 * This guarantees that different tours without images receive different scenic photos!
 */
export const getTourFallbackImage = (identifier?: string, index?: number): string => {
  if (typeof index === "number" && index >= 0) {
    return TOUR_FALLBACK_IMAGES[index % TOUR_FALLBACK_IMAGES.length];
  }

  if (!identifier) return DEFAULT_TOUR_FALLBACK;

  const lower = identifier.toLowerCase();

  // Keyword-based thematic matching for Bangladesh tourist destinations
  if (lower.includes("dhaka") || lower.includes("city")) {
    return "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1000&q=80"; // Modern cityscape
  }
  if (lower.includes("mymensingh") || lower.includes("natural") || lower.includes("river") || lower.includes("green")) {
    return TOUR_FALLBACK_IMAGES[3]; // Lush green nature / river
  }
  if (lower.includes("rangpur") || lower.includes("heritage") || lower.includes("palace") || lower.includes("culture")) {
    return TOUR_FALLBACK_IMAGES[4]; // Heritage palace (Tajhat Palace style)
  }
  if (lower.includes("sylhet") || lower.includes("tea") || lower.includes("jaflong") || lower.includes("bichanakandi")) {
    return TOUR_FALLBACK_IMAGES[3]; // Tea gardens
  }
  if (lower.includes("cox") || lower.includes("beach") || lower.includes("saint") || lower.includes("sea")) {
    return TOUR_FALLBACK_IMAGES[2]; // Beach
  }
  if (lower.includes("sajek") || lower.includes("bandarban") || lower.includes("hill") || lower.includes("mountain")) {
    return TOUR_FALLBACK_IMAGES[6]; // Misty mountains
  }
  if (lower.includes("sundarban") || lower.includes("mangrove") || lower.includes("boat") || lower.includes("safari")) {
    return TOUR_FALLBACK_IMAGES[5]; // Mangrove & river
  }

  // Fallback hash
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = (hash << 5) - hash + identifier.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash);
  return TOUR_FALLBACK_IMAGES[positive % TOUR_FALLBACK_IMAGES.length];
};

/**
 * Safe onError handler for <img> tags.
 * Replaces broken or failed images with a reliable fallback and prevents infinite error loops.
 */
export const handleTourImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string
) => {
  const target = e.currentTarget;
  if (target.dataset.fallbackTried === "true") return;
  target.dataset.fallbackTried = "true";
  target.src = fallbackSrc || DEFAULT_TOUR_FALLBACK;
};
