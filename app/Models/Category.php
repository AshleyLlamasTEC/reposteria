<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    const ACTIVE = true;
    const INACTIVE = false;

    /**
     * Una categoría tiene muchos productos.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Scope para categorías activas.
     */
    public function scopeActive($query)
    {
        return $query->where('active', self::ACTIVE);
    }
}
