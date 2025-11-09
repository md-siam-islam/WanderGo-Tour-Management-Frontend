// import { LoginForm } from "@/components/login-form"

import LoginForm from "../modules/Authentication/LoginFrom";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* logo part */}
        <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="w-[150px]">
              <img  src="/src/assets/images/WanderGoLOgo2.png" alt="Logo" />
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
          src="/src/assets/images/LoginPage-Image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

    </div>
  )
}
