import type { ISidebaritema } from "@/Alltypes/Type";
import Addtour from "@/components/pages/Admin/Addtour";
import AddtourType from "@/components/pages/Admin/AddtourType";
import analytics from "@/components/pages/Admin/analytics";
import Division from "@/components/pages/Admin/Division";

 export const adminSidebarItem : ISidebaritema[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          Component : analytics
        },
        {
          title: "Add Tour",
          url: "/admin/add-tour",
          Component : Addtour
        },
        {
          title: "Add Tour Type",
          url: "/admin/add-tour-type",
          Component : AddtourType
        },
        {
          title: "Add Division",
          url: "/admin/division",
          Component : Division
        },
      ],
    },
  ]

  export default adminSidebarItem;