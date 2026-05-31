<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::admin('Dashboard/Index', [
            'stats' => [
                'totalUsers' => 125,
                'totalOrders' => 48,
                'totalRevenue' => '3,450',
                'pendingOrders' => 12
            ],
            'recentOrders' => []
        ]);
    }
}
