import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone } from "lucide-react";

export default function EmergencyPage() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-destructive bg-destructive/10 p-4 py-12 text-center">
      <AlertTriangle className="h-16 w-16 text-destructive" />
      <h1 className="mt-4 font-headline text-4xl font-bold text-destructive">
        Emergency Assistance
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-destructive/80">
        If you or someone else is in immediate danger, please use the resources below. This app is not a substitute for professional medical or emergency services.
      </p>

      <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 font-headline">
              <Phone className="h-6 w-6" /> Call For Help
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">For any life-threatening situation, call your local emergency number immediately.</p>
            <Button size="lg" variant="destructive" className="w-full text-lg" asChild>
              <a href="tel:911">Call 911 (or local equivalent)</a>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 font-headline">
              <Phone className="h-6 w-6" /> Mental Health Crisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">If you are experiencing a mental health crisis, contact a suicide and crisis lifeline.</p>
            <Button size="lg" variant="destructive" className="w-full text-lg" asChild>
              <a href="tel:988">Call or Text 988</a>
            </Button>
          </CardContent>
        </Card>
      </div>
       <p className="mt-8 text-sm text-muted-foreground">
        <strong>Disclaimer:</strong> CareClarity is an informational tool and does not provide medical advice, diagnosis, or treatment. The resources listed are for immediate assistance.
      </p>
    </div>
  );
}
