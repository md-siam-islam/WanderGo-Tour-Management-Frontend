import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useLocation, Link, useNavigate } from "react-router"
import { ModeToggle } from "./mode-toggle"
import { useUserInfoQuery, useLogoutMutation, authApi } from "@/redux/features/auth/auth.api"
import { useGetMyBookingsQuery } from "@/redux/features/Booking/booking.api"
import { useAppDispatch } from "@/redux/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Compass,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Heart,
  CalendarCheck,
} from "lucide-react"
import { toast } from "sonner"
import { All_Role } from "../utlis/getSidebaritems"

export default function Dashboardlayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: userData } = useUserInfoQuery(undefined)
  const [userLogout] = useLogoutMutation()

  const user = userData?.data
  const role = user?.role
  const isUser = role === All_Role.user

  const { data: bookingsData } = useGetMyBookingsQuery(undefined, {
    skip: !isUser,
  })

  const pendingBookingsCount =
    bookingsData?.data?.filter((b: any) => b.status === "PENDING")?.length || 0

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

  const getPageTitle = (path: string) => {
    if (path.includes("/user/booking")) return "My Tour Bookings"
    if (path.includes("/user/wishlist")) return "My Wishlist"
    if (path.includes("/user/my-reviews")) return "My Reviews"
    if (path.includes("/admin/analytics")) return "Platform Analytics"
    if (path.includes("/admin/add-tour")) return "Add New Tour"
    if (path.includes("/admin/all-tour")) return "All Tours Management"
    if (path.includes("/admin/coupons")) return "Promotional Coupons"
    if (path.includes("/admin/division")) return "Division Manager"
    if (path.includes("/admin/add-tour-type")) return "Tour Types"
    return "Dashboard Overview"
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        {/* Modern Interactive Dashboard Top Header */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-4 sm:px-6 backdrop-blur-md">
          {/* Left: Trigger & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
            <div className="h-4 w-px bg-border/60" />

            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <span className="text-muted-foreground hidden sm:inline">
                {isUser ? "Traveler Portal" : "Admin Portal"}
              </span>
              <ChevronRight className="size-3.5 text-muted-foreground/60 hidden sm:inline" />
              <span className="font-semibold text-foreground">
                {getPageTitle(location.pathname)}
              </span>
            </div>
          </div>

          {/* Right: Actions, Notifications & Profile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8.5 rounded-xl hidden sm:flex text-xs font-semibold border-primary/20 hover:border-primary/40 text-foreground hover:text-primary"
            >
              <Link to="/tour">
                <Compass className="size-3.5 mr-1.5 text-emerald-500" /> Explore Tours
              </Link>
            </Button>

            {/* Notification Bell with Pending Action Indicator */}
            {isUser && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="relative size-8.5 rounded-xl text-muted-foreground hover:text-foreground"
                title={
                  pendingBookingsCount > 0
                    ? `${pendingBookingsCount} pending booking(s) await confirmation or payment`
                    : "No new alerts"
                }
              >
                <Link to="/user/booking">
                  <Bell className="size-4" />
                  {pendingBookingsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[#EC003F] text-[10px] font-bold text-white shadow-xs animate-pulse">
                      {pendingBookingsCount}
                    </span>
                  )}
                </Link>
              </Button>
            )}

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Profile Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-8.5 rounded-xl p-0 hover:ring-2 hover:ring-primary/20 transition-all"
                >
                  <Avatar className="size-8.5 rounded-xl border border-border/80">
                    <AvatarImage src={user?.picture} alt={user?.name} className="object-cover" />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl">
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-foreground leading-none">
                      {user?.name || "Traveler"}
                    </p>
                    <p className="text-xs text-muted-foreground leading-none truncate">
                      {user?.email}
                    </p>
                    <div className="pt-1">
                      <Badge variant="secondary" className="text-[10px] uppercase font-semibold">
                        {role || "USER"}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>

                {isUser && (
                  <>
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                      <Link to="/user/booking" className="flex items-center gap-2">
                        <CalendarCheck className="size-4 text-muted-foreground" />
                        <span>My Bookings</span>
                        {pendingBookingsCount > 0 && (
                          <Badge className="ml-auto bg-[#EC003F] text-white text-[10px] px-1.5 py-0 h-4">
                            {pendingBookingsCount}
                          </Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                      <Link to="/user/wishlist" className="flex items-center gap-2">
                        <Heart className="size-4 text-muted-foreground" />
                        <span>My Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"
                >
                  <LogOut className="size-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
