'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function AdPopupManager() {
  const { appSettings, showAdPopup, setShowAdPopup, triggerAdPopup } = useAppContext();
  const pathname = usePathname();
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    // Trigger ad on path change, if not disabled or premium
    if (!appSettings.adsDisabled && !appSettings.isPremium) {
      triggerAdPopup();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, appSettings.adsDisabled, appSettings.isPremium]);
  
  useEffect(() => {
    if (showAdPopup) {
      setAdVisible(true);
      const timer = setTimeout(() => {
        setAdVisible(false);
        setShowAdPopup(false); // Reset context state
      }, 5000); // Ad shows for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showAdPopup, setShowAdPopup]);


  if (!adVisible) {
    return null;
  }

  return (
    <AlertDialog open={adVisible} onOpenChange={(open) => { if (!open) { setAdVisible(false); setShowAdPopup(false); }}}>
      <AlertDialogContent className="max-w-md p-0 overflow-hidden">
        <AlertDialogHeader className="p-4 bg-muted">
          <AlertDialogTitle className="text-lg font-semibold">Advertisement</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="p-6 text-center space-y-4">
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Enjoy an ad-free experience by upgrading to Premium or purchasing the No-Ads pack in Settings.
          </AlertDialogDescription>
          <Image
            src="https://placehold.co/300x250.png"
            alt="Simulated Ad"
            width={300}
            height={250}
            className="mx-auto rounded-md shadow-md"
            data-ai-hint="advertisement banner"
          />
           <p className="text-xs text-muted-foreground">This is a simulated ad. Your app experience will resume shortly.</p>
        </div>
        <AlertDialogFooter className="p-4 border-t bg-muted/50">
          <Button variant="outline" onClick={() => { setAdVisible(false); setShowAdPopup(false); }}>
            Close Ad
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
