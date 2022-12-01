<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'name',
        'category_id',
        'type_of_action_id',
        'profil',
        'address',
        'description',
        'npwp',
        'phone',
        'proposal',
        'email',
        'user_id',
        'date',
    ];

    /**
     * Get the user that owns the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that owns the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the type that owns the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function typeOfAction(): BelongsTo
    {
        return $this->belongsTo(TypeOfAction::class);
    }

    /**
     * Get all of the member for the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function member(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    /**
     * Get all of the documentation for the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function documentation(): HasMany
    {
        return $this->hasMany(Documentation::class);
    }

    /**
     * Get all of the income for the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function income(): HasMany
    {
        return $this->hasMany(Income::class);
    }

    /**
     * Get all of the Realization for the Group
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function realization(): HasMany
    {
        return $this->hasMany(Realization::class);
    }
}
