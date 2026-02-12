<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with('category')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. VALIDASI INPUT DARI NEXT.JS
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'base_price' => 'required|numeric',
            'coverage_amount' => 'nullable|string', // String bebas
            'features' => 'nullable|array',         // Array fitur
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi file gambar
            'is_active' => 'boolean',
            'visibility' => 'in:public,private',    // Hanya boleh 'public' atau 'private'
        ]);

        // 2. HANDLE UPLOAD GAMBAR (Kalau user upload)
        if ($request->hasFile('image')) {
            // Upload ke folder 'public/products'
            $path = $request->file('image')->store('products', 'public');
            // Simpan path-nya ke array data (map ke kolom image_url database)
            $validated['image_url'] = '/storage/' . $path;
        }

        // Hapus key 'image' karena di database namanya 'image_url'
        unset($validated['image']);

        // 3. SIMPAN KE DATABASE
        $product = Product::create($validated);

        // 4. BALIKIN RESPONSE JSON
        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Product::with('category')->findOrFail($id);
        // return Product::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
