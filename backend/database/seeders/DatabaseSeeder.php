<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Policy;
use App\Models\Claim;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. BUAT USER (Admin & Bagas)
        // ---------------------------------------------
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@simplesure.com',
            'password' => Hash::make('123456789'),
            'role' => 'admin',
        ]);

        $user = User::create([
            'name' => 'Bagas Morgan',
            'email' => 'bagas@simplesure.com',
            'password' => Hash::make('123456789'),
            'role' => 'user',
        ]);

        // 2. BUAT CATEGORIES (Sesuai Desain UI Dashboard)
        // ---------------------------------------------
        $catHealth = Category::create([
            'name' => 'Health Insurance',
            'slug' => 'health-insurance',
            'description' => 'Covers medical expenses due to illnesses, injuries, and other health conditions.',
            'icon' => 'HeartPulse', // Nama icon di Lucide React
            'color' => 'bg-teal-50 text-teal-600', // Class Tailwind biar langsung cantik
            'is_active' => true,
        ]);

        $catVehicle = Category::create([
            'name' => 'Vehicle Insurance',
            'slug' => 'vehicle-insurance',
            'description' => 'Protection for cars, motorcycles, and commercial vehicles against accidents.',
            'icon' => 'Car',
            'color' => 'bg-blue-50 text-blue-600',
            'is_active' => true,
        ]);

        $catLife = Category::create([
            'name' => 'Life Insurance',
            'slug' => 'life-insurance',
            'description' => 'Term and whole life policies providing financial security.',
            'icon' => 'Shield',
            'color' => 'bg-purple-50 text-purple-600',
            'is_active' => true,
        ]);

        $catTravel = Category::create([
            'name' => 'Travel Insurance',
            'slug' => 'travel-insurance',
            'description' => 'Insurance for trip cancellation, medical expenses, and lost luggage.',
            'icon' => 'Briefcase',
            'color' => 'bg-pink-50 text-pink-600',
            'is_active' => true,
        ]);

        $catHome = Category::create([
            'name' => 'Home Insurance',
            'slug' => 'home-insurance',
            'description' => 'Coverage for property damage and personal belongings.',
            'icon' => 'Home',
            'color' => 'bg-orange-50 text-orange-600',
            'is_active' => true,
        ]);

        // 3. BUAT PRODUCT (Relasi ke Category ID)
        // ---------------------------------------------
        $prod1 = Product::create([
            'category_id' => $catHealth->id, // ✅ RELASI KE ID KATEGORI
            'name' => 'Premium Health Shield',
            // 'type' => 'Health', // Kolom ini udah ga dipake/opsional
            'description' => 'Comprehensive health coverage for individuals including dental and vision care.',
            'base_price' => 129000,
            'coverage_amount' => 'Up to 500 Million',
            'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=60',
            'features' => ['No Co-payment required', 'Global Coverage', 'Annual Health Checkup'],
            'is_active' => true,
            'visibility' => 'public',
        ]);

        $prod2 = Product::create([
            'category_id' => $catVehicle->id, // ✅ RELASI KE ID KATEGORI
            'name' => 'Auto Safe Pro',
            'description' => 'Complete protection against accidents, theft, and natural disasters.',
            'base_price' => 45000,
            'coverage_amount' => 'Market Value',
            'image_url' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=60',
            'features' => ['24/7 Roadside Assist', 'Zero Depreciation', 'Engine Protection'],
            'is_active' => true,
            'visibility' => 'public',
        ]);

        // Produk 3 (Life)
        $prod3 = Product::create([
            'category_id' => $catLife->id,
            'name' => 'Lifetime Secure',
            'description' => 'Ensure your familys financial future with our comprehensive term life.',
            'base_price' => 89000,
            'coverage_amount' => 'IDR 1 Billion',
            'image_url' => 'https://images.unsplash.com/photo-1518644730709-0835105d9daa?auto=format&fit=crop&w=500&q=60',
            'features' => ['Terminal Illness Benefit', 'Fixed Premiums', 'Tax Benefits'],
            'is_active' => true,
            'visibility' => 'public',
        ]);

        // 4. BUAT POLICY
        // ---------------------------------------------
        $pol1 = Policy::create([
            'user_id' => $user->id,
            'product_id' => $prod1->id,
            'policy_number' => 'POL-2026-FHP',
            'status' => 'active',
            'coverage_amount' => 500000000,
            'premium_amount' => 129000,
            'payment_frequency' => 'monthly',
            'start_date' => Carbon::now()->subMonths(3),
            'end_date' => Carbon::now()->addMonths(9),
            'beneficiaries' => [['name' => 'Istri Bagas', 'relation' => 'Spouse']],
        ]);

        // 5. BUAT CLAIM
        // ---------------------------------------------
        Claim::create([
            'policy_id' => $pol1->id,
            'claim_reason' => 'Demam Berdarah',
            'description' => 'Dirawat di RS Sentra Medika selama 4 hari masuk ICU.',
            'incident_date' => Carbon::now()->subWeeks(2),
            'claim_amount' => 5000000,
            'approved_amount' => 4500000,
            'status' => 'approved',
            'bank_name' => 'BCA',
            'account_number' => '8888999900',
            'account_holder' => 'Bagas Morgan',
        ]);
    }
}
