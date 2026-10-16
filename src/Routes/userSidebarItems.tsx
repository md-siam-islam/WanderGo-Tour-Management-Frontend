import type { ISidebaritema } from "@/Alltypes/Type";
import Booking from "@/components/pages/User/Booking";
import MyWishlist from "@/components/pages/User/MyWishlist";
import MyReviews from "@/components/pages/User/MyReviews";

export const userSidebarItem: ISidebaritema[] = [
  {
    title: "Travel Dashboard",
    items: [
      {
        title: "📅 My Bookings",
        url: "/user/booking",
        Component: Booking,
      },
      {
        title: "❤️ My Wishlist",
        url: "/user/wishlist",
        Component: MyWishlist,
      },
      {
        title: "⭐ My Reviews",
        url: "/user/my-reviews",
        Component: MyReviews,
      },
    ],
  },
];
