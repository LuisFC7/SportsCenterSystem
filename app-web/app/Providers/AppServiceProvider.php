<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void{
        Password::defaults(function () {
            return Password::min(12)        // mínimo 12 caracteres
                          ->letters()       // al menos una letra
                          ->mixedCase()    // mayúsculas y minúsculas
                          ->numbers()      // al menos un número
                          ->symbols()      // al menos un símbolo
                          ->uncompromised(); // no estar en filtraciones conocidas
        });
    }
}
