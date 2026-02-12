"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Save,
  Trash2,
  HeartPulse,
  Car,
  Shield,
  Home,
  Briefcase,
  Smartphone, // ✅ Dipake di Icon Picker
  MoreVertical, // ✅ Dipake di Header Actions
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// --- 1. FUNCTION EXPRESSION (Data Dummy per ID) ---
// Simulasi ambil data detail dari API berdasarkan ID
const getCategoryDetail = function (id: string) {
  // Ceritanya kita fetch dari DB, ini data mock-nya
  return {
    id: id,
    name: "Health Insurance",
    slug: "health-insurance",
    description: "Comprehensive medical coverage including hospitalization and critical care.",
    icon: HeartPulse,
    colorHex: "#0D9488", // Teal color
    status: "Active",
  };
};

// Function Declaration Component
function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = getCategoryDetail(id); // Ambil data dummy

  // State Form
  const [name, setName] = useState(data.name);
  const [desc, setDesc] = useState(data.description);
  const [selectedIcon, setSelectedIcon] = useState("HeartPulse");
  const [selectedColor, setSelectedColor] = useState("Teal");

  // --- 3. ARROW FUNCTION (Handle Save) ---
  const handleSave = () => {
    alert(`Menyimpan Kategori: ${name} \nWarnanya: ${selectedColor}`);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        {/* Header Navigasi */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/products/categories" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Back to Categories
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Categories Details</h1>
            <p className="text-slate-500">Manage details for {data.name}</p>
          </div>
          <div className="flex gap-2">
            {/* 👇 MoreVertical dipake disini sebagai tombol Menu Lainnya */}
            <Button variant="outline" size="icon" className="text-slate-500 border-slate-200 hover:bg-slate-50">
              <MoreVertical className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="text-red-600 border-red-100 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl border shadow-sm p-8 space-y-8">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Slug URL</label>
              <Input value={data.slug} disabled className="bg-slate-50 text-slate-500" />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-24" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Appearance (Visuals) */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-slate-900">Appearance</h3>

            {/* Icon Picker (Simulasi) */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Category Icon</label>
              <div className="flex gap-3 flex-wrap">
                {/* --- 4. CALLBACK FUNCTION (Map Icon List) --- */}
                {[
                  { name: "HeartPulse", Icon: HeartPulse },
                  { name: "Car", Icon: Car },
                  { name: "Shield", Icon: Shield },
                  { name: "Home", Icon: Home },
                  { name: "Briefcase", Icon: Briefcase },
                  { name: "Smartphone", Icon: Smartphone }, // ✅ Smartphone dipake disini (Gadget Insurance)
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setSelectedIcon(item.name)}
                    className={`h-12 w-12 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${
                      selectedIcon === item.name ? "bg-blue-50 border-blue-500 text-blue-600 ring-2 ring-blue-200" : "hover:bg-slate-50 border-slate-200 text-slate-500"
                    }`}
                  >
                    <item.Icon className="h-6 w-6" />
                  </div>
                ))}
              </div>
            </div>

            {/* Color Picker (Simulasi) */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Accent Color</label>
              <div className="flex gap-3">
                {[
                  { name: "Teal", class: "bg-teal-500" },
                  { name: "Blue", class: "bg-blue-500" },
                  { name: "Purple", class: "bg-purple-500" },
                  { name: "Orange", class: "bg-orange-500" },
                  { name: "Pink", class: "bg-pink-500" },
                ].map((color) => (
                  <div
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-10 w-10 rounded-full cursor-pointer flex items-center justify-center transition-all ${color.class} ${selectedColor === color.name ? "ring-4 ring-offset-2 ring-slate-200 scale-110" : "hover:scale-105"}`}
                  >
                    {selectedColor === color.name && <div className="h-2 w-2 bg-white rounded-full"></div>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">This color will be used for badges and icons.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryDetailPage;
