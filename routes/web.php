<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DocumentationController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\OpdController;
use App\Http\Controllers\PaguController;
use App\Http\Controllers\RealizationController;
use App\Http\Controllers\TypeOfActionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
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

Route::get('/', [HomeController::class, 'home']);

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'home');
    Route::get('/data/{year}', 'data');
    Route::get('/data/{request}/bottom', 'bottom');
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
        'realization' => RealizationController::class,
        'income' => IncomeController::class,
        'documentation' => DocumentationController::class,
        'banner' => BannerController::class,
        'pagu' => PaguController::class,
        'announcement' => AnnouncementController::class,
        'video' => VideoController::class,
        'opd' => OpdController::class,
    ]);
    Route::get('/district/{district}/create', [DistrictController::class, 'villageCreate'])->name('village.create');
    Route::get('/district/{district}/villages', [DistrictController::class, 'villages']);
    Route::post('/district/{district}', [DistrictController::class, 'villageStore'])->name('village.store');
    Route::get('/district/{district}/village/{village}', [DistrictController::class, 'villageEdit'])->name('village.edit');
    Route::put('/district/{district}/village/{village}', [DistrictController::class, 'villageUpdate'])->name('village.update');

    Route::controller(GroupController::class)->group(function () {
        Route::get('/group/{group}/realizations', 'realizations');
        Route::get('/group/{group}/incomes', 'incomes');
        Route::get('/group/{group}/documentations', 'documentations');
        Route::get('/kabupaten', 'kabupaten')->name('kabupaten');
        Route::get('/kabupaten/{kecamatan}/desa', 'desa');
        Route::get('/kabupaten/{desa}/data', 'kabupatenData');
        Route::get('/kabupaten-list', 'list')->name('kabupaten.list');
        Route::get('/kabupaten/{year}/list', 'data');
        Route::put('/group/{group}/status', 'updateStatus')->name('update.status');
    });
    Route::controller(MemberController::class)->group(function () {
        Route::get('/group/{group}/index', 'index')->name('member.index');
        Route::get('/group/{group}/create', 'create')->name('member.create');
        Route::post('/member', 'store')->name('member.store');
        Route::get('/member/{member}/show', 'show')->name('member.show');
        Route::get('/member/{member}/edit', 'edit')->name('member.edit');
        Route::put('/member/{member}/update', 'update')->name('member.update');
        Route::delete('/member/{member}/destroy', 'destroy')->name('member.destroy');
        Route::get('/member-list', 'list')->name('member.list');
        Route::get('/member/{year}/list', 'data');
    });
    Route::get('/documentation-list', [DocumentationController::class, 'list'])->name('documentation.list');
    Route::get('/documentation/{year}/list', [DocumentationController::class, 'data']);
    Route::get('/report-list', [IncomeController::class, 'list'])->name('report.list');
    Route::get('/report/{year}/list', [IncomeController::class, 'data']);
    Route::get('/dashboard/{year}/data', [DashboardController::class, 'data']);
});

require __DIR__ . '/auth.php';
