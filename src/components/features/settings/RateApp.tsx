'use client';

import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export default function RateApp() {
  // Placeholder URLs - replace with actual store links
  const appStoreUrl = 'https://apps.apple.com/your-app-id';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=your.package.name';

  const handleRateApp = () => {
    // Basic detection, can be improved
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      window.open(playStoreUrl, '_blank');
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.open(appStoreUrl, '_blank');
    } else {
      // Fallback or open a generic page
      window.open(playStoreUrl, '_blank'); // Default to Play Store or a landing page
    }
  };

  return (
    <div className="space-y-3 text-center">
      <p className="text-sm text-muted-foreground">
        If you enjoy using Clarity, please take a moment to rate us on the app store. Your feedback helps us improve!
      </p>
      <Button onClick={handleRateApp} variant="outline" className="w-full sm:w-auto border-accent text-accent hover:bg-accent/10 hover:text-accent">
        <Star className="h-4 w-4 mr-2" /> Rate Clarity
      </Button>
    </div>
  );
}
