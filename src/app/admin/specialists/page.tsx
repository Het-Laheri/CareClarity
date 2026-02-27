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
    MapPin,
    Video,
    MoreVertical,
    Loader2,
    CheckCircle,
    XCircle,
    Stethoscope
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
    id: string;
    name: string;
    specialization: string;
    location: string;
    online: boolean;
    imageId: string;
    bio: string;
}

export default function AdminSpecialists() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState<Partial<Doctor>>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/doctors');
            const data = await res.json();
            setDoctors(data);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load specialists list.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this specialist?')) return;

        try {
            const res = await fetch(`/api/doctors?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setDoctors(doctors.filter(d => d.id !== id));
                toast({ title: "Deleted", description: "Specialist removed successfully." });
            }
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Could not delete specialist." });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEditing = !!currentDoctor.id;
        const url = '/api/doctors';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentDoctor),
            });

            if (res.ok) {
                await fetchDoctors();
                setIsDialogOpen(false);
                setCurrentDoctor({});
                toast({
                    title: isEditing ? "Updated" : "Created",
                    description: `Specialist ${isEditing ? 'updated' : 'added'} successfully.`
                });
            }
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Save operation failed." });
        }
    };

    const filteredDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Specialists Directory</h1>
                    <p className="text-muted-foreground mt-1">Manage our network of professionals across India.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setCurrentDoctor({})} className="shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" /> Add Specialist
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>{currentDoctor.id ? 'Edit' : 'New'} Specialist</DialogTitle>
                                <DialogDescription>
                                    Enter clinical details for the new network specialist.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Name</Label>
                                    <Input
                                        id="name"
                                        value={currentDoctor.name || ''}
                                        onChange={e => setCurrentDoctor({ ...currentDoctor, name: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="spec" className="text-right">Specialization</Label>
                                    <Input
                                        id="spec"
                                        value={currentDoctor.specialization || ''}
                                        onChange={e => setCurrentDoctor({ ...currentDoctor, specialization: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="loc" className="text-right">Location</Label>
                                    <Input
                                        id="loc"
                                        value={currentDoctor.location || ''}
                                        onChange={e => setCurrentDoctor({ ...currentDoctor, location: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="bio" className="text-right">Professional Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={currentDoctor.bio || ''}
                                        onChange={e => setCurrentDoctor({ ...currentDoctor, bio: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 justify-end">
                                    <Switch
                                        id="online-mode"
                                        checked={currentDoctor.online || false}
                                        onCheckedChange={checked => setCurrentDoctor({ ...currentDoctor, online: checked })}
                                    />
                                    <Label htmlFor="online-mode">Offers Online Consultation</Label>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Specialist</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search & Filters */}
            <Card className="border-none shadow-sm">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, specialization, or hospital..."
                            className="pl-10 h-11 bg-secondary/20 border-none shadow-none text-base"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Content Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-muted-foreground font-medium">Synchronizing medical records...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor) => (
                        <Card key={doctor.id} className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="h-8 w-8 rounded-full shadow-md"
                                        onClick={() => {
                                            setCurrentDoctor(doctor);
                                            setIsDialogOpen(true);
                                        }}
                                    >
                                        <Edit2 className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8 rounded-full shadow-md"
                                        onClick={() => handleDelete(doctor.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-0">
                                <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-background p-6">
                                    <div className="h-20 w-20 rounded-2xl bg-background shadow-md flex items-center justify-center border-2 border-white">
                                        <Stethoscope className="h-10 w-10 text-primary/40" />
                                    </div>
                                </div>
                                <div className="-mt-8 px-6 pb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${doctor.online ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {doctor.online ? 'Global' : 'In-Person Only'}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground font-mono">ID: {doctor.id}</span>
                                    </div>
                                    <h3 className="text-xl font-bold leading-tight">{doctor.name}</h3>
                                    <p className="text-primary font-semibold text-sm mt-1">{doctor.specialization}</p>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                                            <MapPin className="h-3.5 w-3.5" /> {doctor.location}
                                        </div>
                                        {doctor.online && (
                                            <div className="flex items-center text-xs text-emerald-600 gap-2 font-medium">
                                                <Video className="h-3.5 w-3.5" /> Tele-health enabled
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t">
                                        <p className="text-xs text-muted-foreground line-clamp-2 italic italic">
                                            "{doctor.bio || 'No professional biography provided yet.'}"
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add New Ghost Card */}
                    <button
                        onClick={() => {
                            setCurrentDoctor({});
                            setIsDialogOpen(true);
                        }}
                        className="group h-[320px] rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary"
                    >
                        <div className="h-14 w-14 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                            <Plus className="h-6 w-6" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold">Add New Professional</p>
                            <p className="text-xs">Expand your care network</p>
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}
