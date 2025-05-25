'use client';

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


export default function ActivityLogging() {
  const { addActivityLog } = useAppContext();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState('');
  const [trigger, setTrigger] = useState('');
  const [mood, setMood] = useState('');

  const moodOptions = ["Happy", "Calm", "Stressed", "Anxious", "Tired", "Content", "Okay"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast({ title: "Error", description: "Description cannot be empty.", variant: "destructive" });
      return;
    }
    addActivityLog({
      date: date || new Date(),
      description,
      trigger: trigger || undefined,
      mood: mood || undefined,
    });
    setDescription('');
    setTrigger('');
    setMood('');
    setDate(new Date()); // Reset date to today
    toast({ title: "Success", description: "Activity logged successfully!" });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Log Your Activity</CardTitle>
        <CardDescription>Keep track of your days, triggers, and feelings.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="log-date" className="block text-sm font-medium text-foreground mb-1">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(d) => d > new Date() || d < new Date("2000-01-01")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label htmlFor="log-description" className="block text-sm font-medium text-foreground mb-1">Description</label>
            <Textarea
              id="log-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="How was your day? Any cravings or challenges?"
              required
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="log-trigger" className="block text-sm font-medium text-foreground mb-1">Triggers (Optional)</label>
            <Input
              id="log-trigger"
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="e.g., Stressful meeting, social event"
            />
          </div>

          <div>
            <label htmlFor="log-mood" className="block text-sm font-medium text-foreground mb-1">Mood (Optional)</label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger id="log-mood" className="w-full">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                {moodOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Log
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
