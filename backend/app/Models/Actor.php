<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Actor extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'gender',
        'age',
        'photo_url',
        'bio',
        'experience',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
