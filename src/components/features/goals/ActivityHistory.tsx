'use client';

import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3, MessageSquareText, Zap, Smile } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ActivityHistory() {
  const { activityLogs, deleteActivityLog } = useAppContext();

  if (activityLogs.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No activities logged yet. Start logging to see your history here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <CardDescription>Review your past activity logs.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-22rem)] pr-3"> {/* Adjusted height */}
          <ul className="space-y-4">
            {activityLogs.map((log) => (
              <li key={log.id} className="p-4 rounded-md bg-card-foreground/5 border border-border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-primary">{format(new Date(log.date), "PPP")}</p>
                    <p className="text-sm text-foreground mt-1 flex items-start">
                      <MessageSquareText className="h-4 w-4 mr-2 mt-0.5 shrink-0 text-muted-foreground" />
                      {log.description}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:text-blue-700" disabled title="Edit (Not implemented)">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive/80">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this activity log.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteActivityLog(log.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {log.trigger && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center">
                    <Zap className="h-3 w-3 mr-1.5 shrink-0 text-orange-400" />
                    <span className="font-medium mr-1">Trigger:</span> {log.trigger}
                  </p>
                )}
                {log.mood && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    <Smile className="h-3 w-3 mr-1.5 shrink-0 text-green-400" />
                    <span className="font-medium mr-1">Mood:</span> {log.mood}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
