<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    protected $fillable = [
        'project_name',
        'actor_count',
        'gender',
        'age_group',
        'contact_info',
        'status',
    ];
}
