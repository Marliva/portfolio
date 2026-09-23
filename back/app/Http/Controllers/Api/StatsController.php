<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'unread_messages' => Message::where('is_read', false)->count(),
            'total_messages'  => Message::count(),
            'total_projects'  => Project::count(),
            'total_skills'    => Skill::count(),
        ]);
    }
}