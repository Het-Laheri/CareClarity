'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Users,
    Stethoscope,
    Calendar,
    TrendingUp,
    Clock,
    CheckCircle2,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    Cell
} from "recharts";

const data = [
    { name: 'Mon', appointments: 12, users: 4 },
    { name: 'Tue', appointments: 19, users: 7 },
    { name: 'Wed', appointments: 15, users: 5 },
    { name: 'Thu', appointments: 22, users: 8 },
    { name: 'Fri', appointments: 30, users: 12 },
    { name: 'Sat', appointments: 25, users: 15 },
    { name: 'Sun', appointments: 18, users: 10 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

export default function AdminDashboard() {
    const stats = [
        { name: 'Total Users', value: '2,420', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'Active Specialists', value: '54', change: '+2', icon: Stethoscope, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        { name: 'This Week Booking', value: '184', change: '+24%', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { name: 'Growth Rate', value: '18.4%', change: '+4.3%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
                <p className="text-muted-foreground mt-1 text-lg">Real-time insights across the CareClarity platform.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                    <p className="text-xs font-medium text-emerald-500 mt-1 flex items-center gap-1">
                                        {stat.change} <span className="text-muted-foreground font-normal">vs last month</span>
                                    </p>
                                </div>
                                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <Card className="lg:col-span-2 shadow-md border-none">
                    <CardHeader>
                        <CardTitle>Usage Activity</CardTitle>
                        <CardDescription>Daily appointments and new user registrations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="appointments"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorApp)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity List */}
                <Card className="shadow-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Live Feed</CardTitle>
                            <CardDescription>Latest system triggers.</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="px-6 space-y-6 pb-6">
                            {[
                                { user: 'Sanket Patil', action: 'booked an appointment', time: '2 mins ago', icon: Clock },
                                { user: 'Dr. Priya Sharma', action: 'updated profile', time: '15 mins ago', icon: CheckCircle2 },
                                { user: 'New caregiver', action: 'joined from Delhi', time: '45 mins ago', icon: Users },
                                { user: 'Weekly Report', action: 'automated backup success', time: '1 hour ago', icon: TrendingUp },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                            <item.icon className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium leading-none">
                                            <span className="text-foreground">{item.user}</span>{' '}
                                            <span className="text-muted-foreground font-normal">{item.action}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-muted/30 border-t text-center">
                            <Button variant="link" size="sm" className="text-xs">View all system logs</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
