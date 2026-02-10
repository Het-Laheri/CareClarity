'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bot, LifeBuoy, Stethoscope, User } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const links = [
  { href: '/dashboard', label: 'Ask AI', icon: Bot },
  { href: '/dashboard/discover', label: 'Discover', icon: Stethoscope },
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
            isActive={pathname === link.href}
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
