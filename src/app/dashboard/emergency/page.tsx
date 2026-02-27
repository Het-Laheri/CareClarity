import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone } from "lucide-react";

export default function EmergencyPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-destructive bg-destructive/10 p-4 py-8 sm:py-12 text-center">
        <AlertTriangle className="h-12 w-12 sm:h-16 sm:w-16 text-destructive" />
        <h1 className="mt-4 font-headline text-2xl sm:text-4xl font-bold text-destructive">
          Emergency Assistance
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-lg text-destructive/80 px-2">
          If you or someone else is in immediate danger, please use the resources below. This app is not a substitute for professional medical or emergency services.
        </p>

        <div className="mt-6 sm:mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 px-2">
          <Card className="border-destructive">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center justify-center gap-2 font-headline text-base sm:text-lg">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" /> Emergency Helpline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">For any life-threatening situation, call the national emergency number immediately.</p>
              <Button size="lg" variant="destructive" className="w-full text-base sm:text-lg" asChild>
                <a href="tel:112">Call 112</a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-destructive">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center justify-center gap-2 font-headline text-base sm:text-lg">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" /> Mental Health Crisis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">iCall (TISS) psychosocial helpline — trained counsellors available Mon-Sat, 8AM-10PM.</p>
              <Button size="lg" variant="destructive" className="w-full text-base sm:text-lg" asChild>
                <a href="tel:9152987821">Call 9152987821</a>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-destructive">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center justify-center gap-2 font-headline text-base sm:text-lg">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" /> Vandrevala Foundation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground">24/7 mental health helpline — free, confidential support in multiple Indian languages.</p>
              <Button size="lg" variant="destructive" className="w-full text-base sm:text-lg" asChild>
                <a href="tel:18602662345">Call 1860-2662-345</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground px-4">
          <strong>Disclaimer:</strong> CareClarity is an informational tool and does not provide medical advice, diagnosis, or treatment. The resources listed are for immediate assistance.
        </p>
      </div>
    </div>
  );
}
