
'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import GoalSetting from '@/components/features/goals/GoalSetting';
import ActivityLogging from '@/components/features/goals/ActivityLogging';
import ActivityHistory from '@/components/features/goals/ActivityHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, ListChecks, History, Loader2 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

export default function GoalsPage() {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return (
      <PageWrapper title="Goals">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Goals">
      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="goals" className="text-xs sm:text-sm">
            <Target className="h-4 w-4 mr-1 sm:mr-2" /> Goals
          </TabsTrigger>
          <TabsTrigger value="log" className="text-xs sm:text-sm">
            <ListChecks className="h-4 w-4 mr-1 sm:mr-2" /> Log Activity
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm">
            <History className="h-4 w-4 mr-1 sm:mr-2" /> History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="goals">
          <GoalSetting />
        </TabsContent>
        <TabsContent value="log">
          <ActivityLogging />
        </TabsContent>
        <TabsContent value="history">
          <ActivityHistory />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
