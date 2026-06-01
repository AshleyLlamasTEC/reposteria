<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Listado de órdenes con filtros y paginación para el panel administrativo.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $status = $request->input('status');
        $search = $request->input('search');
        $fechaDesde = $request->input('from_date');
        $fechaHasta = $request->input('to_date');
        $perPage = $request->input('per_page', 15);

        // Construcción de la consulta base
        $query = "SELECT o.id, o.order_number AS folio, o.total_amount AS total,
                         o.state AS status, o.created_at,
                         u.name AS user_name, u.email AS user_email,
                         ps.stage AS production_stage
                  FROM orders o
                  JOIN users u ON o.user_id = u.id
                  LEFT JOIN production_stages ps ON o.id = ps.order_id
                  WHERE 1=1";

        $bindings = [];

        // Filtro por estado
        if ($status) {
            $query .= " AND o.state = ?";
            $bindings[] = $status;
        }

        // Búsqueda por folio o cliente
        if ($search) {
            $query .= " AND (o.order_number LIKE ? OR u.name LIKE ? OR u.email LIKE ?)";
            $searchTerm = "%{$search}%";
            $bindings[] = $searchTerm;
            $bindings[] = $searchTerm;
            $bindings[] = $searchTerm;
        }

        // Rango de fechas
        if ($fechaDesde) {
            $query .= " AND o.created_at >= ?";
            $bindings[] = $fechaDesde . ' 00:00:00';
        }
        if ($fechaHasta) {
            $query .= " AND o.created_at <= ?";
            $bindings[] = $fechaHasta . ' 23:59:59';
        }

        $query .= " ORDER BY o.created_at DESC";

        // Paginación manual
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $perPage;

        // Total de registros
        $countQuery = "SELECT COUNT(*) AS total FROM orders o
                       JOIN users u ON o.user_id = u.id
                       WHERE 1=1";
        $countBindings = [];
        if ($status) {
            $countQuery .= " AND o.state = ?";
            $countBindings[] = $status;
        }
        if ($search) {
            $countQuery .= " AND (o.order_number LIKE ? OR u.name LIKE ? OR u.email LIKE ?)";
            $countBindings[] = "%{$search}%";
            $countBindings[] = "%{$search}%";
            $countBindings[] = "%{$search}%";
        }
        if ($fechaDesde) {
            $countQuery .= " AND o.created_at >= ?";
            $countBindings[] = $fechaDesde . ' 00:00:00';
        }
        if ($fechaHasta) {
            $countQuery .= " AND o.created_at <= ?";
            $countBindings[] = $fechaHasta . ' 23:59:59';
        }

        $totalResults = DB::select($countQuery, $countBindings)[0]->total;

        $query .= " LIMIT ? OFFSET ?";
        $bindings[] = $perPage;
        $bindings[] = $offset;

        $orders = DB::select($query, $bindings);

        // Formatear cada orden para que contenga el objeto user anidado
        $orders = collect($orders)->map(function ($order) {
            $order->user = (object) [
                'name' => $order->user_name,
                'email' => $order->user_email,
            ];
            unset($order->user_name, $order->user_email);
            return $order;
        });

        $paginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $orders,
            $totalResults,
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $paginator,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Detalle de una orden específica.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    /**
     * Muestra el detalle completo de una orden para el panel administrativo.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        // Obtener información base de la orden con datos del cliente
        $orderData = DB::select(
            "SELECT o.id,
                o.order_number AS folio,
                o.total_amount AS total,
                o.state AS status,
                o.created_at,
                o.updated_at,
                o.user_id
         FROM orders o
         WHERE o.id = ?",
            [$id]
        );

        if (empty($orderData)) {
            abort(404, 'Orden no encontrada');
        }

        $order = $orderData[0];
        $userId = $order->user_id;

        // ─── Métricas adicionales del pedido ───────────────────────────
        $metrics = DB::select(
            "SELECT SUM(quantity) AS total_articles,
                COUNT(DISTINCT product_id) AS distinct_products
         FROM order_items
         WHERE order_id = ?",
            [$id]
        );
        $order->total_articles = (int) $metrics[0]->total_articles;
        $order->distinct_products = (int) $metrics[0]->distinct_products;

        // ─── Información del cliente ──────────────────────────────────
        $customerData = DB::select(
            "SELECT u.id,
                u.name,
                u.email,
                u.created_at AS registered_at,
                COUNT(o2.id) AS total_orders,
                COALESCE(SUM(o2.total_amount), 0) AS total_spent
         FROM users u
         LEFT JOIN orders o2 ON o2.user_id = u.id
         WHERE u.id = ?
         GROUP BY u.id, u.name, u.email, u.created_at",
            [$userId]
        );

        $order->customer = !empty($customerData) ? (object) [
            'id' => $customerData[0]->id,
            'name' => $customerData[0]->name,
            'email' => $customerData[0]->email,
            'registered_at' => $customerData[0]->registered_at,
            'total_orders' => (int) $customerData[0]->total_orders,
            'total_spent' => (float) $customerData[0]->total_spent,
        ] : null;

        // ─── Ítems de la orden ────────────────────────────────────────
        $items = DB::select(
            "SELECT oi.product_id,
                p.name AS product_name,
                p.image_url,
                c.name AS category,
                oi.quantity,
                oi.unit_price,
                oi.subtotal,
                p.stock,
                p.id IS NOT NULL AS product_exists
         FROM order_items oi
         LEFT JOIN products p ON oi.product_id = p.id
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE oi.order_id = ?",
            [$id]
        );

        // Asegurar tipos numéricos
        $order->items = array_map(function ($item) {
            $item->quantity = (int) $item->quantity;
            $item->unit_price = (float) $item->unit_price;
            $item->subtotal = (float) $item->subtotal;
            $item->stock = $item->stock !== null ? (int) $item->stock : null;
            $item->product_exists = (bool) $item->product_exists;
            return $item;
        }, $items);

        // ─── Pedido personalizado ─────────────────────────────────────
        $customOrder = DB::select(
            "SELECT co.calculated_price,
                co.theme,
                s.name AS size_name,
                f1.name AS flavor_name,
                f2.name AS filling_name,
                f3.name AS frosting_name,
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

        $order->custom_order = !empty($customOrder) ? (object) [
            'size_name' => $customOrder[0]->size_name,
            'flavor_name' => $customOrder[0]->flavor_name,
            'filling_name' => $customOrder[0]->filling_name,
            'frosting_name' => $customOrder[0]->frosting_name,
            'decoration_name' => $customOrder[0]->decoration_name,
            'theme' => $customOrder[0]->theme,
            'calculated_price' => (float) $customOrder[0]->calculated_price,
        ] : null;

        // ─── Etapa de producción ─────────────────────────────────────
        $production = DB::select(
            "SELECT stage, started_at, completed_at
         FROM production_stages
         WHERE order_id = ?",
            [$id]
        );

        $order->production = !empty($production) ? (object) [
            'stage' => $production[0]->stage,
            'started_at' => $production[0]->started_at,
            'completed_at' => $production[0]->completed_at,
        ] : null;

        // ─── Historial de cambios de estado ──────────────────────────
        $history = DB::select(
            "SELECT ao.previous_state,
                ao.new_state,
                ao.changed_at,
                u.name AS user_name
         FROM audit_orders ao
         LEFT JOIN users u ON ao.user_id = u.id
         WHERE ao.order_id = ?
         ORDER BY ao.changed_at ASC",
            [$id]
        );

        $order->history = array_map(function ($entry) {
            return (object) [
                'previous_state' => $entry->previous_state,
                'new_state' => $entry->new_state,
                'changed_at' => $entry->changed_at,
                'user_name' => $entry->user_name,
            ];
        }, $history);

        // ─── Lista de estados disponibles (puede ser dinámica) ─────
        $availableStatuses = [
            'pending',
            'approved',
            'in_production',
            'ready',
            'delivered',
            'cancelled',
        ];

        // Valores convertidos a float para evitar problemas con decimales
        $order->total = (float) $order->total;

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'availableStatuses' => $availableStatuses,
        ]);
    }

    /**
     * Actualiza el estado de una orden usando el procedimiento almacenado.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,approved,in_production,ready,delivered,cancelled',
        ], [
            'status.required' => 'El nuevo estado es obligatorio.',
            'status.in' => 'Estado no válido.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $newState = $request->input('status');

        try {
            DB::statement('CALL sp_update_order_status(?, ?)', [$id, $newState]);
            return redirect()->route('admin.orders.show', $id)
                ->with('success', 'Estado de la orden actualizado correctamente.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al actualizar el estado: ' . $e->getMessage());
        }
    }

    /**
     * Intento de cancelación (solo pendientes) – funcionalidad no implementada completamente.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function cancel($id)
    {
        $order = DB::select("SELECT state FROM orders WHERE id = ?", [$id]);
        if (empty($order)) {
            abort(404);
        }

        if ($order[0]->state !== 'pending') {
            return back()->with('error', 'Solo se pueden cancelar órdenes en estado pendiente.');
        }

        // DB::statement('CALL sp_cancel_order(?)', [$id]);

        return back()->with('info', 'Funcionalidad de cancelación no implementada en esta versión.');
    }
}
