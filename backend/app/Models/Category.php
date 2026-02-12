<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories_product';

    protected $fillable = ['name', 'slug', 'description', 'icon', 'color', 'is_active'];

    // Relasi: Satu Kategori punya Banyak Produk
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
