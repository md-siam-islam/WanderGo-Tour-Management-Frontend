import React from 'react';
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useUserInfoQuery, useUserUpdateMutation } from '@/redux/features/auth/auth.api';
import { FaEnvelope, FaGlobeAmericas, FaHome, FaMapMarkerAlt, FaPassport, FaPhone, FaTimesCircle, FaUser } from 'react-icons/fa';
import { Skeleton } from "@/components/ui/skeleton";
import z from 'zod';
import { Link } from 'react-router';
import { toast } from 'sonner';


const UserUpdateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(11, "Phone number must be at most 11 digits"),
    address: z.string().min(5, "Address must be at least 5 characters long").max(100, "Address must be at most 100 characters long")
})

const Userupdate = () => {

    const { data: UserData, isError, isLoading } = useUserInfoQuery(undefined);

    const user = UserData?.data || UserData;

    const [userupdateData] = useUserUpdateMutation()

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

    const onSubmit = async (values: z.infer<typeof UserUpdateSchema>) => {


        try {

            const userInfo = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address

            }

            const result = await userupdateData({ id: user._id, userinfo: userInfo }).unwrap()
            console.log("User update", result);
            toast.success("User updated successfully!")
        } catch (error) {
            console.log(error)
        }

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
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 p-4 md:p-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="max-w-3xl mx-auto relative">
                {/* Header with travel-inspired styling */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 shadow-lg">
                        <FaGlobeAmericas className="text-white text-2xl" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent mb-2">
                        Update Travel Profile
                    </h1>
                    <p className="text-gray-600">Keep your explorer information current for seamless adventures</p>
                </div>

                {/* Main form container */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Form header with navigation */}
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-amber-50">
                        <div className="flex items-center justify-between">
                            <Link
                                to="/"
                                className="group flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 font-medium"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-blue-50 border border-blue-100 mr-3 transition-all group-hover:scale-105">
                                    <FaTimesCircle className="text-blue-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <span>Return to Home</span>
                            </Link>

                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-600">Profile Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-8 md:p-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Personal Information Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-cyan-50">
                                            <FaUser className="text-blue-500 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Personal Details</h3>
                                            <p className="text-gray-500 text-sm">Your journey begins with identity</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name field */}
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center space-x-2 text-gray-700">
                                                        <FaPassport className="text-blue-400" />
                                                        <span>Full Name</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <Input
                                                                defaultValue={user?.name}
                                                                type="text"
                                                                placeholder="Enter your full name"
                                                                className="pl-12 pr-4 py-6 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-all rounded-xl bg-gray-50 group-hover:bg-white focus:bg-white focus:ring-4 focus:ring-blue-100"
                                                                {...field}
                                                            />
                                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors">
                                                                <FaUser />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Phone field */}
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center space-x-2 text-gray-700">
                                                        <FaPhone className="text-blue-400" />
                                                        <span>Phone Number</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <Input
                                                                type="tel"
                                                                placeholder="+1 (123) 456-7890"
                                                                className="pl-12 pr-4 py-6 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-all rounded-xl bg-gray-50 group-hover:bg-white focus:bg-white focus:ring-4 focus:ring-blue-100"
                                                                {...field}
                                                            />
                                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors">
                                                                <FaPhone />
                                                            </div>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Contact Information Section */}
                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-100 to-orange-50">
                                            <FaEnvelope className="text-amber-500 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Contact Information</h3>
                                            <p className="text-gray-500 text-sm">Stay connected on your travels</p>
                                        </div>
                                    </div>

                                    {/* Email field */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center space-x-2 text-gray-700">
                                                    <FaEnvelope className="text-amber-400" />
                                                    <span>Email Address</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <Input
                                                            type="email"
                                                            placeholder="explorer@example.com"
                                                            className="pl-12 pr-4 py-6 border-2 border-gray-200 hover:border-amber-300 focus:border-amber-400 transition-all rounded-xl bg-gray-50 group-hover:bg-white focus:bg-white focus:ring-4 focus:ring-amber-100"
                                                            {...field}
                                                        />
                                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-400 transition-colors">
                                                            <FaEnvelope />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Address Section */}
                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-emerald-100 to-green-50">
                                            <FaHome className="text-emerald-500 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Home Base</h3>
                                            <p className="text-gray-500 text-sm">Where your adventures begin</p>
                                        </div>
                                    </div>

                                    {/* Address field */}
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center space-x-2 text-gray-700">
                                                    <FaMapMarkerAlt className="text-emerald-400" />
                                                    <span>Home Address</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter your complete address"
                                                            className="pl-12 pr-4 py-6 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-400 transition-all rounded-xl bg-gray-50 group-hover:bg-white focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                                            {...field}
                                                        />
                                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-emerald-400 transition-colors">
                                                            <FaMapMarkerAlt />
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Action buttons */}
                                <div className="pt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Cancel Journey
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Update Travel Profile
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </div>

                    {/* Form footer with decorative elements */}
                    <div className="px-10 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                <span>Your data travels securely with us</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaGlobeAmericas className="text-blue-400" />
                                <span>Global Traveler Profile</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative bottom note */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        <span className="font-medium text-blue-500">Pro Tip:</span> Keep your profile updated for personalized travel recommendations and smoother check-ins worldwide.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Userupdate;