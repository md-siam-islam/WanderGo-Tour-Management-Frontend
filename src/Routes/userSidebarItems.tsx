import type { ISidebaritema } from "@/Alltypes/Type";
import Booking from "@/components/pages/User/Booking";


 export const userSidebarItem : ISidebaritema[] = [
    {
      title: "History",
      items: [
        {
          title: "Booking",
          url: "/user/booking",
          Component : Booking
        }
      ],
    },
  ]
