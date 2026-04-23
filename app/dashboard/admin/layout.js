import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireRole } from "@/lib/auth";
import { requireAuth } from "@/lib/auth";
export default async function AdminLayout({ children }) {
      const session = await requireAuth();
  await requireRole("admin");

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
      <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">Secure Dashboard</p>
            <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
            <p className="text-sm text-cyan-100/70">Role: {session.user.role}</p>
          </div>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
