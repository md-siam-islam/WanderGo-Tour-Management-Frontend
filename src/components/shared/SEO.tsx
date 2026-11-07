import React, { useEffect } from "react";

export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

const DEFAULT_DESCRIPTION =
  "WanderGo is Bangladesh's premier tour management platform. Discover curated travel packages, scenic destinations, certified local guides, and unforgettable adventures.";
const DEFAULT_KEYWORDS =
  "WanderGo, tour management, Bangladesh tourism, travel packages, Cox's Bazar, Sundarbans, Sajek Valley, Sreemangal, tour booking, certified guides, holiday trips";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) => {
  const fullTitle = title.includes("WanderGo")
    ? title
    : `${title} | WanderGo - Explore Beyond The Map`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to safely set or create a meta tag by name or property
    const setMetaTag = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard SEO Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "author", "WanderGo Ltd.");
    setMetaTag("name", "robots", "index, follow");

    // OpenGraph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:site_name", "WanderGo Tour Management");
    if (typeof window !== "undefined") {
      setMetaTag("property", "og:url", url || window.location.href);
    }

    // Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);
  }, [fullTitle, description, keywords, image, url, type]);

  return (
    <>
      {/* React 19 Native Document Metadata Hoisting */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export default SEO;

