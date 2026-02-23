'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/logo';

const totalSteps = 4;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < totalSteps + 1 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / (totalSteps + 1)) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="shadow-xl">
          <CardHeader>
             {step > 1 && step <= totalSteps + 1 && (
               <Progress value={progress} className="mb-4" />
             )}
            {step === 1 && <CardTitle className="font-headline text-2xl text-center">Welcome to CareClarity</CardTitle>}
            {step > 1 && step <= totalSteps && (
              <Button variant="ghost" size="sm" onClick={prevStep} className="self-start">
                <ArrowLeft className="mr-2" /> Back
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {step === 1 && <Step1 nextStep={nextStep} />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
          </CardContent>
          {step > 1 && step <= totalSteps && (
             <CardFooter className="flex justify-end">
                <Button onClick={nextStep}>Continue</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}

function Step1({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="text-center">
      <CardDescription className="text-lg mb-6">
        Let's personalize your experience. This will take about 2 minutes and will help us provide the most relevant guidance for your journey.
      </CardDescription>
       <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-left text-sm text-destructive">
          <p><strong>Important:</strong> This is not a diagnostic tool. The information you provide helps us tailor content and does not constitute medical advice. Please consult a qualified professional for any health concerns.</p>
        </div>
      <Button onClick={nextStep} size="lg" className="mt-8">Let's Get Started</Button>
    </div>
  );
}

function Step2() {
  const roles = [
    { id: 'caregiver', label: 'Parent or Caregiver' },
    { id: 'professional', label: 'Healthcare Professional' },
    { id: 'educator', label: 'Educator' },
    { id: 'other', label: 'Other' },
  ];
  return (
    <div>
      <h2 className="font-headline text-xl font-semibold mb-1">Tell us about you</h2>
      <p className="text-muted-foreground mb-6">This helps us understand your perspective.</p>
      <RadioGroup defaultValue="caregiver" className="space-y-2">
        {roles.map((role) => (
          <div key={role.id} className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value={role.id} id={role.id} />
            <Label htmlFor={role.id} className="text-base flex-1 cursor-pointer">{role.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}


function Step3() {
    return (
        <div>
            <h2 className="font-headline text-xl font-semibold mb-1">About your child</h2>
            <p className="text-muted-foreground mb-6">This anonymized information helps us tailor content. We will never ask for personally identifiable information.</p>
             <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age-group">Child's Age Group</Label>
                <Select>
                  <SelectTrigger id="age-group">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-9">6-9 years</SelectItem>
                    <SelectItem value="10-13">10-13 years</SelectItem>
                    <SelectItem value="14-18">14-18 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition-tags">Primary Challenges or Interests (Non-diagnostic)</Label>
                <Input id="condition-tags" placeholder="e.g., Social skills, Sensory sensitivities, Routine changes" />
                 <p className="text-xs text-muted-foreground">Separate with commas. Examples: social skills, sensory sensitivities, non-verbal communication.</p>
              </div>
            </form>
        </div>
    )
}

const goals = [
    { id: 'understand-needs', label: "Better understand my child's needs" },
    { id: 'communication', label: "Find new communication strategies" },
    { id: 'behavior', label: "Learn to manage challenging behaviors" },
    { id: 'education', label: "Navigate the education system (e.g., IEPs)" },
    { id: 'find-support', label: "Find professional support and specialists" },
    { id: 'activities', label: "Discover new activities for development" },
]

function Step4() {
    return (
        <div>
            <h2 className="font-headline text-xl font-semibold mb-1">What are your primary goals?</h2>
            <p className="text-muted-foreground mb-6">Select all that apply. This will help us recommend relevant resources.</p>
            <div className="space-y-3">
                {goals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-3 rounded-md border p-4">
                        <Checkbox id={goal.id} />
                        <Label htmlFor={goal.id} className="text-base flex-1 cursor-pointer font-normal">{goal.label}</Label>
                    </div>
                ))}
            </div>
        </div>
    )
}


function Step5() {
  return (
    <div className="text-center">
        <h2 className="font-headline text-xl font-semibold mb-2">You're all set!</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Thank you for sharing. Your personalized dashboard is now ready to provide you with tailored guidance and resources.
      </p>
      <Button asChild size="lg">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
