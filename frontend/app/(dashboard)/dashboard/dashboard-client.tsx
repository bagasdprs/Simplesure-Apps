"use client";

import React, { useEffect } from "react";
import { ShieldCheck, Wallet, FileText, AlertTriangle, TrendingUp, MoreHorizontal, LucideIcon, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// --- DATA DUMMY ---
const chartData = [
  { name: "Jan", total: 1500000 },
  { name: "Feb", total: 2300000 },
  { name: "Mar", total: 1000000 },
  { name: "Apr", total: 4500000 },
  { name: "May", total: 1200000 },
  { name: "Jun", total: 1800000 },
];

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  trend: string;
}

function DashboardClient() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div className="space-y-6">
      {/* 1. HEADER TEXT BARU (Di luar banner) */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, Bagas! 👋</h1>
        <p className="text-slate-500">Here is what is happening with your insurance portfolio today.</p>
      </div>

      {/* 2. HERO BANNER BARU (Gaya Referensi) */}
      <div className="relative overflow-hidden rounded-xl bg-blue-600 p-8 text-white shadow-lg">
        {/* Background Graphic (Shield samar-samar di kanan) */}
        <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/4 opacity-10 pointer-events-none">
          <ShieldCheck className="h-full w-full" style={{ strokeWidth: 0.5 }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          {/* Kiri: Main Stats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-100">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Total Protected Lives</span>
            </div>
            {/* Angka Besar */}
            <h2 className="text-5xl font-bold tracking-tight">1,248,392</h2>
            {/* Badge Trend */}
            <div className="inline-flex items-center rounded-full bg-blue-500/50 px-3 py-1 text-sm font-medium text-blue-50">
              <TrendingUp className="mr-1 h-4 w-4" /> +12.5% vs last month
            </div>
          </div>

          {/* Kanan: Secondary Stats (Dipisah garis tipis) */}
          <div className="flex items-center gap-8 border-l border-blue-500/30 pl-8">
            <div>
              <p className="text-sm text-blue-100">Active Policies</p>
              <p className="text-2xl font-bold">892k</p>
            </div>
            <div>
              <p className="text-sm text-blue-100">Claims Settled</p>
              <p className="text-2xl font-bold">98.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STATS CARDS KECIL */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Policies" value="2" icon={ShieldCheck} color="text-blue-600" bg="bg-blue-100" trend="+1 New" />
        <StatCard title="Total Coverage" value="IDR 350jt" icon={Wallet} color="text-emerald-600" bg="bg-emerald-100" trend="Secured" />
        <StatCard title="Active Claims" value="1" icon={AlertTriangle} color="text-amber-600" bg="bg-amber-100" trend="Needs Action" />
        <StatCard title="Monthly Premium" value="IDR 1.25jt" icon={FileText} color="text-purple-600" bg="bg-purple-100" trend="Auto-debit" />
      </div>

      {/* 4. CHART & RECENT ACTIVITY */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Your premium payments & claim history (Last 6 months)</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp ${value / 1000000}jt`} />
                  <Tooltip cursor={{ fill: "#F1F5F9" }} />
                  <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <span className="flex h-2 w-2 translate-y-2 rounded-full bg-green-500 ring-4 ring-green-100" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Claim Approved</p>
                  <p className="text-xs text-muted-foreground">Your claim #CLM-001 has been approved.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-2 w-2 translate-y-2 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New Policy Purchased</p>
                  <p className="text-xs text-muted-foreground">Vehicle Insurance added.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. QUICK ACCESS */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Your currently active insurance products</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Mobil Aman Jaya</p>
                <p className="text-sm text-slate-500">Vehicle Insurance • Expires Dec 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Active</Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- KOMPONEN KECIL (HELPER) ---
function StatCard({ title, value, icon: Icon, color, bg, trend }: StatCardProps) {
  return (
    <Card className="border-none shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg} ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className={`flex items-center text-xs font-medium ${color} bg-white px-2 py-1 rounded-full border`}>{trend}</span>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardClient;
