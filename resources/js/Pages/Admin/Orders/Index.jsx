import { useState, useEffect, useMemo } from "react";
import { usePage, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import PageHeader from "@/Components/Admin/Shared/PageHeader";
import DataTable from "@/Components/Admin/Tables/DataTable";
import Badge from "@/Components/ui/Badge";
import { statusLabels } from "@/Utils/status.colors";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { Eye } from "lucide-react";

// Integración de Ark UI para tooltips accesibles
import { Tooltip } from "@ark-ui/react/tooltip";

export default function OrdersIndex() {
    const { orders = { data: [] }, filters = {} } = usePage().props;

    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "");

    // 1. OPTIMIZACIÓN: Sincronizar filtros con el backend usando Inertia
    useEffect(() => {
        // Usamos un pequeño "debounce" nativo para no saturar el servidor en cada tecla
        const timeoutId = setTimeout(() => {
            const query = {};
            if (search) query.search = search;
            if (statusFilter) query.status = statusFilter;

            // Hacemos la petición a la misma ruta actualizando la URL y los datos
            router.get(route(route().current()), query, {
                preserveState: true, // Mantiene el estado de los inputs
                preserveScroll: true, // Evita que la página salte hacia arriba
                replace: true, // Reemplaza el historial en lugar de apilarlo
            });
        }, 300); // Espera 300ms después de que el usuario deja de escribir

        return () => clearTimeout(timeoutId);
    }, [search, statusFilter]);

    // 2. OPTIMIZACIÓN: Memorizar las columnas
    // Si no usamos useMemo, este arreglo se recrea en CADA re-render,
    // lo que hace que el DataTable se vuelva a pintar innecesariamente.
    const columns = useMemo(
        () => [
            {
                key: "folio",
                label: "Folio",
                render: (order) => (
                    <span className="font-medium text-gray-900">
                        #{order.folio}
                    </span>
                ),
            },
            {
                key: "user",
                label: "Cliente",
                render: (order) =>
                    order.user?.name || (
                        <span className="text-gray-400">N/A</span>
                    ),
            },
            {
                key: "total",
                label: "Total",
                render: (order) => (
                    <span className="font-semibold text-gray-700">
                        {formatCurrency(order.total)}
                    </span>
                ),
            },
            {
                key: "status",
                label: "Estado",
                render: (order) => (
                    <Badge status={order.status}>
                        {statusLabels[order.status]}
                    </Badge>
                ),
            },
            {
                key: "created_at",
                label: "Fecha",
                render: (order) => (
                    <span className="text-sm text-gray-500">
                        {formatDate(order.created_at)}
                    </span>
                ),
            },
            {
                key: "actions",
                label: "",
                render: (order) => (
                    // 3. ARK UI: Reemplazamos el title nativo con un Tooltip accesible y estilizado
                    <Tooltip.Root openDelay={200} closeDelay={100}>
                        <Tooltip.Trigger asChild>
                            <Link
                                href={route("admin.orders.show", order.id)}
                                className="inline-flex p-2 rounded-lg text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500"
                            >
                                <Eye className="w-4 h-4" />
                            </Link>
                        </Tooltip.Trigger>
                        <Tooltip.Positioner>
                            <Tooltip.Content className="bg-gray-800 text-white text-xs px-2 py-1.5 rounded shadow-lg z-50">
                                <Tooltip.Arrow className="fill-gray-800" />
                                Ver detalles del pedido
                            </Tooltip.Content>
                        </Tooltip.Positioner>
                    </Tooltip.Root>
                ),
            },
        ],
        [],
    ); // Las dependencias están vacías porque las funciones de render solo dependen de los argumentos que reciben.

    return (
        <AdminLayout>
            <PageHeader
                title="Pedidos"
                subtitle="Gestión completa de pedidos"
            />

            <DataTable
                columns={columns}
                data={orders.data}
                pagination={orders}
                searchValue={search}
                onSearchChange={setSearch}
                filters={{ status: statusFilter }}
                onFilterChange={(key, value) => {
                    if (key === "status") setStatusFilter(value);
                }}
            />
        </AdminLayout>
    );
}
