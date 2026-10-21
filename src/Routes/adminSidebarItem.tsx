import { lazy } from "react";
import type { ISidebaritema } from "@/Alltypes/Type";
import {
  BarChart3,
  PlusCircle,
  Compass,
  Layers,
  MapPin,
  TicketPercent,
} from "lucide-react";

const Analytics = lazy(() => import("@/components/pages/Admin/analytics"));
const Addtour = lazy(() => import("@/components/pages/Admin/Addtour"));
const AllTour = lazy(() => import("@/components/pages/Admin/AllTour"));
const AddtourType = lazy(() => import("@/components/pages/Admin/AddtourType"));
const Division = lazy(() => import("@/components/pages/Admin/Division"));
const AdminCoupons = lazy(() => import("@/components/pages/Admin/Coupons"));

export const adminSidebarItem: ISidebaritema[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
        icon: BarChart3,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        Component: Addtour,
        icon: PlusCircle,
      },
      {
        title: "All Tours",
        url: "/admin/all-tour",
        Component: AllTour,
        icon: Compass,
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        Component: AddtourType,
        icon: Layers,
      },
      {
        title: "Add Division",
        url: "/admin/division",
        Component: Division,
        icon: MapPin,
      },
      {
        title: "Promo Coupons",
        url: "/admin/coupons",
        Component: AdminCoupons,
        icon: TicketPercent,
      },
    ],
  },
];

export default adminSidebarItem;