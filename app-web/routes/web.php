<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/register', [UsersController::class, 'showFormCreateUser'])->name('users.create');
Route::post('/users-store', [UsersController::class, 'store'])->name('users.store');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
