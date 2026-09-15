<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::middleware('throttle:api')->group(function () {
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/skills', [SkillController::class, 'index']);
    Route::get('/about', [AboutController::class, 'index']);
});

// Formulaire de contact
Route::middleware('throttle:contact')->group(function () {
    Route::post('/contact', [ContactController::class, 'store']);
});

// Authentification
Route::middleware('throttle:login')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Routes protégées par Sanctum
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {

    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Messages
    Route::get('/messages', [MessageController::class, 'index']);
    Route::patch('/messages/{message}/read', [MessageController::class, 'markAsRead']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);

    // Projets
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::patch('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Skills
    Route::post('/skills', [SkillController::class, 'store']);
    Route::patch('/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);

    // About
    Route::post('/about', [AboutController::class, 'store']);
    Route::patch('/about/{about}', [AboutController::class, 'update']);
    Route::delete('/about/{about}', [AboutController::class, 'destroy']);
});