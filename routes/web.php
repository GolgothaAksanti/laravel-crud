<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('products', ProductController::class);
Route::post('products/update-statuses', [ProductController::class, 'updateStatuses'])->name('products.update-statuses');
Route::post('products/bulk-delete', [ProductController::class, 'bulkDelete'])->name('products.bulk-delete-');
