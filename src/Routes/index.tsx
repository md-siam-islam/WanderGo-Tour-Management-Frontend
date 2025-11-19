import { createBrowserRouter } from "react-router";
import App from "@/App";
import About from "@/components/pages/About";
import LoginPage from "@/components/pages/Login";
import SignupPage from "@/components/pages/singup";
import verify from "@/components/pages/Verify";
import Dashboardlayout from "@/components/layout/Dashboardlayout";
import { genarateSidebar } from "@/components/utlis/genarateSidebar";
import adminSidebarItem from "./adminSidebarItem";
import { userSidebarItem } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children : [
        {
           path : "/about", 
           element : <About />
        }
    ]
  },
  {
    Component : Dashboardlayout,
    path:"/admin",
    children : [...genarateSidebar(adminSidebarItem)]
  },
  {
    Component : Dashboardlayout,
    path:"/user",
    children : [

      ...genarateSidebar(userSidebarItem)
    ]
  },

  {
    Component : LoginPage,
    path : "/login"
  },
  {
    Component : SignupPage,
    path : "/signup"
  },
  {
    Component : verify,
    path : "/verify"
  }
]);
