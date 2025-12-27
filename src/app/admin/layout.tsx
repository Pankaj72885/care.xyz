import { auth } from "@/auth";
import {
  BarChart3,
  CalendarDays,
  CreditCard,
  Home,
  Layers,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    // Double check protection, though middleware and page guards should handle it
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full border-r border-slate-200 bg-slate-100 p-4 md:w-64 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-2 px-2 py-4">
          <div className="text-xl font-bold tracking-tight">Care.xyz Admin</div>
        </div>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <Layers className="h-4 w-4" />
            Services
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <CalendarDays className="h-4 w-4" />
            Bookings
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="/admin/payments"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <CreditCard className="h-4 w-4" />
            Payments
          </Link>
          <Link
            href="/admin/reports"
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <BarChart3 className="h-4 w-4" />
            Reports
          </Link>
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              Back to Site
            </Link>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
