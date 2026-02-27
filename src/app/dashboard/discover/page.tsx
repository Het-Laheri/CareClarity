'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Search, Video, X } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  online: boolean;
  imageId: string;
  bio: string;
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctors')
      .then((r) => r.json())
      .then((data) => { setDoctors(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return doctors;
    const query = searchQuery.toLowerCase();
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query)
    );
  }, [searchQuery, doctors]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <Skeleton className="h-12 rounded-lg" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-72 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight">Discover Doctors</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Find specialists tailored to your needs.</p>
      </div>

      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty, or location..."
              className="pl-9 sm:pl-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchQuery && (
            <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
              <X className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
          <h3 className="mt-4 font-headline text-base sm:text-lg font-semibold">No doctors found</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Try adjusting your search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => {
            const image = placeHolderImages.find((p) => p.id === doctor.imageId);
            return (
              <Card key={doctor.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={doctor.name}
                      width={400}
                      height={300}
                      className="h-36 sm:h-48 w-full object-cover"
                      data-ai-hint={image.imageHint}
                      loading="lazy"
                      unoptimized
                    />
                  )}
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <CardTitle className="font-headline text-base sm:text-lg">{doctor.name}</CardTitle>
                  <p className="text-xs sm:text-sm text-primary">{doctor.specialization}</p>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{doctor.location}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                      <CheckCircle className="h-3 w-3 text-green-500" /> Verified
                    </Badge>
                    {doctor.online && (
                      <Badge variant="secondary" className="flex items-center gap-1 bg-accent/50 text-accent-foreground text-xs">
                        <Video className="h-3 w-3" /> Online
                      </Badge>
                    )}
                  </div>
                  <Button className="mt-3 w-full" size="sm" asChild>
                    <Link href={`/dashboard/discover/${doctor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
