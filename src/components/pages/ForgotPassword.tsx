import SEO from "../shared/SEO";
import ForgotPasswordForm from "../modules/Authentication/ForgotPasswordForm";
import wanderGoLogo from "@/assets/images/WanderGoLOgo2.png";
import loginImg from "@/assets/images/LoginPage-Image.jpg";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <SEO
        title="Forgot Password | WanderGo"
        description="Reset your WanderGo account password easily. Receive a secure reset OTP to your email."
      />
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* logo part */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="w-[150px]">
            <img src={wanderGoLogo} alt="Logo" />
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <ForgotPasswordForm />
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
  );
}
