<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Claim;
use App\Models\Policy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClaimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil klaim dari polis milik user ini
        return Claim::whereHas('policy', function ($query) {
            $query->where('user_id', Auth::id());
        })
            ->with('policy.product')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'policy_id' => 'required|exists:policies,id',
            'claim_reason' => 'required|string',
            'description' => 'required|string',
            'claim_amount' => 'required|numeric',
            'incident_date' => 'required|date',
            'evidence' => 'required|file|mimes:jpg,png,pdf|max:2048',
        ]);

        // Security Check
        $policy = Policy::where('user_id', Auth::id())->findOrFail($request->policy_id);

        // Upload File
        $path = null;
        if ($request->hasFile('evidence')) {
            $path = $request->file('evidence')->store('claims', 'public');
        }

        // Simpan Klaim
        $claim = Claim::create([
            'policy_id' => $policy->id,
            'claim_reason' => $request->claim_reason,
            'description' => $request->description,
            'incident_date' => $request->incident_date,
            'claim_amount' => $request->claim_amount,
            'evidence_file' => $path,
            'status' => 'pending',
            'bank_name' => $request->bank_name,
            'account_number' => $request->account_number,
        ]);

        return response()->json([
            'message' => 'Klaim berhasil diajukan! Mohon tunggu review admin.',
            'claim' => $claim
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
