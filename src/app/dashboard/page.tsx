'use client';

import PageWrapper from '@/components/layout/PageWrapper';
import SobrietyDatePicker from '@/components/features/dashboard/SobrietyDatePicker';
import DashboardStats from '@/components/features/dashboard/DashboardStats';
import AchievementsList from '@/components/features/dashboard/AchievementsList';
import DailyTips from '@/components/features/dashboard/DailyTips';
import { useAppContext } from '@/contexts/AppContext';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { userProgress, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <PageWrapper title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Dashboard" className="space-y-6">
      {!userProgress.sobrietyStartDate && <SobrietyDatePicker />}
      {userProgress.sobrietyStartDate && (
        <>
          <DashboardStats />
          <AchievementsList />
        </>
      )}
      <DailyTips />
    </PageWrapper>
  );
}
