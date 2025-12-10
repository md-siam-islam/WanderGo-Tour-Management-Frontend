
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/redux/hooks"
import { All_Role } from "../utlis/getSidebaritems"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" ,role : "PUBLIC"},
  { href: "/about", label: "About", role : "PUBLIC" },
  { href: "/admin", label: "Dashboard" , role:All_Role.admin},
  { href: "/user", label: "Dashboard" , role:All_Role.user},
]

export default function Component() {

  const { data } = useUserInfoQuery(undefined)

  const [userLogout] = useLogoutMutation()
  const dispatch = useAppDispatch()


  const handleUserLogout = async() => {
    await userLogout(undefined)
    dispatch(authApi.util.resetApiState())
    toast.success("User Logout Successfull")
  }



  return (
    <header className="">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">

        <div className="w-[150px] h-[60px] flex items-center justify-center pt-1.5 mb-1">
          <Link to="/" className="w-100% h-100%">
              <img src="/src/assets/images/WanderGoLOgo2.png" alt="Logo" />
            </Link>
        </div>
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            {/* <Link to="/" className="w-[120px]">
              <img src="/src/assets/images/WanderGoLOgo2.png" alt="Logo" />
            </Link> */}
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <>
                  {
                    link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                    )
                  }
                  {
                    link.role === data?.data?.role && (
                      <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                    )
                  }
                  </>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}

        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email && (
            <Button variant={"outline"} onClick={handleUserLogout} className="text-sm">
            <a>Logout</a>
          </Button>
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm">
            <a href="/login">Login</a>
          </Button>
          )}
          
        </div>

      </div>
    </header>
  )
}
