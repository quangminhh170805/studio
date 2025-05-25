
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, Sparkles, Settings as SettingsIcon, Atom } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: '/home', label: 'Home', icon: LayoutDashboard },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/premium', label: 'Premium', icon: Sparkles },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export default function DesktopSideBar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r border-border p-4 space-y-2 fixed h-full">
      <div className="flex items-center space-x-2 mb-8 p-2">
        <Atom className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-semibold text-primary">Clarity</h1>
      </div>
      <TooltipProvider delayDuration={100}>
        <nav className="flex-grow">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/home' && pathname === '/');
              return (
                <li key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.href} legacyBehavior>
                        <a
                          className={cn(
                            'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                            isActive
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <item.icon className={cn('h-5 w-5', isActive ? 'text-primary' : '')} />
                          <span className="text-sm">{item.label}</span>
                        </a>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={cn(isActive ? "bg-primary text-primary-foreground" : "")}>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </nav>
      </TooltipProvider>
      <div className="mt-auto p-2 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Clarity App
      </div>
    </aside>
  );
}
