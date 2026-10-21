import type { ComponentType } from "react"

export interface ISidebaritema  {
        title : string,
        items : {
            title : string,
            url : string,
            Component : ComponentType,
            icon?: ComponentType<{ className?: string }>,
            badge?: string | number,
        }[]
}

export type Role = "USER" | "ADMIN" | "SUPER_ADMIN" | "GUIDE" | "user" | "admin" | "super_admin";