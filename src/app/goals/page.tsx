'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import GoalSetting from '@/components/features/goals/GoalSetting';
import ActivityLogging from '@/components/features/goals/ActivityLogging';
import ActivityHistory from '@/components/features/goals/ActivityHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, ListChecks, History } from 'lucide-react';

export default function GoalsPage() {
  return (
    <PageWrapper title="Goals &amp; Activity Logs">
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
