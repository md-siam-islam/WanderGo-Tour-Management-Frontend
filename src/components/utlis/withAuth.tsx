import type { Role } from "@/Alltypes/Type";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

import WanderGoLoader from "../ui/WanderGoLoader";

export const withAuth = (Component: ComponentType, requerdRole?: Role[]) => {

    return function WrapWithAuth() {

        const { data, isLoading } = useUserInfoQuery(undefined)
        const location = useLocation()

        if (isLoading) return <WanderGoLoader message="Verifying authentication..." subMessage="Checking your travel credentials..." fullScreen={true} />

        if (!data?.data?.email) {
            toast.error("You need to login to access this page.")
            return <Navigate to="/login" state={{ from: location.pathname }} replace />
        }

        if (requerdRole && !requerdRole.includes(data?.data?.role)) {
            toast.error("You are not authorized to access this page.")
            return <Navigate to="/unauth" replace />
        }

        return <Component />
    }
}