<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;

class Income extends Model
{
    use HasFactory;

     protected $fillable = [
        'group_id',
        'date',
        'received',
        'income',
        'description'
    ];

    /**
     * Get the group that owns the Income
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
