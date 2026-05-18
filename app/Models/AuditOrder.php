<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditOrder extends Model
{
    use HasFactory;

    protected $table = 'audit_orders';

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'operation',
        'previous_state',
        'new_state',
        'changed_at',
        'user_id',
    ];

    protected $casts = [
        'changed_at' => 'datetime',
    ];

    /**
     * Una auditoría pertenece a una orden.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Usuario que realizó el cambio (puede ser nulo si fue el sistema).
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
