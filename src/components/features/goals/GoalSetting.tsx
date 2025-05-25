'use client';

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Trash2, Edit3, Save, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function GoalSetting() {
  const { goals, addGoal, toggleGoalAchieved, deleteGoal, userProgress, setUserProgress } = useAppContext();
  const [newGoalText, setNewGoalText] = useState('');
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingGoalText, setEditingGoalText] = useState('');
  
  // Sobriety parameters state
  const [moneySavedPerLiter, setMoneySavedPerLiter] = useState(userProgress.moneySavedPerLiter.toString());
  const [litersAvoidedPerDay, setLitersAvoidedPerDay] = useState(userProgress.litersAvoidedPerDay.toString());
  const [timeWonBackPerDayInHours, setTimeWonBackPerDayInHours] = useState(userProgress.timeWonBackPerDayInHours.toString());


  const handleAddGoal = () => {
    if (newGoalText.trim()) {
      addGoal(newGoalText.trim());
      setNewGoalText('');
    }
  };

  const handleEditGoal = (id: string, currentText: string) => {
    setEditingGoalId(id);
    setEditingGoalText(currentText);
  }

  const handleSaveEdit = (id: string) => {
    // In a real app, you would update the goal in the context/backend
    // For now, this is a placeholder as goals are just text and achieved status
    // If goal text editing is needed, context needs an updateGoalText function.
    // This example does not implement text editing to keep it simple.
    console.log("Saving edited goal (text editing not fully implemented in this version)", id, editingGoalText);
    setEditingGoalId(null);
    setEditingGoalText('');
  }
  
  const handleSaveSobrietyParameters = () => {
    setUserProgress(prev => ({
      ...prev,
      moneySavedPerLiter: parseFloat(moneySavedPerLiter) || 0,
      litersAvoidedPerDay: parseFloat(litersAvoidedPerDay) || 0,
      timeWonBackPerDayInHours: parseFloat(timeWonBackPerDayInHours) || 0,
    }));
    // Optionally add a toast notification for success
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Set Your Sobriety Goals</CardTitle>
          <CardDescription>Define what you want to achieve on your journey.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="e.g., Exercise 3 times a week"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <Button onClick={handleAddGoal} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {goals.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72">
              <ul className="space-y-3 pr-3">
                {goals.map((goal) => (
                  <li
                    key={goal.id}
                    className={`p-3 rounded-md flex items-center justify-between transition-colors ${
                      goal.achieved ? 'bg-accent/30' : 'bg-card-foreground/5'
                    } border border-border`}
                  >
                    <div className="flex items-center space-x-3 flex-grow">
                      <Checkbox
                        id={`goal-${goal.id}`}
                        checked={goal.achieved}
                        onCheckedChange={() => toggleGoalAchieved(goal.id)}
                        aria-label={`Mark goal ${goal.text} as ${goal.achieved ? 'not achieved' : 'achieved'}`}
                      />
                       {editingGoalId === goal.id ? (
                        <Input 
                          value={editingGoalText}
                          onChange={(e) => setEditingGoalText(e.target.value)}
                          className="flex-grow h-8"
                          // onBlur={() => handleSaveEdit(goal.id)} - might be too aggressive
                        />
                      ) : (
                        <label
                          htmlFor={`goal-${goal.id}`}
                          className={`flex-grow text-sm cursor-pointer ${
                            goal.achieved ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {goal.text}
                          <span className="block text-xs text-muted-foreground">
                            Set on: {format(new Date(goal.createdAt), "PP")}
                          </span>
                        </label>
                      )}
                    </div>
                    <div className="flex space-x-2">
                     {editingGoalId === goal.id ? (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => handleSaveEdit(goal.id)} aria-label="Save goal edit" className="h-7 w-7 text-green-600 hover:text-green-700">
                            <Save className="h-4 w-4" />
                          </Button>
                           <Button variant="ghost" size="icon" onClick={() => setEditingGoalId(null)} aria-label="Cancel goal edit" className="h-7 w-7 text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => handleEditGoal(goal.id, goal.text)} aria-label="Edit goal" className="h-7 w-7 text-blue-600 hover:text-blue-700" disabled={true} title="Text editing currently disabled">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)} aria-label="Delete goal" className="h-7 w-7 text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Customize Progress Tracking</CardTitle>
          <CardDescription>Adjust these values to personalize your dashboard statistics.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="moneySavedPerLiter" className="block text-sm font-medium text-foreground mb-1">Money Saved per Liter Avoided ($)</label>
            <Input
              id="moneySavedPerLiter"
              type="number"
              value={moneySavedPerLiter}
              onChange={(e) => setMoneySavedPerLiter(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label htmlFor="litersAvoidedPerDay" className="block text-sm font-medium text-foreground mb-1">Average Liters Avoided per Day</label>
            <Input
              id="litersAvoidedPerDay"
              type="number"
              value={litersAvoidedPerDay}
              onChange={(e) => setLitersAvoidedPerDay(e.target.value)}
              placeholder="e.g., 0.5"
            />
          </div>
          <div>
            <label htmlFor="timeWonBackPerDayInHours" className="block text-sm font-medium text-foreground mb-1">Average Hours Reclaimed per Day</label>
            <Input
              id="timeWonBackPerDayInHours"
              type="number"
              value={timeWonBackPerDayInHours}
              onChange={(e) => setTimeWonBackPerDayInHours(e.target.value)}
              placeholder="e.g., 2"
            />
          </div>
          <Button onClick={handleSaveSobrietyParameters} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Tracking Parameters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
