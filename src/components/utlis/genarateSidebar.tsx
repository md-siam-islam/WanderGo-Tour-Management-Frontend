import type { ISidebaritema } from "@/Alltypes/Type"

export const genarateSidebar = (sidebarIteam : ISidebaritema[]) => {
    return sidebarIteam.flatMap((SideItem) => SideItem.items.map((sectioItem) => ({
        path : sectioItem.url,
        Component : sectioItem.Component
    })) )
}