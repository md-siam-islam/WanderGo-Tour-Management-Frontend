import type { Role } from "@/Alltypes/Type";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";


export const withAuth = (Component: ComponentType , requerdRole?: Role) => {

    return function wapeWithAuth () {

        const {data , isLoading} = useUserInfoQuery(undefined)

        if (isLoading) return <p>Loading...</p>

        if (!data?.data?.email) {
            toast.error("You need to login to access this page.")
            return <Navigate to="/login" />
        }

         if (requerdRole && data?.data?.role !== requerdRole) {
            toast.error("You are not authorized to access this page.")
            return <Navigate to="/unauth" />
        }

        return <Component />
    }
}