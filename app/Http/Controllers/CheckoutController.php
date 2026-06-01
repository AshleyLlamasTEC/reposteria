<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Muestra la página de resumen del pedido antes de confirmar.
     */
    public function index()
    {
        $userId = auth()->id();

        // Obtener el carrito activo y sus items
        $cart = DB::select(
            "SELECT c.id AS cart_id, c.total_amount, c.status
             FROM carts c
             WHERE c.user_id = ? AND c.status = 'active'
             LIMIT 1",
            [$userId]
        );

        if (empty($cart)) {
            return redirect()->route('cart.index')->with('error', 'No tienes un carrito activo.');
        }

        $cart = $cart[0];

        $items = DB::select(
            "SELECT ci.id, ci.quantity, ci.unit_price, ci.subtotal, p.name AS product_name, p.image_url
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             WHERE ci.cart_id = ?",
            [$cart->cart_id]
        );

        return Inertia::render('Checkout/Index', [
            'cart' => [
                'id' => $cart->cart_id,
                'total' => (float) $cart->total_amount,
                'items' => $items,
            ],
        ]);
    }

    /**
     * Procesa el checkout: crea la orden, vacía el carrito, etc.
     * Utiliza el stored procedure sp_checkout_cart.
     */
    public function store(Request $request)
    {
        $userId = auth()->id();

        try {
            // Ejecutar el procedimiento almacenado que contiene toda la lógica transaccional
            $result = DB::select('CALL sp_checkout_cart(?)', [$userId]);

            // El procedimiento devuelve el order_id y el total
            if (empty($result)) {
                return back()->with('error', 'No se pudo procesar el pedido. Inténtalo de nuevo.');
            }

            $orderId = $result[0]->order_id;
            $total = $result[0]->total;

            return redirect()->route('orders.show', $orderId)
                ->with('success', "¡Pedido #{$orderId} creado con éxito! Total: $" . number_format($total, 2));
        } catch (\Exception $e) {
            Log::error([
                'message' => 'Error al procesar el pedido',
                'user_id' => auth()->id(),
                'error' => $e->getMessage(),
            ]);
            return back()->with('error', 'Error al procesar el pedido: ' . $e->getMessage());
        }
    }
}
