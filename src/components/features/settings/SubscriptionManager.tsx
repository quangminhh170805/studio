'use client';

import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Crown, ShieldOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function SubscriptionManager() {
  const { appSettings, setAppSettings } = useAppContext();
  const { toast } = useToast();

  const handleUpgradePremium = () => {
    // Simulate payment processing
    setAppSettings(prev => ({ ...prev, isPremium: true, adsDisabled: true })); // Premium implies no ads
    toast({ title: "Success!", description: "You've upgraded to Clarity Premium!" });
  };
  
  const handleCancelPremium = () => {
    setAppSettings(prev => ({ ...prev, isPremium: false })); // adsDisabled remains as is unless specifically re-enabled
    toast({ title: "Subscription Canceled", description: "Your Clarity Premium subscription has been canceled." });
  };

  const handleBuyNoAds = () => {
    // Simulate payment processing
    setAppSettings(prev => ({ ...prev, adsDisabled: true }));
    toast({ title: "Success!", description: "Ads have been removed." });
  };

  const handleEnableAds = () => {
    setAppSettings(prev => ({ ...prev, adsDisabled: false }));
    toast({ title: "Ads Enabled", description: "Ads have been re-enabled." });
  };


  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg border bg-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Crown className="h-6 w-6 mr-2 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Clarity Premium</h3>
          </div>
          {appSettings.isPremium && <Badge variant="default" className="bg-accent text-accent-foreground">Active</Badge>}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Unlock AI assistant, personalized insights, advanced tips, and an ad-free experience.
        </p>
        {appSettings.isPremium ? (
          <div className="text-center">
            <p className="text-sm text-green-600 mb-3 flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-1" /> You are a Premium member!</p>
            <Button onClick={handleCancelPremium} variant="outline" className="w-full sm:w-auto">
              Cancel Premium
            </Button>
          </div>
        ) : (
          <Button onClick={handleUpgradePremium} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Upgrade to Premium - $5/month
          </Button>
        )}
      </div>

      {!appSettings.isPremium && ( // Show No-Ads pack only if not premium
        <div className="p-4 rounded-lg border bg-card">
           <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <ShieldOff className="h-6 w-6 mr-2 text-orange-500" />
              <h3 className="text-lg font-semibold text-foreground">Ad-Free Experience</h3>
            </div>
            {appSettings.adsDisabled && <Badge variant="secondary">Ads Disabled</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enjoy Clarity without interruptions by removing all ads.
          </p>
          {appSettings.adsDisabled ? (
            <div className="text-center">
              <p className="text-sm text-green-600 mb-3 flex items-center justify-center"><CheckCircle className="h-4 w-4 mr-1" /> Ads are currently disabled.</p>
              <Button onClick={handleEnableAds} variant="outline" className="w-full sm:w-auto">
                Enable Ads
              </Button>
            </div>
          ) : (
            <Button onClick={handleBuyNoAds} variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600">
              Remove Ads - $2 (One-time)
            </Button>
          )}
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        Note: Payments are simulated for demonstration purposes. No real charges will occur.
      </p>
    </div>
  );
}
