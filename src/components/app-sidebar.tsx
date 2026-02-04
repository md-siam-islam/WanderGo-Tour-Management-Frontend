import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { getSidebaritem } from "./utlis/getSidebaritems"
import { User } from "lucide-react"


// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: UserData } = useUserInfoQuery(undefined)

  const data = {
    navMain: getSidebaritem(UserData?.data.role)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/" className="w-[110px]">
          <img src="/src/assets/images/WanderGoLOgo2.png" alt="Logo" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}


        {/* user profile link section start */}

        <div className="mt-auto p-3 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User size={18} />
                  Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* user profile link section end */}

        <div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
