<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Muestra el detalle de un pedido perteneciente al usuario autenticado.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $userId = auth()->id();

        // Obtener la orden con su etapa de producción
        $order = DB::select(
            "SELECT o.id, o.order_number, o.total_amount, o.state, o.created_at,
                    ps.stage AS production_stage
             FROM orders o
             LEFT JOIN production_stages ps ON o.id = ps.order_id
             WHERE o.id = ? AND o.user_id = ?
             LIMIT 1",
            [$id, $userId]
        );

        if (empty($order)) {
            abort(404, 'Pedido no encontrado');
        }
        $order = $order[0];

        // Ítems de la orden (productos estándar)
        $items = DB::select(
            "SELECT oi.quantity, oi.unit_price, oi.subtotal, p.name AS product_name
             FROM order_items oi
             JOIN products p ON oi.product_id = p.id
             WHERE oi.order_id = ?",
            [$id]
        );

        // Convertir a float los valores monetarios para la vista
        $order->total_amount = (float) $order->total_amount;
        foreach ($items as $item) {
            $item->unit_price = (float) $item->unit_price;
            $item->subtotal = (float) $item->subtotal;
        }

        // Pedido personalizado (si existe)
        $customOrder = DB::select(
            "SELECT co.calculated_price, co.theme,
                    s.name AS size_name, f1.name AS flavor_name,
                    f2.name AS filling_name, f3.name AS frosting_name,
                    d.name AS decoration_name
             FROM custom_orders co
             JOIN sizes s ON co.size_id = s.id
             JOIN flavors f1 ON co.flavor_id = f1.id
             JOIN fillings f2 ON co.filling_id = f2.id
             JOIN frostings f3 ON co.frosting_id = f3.id
             JOIN decorations d ON co.decoration_id = d.id
             WHERE co.order_id = ?",
            [$id]
        );
        $customOrder = $customOrder ? $customOrder[0] : null;
        if ($customOrder) {
            $customOrder->calculated_price = (float) $customOrder->calculated_price;
        }

        // Preparar el objeto de etapa de producción
        $productionStage = null;
        if ($order->production_stage) {
            $productionStage = (object) [
                'stage' => $order->production_stage,
            ];
        }

        return Inertia::render('Orders/Show', [
            'order' => $order,
            'items' => $items,
            'customOrder' => $customOrder,
            'productionStage' => $productionStage,
        ]);
    }
}
