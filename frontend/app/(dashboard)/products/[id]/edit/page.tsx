"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Buat redirect abis update
import { ChevronLeft, UploadCloud, X, Plus, GripVertical, Save, Rocket, Loader2, Trash2 } from "lucide-react";

// FUNCTION DECLARATION
function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. UNWRAP PARAMS (Solusi warning 'params' & 'use')
  // Kita ambil ID dari URL, misal: /products/123 -> id = 123
  const { id } = use(params);

  // 2. INIT ROUTER (Solusi warning 'useRouter')
  const router = useRouter();

  // State Data
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [visibility, setVisibility] = useState("public");

  // FUNCTION EXPRESSION (Simulasi Fetch Data)
  const fetchDataFromLaravel = function () {
    console.log("Fetching data for Product ID:", id); // ID dipake disini buat log

    setTimeout(() => {
      // Data Mockup
      const mockData = {
        name: "Premium Health Shield",
        category: "Health Insurance",
        description: "Comprehensive health coverage for individuals including dental.",
        price: "500.000",
        features: ["No Co-payment required", "Global Coverage", "Free Medical Checkup"],
        isActive: true,
        visibility: "public",
      };

      setName(mockData.name);
      setCategory(mockData.category);
      setDescription(mockData.description);
      setPrice(mockData.price);
      setFeatures(mockData.features);
      setIsActive(mockData.isActive);
      setVisibility(mockData.visibility);

      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchDataFromLaravel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ARROW FUNCTION (Event Handlers)
  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleUpdate = () => {
    // Simulasi kirim data ke backend
    alert(`Data Produk ID: ${id} berhasil diupdate! (Simulasi)`);

    // 3. PENGGUNAAN ROUTER
    // Setelah update, redirect user kembali ke halaman list products
    router.push("/products");
  };

  const handlePriceChange = (val: string) => {
    const numberOnly = val.replace(/[^0-9]/g, "");
    setPrice(numberOnly);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          {/* 4. PENGGUNAAN LOADER2 (Solusi warning 'Loader2') */}
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-500 text-sm">Fetching product data #{id}...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/products" className="hover:text-blue-600 transition-colors">
                Products
              </Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="font-medium text-slate-900">{name}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
          </div>

          <button className="px-4 py-2 border border-red-200 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center gap-2 transition-colors">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="flex items-start gap-4 border-b pb-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Save className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
                  <p className="text-sm text-slate-500">Update the core details.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">Product Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">Type</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option>Health Insurance</option>
                    <option>Vehicle Insurance</option>
                    <option>Life Insurance</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
                </div>
              </div>
            </div>

            {/* Card 2: Pricing */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Base Price (Monthly)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">IDR</span>
                  <input type="text" value={price} onChange={(e) => handlePriceChange(e.target.value)} className="w-full pl-12 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>

            {/* Card 3: Features */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold text-slate-900">Key Features</h3>
                <button onClick={handleAddFeature} className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-slate-300" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...features];
                        newFeatures[index] = e.target.value;
                        setFeatures(newFeatures);
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={() => {
                        const newFeatures = features.filter((_, i) => i !== index);
                        setFeatures(newFeatures);
                      }}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (Sidebar) */}
          <div className="space-y-6">
            {/* Widget Image */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Product Image</h3>
              <div className="relative w-full h-40 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group">
                {/* Image dengan unoptimized agar tidak error config */}
                <Image src="https://placehold.co/600x400/3b82f6/white?text=Current+Image" alt="Current Product" fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <p className="text-white font-medium flex items-center gap-2">
                    <UploadCloud className="h-4 w-4" /> Change Image
                  </p>
                </div>
              </div>
            </div>

            {/* Widget Visibility */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <h3 className="font-bold text-slate-900">Visibility</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Active Status</p>
                  <p className="text-xs text-slate-500">{isActive ? "Product is live" : "Product is hidden"}</p>
                </div>
                <div onClick={() => setIsActive(!isActive)} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${isActive ? "bg-blue-600" : "bg-slate-300"}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isActive ? "right-1" : "left-1"}`}></div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Access Level</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setVisibility("public")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${visibility === "public" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    Public
                  </button>
                  <button
                    onClick={() => setVisibility("private")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border ${visibility === "private" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-slate-600 hover:bg-slate-50"}`}
                  >
                    Private
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Footer Action */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-white border-t shadow-lg flex items-center justify-end gap-3 z-10">
          <Link href="/products" className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </Link>
          <button onClick={handleUpdate} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2">
            {/* 5. PENGGUNAAN ROCKET (Solusi warning 'Rocket') */}
            <Rocket className="h-4 w-4" />
            Update Product
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProductPage;
