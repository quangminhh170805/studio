
'use client';

import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Droplet, DollarSign, Clock } from 'lucide-react';
import { cn } from '@/lib/utils'; // Added import

const StatCard = ({ title, value, unit, icon: Icon, colorClass }: { title: string; value: string | number; unit?: string; icon: React.ElementType, colorClass?: string }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={cn("h-5 w-5 text-muted-foreground", colorClass)} />
    </CardHeader>
    <CardContent>
      <div className={cn("text-3xl font-bold", colorClass)}>
        {value}
        {unit && <span className="text-xl font-medium ml-1">{unit}</span>}
      </div>
    </CardContent>
  </Card>
);

export default function DashboardStats() {
  const { daysSober, litersAvoided, moneySaved, timeWonBack } = useAppContext();

  const stats = [
    { title: 'Days Sober', value: daysSober, icon: TrendingUp, colorClass: 'text-primary' },
    { title: 'Alcohol Avoided', value: litersAvoided, unit: 'liters', icon: Droplet, colorClass: 'text-accent' },
    { title: 'Money Saved', value: `$${moneySaved}`, icon: DollarSign, colorClass: 'text-green-500' },
    { title: 'Time Reclaimed', value: timeWonBack, unit: 'hours', icon: Clock, colorClass: 'text-purple-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
