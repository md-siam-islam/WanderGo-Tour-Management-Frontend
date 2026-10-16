import type { ComponentType } from "react"

export interface ISidebaritema  {
        title : string,
        items : {
            title : string,
            url : string,
            Component : ComponentType
        }[]
}


export type Role = "USER" | "ADMIN" | "SUPER_ADMIN" | "GUIDE" | "user" | "admin" | "super_admin";