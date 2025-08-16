<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/register', [UsersController::class, 'showFormCreateUser'])->name('users.create');




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
