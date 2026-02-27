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
import {
    Calendar,
    Clock,
    User,
    Stethoscope,
    Search,
    Trash2,
    CheckCircle2,
    XCircle,
    Loader2,
    Filter,
    ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Appointment {
    id: string;
    doctorId: string;
    doctorName: string;
    userId: string;
    userName: string;
    userEmail: string;
    date: string;
    timeSlot: string;
    status: 'confirmed' | 'cancelled';
    createdAt: string;
}

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/appointments');
            const data = await res.json();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load appointment records.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Permanently remove this appointment record?')) return;

        try {
            const res = await fetch(`/api/admin/appointments?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setAppointments(appointments.filter(a => a.id !== id));
                toast({ title: "Removed", description: "Record deleted from system." });
            }
        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Operation failed." });
        }
    };

    const filteredAppointments = appointments.filter(a =>
        a.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Bookings</h1>
                    <p className="text-muted-foreground mt-1 text-lg">Central control for all scheduled consultations.</p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={fetchAppointments}>
                        Refresh Data
                    </Button>
                    <Button variant="default" size="sm">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-primary/5 border-none">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-2" />
                        <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'confirmed').length}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Active</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-none">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <XCircle className="h-5 w-5 text-destructive mb-2" />
                        <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'cancelled').length}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Cancelled</p>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 bg-primary/5 border-none">
                    <CardContent className="p-4 h-full flex flex-col justify-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Find by patient or doctor name..."
                                className="pl-10 h-10 bg-background border-muted shadow-none"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-md overflow-hidden">
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="h-10 w-10 text-primary animate-spin" />
                            <p className="text-muted-foreground font-medium">Accessing appointment ledger...</p>
                        </div>
                    ) : filteredAppointments.length === 0 ? (
                        <div className="py-20 text-center">
                            <Calendar className="h-12 w-12 text-muted/30 mx-auto mb-4" />
                            <p className="text-lg font-medium text-muted-foreground">No bookings found</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your search criteria.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-secondary/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Patient Details</th>
                                        <th className="px-6 py-4">Consultant</th>
                                        <th className="px-6 py-4">Schedule</th>
                                        <th className="px-6 py-4 text-right">Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredAppointments.map((appt) => (
                                        <tr key={appt.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <Badge variant={appt.status === 'confirmed' ? 'default' : 'secondary'} className={appt.status === 'confirmed' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}>
                                                    {appt.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                        {appt.userName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">{appt.userName}</p>
                                                        <p className="text-[10px] text-muted-foreground">{appt.userEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="h-4 w-4 text-primary" />
                                                    <p className="text-sm font-medium">{appt.doctorName}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                        {new Date(appt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {appt.timeSlot}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleDelete(appt.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <p className="text-center text-[11px] text-muted-foreground pb-8">
                CareClarity System Log • Version 2.4.0 • Node: IN-WEST-1
            </p>
        </div>
    );
}
