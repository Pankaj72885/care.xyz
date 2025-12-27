import {
  DashboardSidebar,
  dashboardNavItems,
} from "@/components/dashboard/sidebar-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="container mx-auto flex-1 items-start px-4 py-10 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pr-6 lg:py-8">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <DashboardSidebar items={dashboardNavItems} />
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  );
}
