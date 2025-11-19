import type { Role } from "@/Alltypes/Type";
import adminSidebarItem from "@/Routes/adminSidebarItem";
import { userSidebarItem } from "@/Routes/userSidebarItems";

export const All_Role = {
    superAdmin : "SUPER_ADMIN",
    admin : "ADMIN",
    user : "USER",
}

export const getSidebaritem = (userRole : Role) => {

    switch(userRole){
       case All_Role.admin:
            return [...adminSidebarItem]
       case All_Role.superAdmin:
            return [...adminSidebarItem]
       case All_Role.user:
            return [...userSidebarItem]

        default:
            return[]
    }
}