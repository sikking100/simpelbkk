<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;

class Documentation extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'progress',
        'description',
        'images'
    ];

    /**
     * Get the group that owns the Documentation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
