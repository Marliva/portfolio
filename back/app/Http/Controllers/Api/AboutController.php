<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(): JsonResponse
    {
        $paragraphs = About::where('type', 'paragraph')
            ->orderBy('order')
            ->get();

        $stats = About::where('type', 'stat')
            ->orderBy('order')
            ->get();

        return response()->json([
            'paragraphs' => $paragraphs,
            'stats'      => $stats,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type'    => ['required', 'in:paragraph,stat'],
            'content' => ['required', 'string'],
            'label'   => ['nullable', 'string', 'max:100'],
            'order'   => ['integer'],
        ]);

        $about = About::create($validated);

        return response()->json($about, 201);
    }

    public function update(Request $request, About $about): JsonResponse
    {
        $validated = $request->validate([
            'type'    => ['sometimes', 'in:paragraph,stat'],
            'content' => ['sometimes', 'string'],
            'label'   => ['nullable', 'string', 'max:100'],
            'order'   => ['sometimes', 'integer'],
        ]);

        $about->update($validated);

        return response()->json($about);
    }

    public function destroy(About $about): JsonResponse
    {
        $about->delete();

        return response()->json([
            'message' => 'Élément supprimé.',
        ]);
    }
}