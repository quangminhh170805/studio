import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/toaster';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import AdPopupManager from '@/components/layout/AdPopupManager';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clarity - Sobriety Companion',
  description: 'Your personal companion to help you quit drinking and embrace a clearer life.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <AppProvider>
          <div className="flex-grow pb-20 md:pb-0"> {/* Padding bottom for mobile nav */}
            {children}
          </div>
          <BottomNavigationBar />
          <AdPopupManager />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
