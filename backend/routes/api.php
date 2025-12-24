<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\PlaceController;
use App\Http\Controllers\Api\v1\ReservationController;

Route::middleware('auth:sanctum')->group(function () {

    Route::post('user/logout', [UserController::class, 'logout']);
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()),
            'token' => $request->bearerToken(),
            // 'token' => $request->user()->currentAccessToken(),
        ];
    });
    Route::get('/places', [PlaceController::class, 'index']);
    Route::post('/book/reservation', [ReservationController::class, 'store']);
    Route::put('/cancel/{reservation}/reservation', [ReservationController::class, 'cancel']);
    Route::put('/start/{reservation}/parking', [ReservationController::class, 'startParking']);
    Route::put('/end/{reservation}/parking', [ReservationController::class, 'endParking']);
    Route::post('/pay/check-success', [ReservationController::class, 'paySuccess']);

    Route::post('/broadcasting/auth', function (Request $request) {
        return Broadcast::auth($request);
    }) ;
});

// User authentication routes
Route::post('/user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);
// Route::post('/user/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
