'use client';

import Image from "next/image";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { placeHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Video, MapPin, Stethoscope } from "lucide-react";
import { BookingCalendar } from "@/components/booking/booking-calendar";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  online: boolean;
  imageId: string;
  bio: string;
}

export default function DoctorProfilePage() {
  const params = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctors')
      .then((r) => r.json())
      .then((data: Doctor[]) => {
        const found = data.find((d) => d.id === params.id);
        setDoctor(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center p-4 md:p-6">
        <div className="w-full max-w-3xl space-y-4">
          <Skeleton className="h-48 sm:h-64 w-full rounded-lg" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">Doctor not found.</p>
      </div>
    );
  }

  const image = placeHolderImages.find((p) => p.id === doctor.imageId);

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl space-y-4 sm:space-y-6">
        <Card className="overflow-hidden">
          {image && (
            <div className="relative h-40 w-full sm:h-48 md:h-64">
              <Image
                src={image.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
                priority
                unoptimized
              />
            </div>
          )}
          <CardHeader className="pt-4 sm:pt-6 pb-2 sm:pb-4">
            <CardTitle className="font-headline text-2xl sm:text-3xl">{doctor.name}</CardTitle>
            <CardDescription className="text-primary font-semibold text-sm sm:text-base">{doctor.specialization}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 text-sm sm:text-base">
            <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground">
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>RCI Registered</span>
            </div>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-500" /> Verified
              </Badge>
              {doctor.online && (
                <Badge variant="secondary" className="bg-accent/50 px-2 sm:px-3 py-1 text-xs sm:text-sm text-accent-foreground">
                  <Video className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Online Consultations
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="font-headline text-xl sm:text-2xl">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-sm sm:text-base text-muted-foreground">{doctor.bio}</p>
          </CardContent>
        </Card>

        <BookingCalendar doctorId={doctor.id} doctorName={doctor.name} />
      </div>
    </div>
  );
}
