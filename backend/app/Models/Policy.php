<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;
use App\Models\Claim;

class Policy extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'policy_number',
        'status',
        'coverage_amount',
        'premium_amount',
        'payment_frequency',
        'start_date',
        'end_date',
        'next_due_date',
        'beneficiaries',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'next_due_date' => 'date',
        'beneficiaries' => 'array', // JSON to Array
        'coverage_amount' => 'decimal:2',
        'premium_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Relasi ke Claims
    public function claims()
    {
        return $this->hasMany(Claim::class);
    }
}
