<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header('Accept-Language', 'en');

        // Extract locale from headers like 'uk', 'en', 'uk-UA', 'en-US'
        $locale = substr($locale, 0, 2);

        // Support only en and uk
        if (!in_array($locale, ['en', 'uk'])) {
            $locale = 'en';
        }

        App::setLocale($locale);

        return $next($request);
    }
}
