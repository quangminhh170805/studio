'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Lightbulb } from 'lucide-react';

const premiumTipsData = [
  { title: "Advanced Trigger Management", text: "Learn to identify subtle triggers and develop proactive strategies. Consider journaling in detail about situations that cause cravings." },
  { title: "Mindful Recovery", text: "Integrate daily mindfulness practices. Even 5-10 minutes of meditation can significantly reduce stress and improve self-awareness related to drinking urges." },
  { title: "Building Resilience", text: "Focus on building emotional resilience. Explore techniques like cognitive reframing to change negative thought patterns associated with alcohol." },
  { title: "Long-Term Goal Setting", text: "Beyond sobriety, what are your long-term life goals? Connect your sobriety to these larger aspirations for sustained motivation." },
  { title: "Healthy Lifestyle Integration", text: "Deepen your commitment to a healthy lifestyle. Experiment with new forms of exercise, nutrition plans, or sleep hygiene techniques." },
  { title: "Relapse Prevention Planning", text: "Develop a detailed relapse prevention plan. Identify high-risk situations and have specific coping strategies ready." },
  { title: "Social Reintegration", text: "Navigate social situations sober with confidence. Practice assertive communication and have exit strategies for uncomfortable events." },
  { title: "Emotional Sobriety", text: "Work towards emotional sobriety – learning to experience and manage emotions without relying on alcohol. This is a deeper level of recovery." },
  { title: "Giving Back", text: "Consider how you can support others on their journey once you feel stable. Helping others can reinforce your own sobriety." },
  { title: "Continuous Learning", text: "Stay curious and keep learning about addiction, recovery, and personal growth. Knowledge is a powerful tool." }
];

export default function PremiumTips() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Exclusive Sobriety Strategies</CardTitle>
        <CardDescription>Advanced tips and techniques to strengthen your recovery journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-22rem)] sm:h-[calc(100vh-24rem)] pr-2">
          <div className="space-y-6">
            {premiumTipsData.map((tip, index) => (
              <div key={index} className="p-4 rounded-lg bg-card-foreground/5 border border-border">
                <h3 className="text-md font-semibold text-primary mb-1 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-primary/80" />
                  {tip.title}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
