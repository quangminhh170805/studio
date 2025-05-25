'use client';

import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ShareApp() {
  const { toast } = useToast();
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://clarity-app.example.com'; // Placeholder

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Clarity - Sobriety Companion',
          text: 'Check out Clarity, an app to help you on your sobriety journey!',
          url: appUrl,
        });
        toast({ title: 'Shared successfully!' });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({ title: 'Could not share', description: 'Sharing failed. You can copy the link instead.', variant: 'destructive' });
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
     navigator.clipboard.writeText(appUrl).then(() => {
       toast({ title: 'Link Copied!', description: 'App link copied to clipboard.' });
     }).catch(err => {
       console.error('Failed to copy link:', err);
       toast({ title: 'Failed to copy', description: 'Could not copy link to clipboard.', variant: 'destructive' });
     });
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-sm text-muted-foreground">
        Help others discover Clarity by sharing it on your favorite platform.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button onClick={handleShare} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <Share2 className="h-4 w-4 mr-2" /> Share App
        </Button>
        <Button onClick={handleCopyLink} variant="outline" className="w-full sm:w-auto">
          <Copy className="h-4 w-4 mr-2" /> Copy Link
        </Button>
      </div>
    </div>
  );
}
