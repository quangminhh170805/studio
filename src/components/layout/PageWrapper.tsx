import type React from 'react';
import DesktopSideBar from './DesktopSideBar';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function PageWrapper({ children, title, className }: PageWrapperProps) {
  return (
    <div className="flex min-h-screen">
      <DesktopSideBar />
      <main className="flex-grow md:ml-64 p-4 sm:p-6 lg:p-8 bg-background">
        {title && <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-6">{title}</h1>}
        <div className={className}>
          {children}
        </div>
      </main>
    </div>
  );
}
