import { lazy } from "react";
import type { ISidebaritema } from "@/Alltypes/Type";
import { CalendarCheck, Heart, Star, Compass } from "lucide-react";

const Booking = lazy(() => import("@/components/pages/User/Booking"));
const MyWishlist = lazy(() => import("@/components/pages/User/MyWishlist"));
const MyReviews = lazy(() => import("@/components/pages/User/MyReviews"));
const ApplyGuide = lazy(() => import("@/components/pages/User/ApplyGuide"));

export const userSidebarItem: ISidebaritema[] = [
  {
    title: "Travel Dashboard",
    items: [
      {
        title: "My Bookings",
        url: "/user/booking",
        Component: Booking,
        icon: CalendarCheck,
      },
      {
        title: "My Wishlist",
        url: "/user/wishlist",
        Component: MyWishlist,
        icon: Heart,
      },
      {
        title: "My Reviews",
        url: "/user/my-reviews",
        Component: MyReviews,
        icon: Star,
      },
      {
        title: "Become a Guide",
        url: "/user/apply-guide",
        Component: ApplyGuide,
        icon: Compass,
      },
    ],
  },
];
