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
      <SidebarProvider className="h-screen w-screen">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon" className="h-full border-r">
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
          <SidebarInset className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            <Header />
            <main id="main-content" className="flex-1 flex flex-col min-h-0 w-full">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
