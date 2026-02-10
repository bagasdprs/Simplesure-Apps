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
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('policy_id')->constrained()->cascadedOnDelete();

            // Detail Kejadian
            $table->string('claim_reason'); // Contoh: "Tabrakan Beruntun" atau "Demam Berdarah"
            $table->text('description'); // Kronologi lengkap
            $table->date('incident_date'); // PENTING! Untuk validasi apakah polis aktif saat kejadian

            // Masalah Uang
            $table->decimal('claim_amount', 15, 2); // User minta berapa?
            $table->decimal('approved_amount', 15, 2)->nullable(); // Admin setuju bayar berapa? (Bisa beda dari yg diminta)

            // Status & Feedback
            $table->enum('status', ['pending', 'in_review', 'approved', 'rejected'])->default('pending');
            $table->text('rejection_reason')->nullable(); // Wajib diisi Admin kalau status = rejected

            // Bukti & Pembayaran (Fitur Realistis)
            $table->string('evidence_file')->nullable(); // Path foto/PDF bukti

            // Data Rekening User (Untuk Transfer Cair)
            // Disimpan disini supaya kalau user ganti rekening di profile, data historis klaim ini gak berubah.
            $table->string('bank_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('account_holder')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
