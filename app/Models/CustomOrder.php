<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'size_id',
        'flavor_id',
        'filling_id',
        'frosting_id',
        'decoration_id',
        'theme',
        'calculated_price',
    ];

    protected $casts = [
        'calculated_price' => 'decimal:2',
    ];

    /**
     * Pertenece a una orden principal.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function flavor()
    {
        return $this->belongsTo(Flavor::class);
    }

    public function filling()
    {
        return $this->belongsTo(Filling::class);
    }

    public function frosting()
    {
        return $this->belongsTo(Frosting::class);
    }

    public function decoration()
    {
        return $this->belongsTo(Decoration::class);
    }
}
