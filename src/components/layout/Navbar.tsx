
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { All_Role } from "../utlis/getSidebaritems";
import { LayoutDashboard, User, Calendar, LogOut } from "lucide-react";

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [userLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = data?.data;
  const role = user?.role;

  const isAdmin = role === All_Role.admin || role === All_Role.superAdmin;
  const isUser = role === All_Role.user;

  const handleUserLogout = async () => {
    try {
      await userLogout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side: Logo & Nav items */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/src/assets/images/WanderGoLOgo2.png"
              alt="WanderGo Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="px-3 py-2 font-medium text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="px-3 py-2 font-medium text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/tour">Tours</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="px-3 py-2 font-medium text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {isAdmin && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="px-3 py-2 font-medium text-sm text-primary hover:text-primary/80 transition-colors">
                    <Link to="/admin">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              {isUser && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="px-3 py-2 font-medium text-sm text-primary hover:text-primary/80 transition-colors">
                    <Link to="/user">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side: Mobile Menu, Theme, Auth */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* Mobile hamburger menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="md:hidden size-9" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 6H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-2 md:hidden">
              <div className="flex flex-col gap-1">
                <Link to="/" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                  Home
                </Link>
                <Link to="/tour" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                  Tours
                </Link>
                <Link to="/about" className="px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">
                  About
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="px-3 py-2 text-sm font-semibold text-primary hover:bg-muted rounded-md">
                    Admin Dashboard
                  </Link>
                )}
                {isUser && (
                  <Link to="/user" className="px-3 py-2 text-sm font-semibold text-primary hover:bg-muted rounded-md">
                    My Dashboard
                  </Link>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* User profile dropdown or Login button */}
          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9 border border-primary/20">
                    <AvatarImage src={user?.picture} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
                    <span className="text-[10px] font-medium uppercase text-primary tracking-wider mt-1">
                      {user?.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/user/booking" className="cursor-pointer flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleUserLogout} className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
