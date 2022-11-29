<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;

class Realitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'date',
        'use',
        'amount',
        'description',
    ];

    /**
     * Get the group that owns the Realitation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
