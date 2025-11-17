import { createBrowserRouter } from "react-router";
import App from "@/App";
import About from "@/components/pages/About";
import LoginPage from "@/components/pages/Login";
import SignupPage from "@/components/pages/singup";
import verify from "@/components/pages/Verify";
import Dashboardlayout from "@/components/layout/Dashboardlayout";
import analytics from "@/components/pages/Admin/analytics";
import Booking from "@/components/pages/User/Booking";

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
    children : [

      {
        Component : analytics,
        path : "analytics"
      }
    ]
  },
  {
    Component : Dashboardlayout,
    path:"/user",
    children : [

      {
        Component : Booking,
        path : "booking"
      }
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
