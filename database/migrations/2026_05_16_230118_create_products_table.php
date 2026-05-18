<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Catálogo de productos disponibles en la repostería.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Relación con la categoría a la que pertenece el producto
            $table->foreignId('category_id')
                ->constrained()
                ->comment('Identificador de la categoría asociada');

            // Información básica del producto
            $table->string('name')
                ->comment('Nombre del producto');

            $table->string('slug')
                ->unique()
                ->comment('Slug único para URLs amigables');

            $table->text('description')
                ->comment('Descripción detallada del producto');

            // Precio base del producto (hasta 12 dígitos, 2 decimales)
            $table->decimal('base_price', 12, 2)
                ->comment('Precio base del producto');

            // Control de inventario
            $table->unsignedInteger('stock')
                ->default(0)
                ->comment('Cantidad disponible en inventario');

            // Imagen principal del producto
            $table->string('image_url')
                ->nullable()
                ->comment('URL de la imagen principal del producto');

            // Valoración promedio del producto (escala 1.00 - 5.00)
            $table->decimal('rating', 3, 2)
                ->default(0)
                ->comment('Valoración promedio del producto (0.00 a 5.00)');

            // Contador de reseñas recibidas
            $table->unsignedInteger('reviews_count')
                ->default(0)
                ->comment('Número total de reseñas del producto');

            // Tiempo estimado de entrega (ej. "2-3 días", "24 horas")
            $table->string('delivery_time')
                ->nullable()
                ->comment('Tiempo estimado de entrega (texto descriptivo)');

            // Información sobre porciones (ej. "8-10 personas", "Individual")
            $table->string('serves')
                ->nullable()
                ->comment('Cantidad de porciones o tamaño de la porción');

            // Lista de ingredientes en formato JSON (ej. ["harina", "huevo", "chocolate"])
            $table->json('ingredients')
                ->nullable()
                ->comment('Lista de ingredientes en formato JSON');

            // Etiquetas o palabras clave para búsqueda y filtrado (JSON)
            $table->json('tags')
                ->nullable()
                ->comment('Etiquetas del producto en formato JSON');

            // Banderas de estado / visibilidad
            $table->boolean('popular')
                ->default(false)
                ->comment('Indica si el producto es popular/destacado');

            $table->boolean('is_new')
                ->default(false)
                ->comment('Indica si el producto es una novedad');

            $table->boolean('active')
                ->default(true)
                ->comment('Producto visible y activo en el catálogo');

            $table->boolean('customizable')
                ->default(true)
                ->comment('Permite personalización avanzada del producto');

            // Marcas de tiempo estándar
            $table->timestamps();

            // Borrado lógico (papelera)
            $table->softDeletes()
                ->comment('Soporte para borrado lógico (soft delete)');

            // Índices adicionales para optimizar consultas
            $table->index('active');
            $table->index('popular');
            $table->index('is_new');
            $table->index('category_id');
        });
    }

    /**
     * Revierte la migración eliminando la tabla.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
