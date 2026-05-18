<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Auditoría de operaciones sobre el carrito.
     */
    public function up(): void
    {
        Schema::create('audit_cart', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained('carts')->onDelete('cascade');
            $table->enum('operation', ['INSERT', 'UPDATE', 'DELETE']);
            $table->json('detail')->nullable()->comment('Detalle del evento en formato JSON');
            $table->timestamp('changed_at')->useCurrent();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->index('cart_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_cart');
    }
};
