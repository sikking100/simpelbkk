<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Village;

class District extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Get all of the user for the District
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function user(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get all of the village for the District
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function village(): HasMany
    {
        return $this->hasMany(Village::class);
    }
}
