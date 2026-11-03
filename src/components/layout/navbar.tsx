"use client"
import { Heart, LogIn } from "lucide-react"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "cn"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

const navLinks = [
  { label: "Home", href: "/", active: false },
  { label: "Upcoming Events", href: "/upcoming-events", active: false },
]

export function Navbar() {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log("User in Navbar:", user);
  const handleLogout = async () => {
    authClient.signOut();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm shadow-emerald-600/30">
            <Heart className="size-5 fill-white text-white" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              ImpactPulse<span className="text-emerald-600">.</span>
            </span>
            <span className="mt-0.5 text-[11px] font-semibold tracking-[0.2em] text-emerald-600 uppercase">
              Social Impact
            </span>
          </span>
        </a>

        {/* Links */}
        <nav aria-label="Main navigation" className="ml-5 flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                link.active
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        {user ? (
          <div className="ml-auto flex items-center gap-3">

            <Popover>
              <PopoverTrigger className="border-none dark:bg-transparent" render={<Button variant="outline" />}>
                <Avatar>
                  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle className="text-lg font-semibold">{user.name}</PopoverTitle>

                  <PopoverDescription className="flex flex-col ">
                    {user.email} <br />
                  
                    <Link href="/create-event" className="text-emerald-600 text-lg border-t mt-2 ">
                      Create Event
                    </Link><br />
                    <Link href="/manage-events" className="text-emerald-600 text-lg">
                      Manage Events
                    </Link><br />
                     <Link href="/my-joining" className="text-emerald-600 text-lg ">
                   
                      Joined Events
                    
                     
                    </Link><br className="mt-100" />
                    
                    <Button variant="destructive" onClick={handleLogout}>
                      Logout
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <ThemeToggle />
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button className="h-10 rounded-xl bg-emerald-600 px-5 cursor-pointer text-white hover:bg-emerald-700">
                <LogIn className="size-4" data-icon="inline-start" />
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )

}
