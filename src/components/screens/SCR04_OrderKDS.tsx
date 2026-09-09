import React, { useState } from 'react';
import { ClientOrder, DishStatus, SimulationState, ScreenId } from '../../types';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Printer,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  Filter,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';

interface SCR04OrderKDSProps {
  orders: ClientOrder[];
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  onUpdateDishStatus: (orderId: string, dishId: string, status: DishStatus) => void;
}

export const SCR04_OrderKDS: React.FC<SCR04OrderKDSProps> = ({
  orders,
  simulationState,
  onNavigate,
  onShowToast,
  onUpdateDishStatus,
}) => {
  const [filterDate, setFilterDate] = useState<'all' | 'today' | 'history'>('all');
  const [expandedHistory, setExpandedHistory] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const todayOrders = orders.filter((o) => o.isToday);
  const historyOrders = orders.filter((o) => !o.isToday);

  const handlePrintComanda = (code: string) => {
    onShowToast(`Imprimiendo comanda de cocina para ticket ${code}...`);
  };

  const handleWhatsapp = (phone: string, name: string) => {
    onShowToast(`Abriendo chat de WhatsApp con ${name} (+57 ${phone})`);
  };

  if (simulationState === 'loading') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse flex flex-col gap-6">
        <div className="h-12 bg-white rounded-2xl border border-gray-200 p-4"></div>
        <div className="h-10 bg-[#8B1D24]/20 rounded-xl"></div>
        <div className="bg-white rounded-2xl h-96 border border-gray-200 p-6 flex flex-col gap-4">
          <div className="h-12 bg-gray-100 rounded-xl"></div>
          <div className="h-16 bg-gray-50 rounded-xl"></div>
          <div className="h-16 bg-gray-50 rounded-xl"></div>
          <div className="h-16 bg-gray-50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (simulationState === 'empty' || orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#8B1D24] flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No hay órdenes registradas en el sistema KDS
          </h2>
          <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
            La pantalla de cocina y despacho mostrará automáticamente los tickets tan pronto los comensales confirmen sus selecciones.
          </p>
          <button
            onClick={() => onNavigate('SCR-05')}
            className="px-6 py-3 bg-[#007BFF] hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md transition-all"
          >
            Crear Pedido en Carrito
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Cabecera y Controles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#8B1D24] text-[11px] font-bold uppercase tracking-wider">
                Cocina & KDS
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-emerald-700 font-semibold">
                Sincronizado en Vivo
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
              Pedidos por Día y Despachos
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Control comanda por comanda, estado de cocción y tiempos de entrega.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-white p-1 rounded-xl border border-gray-200 shadow-xs text-xs font-semibold">
              <button
                onClick={() => setFilterDate('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDate === 'all'
                    ? 'bg-[#8B1D24] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todas las Fechas
              </button>
              <button
                onClick={() => setFilterDate('today')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDate === 'today'
                    ? 'bg-[#8B1D24] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hoy en Cocina ({todayOrders.length})
              </button>
              <button
                onClick={() => setFilterDate('history')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDate === 'history'
                    ? 'bg-[#8B1D24] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Histórico ({historyOrders.length})
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            GRUPO 1: FECHA HOY (30/06/2026) - EXACTO A IMAGE 7
            ======================================================== */}
        {(filterDate === 'all' || filterDate === 'today') && (
          <div className="flex flex-col gap-6">
            {/* Barra de Encabezado de Fecha Borgoña */}
            <div className="bg-[#8B1D24] text-white px-6 py-3 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-red-200" />
                <span className="font-bold text-sm sm:text-base tracking-wide">
                  Fecha: 30/06/2026
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
                  Hoy en Cocina
                </span>
              </div>
              <span className="text-xs text-red-200 font-medium">
                {todayOrders.length} órdenes registradas
              </span>
            </div>

            {/* Tarjeta Detallada de Jose Rojas (#AG-4082) */}
            {todayOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Cabecera del Cliente */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900">
                          {order.clientName}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                          {order.clientType}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {order.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {order.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {order.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones y Metadatos */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{order.time}</span>
                    </div>

                    <span className="font-mono text-sm font-bold text-[#8B1D24]">
                      {order.code}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleWhatsapp(order.phone, order.clientName)}
                        className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Contactar vía WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePrintComanda(order.code)}
                        className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                        title="Imprimir Comanda de Cocina"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lista de Platos con Selector de Estado Individual */}
                <div className="divide-y divide-gray-100 p-6 flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Platillos Solicitados en Comanda
                  </h4>

                  {order.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">
                            {dish.name}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">
                            - Cantidad: {dish.quantity} • ${dish.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Selector de Estado del Platillo */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <select
                          value={dish.status}
                          onChange={(e) => {
                            const newStatus = e.target.value as DishStatus;
                            onUpdateDishStatus(order.id, dish.id, newStatus);
                            onShowToast(
                              `Estado de "${dish.name}" actualizado a "${newStatus.toUpperCase()}"`
                            );
                          }}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border shadow-2xs transition-all cursor-pointer focus:outline-none ${
                            dish.status === 'pendiente'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : dish.status === 'preparacion'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <option value="pendiente">Pendiente ⏳</option>
                          <option value="preparacion">En Preparación 🍳</option>
                          <option value="entregado">Entregado ✓</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pie de Orden: Total */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-semibold text-gray-600">
                      Método: Pago Contraentrega
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">
                      Total de la orden:
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900 tabular-nums">
                      ${order.total.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            GRUPO 2: HISTÓRICO (25/05/2026) - ACORDEÓN SEGÚN IMAGE 7
            ======================================================== */}
        {(filterDate === 'all' || filterDate === 'history') && (
          <div className="flex flex-col gap-4 mt-2">
            <div
              onClick={() => setExpandedHistory(!expandedHistory)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="font-bold text-sm sm:text-base">
                  Fecha: 25/05/2026
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                  {historyOrders.length} órdenes finalizadas
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs font-semibold">
                <span>{expandedHistory ? 'Ocultar' : 'Expandir'}</span>
                {expandedHistory ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>

            {expandedHistory && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {historyOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#8B1D24]">
                          {ord.code}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-400">
                          {ord.time}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mt-1">
                        {ord.clientName}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{ord.address}</p>

                      <div className="mt-3 pt-2 border-t border-gray-100">
                        {ord.dishes.map((d) => (
                          <div
                            key={d.id}
                            className="text-xs text-gray-700 flex justify-between"
                          >
                            <span>{d.name}</span>
                            <span className="font-semibold tabular-nums">
                              ${d.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Despachado
                      </span>
                      <span className="font-bold text-gray-900">
                        ${ord.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
