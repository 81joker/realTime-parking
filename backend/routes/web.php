<?php

use App\Http\Controllers\ProductsControler;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/users', [UserController::class, 'index'])->name('dashboard');
Route::get('/products', ProductsControler::class)->name('products');
