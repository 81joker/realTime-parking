<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\PlaceController;
use App\Http\Controllers\Api\v1\ReservationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/places', [PlaceController::class, 'index']);
Route::post('/book/reservation', [ReservationController::class, 'store']);
Route::put('/cancel/{reservation}/reservation', [ReservationController::class, 'cancel']);
Route::put('/start/{reservation}/parking', [ReservationController::class, 'startParking']);
Route::put('/end/{reservation}/parking', [ReservationController::class, 'endParking']);

// User authentication routes
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'auth']);
Route::post('/logout', [UserController::class, 'logout']);
// Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');