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
        Schema::create('policies', function (Blueprint $table) {
            $table->id();

            // Relation
            $table->foreignId('user_id')->constrained()->cascadedOnDelete();
            $table->foreignId('product_id')->constrained()->cascadedOnDelete();

            // Inti Data Polis
            $table->string('policy_number')->unique();
            $table->enum('status', ['active', 'expired', 'cancelled', 'waiting_payment'])->default('waiting_payment');

            // Snapshot Coverage
            $table->decimal('coverage_amount', 15, 2);

            // Harga & Periode
            $table->decimal('premium_amount', 15, 2);
            $table->enum('payment_frequency', ['monthly', 'yearly'])->default('monthly');

            // Tanggal
            $table->date('start_date');
            $table->date('end_date');
            $table->date('next_due_date')->nullable();

            // Data Ahli Waris
            $table->json('beneficiaries')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policies');
    }
};
