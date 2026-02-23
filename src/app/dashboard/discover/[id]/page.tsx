'use client';

import { useState } from 'react';
import Image from "next/image";
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { placeHolderImages } from "@/lib/placeholder-images";
import { doctors } from "@/lib/doctors";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, Video, MapPin, Stethoscope } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function DoctorProfilePage() {
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === params.id);
  const image = placeHolderImages.find((p) => p.id === doctor?.imageId);
  
  const [date, setDate] = useState<Date | undefined>();

  if (!doctor) {
    notFound();
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
                    <CardDescription>Select a date to get started.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center p-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
