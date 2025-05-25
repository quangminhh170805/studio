
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, Sparkles, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'Home', icon: LayoutDashboard },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/premium', label: 'Premium', icon: Sparkles },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-md md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/home' && pathname === '/');
          return (
            <Link href={item.href} key={item.label} legacyBehavior>
              <a
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full text-sm transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className={cn('h-5 w-5 mb-0.5', isActive ? 'text-primary' : 'text-muted-foreground')} />
                <span className="text-xs">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
