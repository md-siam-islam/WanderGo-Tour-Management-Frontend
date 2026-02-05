import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import About from "@/components/pages/About";
import LoginPage from "@/components/pages/Login";
import SignupPage from "@/components/pages/singup";
import verify from "@/components/pages/Verify";
import Dashboardlayout from "@/components/layout/Dashboardlayout";
import { genarateSidebar } from "@/components/utlis/genarateSidebar";
import adminSidebarItem from "./adminSidebarItem";
import { userSidebarItem } from "./userSidebarItems";
import { withAuth } from "@/components/utlis/withAuth";
import Unauth from "@/components/pages/Unauth";
import { All_Role } from "@/components/utlis/getSidebaritems";
import type { Role } from "@/Alltypes/Type";
import Home from "@/components/pages/Home";
import Tours from "@/components/pages/Tours";
import SingleTourDetails from "@/components/pages/SingleTourDetails";
import TourBooking from "@/components/pages/TourBooking";
import Meprofile from "@/components/User-Profile/Meprofile";
import Userupdate from "@/components/User-Profile/Userupdate";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true
      },
      {
        Component: Tours,
        path: '/tour'
      },
      {
        Component: withAuth(About, All_Role.admin as Role),
        path: "/about"
      },
      // {
      //   Component: withAuth(About, All_Role.admin as Role),
      //   path: "/about"
      // },
      {
        Component: SingleTourDetails,
        path: "/tour-details/:id"
      },
      {
        Component: TourBooking,
        path: "/tour-booking/:id"
      }
    ]
  },
  {
    Component: withAuth(Dashboardlayout, All_Role.admin as Role),
    path: "/admin",
    children: [{ index: true, element: <Navigate to={"/admin/analytics"}></Navigate> }, ...genarateSidebar(adminSidebarItem)]
  },
  {
    Component: withAuth(Dashboardlayout, All_Role.user as Role),
    path: "/user",
    children: [
      { index: true, element: <Navigate to={'/user/booking'}></Navigate> },
      ...genarateSidebar(userSidebarItem)
    ]
  },

  {
    Component: LoginPage,
    path: "/login"
  },
  {
    Component: SignupPage,
    path: "/signup"
  },
  {
    Component: verify,
    path: "/verify"
  },
  {
    Component: Unauth,
    path: "/unauth"
  },
  {
    Component: Meprofile,
    path: "/profile"
  },{
    Component:Userupdate,
    path:"/update-profile"
  }
]);
