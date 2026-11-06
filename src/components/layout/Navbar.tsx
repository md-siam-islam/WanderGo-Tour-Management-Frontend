import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { All_Role } from "../utlis/getSidebaritems";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowUpRight,
  Compass,
  ShieldCheck,
  User,
  Calendar,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Menu,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [userLogout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = data?.data;
  const role = user?.role;

  const isAdmin = role === All_Role.admin || role === All_Role.superAdmin;
  const isUser = role === All_Role.user || role === All_Role.guide;
  const isGuide = role === All_Role.guide;

  // Pages with full-bleed hero banner
  const isHeroPage =
    location.pathname === "/" ||
    location.pathname === "/tour" ||
    location.pathname === "/about";

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

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Destination", path: "/tour" },
    ...(isAdmin
      ? [{ label: "Admin Center", path: "/admin" }]
      : isUser
      ? [{ label: "Travel Portal", path: "/user" }]
      : []),
  ];

  const isCurrentActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHeroPage
          ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Minimalist Typography Logo (Tourvia Style) */}
        <Link
          to="/"
          className="flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          <img
            src="/src/assets/images/WanderGoLOgo2.png"
            alt="WanderGo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300"
          />
        </Link>

        {/* Center: Floating Pill Capsule Navigation (Tourvia Style) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/15 rounded-full p-1.5 shadow-2xl">
          {navItems.map((item) => {
            const active = isCurrentActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-white text-zinc-950 shadow-md font-bold scale-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Area: Book Now Pill Button + Auth / Profile (Tourvia Style) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Action Button: Book Now ↗ */}
          <Link
            to="/tour"
            className="hidden sm:inline-flex items-center gap-2 bg-white/95 hover:bg-white text-zinc-950 font-bold text-xs sm:text-sm pl-4 pr-1.5 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>Book Now</span>
            <span className="size-6 sm:size-7 rounded-full bg-[#EF1A53] group-hover:bg-[#d81548] text-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-3.5 sm:size-4" />
            </span>
          </Link>

          {/* User Auth: Profile or Login */}
          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 pl-1 pr-2.5 sm:pr-3 py-1 rounded-full text-white transition-all hover:scale-105">
                  <Avatar className="size-7 sm:size-8 border border-white/40 shadow-xs">
                    <AvatarImage src={user?.picture} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-[#EF1A53] text-white text-[11px] font-bold">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold max-w-[85px] truncate hidden sm:inline">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="size-3 text-white/70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-2xl p-1.5 shadow-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal px-3 py-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold text-foreground leading-none">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <span className="text-[10px] font-extrabold uppercase text-[#EF1A53] tracking-wider mt-1">
                      {isGuide ? "Certified Tour Guide" : user?.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center gap-2 rounded-xl text-xs font-semibold">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/user/booking" className="cursor-pointer flex items-center gap-2 rounded-xl text-xs font-semibold">
                    <Calendar className="h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/user/wishlist" className="cursor-pointer flex items-center gap-2 rounded-xl text-xs font-semibold">
                    <Heart className="h-4 w-4" />
                    <span>Saved Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                {isGuide ? (
                  <DropdownMenuItem asChild>
                    <Link to="/user/apply-guide" className="cursor-pointer flex items-center gap-2 text-emerald-600 rounded-xl text-xs font-bold">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Guide Status & Guild</span>
                    </Link>
                  </DropdownMenuItem>
                ) : !isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/user/apply-guide" className="cursor-pointer flex items-center gap-2 text-[#EF1A53] rounded-xl text-xs font-bold">
                      <Compass className="h-4 w-4" />
                      <span>Become a Tour Guide</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer flex items-center gap-2 text-purple-600 rounded-xl text-xs font-bold">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleUserLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2 rounded-xl text-xs font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white px-3 sm:px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xs sm:text-sm font-bold bg-[#EF1A53] hover:bg-[#d81548] text-white px-3.5 sm:px-4 py-1.5 rounded-full shadow-md transition-all hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Theme Toggle in Sleek Glass Button */}
          <div className="text-black">
            <ModeToggle />
          </div>

          {/* Mobile Menu Hamburger */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="md:hidden size-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all"
                aria-label="Open mobile menu"
              >
                <Menu className="size-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-2 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border-white/15 text-white shadow-2xl md:hidden">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-3 py-2 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/tour"
                  className="px-3 py-2 text-xs font-bold text-[#EF1A53] hover:bg-white/10 rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>Book a Tour</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-xs font-bold text-purple-400 hover:bg-white/10 rounded-xl"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {isUser && (
                  <Link
                    to="/user"
                    className="px-3 py-2 text-xs font-bold text-blue-400 hover:bg-white/10 rounded-xl"
                  >
                    Traveler Dashboard
                  </Link>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
