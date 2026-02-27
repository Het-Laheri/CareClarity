import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import Header from "@/components/dashboard/header";
import SidebarNav from "@/components/dashboard/sidebar-nav";
import { Logo } from "@/components/logo";
import { Settings } from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
              <div className="flex items-center justify-between">
                <Logo href="/dashboard/profile" />
                <SidebarTrigger aria-label="Toggle sidebar" />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav />
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="/dashboard/settings">
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="min-w-0">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
