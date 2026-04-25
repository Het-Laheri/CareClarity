'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Doctor } from "@/lib/doctors";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Search, Video, X, MapPin, Stethoscope, Shield } from "lucide-react";

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

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {/* Hero skeleton */}
        <div className="bg-gradient-to-b from-blue-50/70 to-white px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-4">
            <Skeleton className="h-6 w-48 rounded-full" />
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-14 w-full max-w-2xl rounded-full mt-6" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 pb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-[380px] rounded-2xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">

      {/* ── Hero / Header Strip — matches landing page style ── */}
      <div className="bg-gradient-to-b from-blue-50/60 to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/60 px-4 py-1.5 text-sm font-semibold text-blue-800 mb-5 shadow-sm">
            <Shield className="h-4 w-4 text-blue-600" />
            Verified Specialists · India
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Find the right specialist<br />
            <span className="text-blue-600">for your child's journey.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            Browse verified pediatric specialists across India. Book online or in-person consultations directly from this platform.
          </p>

          {/* Search bar */}
          <div className="mt-8 relative group max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              placeholder="Search by name, specialty, or city (e.g. Neurology, Mumbai)…"
              className="pl-14 pr-14 h-14 text-base rounded-full shadow-md border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-100"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Result count */}
          <p className="mt-4 text-sm text-slate-500 font-medium">
            {filteredDoctors.length} specialist{filteredDoctors.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* ── Results Grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {filteredDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
              <Search className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No specialists match your search</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">
              Try a different city, specialisation, or doctor name.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => setSearchQuery('')}
            >
              View all doctors
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => {
              const image = placeHolderImages.find((p) => p.id === doctor.imageId);
              return (
                <Card
                  key={doctor.id}
                  className="group overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col rounded-2xl bg-white"
                >
                  {/* Doctor photo */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
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
                    {/* Online badge overlay */}
                    {doctor.online && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none flex gap-1.5 items-center px-2.5 py-1 text-xs font-semibold shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          Online
                        </Badge>
                      </div>
                    )}
                    {/* Gradient fade at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col">
                    {/* Name + specialization */}
                    <div className="mb-3">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {doctor.name}
                      </h2>
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1">
                        {doctor.specialization}
                      </p>
                    </div>

                    {/* Location */}
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {doctor.location}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal border-none text-xs">
                        <CheckCircle className="mr-1 h-3 w-3 text-blue-500" /> Verified
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal border-none text-xs">
                        <Stethoscope className="mr-1 h-3 w-3 text-slate-400" /> RCI Registered
                      </Badge>
                      {doctor.online && (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-normal border-none text-xs">
                          <Video className="mr-1 h-3 w-3" /> Telehealth
                        </Badge>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button
                        style={{ backgroundColor: '#2563eb', color: 'white' }}
                        className="w-full rounded-xl h-11 font-semibold hover:opacity-90 transition-opacity shadow-sm group-hover:shadow-md"
                        asChild
                      >
                        <Link href={`/dashboard/discover/${doctor.id}`}>View Profile & Book</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Footer note — matches landing page disclaimer style */}
        <p className="mt-12 text-center text-xs text-slate-400 font-medium">
          CareClarity lists verified specialists. Always confirm credentials directly with the provider. · Not a medical referral service.
        </p>
      </div>
    </div>
  );
}