'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X, Sparkles, Star, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOnboardingProfile, type OnboardingProfile } from '@/lib/onboarding-profile';
import { Feedback } from '@/components/feedback';

interface Resource {
  id: number;
  title: string;
  category: string;
  ageGroup: string;
  description: string;
  tags: string[];
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Sensory Needs", label: "Sensory Needs" },
  { value: "Communication", label: "Communication" },
  { value: "Education", label: "Education" },
  { value: "Behavioral Support", label: "Behavioral Support" },
  { value: "Social Skills", label: "Social Skills" },
  { value: "Early Intervention", label: "Early Intervention" },
  { value: "Professional Support", label: "Professional Support" },
  { value: "Activities", label: "Activities" },
  { value: "Understanding Conditions", label: "Understanding Conditions" },
];

const ageGroups = [
  { value: "all", label: "All Ages" },
  { value: "0-2 years", label: "0-2 years" },
  { value: "3-5 years", label: "3-5 years" },
  { value: "6-9 years", label: "6-9 years" },
  { value: "10-13 years", label: "10-13 years" },
  { value: "14-18 years", label: "14-18 years" },
];

function computeRelevanceScore(resource: Resource, profile: OnboardingProfile): number {
  let score = 0;
  if (profile.ageGroup) {
    const profileAge = `${profile.ageGroup} years`;
    if (resource.ageGroup === profileAge) score += 3;
    if (resource.ageGroup === 'All Ages') score += 1;
  }
  for (const goal of profile.goals) {
    if (resource.tags.includes(goal)) score += 2;
  }
  for (const challenge of profile.challenges) {
    const lc = challenge.toLowerCase();
    for (const tag of resource.tags) {
      if (tag.includes(lc) || lc.includes(tag)) { score += 2; break; }
    }
    if (resource.title.toLowerCase().includes(lc)) score += 1;
    if (resource.description.toLowerCase().includes(lc)) score += 1;
  }
  return score;
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [showRecommended, setShowRecommended] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProfile(getOnboardingProfile());
    fetch('/api/resources')
      .then((r) => r.json())
      .then((data) => { setResources(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const scoredResources = useMemo(() => {
    return resources.map((r) => ({
      ...r,
      relevanceScore: profile ? computeRelevanceScore(r, profile) : 0,
    }));
  }, [profile, resources]);

  const recommendedResources = useMemo(() => {
    return scoredResources
      .filter((r) => r.relevanceScore >= 2)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [scoredResources]);

  const filteredResources = useMemo(() => {
    const sorted = [...scoredResources].sort((a, b) => b.relevanceScore - a.relevanceScore);
    return sorted.filter((resource) => {
      const matchesSearch = !searchQuery.trim() ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesAgeGroup = selectedAgeGroup === 'all' || resource.ageGroup === 'All Ages' || resource.ageGroup === selectedAgeGroup;
      return matchesSearch && matchesCategory && matchesAgeGroup;
    });
  }, [searchQuery, selectedCategory, selectedAgeGroup, scoredResources]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedAgeGroup !== 'all';
  const clearFilters = () => { setSearchQuery(''); setSelectedCategory('all'); setSelectedAgeGroup('all'); };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-52 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight">Resources Library</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Explore curated articles and guidance for your caregiving journey.</p>
      </div>

      {/* Recommended */}
      {profile && recommendedResources.length > 0 && showRecommended && !hasActiveFilters && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-headline text-lg sm:text-xl font-semibold">Recommended For You</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowRecommended(false)}>
              <X className="h-4 w-4 mr-1" /> Dismiss
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">Based on your onboarding survey — personalized to your child&apos;s age group, challenges, and goals.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedResources.slice(0, 3).map((resource) => (
              <Card key={resource.id} className="flex flex-col overflow-hidden border-primary/30 bg-primary/5 transition-shadow hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-headline text-base sm:text-lg leading-tight">{resource.title}</CardTitle>
                    <Star className="h-4 w-4 text-primary fill-primary shrink-0 mt-1" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">Recommended</Badge>
                    <Badge variant="secondary" className="text-xs">{resource.category}</Badge>
                    <Badge variant="outline" className="text-xs">{resource.ageGroup}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow py-2">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
                </CardContent>
                <CardFooter className="pt-2 flex flex-col gap-3">
                  <Button className="w-full" size="sm">Read More</Button>
                  <div className="w-full flex justify-center border-t pt-2">
                    <Feedback contentId={resource.id.toString()} contentType="resource" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-9 sm:pl-10 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] text-sm"><SelectValue placeholder="Filter by category" /></SelectTrigger>
              <SelectContent>{categories.map((cat) => (<SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>))}</SelectContent>
            </Select>
            <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
              <SelectTrigger className="w-full sm:w-[180px] text-sm"><SelectValue placeholder="Filter by age group" /></SelectTrigger>
              <SelectContent>{ageGroups.map((age) => (<SelectItem key={age.value} value={age.value}>{age.label}</SelectItem>))}</SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                <X className="mr-1 h-4 w-4" /> Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* All Resources */}
      <div>
        <h2 className="font-headline text-lg sm:text-xl font-semibold mb-3">All Resources</h2>
        {filteredResources.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-headline text-base sm:text-lg font-semibold">No resources found</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-headline text-base sm:text-lg leading-tight">{resource.title}</CardTitle>
                    {resource.relevanceScore >= 2 && <Star className="h-4 w-4 text-primary fill-primary shrink-0 mt-1" />}
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <Badge variant="secondary" className="text-xs">{resource.category}</Badge>
                    <Badge variant="outline" className="text-xs">{resource.ageGroup}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow py-2">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
                </CardContent>
                <CardFooter className="pt-2 flex flex-col gap-3">
                  <Button className="w-full" size="sm">Read More</Button>
                  <div className="w-full flex justify-center border-t pt-2">
                    <Feedback contentId={resource.id.toString()} contentType="resource" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
