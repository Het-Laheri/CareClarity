import Image from "next/image";
import Link from "next/link";
import { placeHolderImages } from "@/lib/placeholder-images";
import { doctors } from "@/lib/doctors";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, Video } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Discover Doctors
        </h1>
        <p className="text-muted-foreground">
          Find specialists tailored to your needs.
        </p>
      </div>

      <div className="mb-6 rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by name, specialty, or location..." className="pl-10" />
          </div>
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => {
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
                    className="h-48 w-full object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="font-headline text-lg">{doctor.name}</CardTitle>
                <p className="text-sm text-primary">{doctor.specialization}</p>
                <p className="mt-2 text-sm text-muted-foreground">{doctor.location}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Verified
                  </Badge>
                  {doctor.online && (
                    <Badge variant="secondary" className="flex items-center gap-1 bg-accent/50 text-accent-foreground">
                      <Video className="h-3 w-3" />
                      Online
                    </Badge>
                  )}
                </div>
                 <Button className="mt-4 w-full" asChild>
                    <Link href={`/dashboard/discover/${doctor.id}`}>View Profile</Link>
                 </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
