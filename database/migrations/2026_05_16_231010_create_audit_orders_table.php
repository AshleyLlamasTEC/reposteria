<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Registro de auditoría de cambios en órdenes.
     */
    public function up(): void
    {
        Schema::create('audit_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->enum('operation', ['INSERT', 'UPDATE'])->comment('Tipo de operación');
            $table->string('previous_state', 30)->nullable()->comment('Estado anterior');
            $table->string('new_state', 30)->nullable()->comment('Estado nuevo');
            $table->timestamp('changed_at')->useCurrent();
            $table->unsignedBigInteger('user_id')->nullable()->comment('Usuario que realizó la operación');
            $table->index('order_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_orders');
    }
};
