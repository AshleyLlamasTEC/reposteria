<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Tamaños disponibles para pedidos personalizados.
     */
    public function up(): void
    {
        Schema::create('sizes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->comment('Nombre del tamaño (ej. Chico, Mediano, Grande)');
            $table->decimal('adjustment_percentage', 5, 2)->default(1.00)->comment('Multiplicador sobre el precio base');
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sizes');
    }
};
