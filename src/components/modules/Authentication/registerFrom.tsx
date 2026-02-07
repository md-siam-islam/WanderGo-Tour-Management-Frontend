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
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { Phone } from "lucide-react"

// Validation Schema
const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z
    .string()
    .email("Invalid email address"),
  address: z.string().min(2, "Address Must be 1 characters long").max(50, "Address must be at most 50 characters long"),
  phone: z
  .string()
  .regex(
    /^01[3-9]\d{8}$/,
    "Invalid Bangladeshi phone number"
  ).min(11, "Phone number must be exactly 11 digits")
  .max(11, "Phone number must be exactly 11 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long")
    .max(100, "Confirm Password must be at most 100 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })    

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address : "",
      password: "",
      confirmPassword: "",
    },
  })

  const navigate = useNavigate()
  const [register] = useRegisterMutation()

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {

    try {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            address: data.address
        }

        const result = await register(userInfo).unwrap()
        console.log("Registration successful:", result)
         navigate("/verify" , {state : data.email})
        toast.success("User registration successful!.")
        form.reset()

    } catch (error : any) {
        console.error("Registration failed:", error)
        toast.error(error.data.message || "Registration failed. Please try again.")
    }

    console.log(data)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl p-8  border border-gray-200 rounded-xl">
        <h2 className="text-3xl font-semibold text-center mb-6 text-foreground">
          Register
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="flex items-center gap-5">

               {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               {/* Phone */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>


        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-foreground hover:underline font-medium underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
