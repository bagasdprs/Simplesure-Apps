<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Mass Assignment Protection
    protected $fillable = [
        'name',
        'type',
        'description',
        'base_price',
        'coverage_amount',
        'image_url',
        'features',
        'is_active',
    ];

    // Casting
    protected $casts = [
        'base_price' => 'decimal:2',
        'coverage_amount' => 'decimal:2',
        'features' => 'array',
        'is_active' => 'boolean',
    ];

    // 3. Relasi
    public function policies()
    {
        return $this->hasMany(Policy::class);
    }
}
