import { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import PageHeader from "@/Components/Admin/Shared/PageHeader";
import Card from "@/Components/ui/Card";
import Badge from "@/Components/ui/Badge";
import Button from "@/Components/ui/Button";
import { statusLabels, statusColors } from "@/Utils/status.colors";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import {
  Printer,
  RefreshCw,
  ChevronDown,
  User,
  Mail,
  StickyNote,
  CreditCard,
  Package,
  Cake,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  RotateCw,
} from "lucide-react";
import { Menu } from "@ark-ui/react/menu";
import { motion, AnimatePresence } from "framer-motion";

// ─── Helpers locales ──────────────────────────────────────────────────────

/**
 * Formatea una fecha ISO a formato legible con hora.
 * Ejemplo: "31 may 2026, 15:30"
 */
function formatDateTime(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Fecha inválida";
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const SKELETON_CLASS = "animate-pulse bg-gray-200 rounded";

// ─── Subcomponentes ───────────────────────────────────────────────────────

function Skeleton({ className = "" }) {
  return <div className={`${SKELETON_CLASS} ${className}`} />;
}

function MetricCard({ label, value, icon: Icon, accent = "text-gray-700" }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-pink-500" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-lg font-bold ${accent}`}>{value}</p>
      </div>
    </div>
  );
}

// ─── SECCIÓN 1: Resumen del pedido ──────────────────────────────────────
function OrderSummary({ order, loading }) {
  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Resumen del Pedido</h3>
        {loading ? (
          <Skeleton className="w-24 h-8 rounded-full" />
        ) : (
          <Badge status={order.status}>{statusLabels[order.status]}</Badge>
        )}
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Total"
            value={formatCurrency(order.total)}
            icon={CreditCard}
            accent="text-pink-600"
          />
          <MetricCard
            label="Artículos"
            value={`${order.total_articles} unidades`}
            icon={Package}
          />
          <MetricCard
            label="Productos distintos"
            value={order.distinct_products}
            icon={Package}
          />
          <MetricCard
            label="Fecha"
            value={formatDate(order.created_at)}
            icon={Clock}
          />
        </div>
      )}
    </Card>
  );
}

// ─── SECCIÓN 2: Información del cliente ──────────────────────────────────
function CustomerInfo({ customer, loading }) {
  if (loading) {
    return (
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Cliente</h3>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }
  if (!customer) return null;

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-pink-500" /> Información del Cliente
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Nombre</span>
          <span className="font-medium">{customer.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Email</span>
          <span className="font-medium">{customer.email}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Cliente desde</span>
          <span className="font-medium">{formatDate(customer.registered_at)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Total histórico</span>
          <span className="font-medium text-pink-600">
            {formatCurrency(customer.total_spent)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Pedidos totales</span>
          <span className="font-medium">{customer.total_orders}</span>
        </div>
      </div>
    </Card>
  );
}

// ─── SECCIÓN 3: Productos del pedido ────────────────────────────────────
function ProductsTable({ items, loading }) {
  if (loading) {
    return (
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Productos</h3>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full mb-2" />
        ))}
      </Card>
    );
  }
  if (!items.length) {
    return (
      <Card className="mb-6 text-center py-6 text-gray-500">
        <Package className="mx-auto w-8 h-8 mb-2" />
        <p>No hay productos en este pedido.</p>
      </Card>
    );
  }

  return (
    <Card className="mb-6 overflow-hidden">
      <h3 className="text-lg font-semibold px-6 py-4 border-b border-gray-100">
        Productos Comprados
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2 text-center">Cant.</th>
              <th className="px-4 py-2 text-right">Precio</th>
              <th className="px-4 py-2 text-right">Subtotal</th>
              <th className="px-4 py-2 text-center">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-pink-50/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image_url ?? "/images/default-cake.jpg"}
                      alt={item.product_name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback = document.createElement("div");
                        fallback.className =
                          "w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-lg";
                        fallback.innerHTML = "🎂";
                        e.target.parentNode.appendChild(fallback);
                      }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product_name}
                      </p>
                      {item.category && (
                        <p className="text-xs text-gray-400">{item.category}</p>
                      )}
                      {!item.product_exists && (
                        <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                          <AlertTriangle className="w-3 h-3" /> Producto eliminado
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(item.unit_price)}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {formatCurrency(item.subtotal)}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.stock !== null ? (
                    <span
                      className={`text-xs font-medium ${
                        item.stock === 0
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.stock}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center text-sm font-medium">
        <span>Total</span>
        <span className="text-pink-600 font-bold text-lg">
          {formatCurrency(
            items.reduce((acc, i) => acc + i.subtotal, 0)
          )}
        </span>
      </div>
    </Card>
  );
}

// ─── SECCIÓN 4: Personalizaciones ───────────────────────────────────────
function CustomizationCard({ customOrder, loading }) {
  if (loading) {
    return (
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Personalización</h3>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-8 rounded" />
          ))}
        </div>
      </Card>
    );
  }
  if (!customOrder) return null;

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Cake className="w-5 h-5 text-pink-500" /> Pastel Personalizado
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Tamaño</span>
          <span className="font-medium">{customOrder.size_name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Sabor</span>
          <span className="font-medium">{customOrder.flavor_name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Relleno</span>
          <span className="font-medium">{customOrder.filling_name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Betún</span>
          <span className="font-medium">{customOrder.frosting_name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Decoración</span>
          <span className="font-medium">{customOrder.decoration_name}</span>
        </div>
        {customOrder.theme && (
          <div className="flex flex-col sm:col-span-2">
            <span className="text-xs text-gray-500">Tema</span>
            <span className="font-medium">{customOrder.theme}</span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Precio calculado</span>
          <span className="font-medium text-pink-600">
            {formatCurrency(customOrder.calculated_price)}
          </span>
        </div>
      </div>
    </Card>
  );
}

// ─── SECCIÓN 5: Producción ──────────────────────────────────────────────
function ProductionStepper({ production, loading }) {
  if (loading) {
    return (
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Producción</h3>
        <Skeleton className="h-16 w-full rounded" />
      </Card>
    );
  }
  if (!production) return null;

  const steps = [
    { key: "queued", label: "En cola" },
    { key: "in_progress", label: "En producción" },
    { key: "ready", label: "Listo" },
    { key: "delivered", label: "Entregado" },
  ];
  const currentIdx = steps.findIndex((s) => s.key === production.stage);

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-pink-500" /> Progreso de la Producción
      </h3>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {steps.map((step, idx) => (
          <div key={step.key} className="flex items-center gap-2 w-full">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  idx <= currentIdx
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {idx <= currentIdx ? <CheckCircle className="w-5 h-5" /> : idx + 1}
              </div>
              <span className="text-xs mt-1 text-center">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  idx < currentIdx ? "bg-pink-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {production.started_at && (
        <p className="text-sm text-gray-500 mt-4">
          Inicio: {formatDateTime(production.started_at)}
        </p>
      )}
      {production.completed_at && (
        <p className="text-sm text-gray-500">
          Finalizado: {formatDateTime(production.completed_at)}
        </p>
      )}
    </Card>
  );
}

// ─── SECCIÓN 6: Historial de cambios de estado ─────────────────────────
function AuditTimeline({ history, loading }) {
  if (loading) {
    return (
      <Card className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Historial de Estados</h3>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full mb-2" />
        ))}
      </Card>
    );
  }
  if (!history?.length) {
    return (
      <Card className="mb-6 text-center py-6 text-gray-500">
        <Clock className="mx-auto w-8 h-8 mb-2" />
        <p>Sin cambios registrados.</p>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-pink-500" /> Historial de Estados
      </h3>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
        <ul className="space-y-4">
          {history.map((entry, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="relative z-10 w-6 h-6 bg-white border-2 border-pink-500 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge status={entry.previous_state}>
                    {statusLabels[entry.previous_state] ?? "N/A"}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Badge status={entry.new_state}>
                    {statusLabels[entry.new_state] ?? "N/A"}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDateTime(entry.changed_at)}
                  {entry.user_name && ` por ${entry.user_name}`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

// ─── SECCIÓN 7: Acciones administrativas ────────────────────────────────
function AdminActions({ order, availableStatuses, updateStatus, loading }) {
  if (loading) {
    return (
      <Card className="mb-6">
        <Skeleton className="h-8 w-full mb-3" />
        <Skeleton className="h-8 w-full" />
      </Card>
    );
  }
  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <RotateCw className="w-5 h-5 text-pink-500" /> Acciones Administrativas
      </h3>
      <div className="flex flex-col gap-3">
        {/* Actualizar estado */}
        <Menu.Root positioning={{ placement: "bottom-start" }}>
          <Menu.Trigger asChild>
            <Button className="w-full justify-between group">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Actualizar estado
              </span>
              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className="bg-white border border-gray-200 rounded-lg shadow-xl outline-none min-w-[200px] p-1 z-50">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Seleccionar nuevo estado
              </div>
              {availableStatuses.map((statusKey) => (
                <Menu.Item
                  key={statusKey}
                  value={statusKey}
                  onClick={() => updateStatus(statusKey)}
                  disabled={order.status === statusKey}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 rounded-md cursor-pointer data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed transition-colors"
                >
                  {statusLabels[statusKey]}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

        {/* Imprimir */}
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={() => window.print()}
        >
          <Printer className="w-4 h-4" /> Imprimir recibo
        </Button>

        {/* Placeholder para exportar PDF */}
        <Button variant="secondary" className="w-full justify-start gap-2" disabled>
          <Download className="w-4 h-4" /> Exportar PDF (próximamente)
        </Button>
      </div>
    </Card>
  );
}

// ─── COMPONENTE PRINCIPAL ───────────────────────────────────────────────
export default function ShowOrder({
  order = {},
  availableStatuses = Object.keys(statusLabels),
}) {
  const import { useState, useMemo } from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import PageHeader from "@/Components/Admin/Shared/PageHeader";
import Card from "@/Components/ui/Card";
import Badge from "@/Components/ui/Badge";
import Button from "@/Components/ui/Button";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Clock,
  Package,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Loader2,
  Cake,
  Truck,
  CheckCircle,
  XCircle,
  ClipboardList,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { statusLabels } from "@/Utils/status.colors";
import { formatCurrency, formatDate } from "@/Utils/formatters";

// ─── Helpers ──────────────────────────────────────────────────────────
function formatDateTime(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Fecha inválida";
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── StatCard ──────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent = "text-gray-700", footer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
    >
      <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-pink-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 truncate">{title}</p>
        <p className={`text-2xl font-extrabold mt-1 ${accent}`}>{value}</p>
        {footer && <p className="text-xs text-gray-400 mt-1">{footer}</p>}
      </div>
    </motion.div>
  );
}

// ─── QuickMetricCard ──────────────────────────────────────────────────
function QuickMetricCard({ label, count, icon: Icon, color = "text-gray-700", bg = "bg-gray-50" }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${bg}`}>
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800">{count}</p>
      </div>
    </div>
  );
}

// ─── SalesChart (últimos 7 días) ──────────────────────────────────────
function SalesChart({ data = [] }) {
  const maxValue = useMemo(
    () => Math.max(...data.map((d) => d.total), 1),
    [data]
  );

  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-pink-500" /> Ventas últimos 7 días
        </h3>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <TrendingUp className="mx-auto w-8 h-8 mb-2" />
          <p>No hay ventas en este periodo.</p>
        </div>
      ) : (
        <div className="flex items-end gap-2 h-40">
          {data.map((day, idx) => {
            const heightPercent = (day.total / maxValue) * 100;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1"
                title={`${day.date}: ${formatCurrency(day.total)}`}
              >
                <span className="text-xs text-gray-500">
                  {formatCurrency(day.total)}
                </span>
                <div
                  className="w-full bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-lg transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs text-gray-400">
                  {new Date(day.date + "T00:00:00").toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

// ─── RecentOrders ──────────────────────────────────────────────────────
function RecentOrders({ orders = [] }) {
  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-pink-500" /> Pedidos recientes
        </h3>
        <Link
          href={route("admin.orders.index")}
          className="text-sm text-pink-600 hover:underline flex items-center gap-1"
        >
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <ShoppingBag className="mx-auto w-8 h-8 mb-2" />
          <p>No hay pedidos recientes.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 uppercase text-xs bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Pedido</th>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-center">Estado</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <Link
                      href={route("admin.orders.show", order.id)}
                      className="text-pink-600 hover:underline"
                    >
                      #{order.folio}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-800">{order.customer?.name}</p>
                    <p className="text-xs text-gray-400">{order.customer?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge status={order.status}>
                      {statusLabels[order.status] ?? order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500 text-xs">
                    {formatDate(order.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

// ─── TopProducts ──────────────────────────────────────────────────────
function TopProducts({ products = [] }) {
  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Cake className="w-5 h-5 text-pink-500" /> Productos más vendidos
      </h3>
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Package className="mx-auto w-8 h-8 mb-2" />
          <p>No hay datos de ventas.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((product, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
            >
              <div>
                <p className="font-medium text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">
                  {product.quantity} vendidos
                </p>
              </div>
              <span className="font-bold text-pink-600">
                {formatCurrency(product.revenue)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

// ─── ProductionOverview ───────────────────────────────────────────────
function ProductionOverview({ production = {} }) {
  const items = [
    { key: "pending", label: "Pendientes", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { key: "approved", label: "Aprobados", icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-50" },
    { key: "in_production", label: "En producción", icon: RefreshCw, color: "text-indigo-500", bg: "bg-indigo-50" },
    { key: "ready", label: "Listos", icon: Package, color: "text-green-500", bg: "bg-green-50" },
    { key: "delivered", label: "Entregados", icon: Truck, color: "text-purple-500", bg: "bg-purple-50" },
    { key: "cancelled", label: "Cancelados", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <RefreshCw className="w-5 h-5 text-pink-500" /> Estado de producción
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item) => (
          <QuickMetricCard
            key={item.key}
            label={item.label}
            count={production[item.key] ?? 0}
            icon={item.icon}
            color={item.color}
            bg={item.bg}
          />
        ))}
      </div>
    </Card>
  );
}

// ─── AlertsSection ────────────────────────────────────────────────────
function AlertsSection({ alerts = [] }) {
  if (alerts.length === 0) return null;

  const typeStyles = {
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    danger: "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <Card className="mb-6 border-l-4 border-l-pink-500">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-pink-500" /> Atención requerida
      </h3>
      <ul className="space-y-2">
        {alerts.map((alert, idx) => (
          <li
            key={idx}
            className={`px-4 py-2 rounded-lg border text-sm ${typeStyles[alert.type] || ""}`}
          >
            {alert.message}
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ─── Main Dashboard Component ────────────────────────────────────────
export default function Dashboard({
  stats = {},
  salesLast7Days = [],
  recentOrders = [],
  topProducts = [],
  productionStatus = {},
  alerts = [],
}) {
  const isLoading = !stats || Object.keys(stats).length === 0;

  if (isLoading) {
    return (
      <AdminLayout>
        <PageHeader title="Dashboard" subtitle="Cargando métricas..." />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Centro de control de tu pastelería"
      />

      {/* KPIs principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Usuarios totales"
          value={stats.totalUsers}
          icon={Users}
          footer={`${stats.usersThisMonth} este mes`}
        />
        <StatCard
          title="Pedidos totales"
          value={stats.totalOrders}
          icon={ShoppingBag}
          accent="text-blue-600"
        />
        <StatCard
          title="Ingresos totales"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          accent="text-green-600"
          footer={`Ticket promedio: ${formatCurrency(stats.averageTicket)}`}
        />
        <StatCard
          title="Pendientes"
          value={stats.pendingOrders}
          icon={Clock}
          accent="text-amber-600"
          footer={`${stats.approvedOrders} aprobados`}
        />
      </div>

      {/* Segunda fila de métricas rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <QuickMetricCard label="En producción" count={stats.inProductionOrders} icon={RefreshCw} color="text-indigo-500" bg="bg-indigo-50" />
        <QuickMetricCard label="Listos" count={stats.readyOrders} icon={CheckCircle} color="text-green-500" bg="bg-green-50" />
        <QuickMetricCard label="Entregados" count={stats.deliveredOrders} icon={Truck} color="text-purple-500" bg="bg-purple-50" />
        <QuickMetricCard label="Cancelados" count={stats.cancelledOrders} icon={XCircle} color="text-red-500" bg="bg-red-50" />
        <QuickMetricCard label="Productos activos" count={stats.activeProducts} icon={Package} />
        <QuickMetricCard label="Sin stock" count={stats.outOfStockProducts} icon={AlertTriangle} color="text-red-500" bg="bg-red-50" />
      </div>

      {/* Alertas */}
      <AlertsSection alerts={alerts} />

      {/* Gráfico de ventas + Top productos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesLast7Days} />
          <RecentOrders orders={recentOrders} />
        </div>
        <div>
          <TopProducts products={topProducts} />
          <ProductionOverview production={productionStatus} />
        </div>
      </div>
    </AdminLayout>
  );
}loading = !order || !order.id; // Si no hay ID, asumimos carga

  const updateStatus = (newStatus) => {
    router.put(
      route("admin.orders.update-status", order.id),
      { status: newStatus },
      { preserveScroll: true }
    );
  };

  return (
    <AdminLayout>
      <PageHeader
        title={loading ? "Cargando..." : `Pedido #${order.folio || "N/A"}`}
        subtitle={
          loading
            ? "Obteniendo detalles..."
            : `Realizado el ${formatDate(order.created_at)}`
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          <OrderSummary order={order} loading={loading} />
          <ProductsTable items={order.items} loading={loading} />
          <CustomizationCard customOrder={order.custom_order} loading={loading} />
          <ProductionStepper production={order.production} loading={loading} />
          <AuditTimeline history={order.history} loading={loading} />
        </div>

        {/* Columna lateral */}
        <aside className="space-y-6">
          <CustomerInfo customer={order.customer} loading={loading} />
          <AdminActions
            order={order}
            availableStatuses={availableStatuses}
            updateStatus={updateStatus}
            loading={loading}
          />
        </aside>
      </div>
    </AdminLayout>
  );
}
