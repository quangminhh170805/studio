'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';

interface UserProgress {
  sobrietyStartDate: Date | null;
  moneySavedPerLiter: number; // User-defined or default
  litersAvoidedPerDay: number; // User-defined or default
  timeWonBackPerDayInHours: number; // User-defined or default
}

interface Goal {
  id: string;
  text: string;
  createdAt: Date;
  achieved: boolean;
}

interface ActivityLog {
  id: string;
  date: Date;
  description: string;
  trigger?: string;
  mood?: string; // e.g., happy, stressed, calm
}

interface AppSettings {
  notifications: {
    sound: boolean;
    vibration: boolean;
    deliverQuietly: boolean;
  };
  isPremium: boolean;
  adsDisabled: boolean;
}

interface AppContextType {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  goals: Goal[];
  addGoal: (text: string) => void;
  toggleGoalAchieved: (id: string) => void;
  deleteGoal: (id: string) => void;
  activityLogs: ActivityLog[];
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'date'> & { date?: Date }) => void;
  deleteActivityLog: (id: string) => void;
  appSettings: AppSettings;
  setAppSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  daysSober: number;
  litersAvoided: number;
  moneySaved: number;
  timeWonBack: number; // in hours
  isLoading: boolean;
  showAdPopup: boolean;
  setShowAdPopup: React.Dispatch<React.SetStateAction<boolean>>;
  triggerAdPopup: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultUserProgress: UserProgress = {
  sobrietyStartDate: null,
  moneySavedPerLiter: 5, // Example default
  litersAvoidedPerDay: 0.5, // Example default
  timeWonBackPerDayInHours: 2, // Example default
};

const defaultAppSettings: AppSettings = {
  notifications: {
    sound: true,
    vibration: true,
    deliverQuietly: false,
  },
  isPremium: false,
  adsDisabled: false,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [appSettings, setAppSettings] = useState<AppSettings>(defaultAppSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdPopup, setShowAdPopup] = useState(false);

  useEffect(() => {
    const storedProgress = localStorage.getItem('clarityUserProgress');
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setUserProgress({
        ...parsedProgress,
        sobrietyStartDate: parsedProgress.sobrietyStartDate ? new Date(parsedProgress.sobrietyStartDate) : null,
      });
    }

    const storedGoals = localStorage.getItem('clarityGoals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals).map((g: Goal) => ({ ...g, createdAt: new Date(g.createdAt) })));
    }

    const storedLogs = localStorage.getItem('clarityActivityLogs');
    if (storedLogs) {
      setActivityLogs(JSON.parse(storedLogs).map((l: ActivityLog) => ({ ...l, date: new Date(l.date) })));
    }

    const storedSettings = localStorage.getItem('clarityAppSettings');
    if (storedSettings) {
      setAppSettings(JSON.parse(storedSettings));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('clarityUserProgress', JSON.stringify(userProgress));
    }
  }, [userProgress, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('clarityGoals', JSON.stringify(goals));
    }
  }, [goals, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('clarityActivityLogs', JSON.stringify(activityLogs));
    }
  }, [activityLogs, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('clarityAppSettings', JSON.stringify(appSettings));
    }
  }, [appSettings, isLoading]);

  const addGoal = (text: string) => {
    const newGoal: Goal = { id: Date.now().toString(), text, createdAt: new Date(), achieved: false };
    setGoals(prev => [newGoal, ...prev]);
  };

  const toggleGoalAchieved = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, achieved: !g.achieved } : g));
  };
  
  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'date'> & { date?: Date }) => {
    const newLog: ActivityLog = { ...log, id: Date.now().toString(), date: log.date || new Date() };
    setActivityLogs(prev => [newLog, ...prev].sort((a,b) => b.date.getTime() - a.date.getTime()));
  };

  const deleteActivityLog = (id: string) => {
    setActivityLogs(prev => prev.filter(log => log.id !== id));
  };

  const calculations = useMemo(() => {
    if (!userProgress.sobrietyStartDate) {
      return { daysSober: 0, litersAvoided: 0, moneySaved: 0, timeWonBack: 0 };
    }
    const now = new Date();
    const daysSober = differenceInDays(now, userProgress.sobrietyStartDate);
    const hoursSober = differenceInHours(now, userProgress.sobrietyStartDate); // For more granular time won back if needed

    const litersAvoided = parseFloat((daysSober * userProgress.litersAvoidedPerDay).toFixed(2));
    const moneySaved = parseFloat((litersAvoided * userProgress.moneySavedPerLiter).toFixed(2));
    // const timeWonBack = parseFloat((daysSober * userProgress.timeWonBackPerDayInHours).toFixed(2));
    const timeWonBack = parseFloat((hoursSober * (userProgress.timeWonBackPerDayInHours / 24)).toFixed(2));


    return { daysSober, litersAvoided, moneySaved, timeWonBack };
  }, [userProgress.sobrietyStartDate, userProgress.litersAvoidedPerDay, userProgress.moneySavedPerLiter, userProgress.timeWonBackPerDayInHours]);

  const triggerAdPopup = () => {
    if (!appSettings.adsDisabled && !appSettings.isPremium) {
      setShowAdPopup(true);
    }
  };

  return (
    <AppContext.Provider value={{
      userProgress, setUserProgress,
      goals, addGoal, toggleGoalAchieved, deleteGoal,
      activityLogs, addActivityLog, deleteActivityLog,
      appSettings, setAppSettings,
      ...calculations,
      isLoading,
      showAdPopup, setShowAdPopup,
      triggerAdPopup,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
