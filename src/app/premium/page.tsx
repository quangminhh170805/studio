'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import AIChatbot from '@/components/features/premium/AIChatbot';
import PersonalizedInsightsDisplay from '@/components/features/premium/PersonalizedInsightsDisplay';
import PremiumTips from '@/components/features/premium/PremiumTips';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle, Brain, Lightbulb, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

export default function PremiumPage() {
  const { appSettings } = useAppContext();

  if (!appSettings.isPremium) {
    return (
      <PageWrapper title="Premium Features">
        <Card className="shadow-lg text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl">
              <Lock className="h-7 w-7 mr-2 text-primary" /> Unlock Premium
            </CardTitle>
            <CardDescription>
              Access exclusive features like AI Assistance, Personalized Insights, and more by upgrading to Premium.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              Gain deeper understanding of your journey and receive tailored support.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/settings?tab=subscription">Upgrade to Premium</Link>
            </Button>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Premium Features">
      <Alert className="mb-6 border-primary/50 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">Get Better Insights!</AlertTitle>
        <AlertDescription>
          The more activities you log in the 'Goals &amp; Logs' section, the more personalized and accurate your AI assistance and insights will be.
        </AlertDescription>
      </Alert>
      <Tabs defaultValue="ai-assistant" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="ai-assistant" className="text-xs sm:text-sm">
            <MessageCircle className="h-4 w-4 mr-1 sm:mr-2" /> AI Assistant
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs sm:text-sm">
            <Brain className="h-4 w-4 mr-1 sm:mr-2" /> Insights
          </TabsTrigger>
          <TabsTrigger value="tips" className="text-xs sm:text-sm">
            <Lightbulb className="h-4 w-4 mr-1 sm:mr-2" /> Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-assistant">
          <AIChatbot />
        </TabsContent>
        <TabsContent value="insights">
          <PersonalizedInsightsDisplay />
        </TabsContent>
        <TabsContent value="tips">
          <PremiumTips />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
