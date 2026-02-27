'use client';

import { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    BookOpen,
    Tag,
    Loader2,
    ExternalLink,
    ChevronRight,
    Filter
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Resource {
    id: number;
    title: string;
    category: string;
    ageGroup: string;
    description: string;
    tags: string[];
}

const CATEGORIES = [
    "Sensory Needs",
    "Communication",
    "Education",
    "Behavioral Support",
    "Social Skills",
    "Early Intervention",
    "Professional Support",
    "Activities",
    "Understanding Conditions"
];

const AGE_GROUPS = [
    "All Ages",
    "0-2 years",
    "3-5 years",
    "6-9 years",
    "10-13 years",
    "14-18 years"
];

export default function AdminResources() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentResource, setCurrentResource] = useState<Partial<Resource>>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/resources');
            const data = await res.json();
            setResources(data);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Sync Error",
                description: "Failed to download curated resource database.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Permanently remove this resource from the public library?')) return;

        try {
            const res = await fetch(`/api/resources?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setResources(resources.filter(r => r.id !== id));
                toast({ title: "Archived", description: "Resource removed from public view." });
            }
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Operation failed." });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEditing = !!currentResource.id;
        const url = '/api/resources';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentResource),
            });

            if (res.ok) {
                await fetchResources();
                setIsDialogOpen(false);
                setCurrentResource({});
                toast({
                    title: isEditing ? "Record Updated" : "Resource Distributed",
                    description: `Knowledge asset is now ${isEditing ? 'updated' : 'live'}.`
                });
            }
        } catch (err) {
            toast({ variant: "destructive", title: "Logic Error", description: "Database write failed." });
        }
    };

    const filteredResources = resources.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cureted Resources</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Manage the educational assets and clinical guidance library.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setCurrentResource({})} className="bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" /> New Material
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">{currentResource.id ? 'Edit' : 'Create'} Resource</DialogTitle>
                                <DialogDescription>
                                    Draft or update curated content for the caregiver community.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Asset Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. Understanding Modern Inclusion"
                                        value={currentResource.title || ''}
                                        onChange={e => setCurrentResource({ ...currentResource, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label>Domain</Label>
                                        <Select
                                            value={currentResource.category}
                                            onValueChange={val => setCurrentResource({ ...currentResource, category: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Domain" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Developmental Stage</Label>
                                        <Select
                                            value={currentResource.ageGroup}
                                            onValueChange={val => setCurrentResource({ ...currentResource, ageGroup: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Target Age" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AGE_GROUPS.map(age => <SelectItem key={age} value={age}>{age}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="desc">Concise Guidance (Description)</Label>
                                    <Textarea
                                        id="desc"
                                        placeholder="Brief overview of the content..."
                                        className="min-h-[100px]"
                                        value={currentResource.description || ''}
                                        onChange={e => setCurrentResource({ ...currentResource, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tags">Indexing Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        placeholder="sensory, education, rights"
                                        value={currentResource.tags?.join(', ') || ''}
                                        onChange={e => setCurrentResource({ ...currentResource, tags: e.target.value.split(',').map(t => t.trim()) })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Discard</Button>
                                <Button type="submit">Deploy Asset</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Filter assets by title, domain or keywords..."
                        className="pl-10 h-11 bg-background border-muted shadow-sm"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="h-12 w-12 text-primary animate-spin opacity-20" />
                    <p className="text-muted-foreground font-medium animate-pulse tracking-wide uppercase text-[10px]">Accessing Repository</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResources.map((resource) => (
                        <Card key={resource.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 bg-background/50 backdrop-blur-sm">
                            <CardContent className="p-0 flex h-full">
                                <div className="w-2 bg-primary/10 group-hover:bg-primary transition-colors h-full shrink-0" />
                                <div className="p-6 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="bg-secondary/50 text-[10px] font-bold uppercase tracking-wider">{resource.category}</Badge>
                                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground border-muted-foreground/20">{resource.ageGroup}</Badge>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                                                onClick={() => {
                                                    setCurrentResource(resource);
                                                    setIsDialogOpen(true);
                                                }}
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                onClick={() => handleDelete(resource.id)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{resource.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">{resource.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-muted/50">
                                        <div className="flex gap-1.5 overflow-hidden max-w-[70%]">
                                            {resource.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                                                    <Tag className="h-2.5 w-2.5" /> {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase opacity-40">RES-IDX-{resource.id}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* New Asset Quick Action */}
                    <button
                        onClick={() => {
                            setCurrentResource({});
                            setIsDialogOpen(true);
                        }}
                        className="group relative overflow-hidden h-[240px] rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all text-left p-8"
                    >
                        <div className="h-12 w-12 rounded-xl bg-muted/50 group-hover:bg-primary/20 flex items-center justify-center transition-colors mb-6">
                            <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-1">Add New Material</h4>
                            <p className="text-sm text-muted-foreground">Draft and publish a new guidance asset for the community database.</p>
                        </div>
                    </button>
                </div>
            )}

            <div className="pt-12 flex items-center justify-center gap-8 opacity-30 grayscale saturate-0 pointer-events-none">
                <BookOpen className="h-6 w-6" />
                <Search className="h-6 w-6" />
                <ExternalLink className="h-6 w-6" />
                <ChevronRight className="h-6 w-6" />
            </div>
        </div>
    );
}
