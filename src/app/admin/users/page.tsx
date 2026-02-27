'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users as UsersIcon, Shield, Search, MoreVertical, Mail, UserPlus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminUsers() {
    const users = [
        { id: '1', name: 'Sanket Patil', email: 'sanket.p@example.com', role: 'Caregiver', status: 'Active', joined: 'Oct 24, 2023' },
        { id: '2', name: 'Admin User', email: 'admin@careclarity.app', role: 'Admin', status: 'Active', joined: 'Sep 10, 2023' },
        { id: '3', name: 'Meera Iyer', email: 'meera.iyer@example.com', role: 'Caregiver', status: 'Pending', joined: 'Nov 02, 2023' },
        { id: '4', name: 'Rahul Khanna', email: 'rahul.k@example.com', role: 'Specialist', status: 'Active', joined: 'Oct 15, 2023' },
        { id: '5', name: 'Priya Verma', email: 'priya.v@example.com', role: 'Caregiver', status: 'Inactive', joined: 'Aug 20, 2023' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground mt-1">Control access levels and verify new platform members.</p>
                </div>
                <Button variant="default" className="shadow-lg shadow-primary/20">
                    <UserPlus className="mr-2 h-4 w-4" /> Invite User
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-blue-500/5">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-blue-600 font-semibold uppercase tracking-wider text-[10px]">Total Accounts</CardDescription>
                        <CardTitle className="text-3xl font-bold">4,128</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                            <ArrowUpRight className="h-3 w-3" /> 8.4% growth
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-indigo-500/5">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-indigo-600 font-semibold uppercase tracking-wider text-[10px]">Verified Specialists</CardDescription>
                        <CardTitle className="text-3xl font-bold">54</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-[10px] text-indigo-400 font-bold">
                            Awaiting verification: 12
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-purple-500/5">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-purple-600 font-semibold uppercase tracking-wider text-[10px]">Security Alerts</CardDescription>
                        <CardTitle className="text-3xl font-bold">0</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                            System fully operational
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="border-b bg-muted/10">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search users by name, email or role..." className="pl-10 bg-background border-none shadow-none focus-visible:ring-1" />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/30 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b">
                                    <th className="px-6 py-4">Identity</th>
                                    <th className="px-6 py-4">Role / Access</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-xs border border-primary/10">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{user.name}</p>
                                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                        <Mail className="h-2.5 w-2.5" /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.role === 'Admin' ? (
                                                    <Shield className="h-3.5 w-3.5 text-indigo-500" />
                                                ) : (
                                                    <UsersIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                                )}
                                                <span className="text-xs font-semibold">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className={`text-[10px] font-bold capitalize border-none ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' :
                                                    user.status === 'Pending' ? 'bg-orange-500/10 text-orange-600' :
                                                        'bg-slate-500/10 text-slate-600'
                                                }`}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-[11px] text-muted-foreground font-medium">
                                            {user.joined}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
