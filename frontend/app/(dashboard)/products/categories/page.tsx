"use client";

import React from "react";
import Link from "next/link";
import { HeartPulse, Car, Shield, Home, Briefcase, Plus, ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- 1. FUNCTION EXPRESSION (Data Dummy) ---
const getCategories = function () {
  return [
    {
      id: "CAT-001",
      name: "Health Insurance",
      count: "24 Products",
      icon: HeartPulse,
      color: "bg-teal-50 text-teal-600",
      desc: "Medical coverage & health care.",
    },
    {
      id: "CAT-002",
      name: "Vehicle Insurance",
      count: "18 Products",
      icon: Car,
      color: "bg-blue-50 text-blue-600",
      desc: "Protection for cars & bikes.",
    },
    {
      id: "CAT-003",
      name: "Life Insurance",
      count: "12 Products",
      icon: Shield,
      color: "bg-purple-50 text-purple-600",
      desc: "Term & whole life security.",
    },
    {
      id: "CAT-004",
      name: "Home Insurance",
      count: "8 Products",
      icon: Home,
      color: "bg-orange-50 text-orange-600",
      desc: "Property & fire protection.",
    },
    {
      id: "CAT-005",
      name: "Travel Insurance",
      count: "5 Products",
      icon: Briefcase,
      color: "bg-pink-50 text-pink-600",
      desc: "Flight delay & baggage loss.",
    },
  ];
};

function CategoriesGridPage() {
  const categories = getCategories();

  // --- 3. ARROW FUNCTION (Event Handler - Cuma contoh, krn kita pake Link) ---
  const handleNewCategory = () => {
    alert("Nanti arahin ke halaman Create Category ya!");
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Product Categories</h1>
            <p className="text-slate-500">Select a category to manage details.</p>
          </div>
          <Button onClick={handleNewCategory} className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* --- 4. CALLBACK / ANONYMOUS FUNCTION (Looping Map) --- */}
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} href={`/products/categories/${cat.id}`}>
                <div className="group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-1 mb-4 flex-1">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                    <p className="text-sm text-slate-500">{cat.desc}</p>
                  </div>

                  <div className="pt-4 border-t flex items-center justify-between">
                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{cat.count}</span>
                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CategoriesGridPage;
