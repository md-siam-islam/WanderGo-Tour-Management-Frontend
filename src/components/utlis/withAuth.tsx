import type { Role } from "@/Alltypes/Type";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";


export const withAuth = (Component: ComponentType , requerdRole?: Role) => {

    return function wapeWithAuth () {

        const {data , isLoading} = useUserInfoQuery(undefined)

        if(!isLoading && !data?.data?.email){
            return <Navigate to="/login"/>
        }

        if(!isLoading && data?.data?.role !== requerdRole){
            return <Navigate to={"/unauth"}></Navigate>
        }

        return <Component />
    }
}