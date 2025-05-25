'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, RefreshCw } from 'lucide-react';
import { personalizedInsights, type PersonalizedInsightsInput } from '@/ai/flows/personalized-insights';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface InsightsData {
  insights: string;
  customizedTips: string;
}

export default function PersonalizedInsightsDisplay() {
  const { goals, activityLogs, appSettings } = useAppContext();
  const [insightsData, setInsightsData] = useState<InsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);
    setInsightsData(null);

    if (activityLogs.length === 0) {
      setError("Please log some activities to generate personalized insights.");
      setIsLoading(false);
      return;
    }

    try {
      const goalsString = goals.map(g => g.text).join('; ');
      const activitiesString = activityLogs
        .map(log => `Date: ${log.date.toLocaleDateString()}, Mood: ${log.mood || 'N/A'}, Trigger: ${log.trigger || 'N/A'}, Desc: ${log.description}`)
        .join('\n');

      const input: PersonalizedInsightsInput = {
        goals: goalsString || "User has not set specific goals yet.",
        activities: activitiesString,
      };
      
      const response = await personalizedInsights(input);
      setInsightsData(response);
    } catch (err) {
      console.error("Personalized Insights Error:", err);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (appSettings.isPremium) {
      fetchInsights();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appSettings.isPremium]); // Only fetch on initial premium load, or let user refresh

  if (!appSettings.isPremium) return null;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Personalized Insights &amp; Tips</CardTitle>
          <CardDescription>AI-powered analysis of your goals and activities.</CardDescription>
        </div>
        <Button onClick={fetchInsights} disabled={isLoading} variant="outline" size="sm">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Generating your insights...</p>
          </div>
        )}
        {error && (
           <Alert variant="destructive">
             <AlertTitle>Error</AlertTitle>
             <AlertDescription>{error}</AlertDescription>
           </Alert>
        )}
        {insightsData && !isLoading && (
          <>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Behavioral Insights</h3>
              <div className="p-4 bg-muted rounded-md prose prose-sm max-w-none">
                {insightsData.insights.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-accent mb-2">Customized Tips</h3>
               <div className="p-4 bg-muted rounded-md prose prose-sm max-w-none">
                 {insightsData.customizedTips.split('\n').map((tip, index) => (
                  <p key={index}>{tip}</p>
                ))}
              </div>
            </div>
          </>
        )}
         {!isLoading && !insightsData && !error && activityLogs.length > 0 && (
          <p className="text-muted-foreground text-center py-10">Click 'Refresh' to generate insights.</p>
        )}
      </CardContent>
    </Card>
  );
}
