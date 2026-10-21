import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import WanderGoLoader from "@/components/ui/WanderGoLoader";
import { genarateSidebar } from "@/components/utlis/genarateSidebar";
import adminSidebarItem from "./adminSidebarItem";
import { userSidebarItem } from "./userSidebarItems";
import { withAuth } from "@/components/utlis/withAuth";
import { All_Role } from "@/components/utlis/getSidebaritems";
import type { Role } from "@/Alltypes/Type";

// Route-based Code Splitting: Lazy load pages on-demand for maximum performance
const Home = lazy(() => import("@/components/pages/Home"));
const Tours = lazy(() => import("@/components/pages/Tours"));
const About = lazy(() => import("@/components/pages/About"));
const SingleTourDetails = lazy(() => import("@/components/pages/SingleTourDetails"));
const TourBooking = lazy(() => import("@/components/pages/TourBooking"));
const Dashboardlayout = lazy(() => import("@/components/layout/Dashboardlayout"));
const LoginPage = lazy(() => import("@/components/pages/Login"));
const SignupPage = lazy(() => import("@/components/pages/singup"));
const Verify = lazy(() => import("@/components/pages/Verify"));
const ForgotPasswordPage = lazy(() => import("@/components/pages/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("@/components/pages/ResetPassword"));
const Unauth = lazy(() => import("@/components/pages/Unauth"));
const Meprofile = lazy(() => import("@/components/User-Profile/Meprofile"));
const Userupdate = lazy(() => import("@/components/User-Profile/Userupdate"));
const PaymentSuccess = lazy(() => import("@/components/pages/Payment-Related-Page/paymentSuccess"));
const PaymentCancel = lazy(() => import("@/components/pages/Payment-Related-Page/paymentCancel"));
const PaymentFail = lazy(() => import("@/components/pages/Payment-Related-Page/paymentFail"));

// Helper HOC to render branded WanderGo loader during chunk download
const withSuspense = (Component: React.ComponentType<any>, message = "Loading...") => {
  return function SuspendedRoute(props: any) {
    return (
      <Suspense fallback={<WanderGoLoader message={message} fullScreen={true} />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: withSuspense(Home, "Loading WanderGo..."),
        index: true,
      },
      {
        Component: withSuspense(Tours, "Discovering incredible tours..."),
        path: "/tour",
      },
      {
        Component: withSuspense(About, "Loading our story & milestones..."),
        path: "/about",
      },
      {
        Component: withSuspense(SingleTourDetails, "Preparing tour itinerary..."),
        path: "/tour-details/:id",
      },
      {
        Component: withAuth(withSuspense(TourBooking, "Setting up secure booking...")),
        path: "/tour-booking/:id",
      },
    ],
  },
  {
    Component: withAuth(withSuspense(Dashboardlayout, "Loading admin center..."), [All_Role.admin, All_Role.superAdmin] as Role[]),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...genarateSidebar(adminSidebarItem),
    ],
  },
  {
    Component: withAuth(withSuspense(Dashboardlayout, "Loading traveler portal..."), [All_Role.user] as Role[]),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/booking" /> },
      ...genarateSidebar(userSidebarItem),
    ],
  },
  {
    Component: withSuspense(LoginPage, "Opening secure login..."),
    path: "/login",
  },
  {
    Component: withSuspense(SignupPage, "Creating your traveler account..."),
    path: "/signup",
  },
  {
    Component: withSuspense(Verify, "Verifying your account..."),
    path: "/verify",
  },
  {
    Component: withSuspense(ForgotPasswordPage, "Resetting access..."),
    path: "/forgot-password",
  },
  {
    Component: withSuspense(ResetPasswordPage, "Setting new password..."),
    path: "/reset-password",
  },
  {
    Component: withSuspense(Unauth, "Checking authorization..."),
    path: "/unauth",
  },
  {
    Component: withAuth(withSuspense(Meprofile, "Loading profile details...")),
    path: "/profile",
  },
  {
    Component: withAuth(withSuspense(Userupdate, "Loading profile editor...")),
    path: "/update-profile",
  },
  {
    Component: withSuspense(PaymentSuccess, "Verifying payment confirmation..."),
    path: "/payment/success",
  },
  {
    Component: withSuspense(PaymentCancel, "Processing cancellation..."),
    path: "/payment/cancel",
  },
  {
    Component: withSuspense(PaymentFail, "Checking payment status..."),
    path: "/payment/fail",
  },
]);
