<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pedidos personalizados con configuraciones específicas.
     */
    public function up(): void
    {
        Schema::create('custom_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('size_id')->constrained('sizes');
            $table->foreignId('flavor_id')->constrained('flavors');
            $table->foreignId('filling_id')->constrained('fillings');
            $table->foreignId('frosting_id')->constrained('frostings');
            $table->foreignId('decoration_id')->constrained('decorations');
            $table->string('theme', 150)->nullable()->comment('Temática adicional');
            $table->decimal('calculated_price', 10, 2)->comment('Precio total calculado del pedido personalizado');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_orders');
    }
};
