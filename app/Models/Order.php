<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'user_id',
        'total_amount',
        'state',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
    ];

    // Constantes de estado
    const STATE_PENDING = 'pending';
    const STATE_IN_PRODUCTION = 'in_production';
    const STATE_READY = 'ready';
    const STATE_DELIVERED = 'delivered';

    /**
     * Orden pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Ítems históricos de la orden (productos estándar).
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Pedido personalizado (si aplica).
     */
    public function customOrder()
    {
        return $this->hasOne(CustomOrder::class);
    }

    /**
     * Etapa de producción del pedido.
     */
    public function productionStage()
    {
        return $this->hasOne(ProductionStage::class);
    }

    /**
     * Auditoría relacionada con esta orden.
     */
    public function audits()
    {
        return $this->hasMany(AuditOrder::class);
    }
}
