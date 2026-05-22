import { Star } from "lucide-react";
import { Compass } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";   

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: { text: string; url: string };
  reviews?: {
    count: number;
    rating?: number;
    avatars: { src: string; alt: string }[];
  };
}

export const Hero = ({
  heading = "Explore The World With Confidence",
  description = "Discover exclusive tours crafted for unforgettable experiences — from scenic landscapes to cultural adventures, every journey designed for comfort and discovery.",
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", alt: "Avatar 1" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", alt: "Avatar 2" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", alt: "Avatar 3" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp", alt: "Avatar 4" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp", alt: "Avatar 5" },
    ],
  },
}: Hero7Props) => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center py-32 mt-3 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/src/assets/BannerImage/bannerimage.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-0" />

      {/* Subtle bottom gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-0" />

      <div className="relative z-10 container text-center mx-auto px-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-pink-500/25 bg-pink-500/10 backdrop-blur-sm text-white text-xs tracking-widest uppercase font-nunito">
          <Compass className="size-4" />
          Your Adventure Starts Here
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-4xl mb-3">
          <h1 className="text-4xl lg:text-6xl font-bold text-white font-nunito leading-tight drop-shadow-lg">
            Explore The World With{" "}
            <em className="not-italic text-[#EC003F]">Confidence</em>
          </h1>
        </div>

        {/* Description */}
        <p className="mx-auto max-w-xl text-white/80 lg:text-lg leading-relaxed mb-5 font-nunito">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-2 mb-10 items-center justify-center flex-wrap">
          <Button
            asChild
            size="lg"
            className="bg-[#EC003F] hover:bg-[#d30037] text-white border-0 font-semibold px-8"
          >
            <Link to="/about">Get Started</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="border-white/50 text-white bg-transparent hover:bg-[#EC003F] hover:text-white font-semibold px-8"
          >
            <Link to="/about">Explore Tours</Link>
          </Button>
        </div>

        {/* Reviews */}
        <div className="mx-auto flex w-fit flex-col items-center gap-3 sm:flex-row text-white">
          <span className="inline-flex items-center -space-x-3">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-11 border-2 border-white shadow-md">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="size-4 fill-[#EC003F] text-[#EC003F]" />
              ))}
              <span className="ml-1 font-semibold text-white text-sm">
                {reviews.rating?.toFixed(1)}
              </span>
            </div>
            <p className="text-white/75 text-sm font-nunito">
              from {reviews.count}+ happy travelers
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] tracking-widest uppercase font-nunito">Scroll</span>
        </div> */}

      </div>
    </section>
  );
};

export default Hero;