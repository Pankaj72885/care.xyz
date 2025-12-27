"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export function DashboardSidebar({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export const dashboardNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Bookings",
    href: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
