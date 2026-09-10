<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->text('description');
            $table->json('stack');
            $table->string('github', 255)->nullable();
            $table->string('live', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('video', 255)->nullable();
            $table->enum('status', ['completed', 'in_progress']);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};