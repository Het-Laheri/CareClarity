'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { addDays, format } from 'date-fns';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
];

type BookingDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  doctorName: string;
};

export function BookingDialog({ isOpen, onOpenChange, doctorName }: BookingDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  const availableDays = useMemo(() => {
    // Simulate fetching available days. For demo, make next 14 days available.
    return Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  }, []);
  
  const handleBooking = () => {
    if (!date || !selectedTime) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Selection',
        description: 'Please select a date and a time slot.',
      });
      return;
    }

    const formattedDate = format(date, 'yyyy-MM-dd');
    setBookedSlots(prev => ({
      ...prev,
      [formattedDate]: [...(prev[formattedDate] || []), selectedTime],
    }));

    toast({
      title: 'Appointment Booked!',
      description: `Your appointment with ${doctorName} is confirmed for ${format(date, 'MMMM d, yyyy')} at ${selectedTime}.`,
    });
    
    setSelectedTime(null);
    onOpenChange(false);
  };
  
  const todaysBookedSlots = date ? bookedSlots[format(date, 'yyyy-MM-dd')] || [] : [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Calendar Section */}
          <div className="p-6">
             <DialogHeader className="mb-4">
              <DialogTitle className="font-headline text-xl">Book with {doctorName}</DialogTitle>
              <DialogDescription>Select an available date and time.</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                modifiers={{ available: availableDays }}
                modifiersClassNames={{
                  available: 'day-available',
                }}
                disabled={(day) => day < new Date(new Date().setHours(0,0,0,0))}
                className="p-0"
              />
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="border-t md:border-t-0 md:border-l bg-secondary/50 p-6">
            <h3 className="font-semibold mb-4 text-sm text-foreground">
              {date ? `Available slots for ${format(date, 'eeee, MMMM d')}` : 'Please select a date'}
            </h3>
            {date ? (
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 max-h-[280px] md:max-h-[350px] overflow-y-auto pr-2">
                {timeSlots.map(slot => {
                  const isBooked = todaysBookedSlots.includes(slot);
                  return (
                    <Button 
                      key={slot} 
                      variant={selectedTime === slot ? 'default' : 'outline'}
                      size="sm"
                      disabled={isBooked}
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        "w-full justify-center",
                        isBooked && "bg-muted-foreground/30 text-muted-foreground line-through"
                      )}
                    >
                      {slot}
                    </Button>
                  );
                })}
              </div>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Select a date to see available times.
                </div>
            )}
          </div>
        </div>
        <DialogFooter className="p-6 border-t">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleBooking} disabled={!date || !selectedTime}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
