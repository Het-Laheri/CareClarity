'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeedbackProps {
    contentId: string;
    contentType: 'ai_response' | 'resource' | 'page';
    className?: string;
}

export function Feedback({ contentId, contentType, className }: FeedbackProps) {
    const [feedback, setFeedback] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleFeedback = async (value: number) => {
        setFeedback(value);
        setSubmitted(true);

        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'feedback',
                    event: `feedback_${contentType}`,
                    metadata: { contentId, contentType },
                    feedback: value,
                }),
            });
        } catch (err) {
            console.error('Failed to send feedback', err);
        }
    };

    if (submitted) {
        return (
            <div className={cn("flex items-center gap-2 text-xs text-muted-foreground animate-in fade-in slide-in-from-bottom-1", className)}>
                <Check className="h-3 w-3 text-green-500" />
                <span>Thanks for your feedback!</span>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <span className="text-xs text-muted-foreground mr-1">Was this helpful?</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-green-50 hover:text-green-600"
                onClick={() => handleFeedback(1)}
            >
                <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-red-50 hover:text-red-600"
                onClick={() => handleFeedback(-1)}
            >
                <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
        </div>
    );
}
