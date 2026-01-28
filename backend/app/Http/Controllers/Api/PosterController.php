<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Poster;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PosterController extends Controller
{
    public function index(): JsonResponse
    {
        $posters = Poster::where('is_active', true)
            ->orderBy('display_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($posters);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:100',
            'image_url' => 'required|string|max:500',
            'link_url' => 'nullable|string|max:500',
            'display_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $poster = Poster::create($validated);

        return response()->json($poster, 201);
    }

    public function update(Request $request, Poster $poster): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:100',
            'image_url' => 'sometimes|string|max:500',
            'link_url' => 'nullable|string|max:500',
            'display_order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $poster->update($validated);

        return response()->json($poster);
    }

    public function destroy(Poster $poster): JsonResponse
    {
        $poster->delete();

        return response()->json(null, 204);
    }
}
