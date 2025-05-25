'use client';

import { useAppContext } from '@/contexts/AppContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Volume2, Vibrate, BellOff } from 'lucide-react';

export default function NotificationSettings() {
  const { appSettings, setAppSettings } = useAppContext();

  const handleToggle = (key: 'sound' | 'vibration' | 'deliverQuietly') => {
    setAppSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-border">
        <div className="flex items-center">
          <Volume2 className="h-5 w-5 mr-3 text-foreground/70" />
          <Label htmlFor="sound-switch" className="text-sm text-foreground">Allow Sounds</Label>
        </div>
        <Switch
          id="sound-switch"
          checked={appSettings.notifications.sound}
          onCheckedChange={() => handleToggle('sound')}
          aria-label="Toggle sound notifications"
        />
      </div>
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-border">
        <div className="flex items-center">
          <Vibrate className="h-5 w-5 mr-3 text-foreground/70" />
          <Label htmlFor="vibration-switch" className="text-sm text-foreground">Allow Vibration</Label>
        </div>
        <Switch
          id="vibration-switch"
          checked={appSettings.notifications.vibration}
          onCheckedChange={() => handleToggle('vibration')}
          aria-label="Toggle vibration for notifications"
        />
      </div>
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-border">
        <div className="flex items-center">
           <BellOff className="h-5 w-5 mr-3 text-foreground/70" />
          <Label htmlFor="quiet-switch" className="text-sm text-foreground">Deliver Quietly</Label>
        </div>
        <Switch
          id="quiet-switch"
          checked={appSettings.notifications.deliverQuietly}
          onCheckedChange={() => handleToggle('deliverQuietly')}
          aria-label="Toggle quiet delivery for notifications"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Note: Actual notification delivery depends on your device's system settings for the app. These settings control in-app sound and vibration preferences for Clarity's notifications.
      </p>
    </div>
  );
}
