<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'category_id', 'price', 'rating'];

    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getFilteredProducts(array $filters, string $sessionId, int $perPage = 12): LengthAwarePaginator
    {
        $query = self::query()->with('category');

        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        if (isset($filters['rating'])) {
            $query->where('rating', '>=', $filters['rating']);
        }

        if (isset($filters['search']) && $filters['search'] !== '') {
            $query->where(function($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['favorites_only'])) {
            $favoriteIds = UserFavorite::where('session_id', $sessionId)->pluck('product_id');
            $query->whereIn('id', $favoriteIds);
        }

        $products = $query->paginate($perPage);

        // Add is_favorite flag to all products
        $favoriteIds = UserFavorite::where('session_id', $sessionId)->pluck('product_id')->toArray();

        $products->getCollection()->transform(function($product) use ($favoriteIds) {
            $product->is_favorite = in_array($product->id, $favoriteIds);
            return $product;
        });

        return $products;
    }
}
