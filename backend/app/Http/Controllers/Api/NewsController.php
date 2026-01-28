<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $pageSize = $request->input('page_size', 10);
        $news = News::orderBy('published_at', 'desc')->paginate($pageSize, ['*'], 'page', $page);

        return response()->json($news);
    }

    public function show(News $news): JsonResponse
    {
        return response()->json($news);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'content' => 'required|string',
            'summary' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'author_id' => 'required|exists:users,id',
            'published_at' => 'nullable|date',
        ]);

        $news = News::create($validated);

        return response()->json($news, 201);
    }

    public function update(Request $request, News $news): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:200',
            'content' => 'sometimes|string',
            'summary' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'author_id' => 'sometimes|exists:users,id',
            'published_at' => 'nullable|date',
        ]);

        $news->update($validated);

        return response()->json($news);
    }

    public function destroy(News $news): JsonResponse
    {
        $news->delete();

        return response()->json(null, 204);
    }
}
