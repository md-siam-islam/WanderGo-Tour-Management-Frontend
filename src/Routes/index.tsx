import { createBrowserRouter } from "react-router";
import App from "@/App";
import About from "@/components/pages/About";
import LoginPage from "@/components/pages/Login";
import SignupPage from "@/components/pages/singup";

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
    Component : LoginPage,
    path : "/login"
  },
  {
    Component : SignupPage,
    path : "/signup"
  }
]);
