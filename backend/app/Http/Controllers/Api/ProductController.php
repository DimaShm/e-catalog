<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly Product $product
    ) {}

    public function index(Request $request): LengthAwarePaginator
    {
        $filters = [
            'category_id' => $request->input('category_id'),
            'min_price' => $request->input('min_price'),
            'max_price' => $request->input('max_price'),
            'rating' => $request->input('rating'),
            'search' => $request->input('search'),
            'favorites_only' => filter_var($request->input('favorites_only'), FILTER_VALIDATE_BOOLEAN),
        ];

        return $this->product->getFilteredProducts(
            $filters,
            $request->session()->getId(),
            (int) $request->get('per_page', 12)
        );
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());

        return response()->json($product->load('category'), 201);
    }
}
