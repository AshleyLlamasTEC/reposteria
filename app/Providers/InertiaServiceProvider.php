<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class InertiaServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Inertia::macro('admin', function ($page, $props = []) {
            return Inertia::render("Admin/{$page}", $props);
        });
    }
}
