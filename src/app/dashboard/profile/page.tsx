import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Profile Management
        </h1>
        <p className="text-muted-foreground">
          Manage your account and child's information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Caregiver" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="caregiver@example.com" />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Child's Information</CardTitle>
            <CardDescription>This anonymized data helps us tailor content. We will never ask for personally identifiable information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
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
                <Label htmlFor="condition-tags">Condition Tags (Non-diagnostic)</Label>
                <Input id="condition-tags" placeholder="e.g., ASD, Sensory Processing, Non-verbal" />
                 <p className="text-xs text-muted-foreground">Separate tags with commas. This helps in finding relevant resources.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Current Goals or Challenges</Label>
                <Textarea id="goals" placeholder="e.g., Improving social skills, managing meltdowns" />
              </div>
              <Button type="submit">Save Child's Info</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
