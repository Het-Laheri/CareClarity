'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Doctor } from "@/lib/doctors";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Search, Video, X, Filter } from "lucide-react";

// ... Interface (same as yours)

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
    const query = searchQuery.toLowerCase().trim();
    if (!query) return doctors;
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query)
    );
  }, [searchQuery, doctors]);

  // Loading State
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50/50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-[350px] rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    /* MAIN CONTAINER: flex-1 and overflow-y-auto is correct */
    <div className="flex-1 overflow-y-auto bg-slate-50/30">

      {/* CONTENT WRAPPER: Center and constrain width */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900">Discover Doctors</h1>
            <p className="text-muted-foreground mt-1 text-lg">Specialized care for your child&apos;s unique journey.</p>
          </div>
          <Badge variant="outline" className="w-fit h-fit px-3 py-1 text-primary border-primary/20 bg-primary/5">
            {filteredDoctors.length} Specialists Available
          </Badge>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-slate-50/80 backdrop-blur-md md:mx-0 md:px-0 md:bg-transparent">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search by name, specialty, or location (e.g. Mumbai, Neurology)..."
              className="pl-12 h-14 text-base rounded-2xl shadow-sm border-slate-200 focus-visible:ring-primary focus-visible:ring-offset-0 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-dashed">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <Search className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No specialists match your search</h3>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto">Try searching for a city, a specific diagnosis, or check your spelling.</p>
            <Button variant="outline" className="mt-6 rounded-full" onClick={() => setSearchQuery('')}>
              View all doctors
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => {
              const image = placeHolderImages.find((p) => p.id === doctor.imageId);
              return (
                <Card key={doctor.id} className="group overflow-hidden border-slate-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col rounded-2xl bg-white">
                  <div className="relative h-48 w-full overflow-hidden">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        unoptimized
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      {doctor.online && (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none flex gap-1 items-center px-2 py-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          Online
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {doctor.name}
                      </CardTitle>
                      <p className="text-sm font-medium text-primary uppercase tracking-wider mt-1">
                        {doctor.specialization}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-4">
                      <span className="text-slate-400">📍</span> {doctor.location}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-normal border-none">
                          <CheckCircle className="mr-1 h-3 w-3 text-blue-500" /> Verified
                        </Badge>
                        {doctor.online && (
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal border-none">
                            <Video className="mr-1 h-3 w-3" /> Telehealth
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full rounded-xl h-11 font-semibold group-hover:shadow-md transition-all" asChild>
                        <Link href={`/dashboard/discover/${doctor.id}`}>View Full Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}