<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // 1. Nambahin kolom visibility yang hilang
            $table->enum('visibility', ['public', 'private'])->default('public')->after('is_active');

            // 2. Ubah coverage_amount jadi String biar bisa nulis "Up to 500 Million"
            // (Butuh install doctrine/dbal dulu biasanya: composer require doctrine/dbal)
            $table->string('coverage_amount')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('visibility');
            $table->decimal('coverage_amount', 15, 2)->change();
        });
    }
};
