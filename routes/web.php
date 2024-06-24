<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/home/edit', [App\Http\Controllers\HomeController::class, 'edit'])->name('home.edit');
Route::post('/home/save', [App\Http\Controllers\HomeController::class, 'store'])->name('home.save');

Route::get('/about', [App\Http\Controllers\About\AboutController::class, 'index'])->name('about');
Route::get('/about/edit', [App\Http\Controllers\About\AboutController::class, 'edit'])->name('about.edit');
Route::post('/about/save', [App\Http\Controllers\About\AboutController::class, 'store'])->name('about.save');

/* ----------------------------- Tutorials Route ---------------------------- */
Route::prefix('tutorials')->group(function(){
    Route::name('tutorials.')->group(function(){
        Route::resource('/title', App\Http\Controllers\Tutorial\TitleController::class);
        Route::resource('/all', App\Http\Controllers\Tutorial\TutorialController::class);
        Route::get('/list', [App\Http\Controllers\Tutorial\TutorialController::class, 'list'])->name('list');
        Route::post('/list/publish/{id}', [App\Http\Controllers\Tutorial\TutorialController::class, 'publish'])->name('publish');
        Route::resource('/comments', App\Http\Controllers\Tutorial\CommentController::class);
    });
});

/* ------------------------------- Auth Route ------------------------------- */
Route::controller(App\Http\Controllers\Admin\AuthController::class)->group(function(){
    Route::get('/login', 'login')->name('login');
    Route::post('/auth', 'auth')->name('auth');
    Route::get('/register', 'register')->name('register');
    Route::post('/register-user', 'registerUser')->name('register.user');
    Route::get('/logout', 'logout')->middleware('auth')->name('logout');
});


/* --------------------------- Email Verify Route --------------------------- */
Route::controller(App\Http\Controllers\Admin\EmailVerificationController::class)->group(function() {
    Route::get('/email/verify', 'notice')->middleware('auth')->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', 'verify')->middleware(['auth', 'signed'])->name('verification.verify');
    Route::post('/email/resend', "resend")->middleware(['auth', 'throttle:6,1'])->name('verification.resend');
});


/* ------------------------------- Admin Route ------------------------------ */
Route::middleware(['auth', 'isAdmin'])->group(function() {
    Route::get('/admin', App\Http\Controllers\Admin\AdminController::class)->name('admin');
    Route::resource('/user', App\Http\Controllers\Admin\UserController::class)->except(['index', 'create', 'store']);
});
