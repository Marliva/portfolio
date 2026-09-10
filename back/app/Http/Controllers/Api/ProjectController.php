<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = Project::orderBy('order')->get();

        return response()->json($projects);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'stack'       => ['required', 'array'],
            'stack.*'     => ['string', 'max:50'],
            'github'      => ['nullable', 'url', 'max:255'],
            'live'        => ['nullable', 'url', 'max:255'],
            'image'       => ['nullable', 'string', 'max:255'],
            'video'       => ['nullable', 'string', 'max:255'],
            'status'      => ['required', 'in:completed,in_progress'],
            'order'       => ['integer'],
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate([
            'title'       => ['sometimes', 'string', 'max:100'],
            'description' => ['sometimes', 'string'],
            'stack'       => ['sometimes', 'array'],
            'stack.*'     => ['string', 'max:50'],
            'github'      => ['nullable', 'url', 'max:255'],
            'live'        => ['nullable', 'url', 'max:255'],
            'image'       => ['nullable', 'string', 'max:255'],
            'video'       => ['nullable', 'string', 'max:255'],
            'status'      => ['sometimes', 'in:completed,in_progress'],
            'order'       => ['sometimes', 'integer'],
        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé.',
        ]);
    }
}