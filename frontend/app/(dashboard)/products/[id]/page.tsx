"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Pencil, Share2, Printer, Download, Shield, Activity, Zap, CheckCircle2, TrendingUp, TrendingDown, DollarSign, Users, Loader2 } from "lucide-react";

// Definisikan Tipe Data dari API (Updated sesuai Relasi Kategori)
interface ProductData {
  id: number;
  name: string;
  description: string;
  base_price: string;
  coverage_amount: string;
  features: string[];
  // 👇 Ganti 'type' string jadi Object Category
  category?: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
  loss_ratio?: number;
  renewal_rate?: number;
  monthly_revenue?: number;
  plan_code?: string;
}

// FUNCTION DECLARATION
function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Ambil ID dari URL
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. FETCH DATA REAL DARI LARAVEL
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();

        // Tambahin data dummy statistik
        const enrichedData = {
          ...data,
          loss_ratio: 58.4, // Mockup
          renewal_rate: 94.2, // Mockup
          monthly_revenue: Number(data.base_price) * 100, // Mockup hitungan kasar
          plan_code: `PLN-2026-${data.id}X`,
        };

        setProduct(enrichedData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Helper Format Uang
  const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const handleEdit = () => {
    router.push(`/products/${id}/edit`);
  };

  // Helper Ambil Nama Kategori dengan Aman
  const getCategoryName = () => {
    return product?.category?.name || "Uncategorized";
  };

  // 3. LOADING STATE
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // 4. NOT FOUND STATE
  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Products
            </Link>
            <ChevronLeft className="h-4 w-4" />
            <span className="font-medium text-slate-900">{product.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-slate-500">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border rounded-lg text-slate-600 hover:bg-slate-50 shadow-sm">
            <Share2 className="h-5 w-5" />
          </button>
          <button onClick={handleEdit} className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 shadow-sm flex items-center gap-2 transition-all">
            <Pencil className="h-4 w-4" />
            Edit Product
          </button>
        </div>
      </div>

      {/* KPI CARDS (Data Mockup + Real Price) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Loss Ratio</p>
            <h3 className="text-2xl font-bold text-slate-900">{product.loss_ratio}%</h3>
            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3" /> -2.1% vs last month
            </p>
          </div>
          <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Renewal Rate</p>
            <h3 className="text-2xl font-bold text-slate-900">{product.renewal_rate}%</h3>
            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +5.4% vs last year
            </p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Est. Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(product.monthly_revenue || 0)}</h3>
            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +12.8% vs last month
            </p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI (Plan Overview) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {/* 👇 FIX ERROR DISINI: Pake getCategoryName() biar aman */}
            <div className={`h-32 relative p-6 ${getCategoryName().includes("Health") ? "bg-linear--to-r from-teal-500 to-emerald-500" : "bg-linear-to-r from-blue-500 to-indigo-500"}`}>
              <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">ACTIVE</span>
              <div className="absolute bottom-4 left-6 text-white">
                <Shield className="h-8 w-8 mb-2 opacity-80" />
                {/* Tampilkan Nama Kategori */}
                <h2 className="font-bold text-lg">{getCategoryName()}</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Plan Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-dashed">
                    <span className="text-sm text-slate-500">Plan Code</span>
                    <span className="text-sm font-medium text-slate-900">{product.plan_code}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-dashed">
                    <span className="text-sm text-slate-500">Base Premium</span>
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(product.base_price)}
                      <span className="text-slate-400 font-normal text-xs">/mo</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-dashed">
                    <span className="text-sm text-slate-500">Max Coverage</span>
                    <span className="text-sm font-bold text-emerald-600">{product.coverage_amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (Benefits & Features) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border h-fit">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-lg text-slate-900">Benefits & Features</h3>
            </div>

            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors" title="Print Details">
                <Printer className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors" title="Download PDF">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Loop Features dari Array String DB */}
            {product.features && product.features.length > 0 ? (
              product.features.map((featureText, index) => (
                <div key={index} className="flex gap-5 group">
                  <div className="shrink-0 mt-1">
                    <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="space-y-1 pb-4 border-b border-dashed w-full last:border-0 last:pb-0">
                    <h4 className="font-bold text-slate-900 text-base">{featureText}</h4>
                    <p className="text-sm text-slate-500">Included in the main plan package.</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No specific features listed.</p>
            )}
          </div>

          <div className="bg-blue-50 p-6 border-t flex items-center gap-4">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Internal Note</h4>
              <p className="text-xs text-slate-600 mt-1">Data synced from Live Database. ID: #{product.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
