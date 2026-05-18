<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Betunes disponibles.
     */
    public function up(): void
    {
        Schema::create('frostings', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('extra_price', 8, 2)->default(0.00);
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('frostings');
    }
};
