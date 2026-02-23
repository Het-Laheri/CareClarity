'use client';

import { useState } from 'react';
import Image from "next/image";
import { notFound } from 'next/navigation';
import { placeHolderImages } from "@/lib/placeholder-images";
import { doctors } from "@/lib/doctors";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, Clock, Video, MapPin, Stethoscope } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const doctor = doctors.find((d) => d.id === params.id);
  const image = placeHolderImages.find((p) => p.id === doctor?.imageId);
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  if (!doctor) {
    notFound();
  }

  const handleBooking = () => {
    if (!date || !selectedTime) {
        toast({
            variant: "destructive",
            title: "Booking Failed",
            description: "Please select a date and time to book an appointment.",
        });
        return;
    }
    toast({
        title: "Appointment Booked!",
        description: `Your appointment with ${doctor.name} on ${date.toLocaleDateString()} at ${selectedTime} has been successfully booked.`,
    });
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
            <Card className="overflow-hidden">
                 {image && (
                  <Image
                    src={image.imageUrl}
                    alt={doctor.name}
                    width={400}
                    height={400}
                    className="h-auto w-full object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{doctor.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{doctor.specialization}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.location}</span>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Stethoscope className="h-4 w-4" />
                        <span>Board Certified</span>
                    </div>
                     <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            Verified
                        </Badge>
                        {doctor.online && (
                            <Badge variant="secondary" className="flex items-center gap-1 bg-accent/50 text-accent-foreground">
                            <Video className="h-3 w-3" />
                            Online Consultations
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{doctor.bio}</p>
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Book an Appointment</CardTitle>
                    <CardDescription>Select a date and time that works for you.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="flex justify-center">
                     <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                   </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><Clock className="h-5 w-5"/> Available Times</h3>
                        {date ? (
                             <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map(time => (
                                    <Button 
                                        key={time} 
                                        variant="outline"
                                        className={cn(selectedTime === time && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Please select a date first.</p>
                        )}
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                     <Button size="lg" className="w-full" onClick={handleBooking}>Book Appointment</Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
