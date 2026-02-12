"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, UploadCloud, X, Plus, GripVertical, Save, Rocket } from "lucide-react";

// 1. FUNCTION DECLARATION
function CreateProductPage() {
  // State Management
  const [features, setFeatures] = useState<string[]>(["No Co-payment required", "Global Coverage including US"]);
  const [price, setPrice] = useState("");

  // 2. FUNCTION EXPRESSION
  // Ciri: Fungsi disimpan ke dalam variabel (const/let).
  // Gak kena hoisting (harus didefinisikan dulu baru bisa dipake).
  const formatCurrency = function (value: string) {
    // Hapus karakter selain angka
    const numberString = value.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  };

  // 3. ARROW FUNCTION
  // Ciri: Pake tanda '=>'. Lebih ringkas, modern, dan behavior 'this'-nya beda.
  // Paling sering dipake di React modern buat event handler.
  const handleAddFeature = () => {
    setFeatures([...features, ""]); // Nambah string kosong baru
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

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
              <span className="font-medium text-slate-900">Add New Product</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create Product</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI (MAIN CONTENT) - Span 2 Kolom */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="flex items-start gap-4 border-b pb-4">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Save className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
                  <p className="text-sm text-slate-500">Define the core details of your insurance product.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" placeholder="e.g. Premium Health Shield" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white">
                    <option>Health Insurance</option>
                    <option>Vehicle Insurance</option>
                    <option>Life Insurance</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea rows={4} placeholder="Describe the coverage benefits..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"></textarea>
                  <p className="text-xs text-right text-slate-400">0/1000 characters</p>
                </div>
              </div>
            </div>

            {/* Card 2: Pricing */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="flex items-start gap-4 border-b pb-4">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <span className="font-bold">$</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Pricing & Coverage</h3>
                  <p className="text-sm text-slate-500">Set the financial parameters for the plan.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">
                    Base Price (Monthly) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">IDR</span>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(formatCurrency(e.target.value))}
                      placeholder="0"
                      className="w-full pl-12 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-medium text-slate-700">Coverage Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🛡️</span>
                    <input type="text" placeholder="e.g. Up to 500 Million" className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Key Features (Dynamic List) */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Key Features</h3>
                    <p className="text-sm text-slate-500">Highlight unique selling points.</p>
                  </div>
                </div>
                <button onClick={handleAddFeature} className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Feature
                </button>
              </div>

              <div className="space-y-3">
                {/* --- 4. CALLBACK FUNCTION (Fungsi Panggilan Balik / Anonymous) --- */}
                {/* Ciri: Fungsi tanpa nama yang langsung dipake di dalam method lain kayak .map() */}
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <GripVertical className="h-5 w-5 text-slate-300 cursor-move" />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter feature text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-lg"></div>
                    </div>
                    <button onClick={() => handleRemoveFeature(index)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}

                {features.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg bg-slate-50">
                    <p className="text-slate-500 text-sm">No features added yet.</p>
                    <button onClick={handleAddFeature} className="text-blue-600 font-medium text-sm mt-1">
                      Add your first feature
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (SIDEBAR WIDGET) - Span 1 Kolom */}
          <div className="space-y-6">
            {/* Widget 1: Product Image */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Product Image</h3>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              {/* Mock Uploaded File */}
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
                <div className="h-10 w-10 bg-blue-200 rounded flex items-center justify-center text-xs font-bold text-blue-700">IMG</div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">banner_health_v2.jpg</p>
                  <p className="text-xs text-slate-500">2.4 MB • 100% Uploaded</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Widget 2: Publishing */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <h3 className="font-bold text-slate-900">Publishing</h3>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Active Status</p>
                  <p className="text-xs text-slate-500">Product will be visible to all.</p>
                </div>
                {/* Toggle Switch Mock */}
                <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Visibility</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">Public</button>
                  <button className="px-4 py-2 bg-white text-slate-600 text-sm font-medium rounded-lg border hover:bg-slate-50">Private</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Footer Action */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-white border-t shadow-lg flex items-center justify-between z-10">
          <p className="text-sm text-slate-500 hidden md:block">Unsaved changes</p>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Discard</button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-blue-500/30 shadow-lg flex items-center justify-center gap-2">
              <Rocket className="h-4 w-4" />
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProductPage;
