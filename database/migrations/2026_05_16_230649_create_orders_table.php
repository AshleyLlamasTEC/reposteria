<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Pedidos confirmados por los clientes.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number', 20)->unique()->comment('Folio único generado automáticamente');
            $table->foreignId('user_id')->constrained('users');
            $table->decimal('total_amount', 12, 2);
            $table->enum('state', ['pending', 'in_production', 'ready', 'delivered'])->default('pending');
            $table->timestamps();
            $table->softDeletes();
            $table->index('user_id');
            $table->index('order_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
