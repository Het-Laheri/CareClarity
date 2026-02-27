'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                    <h2 className="mt-4 font-headline text-xl font-semibold">Something went wrong</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        An unexpected error occurred. Please try refreshing the page.
                    </p>
                    <Button
                        className="mt-6"
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
