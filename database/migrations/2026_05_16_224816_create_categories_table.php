<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Catálogo de categorías de productos (postres).
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->comment('Nombre de la categoría');
            $table->string('slug', 120)->unique()->comment('Slug único para URLs');
            $table->text('description')->nullable()->comment('Descripción larga de la categoría');
            $table->boolean('active')->default(true)->comment('Indica si la categoría está disponible al público');
            $table->timestamps();
            $table->softDeletes()->comment('Borrado lógico para conservar historial');
            $table->index('active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
