'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bot, CalendarDays, LifeBuoy, Stethoscope, User, Library } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const links = [
  { href: '/dashboard', label: 'Ask AI', icon: Bot },
  { href: '/dashboard/discover', label: 'Discover', icon: Stethoscope },
  { href: '/dashboard/appointments', label: 'My Appointments', icon: CalendarDays },
  { href: '/dashboard/resources', label: 'Resources', icon: Library },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/emergency', label: 'Emergency', icon: LifeBuoy },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={
              link.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(link.href)
            }
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
