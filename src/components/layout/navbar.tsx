"use client";

import { ModeToggle } from "@/components/mode-toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  user?: User;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const isAdmin = user?.role === "ADMIN";

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/services",
      label: "Services",
      active: pathname.startsWith("/services"),
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
    ...(!isAdmin
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            active: pathname.startsWith("/dashboard"),
            protected: true,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            href: "/admin",
            label: "Admin Panel",
            active: pathname.startsWith("/admin"),
            protected: true,
          },
        ]
      : []),
  ];

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="from-primary bg-linear-to-r to-blue-600 bg-clip-text text-xl font-bold text-transparent">
            Care.xyz
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {routes.map((route) => {
            if (route.protected && !user) return null;
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "hover:text-foreground/80 transition-colors",
                  route.active ? "text-foreground" : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {routes.map((route) => {
                  if (route.protected && !user) return null;
                  return (
                    <DropdownMenuItem key={route.href} asChild>
                      <Link
                        href={route.href}
                        className={cn(
                          "w-full",
                          route.active ? "font-bold" : ""
                        )}
                      >
                        {route.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                {!user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

function UserNav({ user }: { user: User }) {
  const isAdmin = user?.role === "ADMIN";
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs leading-none">
                {user.email}
              </p>
              {isAdmin && (
                <p className="text-primary text-xs leading-none font-medium">
                  Admin
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/admin">Admin Panel</Link>
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowLogoutDialog(true)}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the home page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
