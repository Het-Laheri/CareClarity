'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppointments, useCancelAppointment } from '@/lib/hooks/use-appointments';
import { type Appointment } from '@/lib/booking';
import { doctors } from '@/lib/doctors';
import { CalendarDays, Clock, MapPin, Loader2, XCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AppointmentsPage() {
    const { data: appointments = [], isLoading, error } = useAppointments();
    const cancelMutation = useCancelAppointment();
    const { toast } = useToast();

    const handleCancel = async (id: string) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            await cancelMutation.mutateAsync(id);
            toast({
                title: 'Appointment cancelled',
                description: 'Your appointment has been successfully cancelled.',
            });
        } catch (e) {
            console.error('Error cancelling appointment:', e);
            toast({
                variant: 'destructive',
                title: 'Cancellation failed',
                description: 'We could not cancel your appointment. Please try again.',
            });
        }
    };

    const formatDate = (dateStr: string): string => {
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const upcoming = (appointments as Appointment[]).filter(
        (a) => a.status === 'confirmed' && a.date >= todayStr
    );
    const past = (appointments as Appointment[]).filter(
        (a) => a.status === 'cancelled' || a.date < todayStr
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading appointments...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center text-destructive">
                <XCircle className="h-12 w-12" />
                <h3 className="mt-4 font-headline text-lg font-semibold">Failed to load appointments</h3>
                <p className="mt-2 text-sm">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-4 md:p-6">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    My Appointments
                </h1>
                <p className="text-muted-foreground">
                    View and manage your upcoming and past appointments.
                </p>
            </div>

            {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                    <CalendarDays className="h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 font-headline text-lg font-semibold">No appointments yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Book your first appointment from the Discover page.
                    </p>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard/discover">Find a Doctor</Link>
                    </Button>
                </div>
            ) : (
                <>
                    {/* Upcoming Appointments */}
                    {upcoming.length > 0 && (
                        <div>
                            <h2 className="mb-4 font-headline text-xl font-semibold">
                                Upcoming ({upcoming.length})
                            </h2>
                            <div className="grid gap-4">
                                {upcoming.map((appt) => {
                                    const doctor = doctors.find((d) => d.id === appt.doctorId);
                                    return (
                                        <Card key={appt.id} className="transition-shadow hover:shadow-md">
                                            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="font-semibold text-lg">{appt.doctorName}</h3>
                                                    {doctor && (
                                                        <p className="text-sm text-primary">{doctor.specialization}</p>
                                                    )}
                                                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <CalendarDays className="h-4 w-4" />
                                                            {formatDate(appt.date)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {appt.timeSlot}
                                                        </span>
                                                        {doctor && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                {doctor.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <CheckCircle className="mr-1 h-3 w-3" />
                                                        Confirmed
                                                    </Badge>
                                                </div>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={cancelMutation.isPending && cancelMutation.variables === appt.id}
                                                    onClick={() => handleCancel(appt.id!)}
                                                >
                                                    {cancelMutation.isPending && cancelMutation.variables === appt.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <XCircle className="mr-1 h-4 w-4" />
                                                            Cancel
                                                        </>
                                                    )}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Past / Cancelled */}
                    {past.length > 0 && (
                        <div>
                            <h2 className="mb-4 font-headline text-xl font-semibold text-muted-foreground">
                                Past & Cancelled ({past.length})
                            </h2>
                            <div className="grid gap-4 opacity-70">
                                {past.map((appt) => (
                                    <Card key={appt.id}>
                                        <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold">{appt.doctorName}</h3>
                                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarDays className="h-4 w-4" />
                                                        {formatDate(appt.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {appt.timeSlot}
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge variant={appt.status === 'cancelled' ? 'destructive' : 'secondary'}>
                                                {appt.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
