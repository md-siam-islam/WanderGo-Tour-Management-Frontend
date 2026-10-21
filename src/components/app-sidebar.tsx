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
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router"
import { useUserInfoQuery, useLogoutMutation, authApi } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hooks"
import { getSidebaritem, All_Role } from "./utlis/getSidebaritems"
import {
  Compass,
  LogOut,
  Home,
  ChevronRight,
  CalendarCheck,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: UserData } = useUserInfoQuery(undefined)
  const [userLogout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const user = UserData?.data
  const role = user?.role
  const isAdmin = role === All_Role.admin || role === All_Role.superAdmin

  const navGroups = getSidebaritem(role)

  const handleLogout = async () => {
    try {
      await userLogout(undefined).unwrap()
      dispatch(authApi.util.resetApiState())
      toast.success("Logged out successfully")
      navigate("/")
    } catch {
      dispatch(authApi.util.resetApiState())
      toast.success("Logged out successfully")
      navigate("/")
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Sidebar {...props} className="border-r border-border/60 bg-card">
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/src/assets/images/WanderGoLOgo2.png"
              alt="WanderGo Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border-primary/30 text-primary bg-primary/5"
          >
            {isAdmin ? "Admin Hub" : "Traveler"}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 space-y-4">
        {/* Main Navigation Groups */}
        {navGroups.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-3 mb-1">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url
                  const Icon = item.icon || CalendarCheck

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`w-full justify-between h-10 px-3 rounded-xl transition-all font-medium text-sm ${
                          isActive
                            ? "bg-[#EC003F]/10 text-[#EC003F] font-semibold border-l-3 border-[#EC003F] shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <Icon
                            className={`size-4 shrink-0 transition-colors ${
                              isActive ? "text-[#EC003F]" : "text-muted-foreground"
                            }`}
                          />
                          <span className="truncate">{item.title}</span>
                          {isActive && (
                            <ChevronRight className="size-3.5 ml-auto text-[#EC003F] opacity-70" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Explore & Public Portal Quick Links */}
        <SidebarGroup className="p-0 pt-2 border-t border-border/40">
          <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 px-3 mb-1">
            Quick Discovery
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-9 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm">
                  <Link to="/tour" className="flex items-center gap-3">
                    <Compass className="size-4 text-emerald-500" />
                    <span>Explore Tours</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="h-9 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 text-sm">
                  <Link to="/" className="flex items-center gap-3">
                    <Home className="size-4 text-blue-500" />
                    <span>Back to Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer Profile Card */}
      <SidebarFooter className="p-3 border-t border-border/40">
        <div className="p-2.5 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-between gap-3">
          <Link
            to="/profile"
            className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-85 transition-opacity"
            title="View Profile"
          >
            <Avatar className="size-9 rounded-xl border border-primary/20 shrink-0">
              <AvatarImage src={user?.picture} alt={user?.name} className="object-cover" />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-foreground truncate">
                {user?.name || "Traveler"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user?.email || "wanderer@wandergo.com"}
              </p>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            title="Log out"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
