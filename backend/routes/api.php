<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\PolicyController;
use App\Http\Controllers\Api\ClaimController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// PUBLIC ROUTES
// List produk bisa dilihat tanpa login
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// PRIVATE ROUTES
Route::middleware(['auth:sanctum'])->group(function () {

    // Create Product
    Route::post('/products', [ProductController::class, 'store']);

    // Fitur Asuransi (Policy)
    Route::get('/policies', [PolicyController::class, 'index']);     // List Polis Saya
    Route::post('/policies', [PolicyController::class, 'store']);    // Beli Polis
    Route::get('/policies/{id}', [PolicyController::class, 'show']); // Detail Polis

    // Fitur Klaim (Claims)
    Route::get('/claims', [ClaimController::class, 'index']);     // History Klaim
    Route::post('/claims', [ClaimController::class, 'store']);    // Ajukan Klaim

});
