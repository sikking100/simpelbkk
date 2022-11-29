<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'type',
        'nik',
        'pendidikan',
        'address',
        'phone',
        'description',
        'ktp',
    ];

    /**
     * Get the group that owns the Member
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
