import SEO from "../shared/SEO";
import RegisterForm from "../modules/Authentication/registerFrom";
import wanderGoLogo from "@/assets/images/WanderGoLOgo2.png";
import signupImg from "@/assets/images/Signup-From-Image.jpg";

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
          <SEO
            title="Create an Account | WanderGo"
            description="Create your WanderGo traveler account. Access hundreds of tour packages across Bangladesh, save your favorite trips, and enjoy verified guide assistance."
            keywords="WanderGo sign up, register account, join WanderGo, Bangladesh travel community"
          />

      <div className="bg-muted relative hidden lg:block">
        <img
          src={signupImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

        <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* logo part */}
        <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="w-[150px]">
              <img src={wanderGoLogo} alt="Logo" />
            </a>
        </div>

        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full ">
            <RegisterForm></RegisterForm>
          </div>
        </div>
      </div>


    </div>
    )
}