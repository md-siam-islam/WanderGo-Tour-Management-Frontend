import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

const registerSchema = z.object({
    name : z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
    email : z.email("Invalid email address"),
    password : z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long"),
    confirmPassword : z.string().min(6, "Confirm Password must be at least 6 characters long").max(100, "Confirm Password must be at most 100 characters long"),
})


export default function RegisterForm() {

    const form = useForm <z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = (data: z.infer<typeof registerSchema>) => {
        console.log(data)
    }

    return (

        <div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1">Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Jon" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control} 
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1" >Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter Your Email" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">This is your public display email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter Your Password" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">This is your public display password.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="mb-1">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Your Password" {...field} />
                                </FormControl>
                                <FormDescription className="sr-only">This is your public display confirm password.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Register</Button>
                </form>

            </Form>
        </div>
    )
}