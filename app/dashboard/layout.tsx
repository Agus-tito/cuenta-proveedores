
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
        <AppNavbar />
          <div className="flex flex-1 flex-col gap-4 p-4">
              <main>
                {children}
              </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}