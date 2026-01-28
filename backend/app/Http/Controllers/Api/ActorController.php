<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Actor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ActorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Actor::query();

        if ($request->has('gender')) {
            $query->where('gender', $request->gender);
        }

        if ($request->has('age_group')) {
            $ageGroup = $request->age_group;
            switch ($ageGroup) {
                case 'under12':
                    $query->where('age', '<', 12);
                    break;
                case '12-20':
                    $query->whereBetween('age', [12, 20]);
                    break;
                case '30-50':
                    $query->whereBetween('age', [30, 50]);
                    break;
                case 'over50':
                    $query->where('age', '>', 50);
                    break;
            }
        }

        $page = $request->input('page', 1);
        $pageSize = $request->input('page_size', 20);
        $actors = $query->paginate($pageSize, ['*'], 'page', $page);

        return response()->json($actors);
    }

    public function show(Actor $actor): JsonResponse
    {
        return response()->json($actor);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'gender' => 'required|in:male,female',
            'age' => 'required|integer|min:0',
            'photo_url' => 'nullable|string|max:500',
            'bio' => 'nullable|string',
            'experience' => 'nullable|string',
        ]);

        $actor = Actor::create($validated);

        return response()->json($actor, 201);
    }

    public function update(Request $request, Actor $actor): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'gender' => 'sometimes|in:male,female',
            'age' => 'sometimes|integer|min:0',
            'photo_url' => 'nullable|string|max:500',
            'bio' => 'nullable|string',
            'experience' => 'nullable|string',
        ]);

        $actor->update($validated);

        return response()->json($actor);
    }

    public function destroy(Actor $actor): JsonResponse
    {
        $actor->delete();

        return response()->json(null, 204);
    }
}
