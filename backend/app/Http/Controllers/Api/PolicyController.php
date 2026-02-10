<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Policy;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Policy::with('product') // Eager load produknya biar frontend gak loading 2x
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi Input
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'period' => 'required|in:monthly,yearly', // Pilihan user
        ]);

        $product = Product::findOrFail($request->product_id);

        // Hitung Tanggal (Logic Bisnis)
        $startDate = Carbon::now();
        $endDate = $request->period === 'yearly'
            ? $startDate->copy()->addYear()
            : $startDate->copy()->addMonth();

        // Simpan ke Database
        $policy = Policy::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'policy_number' => 'POL-' . strtoupper(uniqid()),
            'status' => 'active',
            'coverage_amount' => $product->coverage_amount,
            'premium_amount' => $product->base_price,
            'payment_frequency' => $request->period,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'beneficiaries' => $request->beneficiaries,
        ]);

        return response()->json([
            'message' => 'Polis berhasil dibeli!',
            'policy' => $policy
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $policy = Policy::with(['product', 'claims'])
            ->where('user_id', Auth::id()) // Pastikan user cuma bisa lihat punya sendiri
            ->findOrFail($id);

        return $policy;
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
