<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // ─── MÉTRICAS PRINCIPALES ───────────────────────────────────────
        $totalUsers = DB::table('users')->count();

        $totalOrders = DB::table('orders')->count();

        $totalRevenue = DB::table('orders')
            ->whereNotIn('state', ['cancelled'])
            ->sum('total_amount');

        $pendingOrders = DB::table('orders')
            ->where('state', 'pending')
            ->count();

        $inProductionOrders = DB::table('orders')
            ->where('state', 'in_production')
            ->count();

        $readyOrders = DB::table('orders')
            ->where('state', 'ready')
            ->count();

        $deliveredOrders = DB::table('orders')
            ->where('state', 'delivered')
            ->count();

        $cancelledOrders = DB::table('orders')
            ->where('state', 'cancelled')
            ->count();

        $approvedOrders = DB::table('orders')
            ->where('state', 'approved')
            ->count();

        $activeProducts = DB::table('products')
            ->where('active', 1)
            ->count();

        $outOfStockProducts = DB::table('products')
            ->where('active', 1)
            ->where('stock', '<=', 0)
            ->count();

        $averageTicket = DB::table('orders')
            ->whereNotIn('state', ['cancelled'])
            ->avg('total_amount');

        // Usuarios registrados este mes
        $usersThisMonth = DB::table('users')
            ->whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();

        // ─── VENTAS ÚLTIMOS 7 DÍAS ──────────────────────────────────────
        $salesLast7Days = DB::table('orders')
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->where('created_at', '>=', now()->subDays(7)->startOfDay())
            ->whereNotIn('state', ['cancelled'])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn ($row) => [
                'date' => $row->date,
                'total' => (float) $row->total,
            ]);

        // ─── PEDIDOS RECIENTES ──────────────────────────────────────────
        $recentOrders = DB::table('orders')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select(
                'orders.id',
                'orders.order_number as folio',
                'users.name as customer_name',
                'users.email as customer_email',
                'orders.state as status',
                'orders.total_amount as total',
                'orders.created_at'
            )
            ->orderBy('orders.created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'folio' => $order->folio,
                    'customer' => [
                        'name' => $order->customer_name,
                        'email' => $order->customer_email,
                    ],
                    'status' => $order->status,
                    'total' => (float) $order->total,
                    'created_at' => $order->created_at,
                ];
            });

        // ─── TOP 5 PRODUCTOS MÁS VENDIDOS ─────────────────────────────
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->whereNotIn('orders.state', ['cancelled'])
            ->select(
                'products.name',
                DB::raw('SUM(order_items.quantity) as total_quantity'),
                DB::raw('SUM(order_items.subtotal) as total_revenue')
            )
            ->groupBy('products.id', 'products.name')
            ->orderByDesc('total_quantity')
            ->limit(5)
            ->get()
            ->map(fn ($row) => [
                'name' => $row->name,
                'quantity' => (int) $row->total_quantity,
                'revenue' => (float) $row->total_revenue,
            ]);

        // ─── PRODUCCIÓN POR ESTADO ──────────────────────────────────────
        $productionStatus = [
            'pending' => $pendingOrders,
            'approved' => $approvedOrders,
            'in_production' => $inProductionOrders,
            'ready' => $readyOrders,
            'delivered' => $deliveredOrders,
            'cancelled' => $cancelledOrders,
        ];

        // ─── ALERTAS OPERATIVAS ─────────────────────────────────────────
        $alerts = [];

        if ($outOfStockProducts > 0) {
            $alerts[] = [
                'type' => 'warning',
                'message' => "Hay {$outOfStockProducts} producto(s) sin stock.",
            ];
        }

        if ($pendingOrders > 0) {
            $alerts[] = [
                'type' => 'info',
                'message' => "{$pendingOrders} pedido(s) pendiente(s) por revisar.",
            ];
        }

        // Pedidos en producción por más de 24 horas (posible atasco)
        $stuckInProduction = DB::table('orders')
            ->join('production_stages', 'orders.id', '=', 'production_stages.order_id')
            ->where('orders.state', 'in_production')
            ->where('production_stages.started_at', '<=', now()->subHours(24))
            ->count();

        if ($stuckInProduction > 0) {
            $alerts[] = [
                'type' => 'danger',
                'message' => "{$stuckInProduction} pedido(s) atorados en producción por más de 24 horas.",
            ];
        }

        // Productos con stock bajo (menos de 5)
        $lowStockProducts = DB::table('products')
            ->where('active', 1)
            ->where('stock', '>', 0)
            ->where('stock', '<=', 5)
            ->count();

        if ($lowStockProducts > 0) {
            $alerts[] = [
                'type' => 'warning',
                'message' => "{$lowStockProducts} producto(s) con stock bajo (≤5 unidades).",
            ];
        }

        return Inertia::render('Admin/Dashboard/Index', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalOrders' => $totalOrders,
                'totalRevenue' => (float) $totalRevenue,
                'pendingOrders' => $pendingOrders,
                'inProductionOrders' => $inProductionOrders,
                'readyOrders' => $readyOrders,
                'deliveredOrders' => $deliveredOrders,
                'cancelledOrders' => $cancelledOrders,
                'approvedOrders' => $approvedOrders,
                'activeProducts' => $activeProducts,
                'outOfStockProducts' => $outOfStockProducts,
                'averageTicket' => (float) $averageTicket,
                'usersThisMonth' => $usersThisMonth,
                'lowStockProducts' => $lowStockProducts,
            ],
            'salesLast7Days' => $salesLast7Days,
            'recentOrders' => $recentOrders,
            'topProducts' => $topProducts,
            'productionStatus' => $productionStatus,
            'alerts' => $alerts,
        ]);
    }
}
