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
            $table->foreignId('category_id')
                ->nullable()          // 1. Sifat Kolom (Boleh Kosong)
                ->after('id')         // 2. Posisi Kolom (Setelah ID)
                ->constrained('categories_product') // 3. Baru bahas Relasi ke tabel categories
                ->nullOnDelete(); // 4. On Delete Set Null
            $table->dropColumn('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
            $table->string('type')->nullable();
        });
    }
};
