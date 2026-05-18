<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cart extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'status', 'total_amount'];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    const STATUS_ACTIVE = 'active';
    const STATUS_COMPLETED = 'completed';

    /**
     * Carrito pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Items dentro del carrito.
     */
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }
}
