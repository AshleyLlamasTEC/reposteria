<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Size extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'adjustment_percentage', 'active'];

    protected $casts = [
        'adjustment_percentage' => 'decimal:2',
        'active' => 'boolean',
    ];

    public function customOrders()
    {
        return $this->hasMany(CustomOrder::class);
    }
}
