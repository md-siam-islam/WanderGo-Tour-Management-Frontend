import { Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface Hero7Props {
    heading?: string;
    description?: string;
    button?: {
        text: string;
        url: string;
    };
    reviews?: {

        count: number;
        rating?: number;
        avatars: {
            src: string;
            alt: string;
        }[];
    };
}

export const Hero = ({
    heading = "Explore The World With Confidence",
    description = "Explore our exclusive tours crafted to offer unforgettable experiences. From scenic landscapes to cultural adventures, every journey is designed for comfort, and discovery. Join us and create memories that last a lifetime with our expertly guided tours.",
    button = {
        text: "Explore Tours",
        url: "https://www.shadcnblocks.com",
    },
    reviews = {
        count: 200,
        rating: 5.0,
        avatars: [
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
                alt: "Avatar 1",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
                alt: "Avatar 2",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
                alt: "Avatar 3",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
                alt: "Avatar 4",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
                alt: "Avatar 5",
            },
        ],
    },
}: Hero7Props) => {
    return (
        <section
            className="py-32 bg-cover bg-center bg-no-repeat mt-3 relative min-h-screen flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('/src/assets/BannerImage/bannerimage.jpg')" }}
        >
            <div className="container text-center mx-auto  ">

                <div className="mx-auto flex max-w-5xl flex-col gap-4">
                    <h1 className="text-3xl font-semibold lg:text-6xl text-primary-foreground font-nunito">{heading}</h1>
                    <p className="lg:text-lg text-primary-foreground">
                        {description}
                    </p>
                </div>

                <div className=" flex gap-5 mt-5 items-center justify-center">
                    <Button  asChild size="lg" >
                        <Link to="/about">Get Started</Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" >
                        <Link to="/about">Explore Tours</Link>
                    </Button>
                </div>

                {/* <Button asChild size="lg" className="mt-5">
                    <a href={button.url}>{button.text}</a>
                </Button> */}

                <div className="mx-auto mt-5 flex w-fit flex-col items-center gap-4 sm:flex-row text-primary-foreground">
                    <span className="mx-4 inline-flex items-center -space-x-4">
                        {reviews.avatars.map((avatar, index) => (
                            <Avatar key={index} className="size-14 border">
                                <AvatarImage src={avatar.src} alt={avatar.alt} />
                            </Avatar>
                        ))}
                    </span>
                    <div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className="size-5 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                            <span className="mr-1 font-semibold">
                                {reviews.rating?.toFixed(1)}
                            </span>
                        </div>
                        <p className="text-primary-foreground text-left font-medium">
                            from {reviews.count}+ reviews
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};
export default Hero;
