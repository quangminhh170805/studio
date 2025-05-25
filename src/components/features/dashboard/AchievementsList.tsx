'use client';

import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star, ShieldCheck, CalendarDays } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  daysRequired: number;
  icon: LucideIcon;
  color: string;
}

const achievementsData: Achievement[] = [
  { id: '1day', name: 'First Step', description: 'Completed 1 day sober!', daysRequired: 1, icon: Star, color: 'text-yellow-500' },
  { id: '1week', name: 'One Week Strong', description: '7 days of clarity!', daysRequired: 7, icon: Award, color: 'text-green-500' },
  { id: '2weeks', name: 'Fortnight Focus', description: '14 days without alcohol!', daysRequired: 14, icon: ShieldCheck, color: 'text-blue-500' },
  { id: '1month', name: 'Month Milestone', description: '30 days of progress!', daysRequired: 30, icon: CalendarDays, color: 'text-purple-500' },
  { id: '3months', name: 'Quarter Century (Days)', description: '90 days of dedication!', daysRequired: 90, icon: Star, color: 'text-red-500' },
  { id: '6months', name: 'Half Year Hero', description: '180 days of sobriety!', daysRequired: 180, icon: Award, color: 'text-orange-500' },
  { id: '1year', name: 'Sobriety Superstar', description: '365 days of a new life!', daysRequired: 365, icon: ShieldCheck, color: 'text-teal-500' },
];

export default function AchievementsList() {
  const { daysSober } = useAppContext();

  const unlockedAchievements = achievementsData.filter(ach => daysSober >= ach.daysRequired);
  const nextAchievement = achievementsData.find(ach => daysSober < ach.daysRequired);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {unlockedAchievements.length === 0 && !nextAchievement && (
          <p className="text-muted-foreground">Start your journey to unlock achievements!</p>
        )}
        {unlockedAchievements.length > 0 && (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium text-primary">Unlocked</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {unlockedAchievements.map(ach => (
                <div key={ach.id} className="p-4 bg-card-foreground/5 rounded-lg border border-border flex items-center space-x-3">
                  <ach.icon className={`h-8 w-8 ${ach.color}`} />
                  <div>
                    <p className="font-semibold text-foreground">{ach.name}</p>
                    <p className="text-xs text-muted-foreground">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {nextAchievement && (
          <div className="space-y-3">
             <h3 className="text-lg font-medium text-primary">Next Achievement</h3>
            <div className="p-4 bg-muted/50 rounded-lg border border-border border-dashed flex items-center space-x-3">
              <nextAchievement.icon className={`h-8 w-8 ${nextAchievement.color} opacity-50`} />
              <div>
                <p className="font-semibold text-foreground/80">{nextAchievement.name}</p>
                <p className="text-xs text-muted-foreground">{nextAchievement.description}</p>
                <p className="text-xs text-accent mt-1">Only {nextAchievement.daysRequired - daysSober} days to go!</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
