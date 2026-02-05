import React from 'react';
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { FaTimesCircle } from 'react-icons/fa';
import { Skeleton } from "@/components/ui/skeleton";
import z from 'zod';


const UserUpdateSchema = z.object({
    name : z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
    email : z.string().email("Invalid email address"),
    phone : z.string().min(10, "Phone number must be at least 10 digits").max(11, "Phone number must be at most 11 digits"),
    address : z.string().min(5, "Address must be at least 5 characters long").max(100, "Address must be at most 100 characters long")
})

const Userupdate = () => {

    const { data: UserData, isError, isLoading } = useUserInfoQuery(undefined);

    const user = UserData?.data || UserData;

    const form = useForm<z.infer<typeof UserUpdateSchema>>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || ''
        }
    });

    React.useEffect(() => {
        if (user) {
            form.reset({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                address: user?.address || '',
            });
        }
    }, [user, form]);

    const onSubmit = (values: z.infer<typeof UserUpdateSchema>) => {
        console.log(values);
    }

    if (isLoading) {
        return (
            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="h-32 w-32 rounded-full mx-auto md:mx-0" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !UserData) {
        return (
            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-3" />
                    <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Profile</h2>
                    <p className="text-red-600">Unable to load user profile. Please try again later.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update User Profile</h2>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input defaultValue={user?.name} type="text" placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* email */}
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

                    {/* phone */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* password */}
                    {/* <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter your address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </form>

            </Form>

        </div>
    );
};

export default Userupdate;