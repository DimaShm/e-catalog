<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryController extends Controller
{
    public function index(): Collection
    {
        return Category::all();
    }
}
