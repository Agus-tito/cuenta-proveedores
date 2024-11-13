
"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppNavbar } from "@/components/app-nav";
import { ProtectedRoute } from "@/components/protectedRoute";
import { AuthProvider } from "@/lib/authContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="dashboard-layout flex">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <AppNavbar />
              <div className="flex flex-1 flex-col gap-4 p-4">
                <main>{children}</main>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
