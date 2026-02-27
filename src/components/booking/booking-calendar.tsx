'use client';

import { useState, useCallback } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useDoctorSlots, useBookSlot } from '@/lib/hooks/use-appointments';
import { useToast } from '@/hooks/use-toast';
import {
    CheckCircle,
    Clock,
    CalendarDays,
    Loader2,
    AlertCircle,
    Bell,
} from 'lucide-react';
import { type DoctorSchedule } from '@/lib/booking';

interface BookingCalendarProps {
    doctorId: string;
    doctorName: string;
}

const DEFAULT_SCHEDULE: DoctorSchedule = {
    doctorId: '',
    availableDays: [1, 2, 3, 4, 5],
    timeSlots: [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    ],
    slotDuration: 30,
};

export function BookingCalendar({ doctorId, doctorName }: BookingCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [reminder, setReminder] = useState<'none' | '15min' | '1hr' | '1day'>('1hr');

    const dateStr = selectedDate ? formatDate(selectedDate) : undefined;
    const { data, isLoading: loading, isFetching: slotsLoading, error: fetchError } = useDoctorSlots(doctorId, dateStr);
    const bookMutation = useBookSlot();

    const schedule = data?.schedule as DoctorSchedule | null;
    const bookedSlots = data?.bookedSlots as string[] || [];

    // Date boundaries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 7);

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formatDisplayDate = (date: Date): string => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Check if a time slot is in the past (for today's date)
    const isSlotInPast = (slot: string): boolean => {
        if (!selectedDate) return false;
        const now = new Date();
        const isToday =
            selectedDate.getDate() === now.getDate() &&
            selectedDate.getMonth() === now.getMonth() &&
            selectedDate.getFullYear() === now.getFullYear();
        if (!isToday) return false;

        // Parse slot time
        const match = slot.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return false;
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const period = match[3].toUpperCase();
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);
        return slotTime <= now;
    };

    const { toast } = useToast();

    const handleBookAppointment = useCallback(async () => {
        if (!selectedDate || !selectedSlot) return;

        try {
            await bookMutation.mutateAsync({
                doctorId,
                doctorName,
                date: formatDate(selectedDate),
                timeSlot: selectedSlot,
            });
            setBookingSuccess(true);
            toast({
                title: 'Appointment booked!',
                description: `You have successfully booked an appointment with ${doctorName}.`,
            });
        } catch (e: unknown) {
            console.error('Booking error:', e);
            toast({
                variant: 'destructive',
                title: 'Booking failed',
                description: (e as Error).message || 'We could not book your appointment. Please try again.',
            });
        }
    }, [selectedDate, selectedSlot, doctorId, doctorName, bookMutation, toast]);

    const handleReset = () => {
        setSelectedDate(undefined);
        setSelectedSlot(null);
        setBookingSuccess(false);
        setReminder('1hr');
    };

    // Only allow Mon-Fri within 7-day window
    const isDateDisabled = (date: Date): boolean => {
        if (!schedule) return true;
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        if (d < today || d > maxDate) return true;
        return !schedule.availableDays.includes(d.getDay());
    };

    const getReminderLabel = (val: string) => {
        switch (val) {
            case 'none': return 'No reminder';
            case '15min': return '15 minutes before';
            case '1hr': return '1 hour before';
            case '1day': return '1 day before';
            default: return val;
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading schedule...</span>
                </CardContent>
            </Card>
        );
    }

    // Success state
    if (bookingSuccess && selectedDate && selectedSlot) {
        return (
            <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                <CardContent className="flex flex-col items-center py-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                    <h3 className="mt-4 font-headline text-2xl font-bold text-green-800 dark:text-green-200">
                        Appointment Confirmed!
                    </h3>
                    <div className="mt-4 space-y-1 text-green-700 dark:text-green-300">
                        <p className="font-semibold">{doctorName}</p>
                        <p>{formatDisplayDate(selectedDate)}</p>
                        <p>{selectedSlot}</p>
                    </div>
                    {reminder !== 'none' && (
                        <div className="mt-3 flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                            <Bell className="h-4 w-4" />
                            <span>Reminder set: {getReminderLabel(reminder)}</span>
                        </div>
                    )}
                    <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                        You can view and manage your appointments from the sidebar.
                    </p>
                    <Button onClick={handleReset} variant="outline" className="mt-6">
                        Book Another Appointment
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Book an Appointment</CardTitle>
                <p className="text-sm text-muted-foreground">
                    You can book appointments up to 7 days in advance (Mon–Fri)
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {(fetchError || bookMutation.error) && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {(fetchError as Error)?.message || (bookMutation.error as Error)?.message}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Step 1: Date Selection */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">1. Select a Date</h3>
                        </div>
                        <div className="rounded-lg border p-4">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                disabled={isDateDisabled}
                                month={today}
                                startMonth={today}
                                endMonth={maxDate}
                            />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <span className="inline-block h-3 w-3 rounded-full bg-primary" /> Selected
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="inline-block h-3 w-3 rounded-full bg-muted" /> Unavailable
                            </span>
                        </div>
                    </div>

                    {/* Step 2: Time Slot Selection */}
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">2. Select a Time</h3>
                        </div>

                        {!selectedDate ? (
                            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
                                <p className="px-4 text-center text-sm text-muted-foreground">
                                    Select a date to see available time slots
                                </p>
                            </div>
                        ) : slotsLoading ? (
                            <div className="flex h-[280px] items-center justify-center rounded-lg border">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                <span className="ml-2 text-sm text-muted-foreground">
                                    Loading slots...
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm font-medium">
                                    {formatDisplayDate(selectedDate)}
                                </p>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {schedule?.timeSlots.map((slot) => {
                                        const isBooked = bookedSlots.includes(slot);
                                        const isPast = isSlotInPast(slot);
                                        const isUnavailable = isBooked || isPast;
                                        const isSelected = selectedSlot === slot;
                                        return (
                                            <Button
                                                key={slot}
                                                variant={isSelected ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={isUnavailable}
                                                onClick={() => setSelectedSlot(slot)}
                                                aria-label={`${slot}${isUnavailable ? ' - Unavailable' : ''}${isSelected ? ' - Selected' : ''}`}
                                                className={`transition-all ${isUnavailable
                                                    ? 'opacity-40 line-through cursor-not-allowed'
                                                    : isSelected
                                                        ? 'ring-2 ring-primary ring-offset-2 shadow-md'
                                                        : 'hover:border-primary hover:text-primary'
                                                    }`}
                                            >
                                                {slot}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                    {bookedSlots.length > 0 && (
                                        <span className="flex items-center gap-1">
                                            <span className="inline-block h-2 w-2 rounded-full bg-destructive" /> Booked
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <span className="inline-block h-2 w-2 rounded-full bg-muted" /> Past
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Step 3: Reminder & Confirm */}
                {selectedDate && selectedSlot && (
                    <div className="rounded-lg border bg-accent/30 p-4 space-y-4">
                        <h3 className="font-semibold">3. Set Reminder & Confirm</h3>

                        {/* Reminder selection */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Bell className="h-4 w-4 text-primary" />
                                <span>Reminder:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(['none', '15min', '1hr', '1day'] as const).map((opt) => (
                                    <Button
                                        key={opt}
                                        variant={reminder === opt ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setReminder(opt)}
                                        className={`text-xs ${reminder === opt
                                            ? 'shadow-sm'
                                            : ''
                                            }`}
                                    >
                                        {getReminderLabel(opt)}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="rounded-md border bg-background p-3">
                            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">Doctor</p>
                                    <p className="font-medium">{doctorName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Date</p>
                                    <p className="font-medium">{formatDisplayDate(selectedDate)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Time</p>
                                    <p className="font-medium">{selectedSlot}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Reminder</p>
                                    <p className="font-medium flex items-center gap-1">
                                        <Bell className="h-3 w-3" />
                                        {getReminderLabel(reminder)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleBookAppointment}
                            disabled={bookMutation.isPending}
                            className="w-full"
                            size="lg"
                        >
                            {bookMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Booking...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Confirm Appointment
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
