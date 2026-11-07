// import { LoginForm } from "@/components/login-form"

import SEO from "../shared/SEO";
import LoginForm from "../modules/Authentication/LoginFrom";
import wanderGoLogo from "@/assets/images/WanderGoLOgo2.png";
import loginImg from "@/assets/images/LoginPage-Image.jpg";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <SEO
        title="Sign In to Your Account | WanderGo"
        description="Log in to your WanderGo traveler account to manage tour bookings, view your wishlist, access exclusive discounts, and connect with certified guides."
        keywords="WanderGo login, sign in, travel account, booking management"
      />

      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* logo part */}
        <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="w-[150px]">
              <img src={wanderGoLogo} alt="Logo" />
            </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full ">
          <LoginForm></LoginForm>
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src={loginImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

    </div>
  )
}
