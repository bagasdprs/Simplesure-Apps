<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Claim extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_id',
        'claim_reason',
        'description',
        'incident_date',
        'claim_amount',
        'approved_amount',
        'status',
        'rejection_reason',
        'evidence_file',
        'bank_name',
        'account_number',
        'account_holder',
    ];

    protected $casts = [
        'incident_date' => 'date',
        'claim_amount' => 'decimal:2',
        'approved_amount' => 'decimal:2',
    ];

    // Relasi Balik ke Policy
    public function policy()
    {
        return $this->belongsTo(Policy::class);
    }
}
