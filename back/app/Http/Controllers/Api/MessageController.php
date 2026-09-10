<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function index(): JsonResponse
    {
        $messages = Message::orderBy('created_at', 'desc')->get();

        return response()->json($messages);
    }

    public function markAsRead(Message $message): JsonResponse
    {
        $message->update(['is_read' => true]);

        return response()->json([
            'message' => 'Message marqué comme lu.',
        ]);
    }

    public function destroy(Message $message): JsonResponse
    {
        $message->delete();

        return response()->json([
            'message' => 'Message supprimé.',
        ]);
    }
}