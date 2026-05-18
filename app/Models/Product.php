<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Atributos que se pueden asignar de forma masiva.
     */
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'base_price',
        'stock',
        'image_url',
        'rating',
        'reviews_count',
        'delivery_time',
        'serves',
        'ingredients',
        'tags',
        'popular',
        'is_new',
        'active',
        'customizable',
    ];

    /**
     * Conversión de tipos de atributos.
     */
    protected $casts = [
        'base_price' => 'decimal:2',
        'rating' => 'decimal:2',
        'stock' => 'integer',
        'reviews_count' => 'integer',
        'ingredients' => 'array',
        'tags' => 'array',
        'popular' => 'boolean',
        'is_new' => 'boolean',
        'active' => 'boolean',
        'customizable' => 'boolean',
    ];

    /**
     * Constantes de estado para el modelo.
     */
    const ACTIVE = true;
    const INACTIVE = false;

    const POPULAR = true;
    const NOT_POPULAR = false;

    const IS_NEW = true;
    const NOT_NEW = false;

    const CUSTOMIZABLE = true;
    const NOT_CUSTOMIZABLE = false;

    /**
     * Producto pertenece a una categoría.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Items de carrito que contienen este producto.
     */
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Items de órdenes históricas de este producto.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /*
     * Scopes de consulta útiles para filtros en catálogo.
     */

    /**
     * Solo productos activos.
     */
    public function scopeActive($query)
    {
        return $query->where('active', self::ACTIVE);
    }

    /**
     * Productos marcados como populares.
     */
    public function scopePopular($query)
    {
        return $query->where('popular', self::POPULAR);
    }

    /**
     * Productos nuevos en el catálogo.
     */
    public function scopeIsNew($query)
    {
        return $query->where('is_new', self::IS_NEW);
    }

    /**
     * Productos que permiten personalización.
     */
    public function scopeCustomizable($query)
    {
        return $query->where('customizable', self::CUSTOMIZABLE);
    }

    /**
     * Productos con stock disponible mayor a 0.
     */
    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    /**
     * Productos que pertenecen a una categoría específica.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $categoryId
     */
    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * Accesor: devuelve el precio base formateado como moneda.
     */
    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->base_price, 2);
    }
}
