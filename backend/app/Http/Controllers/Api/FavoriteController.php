<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleFavoriteRequest;
use App\Models\UserFavorite;
use Illuminate\Http\JsonResponse;

class FavoriteController extends Controller
{
    public function __construct(
        private readonly UserFavorite $userFavorite
    ) {}

    public function toggle(ToggleFavoriteRequest $request): JsonResponse
    {
        $isFavorite = $this->userFavorite->toggleForSession(
            $request->session()->getId(),
            $request->validated()['product_id']
        );

        return response()->json(['is_favorite' => $isFavorite]);
    }
}
