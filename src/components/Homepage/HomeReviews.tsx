import { Star, Quote, CheckCircle, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const HomeReviews = () => {
  const reviews = [
    {
      name: "Tanjim Ahmed",
      role: "Adventure Enthusiast",
      destination: "Sajek Valley & Bandarban Expedition",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      comment:
        "WanderGo made our Sajek tour completely effortless! From seamless resort booking to our knowledgeable local guide, everything felt 5-star. Watching the cloud ocean at sunrise was pure magic.",
    },
    {
      name: "Sabrina Rahman",
      role: "Solo Traveler",
      destination: "Sylhet Tea Gardens & Ratargul Forest",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
      comment:
        "As a solo female traveler, safety and comfort are my top priorities. WanderGo's verified team took exceptional care of every detail. The boat ride into the freshwater swamp forest was mesmerizing!",
    },
    {
      name: "Mahfuzur Karim",
      role: "Family Vacationer",
      destination: "Cox's Bazar & Saint Martin Cruise",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      comment:
        "Booked a 4-day tour for my family. The payment was super easy, and applying a promo coupon saved us ৳2,000! Clean transport, punctual schedule, and wonderful memories.",
    },
    {
      name: "Nusrat Jahan",
      role: "Photography Explorer",
      destination: "Sundarbans Wildlife Adventure",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      comment:
        "The cruise deep into the mangrove channels was an unforgettable thrill. We even spotted spotted deers and rare bird species. Highly recommend WanderGo for authentic expeditions!",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 size-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 text-[#EC003F] text-xs font-bold uppercase tracking-wider">
            <Heart className="size-3.5 fill-[#EC003F]" /> Traveler Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-nunito tracking-tight">
            Loved by 5,000+ Happy Explorers
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Read real stories and unfiltered reviews from travelers who experienced unforgettable journeys with WanderGo.
          </p>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-foreground">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="size-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold">4.9 / 5.0 Overall Rating</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle className="size-4" /> 100% Verified Bookings
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl border bg-card/60 backdrop-blur-xs text-card-foreground shadow-xs hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="size-10 text-pink-500/20 absolute top-6 right-6 group-hover:text-pink-500/30 transition-colors" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="size-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-nunito italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Destination */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t">
                <Avatar className="size-12 border-2 border-white dark:border-gray-800 shadow-md">
                  <AvatarImage src={rev.avatar} alt={rev.name} />
                  <AvatarFallback className="bg-pink-500/10 text-[#EC003F] font-bold">
                    {rev.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-bold text-base text-foreground font-nunito">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{rev.role}</p>
                  <p className="text-[11px] text-[#EC003F] font-medium mt-0.5">
                    Tour: {rev.destination}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeReviews;
