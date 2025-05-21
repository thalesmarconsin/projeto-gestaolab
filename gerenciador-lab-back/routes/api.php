<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComputerController;
use App\Http\Controllers\Api\LaboratoryController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('laboratories')->group(function () {
    Route::get('/', [LaboratoryController::class, 'index']);
    Route::get('/{id}', [LaboratoryController::class, 'show']);
    Route::post('/', [LaboratoryController::class, 'store']); 
    Route::put('/{id}', [LaboratoryController::class, 'update']);
    Route::delete('/{id}', [LaboratoryController::class, 'destroy']);
});

    Route::prefix('computers')->group(function () {
        Route::get('/', [ComputerController::class, 'index']);
        Route::get('/{id}', [ComputerController::class, 'show']);
        Route::post('/', [ComputerController::class, 'store']);
        Route::put('/{id}', [ComputerController::class, 'update']);
        Route::delete('/{id}', [ComputerController::class, 'destroy']);
        Route::put('/{id}/toggle-retiro', [ComputerController::class, 'toggleRetirado']);
    });
});
