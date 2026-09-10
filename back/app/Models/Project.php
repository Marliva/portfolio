<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'stack',
        'github',
        'live',
        'image',
        'video',
        'status',
        'order',
    ];

    protected $casts = [
        'stack' => 'array',
    ];
}