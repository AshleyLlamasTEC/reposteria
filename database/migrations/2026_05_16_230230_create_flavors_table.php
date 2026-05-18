<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Sabores disponibles para personalización.
     */
    public function up(): void
    {
        Schema::create('flavors', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->comment('Nombre del sabor');
            $table->decimal('extra_price', 8, 2)->default(0.00)->comment('Costo adicional por este sabor');
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flavors');
    }
};
