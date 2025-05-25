'use client';

import { useSearchParams } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import NotificationSettings from '@/components/features/settings/NotificationSettings';
import SubscriptionManager from '@/components/features/settings/SubscriptionManager';
import ShareApp from '@/components/features/settings/ShareApp';
import RateApp from '@/components/features/settings/RateApp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bell, Crown, Share2, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function SettingsPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'notifications';

  const settingsSections = [
    { id: 'notifications', title: 'Notifications', icon: Bell, component: <NotificationSettings /> },
    { id: 'subscription', title: 'Subscription', icon: Crown, component: <SubscriptionManager /> },
    { id: 'share', title: 'Share Clarity', icon: Share2, component: <ShareApp /> },
    { id: 'rate', title: 'Rate Us', icon: Star, component: <RateApp /> },
  ];

  return (
    <PageWrapper title="Settings">
      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:w-auto md:inline-flex">
          {settingsSections.map(section => (
            <TabsTrigger key={section.id} value={section.id} className="text-xs sm:text-sm">
              <section.icon className="h-4 w-4 mr-1 sm:mr-2" /> {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {settingsSections.map(section => (
          <TabsContent key={section.id} value={section.id}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <section.icon className="h-5 w-5 mr-2 text-primary" />
                  {section.title}
                </CardTitle>
                {section.id === 'notifications' && <CardDescription>Manage how you receive app notifications.</CardDescription>}
                {section.id === 'subscription' && <CardDescription>Manage your premium subscription and ad preferences.</CardDescription>}
                {section.id === 'share' && <CardDescription>Spread the word about Clarity.</CardDescription>}
                {section.id === 'rate' && <CardDescription>Let us know how we're doing!</CardDescription>}
              </CardHeader>
              <CardContent>
                {section.component}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </PageWrapper>
  );
}
