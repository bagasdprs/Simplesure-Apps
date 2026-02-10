<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Policy;
use App\Models\Claim;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. BUAT USER (Admin & Guest)
        // ---------------------------------------------
        $admin = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@simplesure.com',
            'password' => Hash::make('123456789'), // Password-nya: 123456789
            'role' => 'admin',
        ]);

        $user = User::create([
            'name' => 'Budi Santoso',
            'email' => 'user@simplesure.com',
            'password' => Hash::make('987654321'), // Password-nya: 987654321
            'role' => 'user',
        ]);

        // 2. BUAT 2 PRODUCT (Kesehatan & Kendaraan)
        // ---------------------------------------------
        $prod1 = Product::create([
            'name' => 'Sehat Bahagia Gold',
            'type' => 'Health',
            'description' => 'Asuransi kesehatan lengkap dengan rawat inap VIP.',
            'base_price' => 500000, // 500rb per bulan
            'coverage_amount' => 100000000, // Cover 100 Juta
            'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=60',
            'features' => ['Rawat Inap VIP', 'Tanpa Cek Medis', 'Cover COVID-19'],
            'is_active' => true,
        ]);

        $prod2 = Product::create([
            'name' => 'Mobil Aman Jaya',
            'type' => 'Vehicle',
            'description' => 'Perlindungan total untuk mobil kesayangan Anda.',
            'base_price' => 750000, // 750rb per bulan
            'coverage_amount' => 250000000, // Cover 250 Juta
            'image_url' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=60',
            'features' => ['All Risk', 'Bengkel Resmi', 'Mobil Pengganti'],
            'is_active' => true,
        ]);

        // 3. BUAT 2 POLICY (Polis milik User Budi)
        // ---------------------------------------------

        // Polis 1: Kesehatan (Aktif)
        $pol1 = Policy::create([
            'user_id' => $user->id,
            'product_id' => $prod1->id,
            'policy_number' => 'POL-2026-001',
            'status' => 'active',
            'coverage_amount' => 100000000, // Snapshot
            'premium_amount' => 500000,
            'payment_frequency' => 'monthly',
            'start_date' => Carbon::now()->subMonths(3), // Mulai 3 bulan lalu
            'end_date' => Carbon::now()->addMonths(9),
            'beneficiaries' => [['name' => 'Istri Budi', 'relation' => 'Spouse']],
        ]);

        // Polis 2: Mobil (Aktif)
        $pol2 = Policy::create([
            'user_id' => $user->id,
            'product_id' => $prod2->id,
            'policy_number' => 'POL-2026-002',
            'status' => 'active',
            'coverage_amount' => 250000000,
            'premium_amount' => 750000,
            'payment_frequency' => 'yearly',
            'start_date' => Carbon::now()->subMonths(1),
            'end_date' => Carbon::now()->addYear(),
            'beneficiaries' => [['name' => 'Anak Budi', 'relation' => 'Child']],
        ]);

        // 4. BUAT 2 CLAIM (Pengajuan Klaim Budi)
        // ---------------------------------------------

        // Klaim 1: Sakit Demam (Status: Approved)
        Claim::create([
            'policy_id' => $pol1->id,
            'claim_reason' => 'Demam Berdarah',
            'description' => 'Dirawat di RS Sentra Medika selama 4 hari.',
            'incident_date' => Carbon::now()->subWeeks(2),
            'claim_amount' => 5000000, // Minta 5jt
            'approved_amount' => 4500000, // Disetujui 4.5jt
            'status' => 'approved',
            'bank_name' => 'BCA',
            'account_number' => '1234567890',
            'account_holder' => 'Budi Santoso',
        ]);

        // Klaim 2: Mobil Penyok (Status: Pending)
        Claim::create([
            'policy_id' => $pol2->id,
            'claim_reason' => 'Bemper Penyok',
            'description' => 'Menabrak pagar saat parkir mundur.',
            'incident_date' => Carbon::now()->subDays(2),
            'claim_amount' => 1500000,
            'status' => 'pending',
            'bank_name' => 'BCA',
            'account_number' => '1234567890',
            'account_holder' => 'Budi Santoso',
        ]);
    }
}
