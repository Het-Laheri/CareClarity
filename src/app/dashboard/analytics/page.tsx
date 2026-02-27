'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, MessageSquare, ThumbsUp, ThumbsDown, Activity } from "lucide-react";

export default function AnalyticsDashboard() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const helpfulCount = data.filter(e => e.feedback === 1).length;
    const unhelpfulCount = data.filter(e => e.feedback === -1).length;
    const aiFeedback = data.filter(e => e.metadata?.contentType === 'ai_response');
    const resourceFeedback = data.filter(e => e.metadata?.contentType === 'resource');

    if (loading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight">Internal Analytics</h1>
                <p className="text-muted-foreground">Monitor user feedback and engagement to improve CareClarity.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.length}</div>
                        <p className="text-xs text-muted-foreground">Submissions collected in-memory</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Helpful AI</CardTitle>
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {aiFeedback.filter(f => f.feedback === 1).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Positive AI reviews</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Resource Engagement</CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{resourceFeedback.length}</div>
                        <p className="text-xs text-muted-foreground">Total resource ratings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Unhelpful</CardTitle>
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{unhelpfulCount}</div>
                        <p className="text-xs text-muted-foreground">Needs improvement</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Recent Feedback Stream</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.length === 0 ? (
                            <p className="text-center py-8 text-muted-foreground">No data collected yet.</p>
                        ) : (
                            [...data].reverse().map((event, idx) => (
                                <div key={idx} className="flex items-start justify-between p-3 border rounded-lg bg-muted/20">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{event.metadata?.contentType || 'event'}</Badge>
                                            <span className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</span>
                                        </div>
                                        <p className="text-sm font-medium">
                                            {event.metadata?.contentType === 'ai_response' ? `Query: "${event.contentId}"` : `Resource ID: ${event.contentId}`}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {event.feedback === 1 ? <ThumbsUp className="h-4 w-4 text-green-500" /> : <ThumbsDown className="h-4 w-4 text-red-500" />}
                                        <span className="text-xs font-bold">{event.feedback === 1 ? 'Positive' : 'Negative'}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
