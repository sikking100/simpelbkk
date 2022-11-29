<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\VillageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function ()
    {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/profil-usaha', function () {
    });

    Route::resource('district', DistrictController::class);
    Route::resource('village', VillageController::class);
});

require __DIR__ . '/auth.php';
