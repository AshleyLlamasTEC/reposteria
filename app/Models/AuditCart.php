<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditCart extends Model
{
    use HasFactory;

    protected $table = 'audit_cart';
    public $timestamps = false;

    protected $fillable = [
        'cart_id',
        'operation',
        'detail',
        'changed_at',
        'user_id',
    ];

    protected $casts = [
        'detail' => 'array',
        'changed_at' => 'datetime',
    ];

    /**
     * Auditoría pertenece a un carrito.
     */
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Usuario que realizó la acción (si está disponible).
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
