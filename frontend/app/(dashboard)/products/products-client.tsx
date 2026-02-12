"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Heart, CheckCircle2, Shield, Car, HeartPulse, Briefcase, Zap, Filter, LucideIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Interface Update: Sesuaikan dengan Data Real + Category Relationship
interface Product {
  id: number;
  name: string;
  description: string;
  base_price: string;
  coverage_amount: string;
  features: string[];
  image_url: string;
  // 👇 INI PENTING: Struktur Category dari Laravel
  category?: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
  // Properti UI Helper
  ui_type: string; // Pengganti 'type' lama
  ui_color: string;
  ui_icon: LucideIcon;
}

function ProductClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // 1. FETCH DATA DARI LARAVEL
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        if (!res.ok) throw new Error("Gagal ambil data");

        const data = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const enrichedData = data.map((item: any) => {
          // Ambil nama kategori dari relasi (Safety check pake ?.)
          const categoryName = item.category?.name || "Uncategorized";

          return {
            ...item,
            // Kita simpan nama kategori ke properti UI biar gampang difilter
            ui_type: categoryName,
            ui_icon: getIconByCategory(categoryName),
            ui_color: getColorByCategory(categoryName),
          };
        });

        setProducts(enrichedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 2. LOGIC FILTER
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      // Filter berdasarkan ui_type (Nama Kategori)
      const matchesCategory = activeCategory === "All" || product.ui_type.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  // HELPER: Mapping Icon (Sekarang nerima Nama Kategori)
  const getIconByCategory = (catName: string) => {
    if (!catName) return Zap; // Safety check
    if (catName.includes("Health")) return HeartPulse;
    if (catName.includes("Vehicle")) return Car;
    if (catName.includes("Life")) return Shield;
    if (catName.includes("Travel")) return Briefcase;
    if (catName.includes("Home")) return Shield; // Fallback icon buat Home
    return Zap;
  };

  // HELPER: Mapping Warna Card
  const getColorByCategory = (catName: string) => {
    if (!catName) return "bg-slate-600";
    if (catName.includes("Health")) return "bg-teal-600";
    if (catName.includes("Vehicle")) return "bg-emerald-600";
    if (catName.includes("Life")) return "bg-blue-600";
    if (catName.includes("Travel")) return "bg-pink-600";
    if (catName.includes("Home")) return "bg-orange-600";
    return "bg-indigo-600";
  };

  // Format Rupiah
  const formatRupiah = (angka: string) => {
    return new Intl.NumberFormat("id-ID").format(Number(angka));
  };

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Insurance Products</h1>
          <p className="text-slate-500">Manage and view all available insurance plans.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/products/create">
            <Button className="bg-blue-600 hover:bg-blue-700">+ Add Product</Button>
          </Link>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search products..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Health">Health</TabsTrigger>
            <TabsTrigger value="Vehicle">Vehicle</TabsTrigger>
            <TabsTrigger value="Life">Life</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* PRODUCT GRID */}
      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const Icon = product.ui_icon;

            return (
              <Card key={product.id} className="overflow-hidden border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md flex flex-col h-full">
                {/* 1. CARD HEADER */}
                <div className={`relative h-40 ${product.ui_color} p-6`}>
                  <Badge className="absolute left-4 top-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">{product.ui_type}</Badge>

                  {/* Tombol Love (Optional) */}
                  <button className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white hover:text-red-500 transition-colors backdrop-blur-sm">
                    <Heart className="h-4 w-4" />
                  </button>

                  <div className="flex h-full items-center justify-center">
                    <Icon className="h-20 w-20 text-white opacity-90" strokeWidth={1.5} />
                  </div>
                </div>

                {/* 2. CARD CONTENT */}
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                  <p className="line-clamp-2 text-sm text-slate-500 min-h-10">{product.description}</p>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">Key Features</p>
                    <ul className="space-y-2">
                      {product.features?.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end justify-between border-t pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Coverage</p>
                      <p className="font-semibold text-slate-900 text-sm">{product.coverage_amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Monthly</p>
                      <p className="text-lg font-bold text-blue-600">Rp {formatRupiah(product.base_price)}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Link href={`/products/${product.id}`} className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
          <p className="text-slate-500">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default ProductClient;
