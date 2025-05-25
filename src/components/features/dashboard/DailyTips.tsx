'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const tipsData = [
  "Identify your triggers and plan how to avoid or manage them.",
  "Build a strong support system of friends, family, or support groups.",
  "Find healthy coping mechanisms for stress, like exercise or meditation.",
  "Celebrate your milestones, no matter how small.",
  "Stay hydrated by drinking plenty of water throughout the day.",
  "Focus on one day at a time. Don't get overwhelmed by the future.",
  "Practice mindfulness to stay present and aware of your feelings.",
  "Get enough sleep. Rest is crucial for recovery.",
  "Explore new hobbies or revisit old ones to fill your time positively.",
  "Remember why you decided to quit. Keep your motivation strong.",
  "Don't be afraid to ask for help when you need it.",
  "Be patient with yourself. Recovery is a journey, not a race.",
  "Eat nutritious meals to support your body's healing process.",
  "Avoid situations where you might be tempted to drink.",
  "Reward yourself for your progress with non-alcoholic treats or activities."
];

export default function DailyTips() {
  const [randomTip, setRandomTip] = useState('');

  useEffect(() => {
    // Select a random tip on component mount
    setRandomTip(tipsData[Math.floor(Math.random() * tipsData.length)]);
  }, []);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <Lightbulb className="h-6 w-6 mr-2 text-accent" />
          Tip of the Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        {randomTip ? (
           <p className="text-foreground leading-relaxed">{randomTip}</p>
        ) : (
          <p className="text-muted-foreground">Loading tip...</p>
        )}
       
        <details className="mt-4">
            <summary className="cursor-pointer text-sm text-primary hover:underline">Show More Tips</summary>
            <ScrollArea className="h-48 mt-2 p-1 border rounded-md">
            <ul className="space-y-3 p-3">
                {tipsData.map((tip, index) => (
                <li key={index} className="text-sm text-foreground leading-normal">
                    {tip}
                </li>
                ))}
            </ul>
            </ScrollArea>
        </details>
      </CardContent>
    </Card>
  );
}
