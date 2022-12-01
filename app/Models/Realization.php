<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Realization extends Model
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
     * Get the group that owns the Realization
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
