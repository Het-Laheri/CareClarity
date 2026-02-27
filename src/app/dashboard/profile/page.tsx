'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [conditionTags, setConditionTags] = useState('');
  const [goals, setGoals] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingChild, setSavingChild] = useState(false);
  const [nameInit, setNameInit] = useState(false);

  // Init name from Firebase user
  if (user && !nameInit) {
    setName(user.displayName || '');
    setNameInit(true);
  }

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      const token = await user?.getIdToken();
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ displayName: name }),
      });
      toast({ title: 'Profile updated', description: 'Your name has been saved.' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save. Try again.' });
    } finally { setSavingProfile(false); }
  };

  const saveChildInfo = async () => {
    setSavingChild(true);
    try {
      const token = await user?.getIdToken();
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ childAgeGroup: ageGroup, conditionTags, goals }),
      });
      toast({ title: 'Child info updated', description: 'Your child\'s information has been saved.' });
    } catch {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save. Try again.' });
    } finally { setSavingChild(false); }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight">Profile Management</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your account and child&apos;s information.</p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="font-headline text-lg sm:text-xl">Your Information</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ''} disabled className="bg-muted text-sm" />
                <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
              </div>
              <Button onClick={saveProfile} disabled={savingProfile} className="w-full sm:w-auto">
                {savingProfile ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-4 w-4" /> Save Changes</>}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="font-headline text-lg sm:text-xl">Child&apos;s Information</CardTitle>
            <CardDescription className="text-xs sm:text-sm">This anonymized data helps us tailor content. We will never ask for personally identifiable information.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age-group" className="text-sm">Child&apos;s Age Group</Label>
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger id="age-group" className="text-sm"><SelectValue placeholder="Select age group" /></SelectTrigger>
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
                <Label htmlFor="condition-tags" className="text-sm">Condition Tags (Non-diagnostic)</Label>
                <Input id="condition-tags" value={conditionTags} onChange={(e) => setConditionTags(e.target.value)} placeholder="e.g., ASD, Sensory Processing, Non-verbal" className="text-sm" />
                <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals" className="text-sm">Current Goals or Challenges</Label>
                <Textarea id="goals" value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g., Improving social skills, managing meltdowns" className="text-sm min-h-[80px]" />
              </div>
              <Button onClick={saveChildInfo} disabled={savingChild} className="w-full sm:w-auto">
                {savingChild ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-4 w-4" /> Save Child&apos;s Info</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
