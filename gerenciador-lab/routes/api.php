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
        Route::get('laboratories/', [LaboratoryController::class, 'index']);
        Route::get('laboratories/{id}', [LaboratoryController::class, 'show']);
        Route::post('laboratories/', [LaboratoryController::class, 'store']);
        Route::put('laboratories/{id}', [LaboratoryController::class, 'update']);
        Route::delete('laboratories/{id}', [LaboratoryController::class, 'destroy']);
    });

    Route::prefix('computers')->group(function () {
        Route::get('computers/', [ComputerController::class, 'index']);
        Route::get('computers/{id}', [ComputerController::class, 'show']);
        Route::post('computers/', [ComputerController::class, 'store']);
        Route::put('computers/{id}', [ComputerController::class, 'update']);
        Route::delete('computers/{id}', [ComputerController::class, 'destroy']);
        Route::put('computers/{id}/toggle-retiro', [ComputerController::class, 'toggleRetirado']);
    });
});
