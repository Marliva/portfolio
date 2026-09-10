<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(): JsonResponse
    {
        $skills = Skill::orderBy('order')->get()->groupBy('category');

        return response()->json($skills);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'badge'    => ['required', 'url', 'max:255'],
            'category' => ['required', 'in:Back-end,Front-end,Frameworks,Outils'],
            'order'    => ['integer'],
        ]);

        $skill = Skill::create($validated);

        return response()->json($skill, 201);
    }

    public function update(Request $request, Skill $skill): JsonResponse
    {
        $validated = $request->validate([
            'name'     => ['sometimes', 'string', 'max:100'],
            'badge'    => ['sometimes', 'url', 'max:255'],
            'category' => ['sometimes', 'in:Back-end,Front-end,Frameworks,Outils'],
            'order'    => ['sometimes', 'integer'],
        ]);

        $skill->update($validated);

        return response()->json($skill);
    }

    public function destroy(Skill $skill): JsonResponse
    {
        $skill->delete();

        return response()->json([
            'message' => 'Technologie supprimée.',
        ]);
    }
}