<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserFavorite extends Model
{
    protected $fillable = ['session_id', 'product_id'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Toggle favorite for a given session and product.
     *
     * @param string $sessionId
     * @param int $productId
     * @return bool Returns true if added to favorites, false if removed
     */
    public function toggleForSession(string $sessionId, int $productId): bool
    {
        $favorite = $this->where('session_id', $sessionId)
            ->where('product_id', $productId)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return false;
        }

        $this->create([
            'session_id' => $sessionId,
            'product_id' => $productId,
        ]);

        return true;
    }
}
