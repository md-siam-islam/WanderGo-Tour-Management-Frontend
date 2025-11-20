import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import Password from "@/components/ui/password"
import { authApi, useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/redux/hooks"

// Validation Schema
const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
}) 

export default function LoginForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {

        // console.log(data)
    try {
        const userInfo = {
            email: data.email,
            password: data.password
          }

    const result = await login(userInfo).unwrap()
        console.log("User login" , result);
        toast.success("User Login successful!.")
        form.reset()
        navigate('/')
    } catch (error : any) {
        console.log(error)
        if(error.data.message === "Invalid email or password"){
          toast.error("Invalid email or password")
        }
        if(error.data.message === "Your account is not verified"){
            navigate("/verify" , {state : data.email})
            toast.error("Your account is not verified. Please verify your email before login.")
        }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl p-8  border border-gray-200 rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-3 text-foreground">
          Login Your Account
        </h2>
        <p className="text-center mb-7 text-foreground text-sm">Log in to view your travel plans, bookings, and favorite destinations.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>


        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-foreground hover:underline font-medium underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
