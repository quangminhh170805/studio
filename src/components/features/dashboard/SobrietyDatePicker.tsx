'use client';

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function SobrietyDatePicker() {
  const { userProgress, setUserProgress } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    userProgress.sobrietyStartDate || undefined
  );

  const handleSaveDate = () => {
    if (selectedDate) {
      setUserProgress(prev => ({ ...prev, sobrietyStartDate: selectedDate }));
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Start Your Journey</CardTitle>
        <CardDescription>Select the date you started your sobriety journey to track your progress.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleSaveDate} disabled={!selectedDate} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Save Sobriety Start Date
        </Button>
      </CardContent>
    </Card>
  );
}
