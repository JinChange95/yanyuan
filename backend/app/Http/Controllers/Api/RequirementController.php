<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Requirement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RequirementController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $requirements = Requirement::orderBy('created_at', 'desc')->get();
        return response()->json($requirements);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'project_name' => 'required|string|max:200',
            'actor_count' => 'required|integer|min:1',
            'gender' => 'sometimes|in:male,female,any',
            'age_group' => 'sometimes|in:under12,12-20,30-50,over50,any',
            'contact_info' => 'required|string|max:200',
        ]);

        $requirement = Requirement::create($validated);

        return response()->json($requirement, 201);
    }

    public function destroy(Requirement $requirement): JsonResponse
    {
        $requirement->delete();

        return response()->json(null, 204);
    }
}
