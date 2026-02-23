import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const resources = [
  {
    id: 1,
    title: "Understanding Sensory Processing Disorder",
    category: "Sensory Needs",
    ageGroup: "3-5 years",
    description: "An introductory guide to sensory processing challenges and strategies to help your child.",
  },
  {
    id: 2,
    title: "Developing Communication Skills in Non-Verbal Children",
    category: "Communication",
    ageGroup: "All Ages",
    description: "Explore alternative and augmentative communication (AAC) methods and techniques.",
  },
  {
    id: 3,
    title: "Navigating School: IEPs and 504 Plans",
    category: "Education",
    ageGroup: "6-9 years",
    description: "Learn how to advocate for your child's educational needs through Individualized Education Programs.",
  },
  {
    id: 4,
    title: "Strategies for Managing Meltdowns",
    category: "Behavioral Support",
    ageGroup: "All Ages",
    description: "Practical tips for de-escalating challenging situations and understanding triggers.",
  },
  {
    id: 5,
    title: "The Importance of Early Intervention",
    category: "Early Intervention",
    ageGroup: "0-2 years",
    description: "Discover why early support is crucial and how to access services for toddlers.",
  },
  {
    id: 6,
    title: "Building Social Skills Through Play",
    category: "Social Skills",
    ageGroup: "3-5 years",
    description: "Fun, play-based activities to help your child understand social cues and interact with peers.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Resources Library
        </h1>
        <p className="text-muted-foreground">
          Explore curated articles and guidance for your caregiving journey.
        </p>
      </div>

      <div className="mb-6 rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-10" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sensory">Sensory Needs</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="behavioral">Behavioral Support</SelectItem>
                  <SelectItem value="social">Social Skills</SelectItem>
                  <SelectItem value="early">Early Intervention</SelectItem>
                </SelectContent>
              </Select>
                <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by age group" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-9">6-9 years</SelectItem>
                  <SelectItem value="10-13">10-13 years</SelectItem>
                  <SelectItem value="14-18">14-18 years</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-lg">{resource.title}</CardTitle>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary">{resource.category}</Badge>
                <Badge variant="outline">{resource.ageGroup}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
