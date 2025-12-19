<?php

use App\Http\Controllers\Api\v1\PlaceController;
use App\Http\Controllers\Api\v1\ReservationController;
use App\Http\Controllers\Api\v1\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    Route::post('user/logout', [UserController::class, 'logout']);
    Route::get('user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/places', [PlaceController::class, 'index']);
Route::post('/book/reservation', [ReservationController::class, 'store']);
Route::put('/cancel/{reservation}/reservation', [ReservationController::class, 'cancel']);
Route::put('/start/{reservation}/parking', [ReservationController::class, 'startParking']);
Route::put('/end/{reservation}/parking', [ReservationController::class, 'endParking']);

// User authentication routes
Route::post('/user/register', [UserController::class, 'store']);
Route::post('/user/login', [UserController::class, 'auth']);
// Route::post('/user/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
