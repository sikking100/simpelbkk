<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\TypeOfActionController;
use App\Http\Controllers\UserController;
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
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/profil-usaha', function () {
    });

    Route::resources([
        'district' => DistrictController::class,
        'village' => VillageController::class,
        'user' => UserController::class,
        'category' => CategoryController::class,
        'typeOfAction' => TypeOfActionController::class,
        'group' => GroupController::class,
    ]);
    Route::get('/district/{district}/create', [DistrictController::class, 'villageCreate'])->name('village.create');
    Route::get('/district/{district}/villages', [DistrictController::class, 'villages']);
    Route::post('/district/{district}', [DistrictController::class, 'villageStore'])->name('village.store');
    Route::get('/district/{district}/village/{village}', [DistrictController::class, 'villageEdit'])->name('village.edit');
    Route::put('/district/{district}/village/{village}', [DistrictController::class, 'villageUpdate'])->name('village.update');
});

require __DIR__ . '/auth.php';
