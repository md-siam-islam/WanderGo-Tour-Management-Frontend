import type { ComponentType } from "react"

export interface ISidebaritema  {
        title : string,
        items : {
            title : string,
            url : string,
            Component : ComponentType
        }[]
}


export type  Role  = "user" | "admin" | "super_admin"