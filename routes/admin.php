<?php

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('index');

Route::resource('users', UserController::class);

Route::resource('orders', OrderController::class);
Route::match(['patch', 'put'], '/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('orders.update-status');
