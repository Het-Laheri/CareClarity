'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Download, FileText, Sparkles } from "lucide-react";

interface ResourceDetail {
  id: number;
  title: string;
  category: string;
  ageGroup: string;
  description: string;
  tags: string[];
  content?: string;
  downloadUrl?: string;
}

export default function ResourceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [resource, setResource] = useState<ResourceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/resources/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Resource not found');
        return res.json();
      })
      .then(data => {
        setResource(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 flex flex-col gap-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4 mt-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-64 w-full mt-8" />
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
        <FileText className="h-12 w-12 opacity-50 mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Resource not found</h2>
        <p className="mt-2 text-sm">{error}</p>
        <Button variant="outline" className="mt-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 pb-20">
      <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
      </Button>

      <div className="space-y-4 mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
            {resource.category}
          </Badge>
          <Badge variant="outline">{resource.ageGroup}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold leading-tight tracking-tight text-foreground">
          {resource.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed pt-2">
          {resource.description}
        </p>

        {resource.downloadUrl && (
          <div className="pt-6">
            <Button className="w-full sm:w-auto shadow-sm" onClick={() => window.open(resource.downloadUrl, '_blank')}>
              <Download className="mr-2 h-4 w-4" />
              Download Attached PDF
            </Button>
          </div>
        )}
      </div>

      <hr className="my-8" />

      <article className="prose prose-slate max-w-none prose-headings:font-headline prose-a:text-primary dark:prose-invert leading-loose">
        {resource.content ? (
          <div className="whitespace-pre-line text-[15px] sm:text-base">
            {/* React Markdown or just pre-line text */}
            {resource.content.split('### Key Takeaways').map((part, index) => (
              index === 1 ? (
                <div key={index} className="bg-primary/5 rounded-xl p-6 mt-8 mb-6 border border-primary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg text-primary m-0">Key Takeaways</h3>
                  </div>
                  <div className="text-sm sm:text-base">
                    {part.replace('*Disclaimer: This is a placeholder resource body used to demonstrate the new reading capabilities of the CareClarity application.*', '').trim()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-6 italic">
                    Disclaimer: This is a placeholder resource body used to demonstrate the new reading capabilities of the CareClarity application.
                  </p>
                </div>
              ) : (
                <div key={index}>{part}</div>
              )
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">No detailed content available for this resource.</p>
        )}
      </article>

      <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-6 rounded-2xl shadow-sm border">
        <div className="text-center sm:text-left">
          <h4 className="font-semibold">Was this helpful?</h4>
          <p className="text-sm text-muted-foreground">Share this resource with caregivers in need.</p>
        </div>
        <div className="flex gap-2">
          {/* Mock Share Button */}
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}
