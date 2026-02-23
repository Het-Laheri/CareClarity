'use client';

import Image from "next/image";
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { placeHolderImages } from "@/lib/placeholder-images";
import { doctors } from "@/lib/doctors";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Video, MapPin, Stethoscope } from "lucide-react";

export default function DoctorProfilePage() {
  const params = useParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === params.id);
  const image = placeHolderImages.find((p) => p.id === doctor?.imageId);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="flex justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl space-y-8">
        <Card className="overflow-hidden">
          {image && (
            <div className="relative h-64 w-full">
              <Image
                src={image.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{doctor.name}</CardTitle>
            <CardDescription className="text-primary font-semibold">{doctor.specialization}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-base">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Stethoscope className="h-5 w-5" />
              <span>Board Certified</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Verified
              </Badge>
              {doctor.online && (
                <Badge
                  variant="secondary"
                  className="bg-accent/50 px-3 py-1 text-sm text-accent-foreground"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Online Consultations
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">About Dr. {doctor.name.split(' ')[1]}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">{doctor.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Book an Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To book an appointment with {doctor.name}, please contact their office directly. Online booking will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
