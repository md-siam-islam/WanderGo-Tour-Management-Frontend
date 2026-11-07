import SEO from "../shared/SEO";
import ResetPasswordForm from "../modules/Authentication/ResetPasswordForm";
import wanderGoLogo from "@/assets/images/WanderGoLOgo2.png";
import loginImg from "@/assets/images/LoginPage-Image.jpg";

export default function ResetPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <SEO
        title="Reset Password | WanderGo"
        description="Choose a strong new password for your WanderGo account."
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
            <ResetPasswordForm />
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
