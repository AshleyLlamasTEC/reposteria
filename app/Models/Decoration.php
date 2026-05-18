<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Decoration extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'extra_price', 'active'];

    protected $casts = [
        'extra_price' => 'decimal:2',
        'active' => 'boolean',
    ];

    public function customOrders()
    {
        return $this->hasMany(CustomOrder::class);
    }
}
