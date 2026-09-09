import React, { useState } from 'react';
import { SimulationState, ScreenId } from '../../types';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  Flame,
  ArrowRight,
  Plus,
} from 'lucide-react';

interface SCR02DashboardProps {
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const SCR02_Dashboard: React.FC<SCR02DashboardProps> = ({
  simulationState,
  onNavigate,
  onShowToast,
}) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  if (simulationState === 'loading') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse flex flex-col gap-6">
        <div className="h-10 w-64 bg-gray-200 rounded-xl mx-auto"></div>
        <div className="h-9 w-40 bg-gray-200 rounded-lg mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl h-80 border border-gray-200 p-6 flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 bg-gray-100 rounded-xl"></div>
          </div>
          <div className="bg-white rounded-2xl h-80 border border-gray-200 p-6 flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl h-44 border border-gray-200 p-6"></div>
      </div>
    );
  }

  if (simulationState === 'empty') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#007BFF] flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No hay transacciones registradas para este periodo
          </h2>
          <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
            Las métricas del KDS y ventas se actualizarán automáticamente una vez se reciba el primer pedido en mesa o delivery.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('SCR-03')}
              className="px-5 py-2.5 bg-[#007BFF] hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-sm transition-all"
            >
              Ir a Catálogo de Productos
            </button>
            <button
              onClick={() => onNavigate('SCR-05')}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-xl transition-all"
            >
              Simular Pedido de Prueba
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Titulo y Botón Centrados */}
        <div className="flex flex-col items-center text-center gap-4 w-full pt-2">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#FF6358] tracking-tight">
            Dashboard de Ventas
          </h1>
          <button
            onClick={() => onNavigate('SCR-03')}
            className="px-5 py-2 rounded-md bg-[#0070ea] hover:bg-[#0059bb] text-white font-medium text-sm transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
          >
            <span>Gestionar Productos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid Superior: 2 Tarjetas (Ventas Diarias y Ventas Mensuales) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Tarjeta 1: Ventas Diarias */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#b7131a] to-[#aa3438] px-6 py-3.5 flex items-center justify-between">
              <h2 className="text-white font-semibold text-base sm:text-lg tracking-wide">
                Ventas Diarias (Últimos 30 días)
              </h2>
              <span className="text-[11px] uppercase tracking-wider text-red-200 font-bold">
                KDS Realtime
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between gap-4">
              {/* Leyenda */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-3.5 bg-[#ea5455] rounded-sm inline-block border border-[#d63d3e]"></span>
                <span className="text-xs text-gray-600 font-medium">
                  Ventas Diarias ($ COP)
                </span>
              </div>

              {/* Grafico Cuadricula */}
              <div className="w-full flex items-stretch gap-2 h-64 relative">
                <div className="flex flex-col justify-between text-[11px] text-gray-500 font-medium py-1 text-right pr-2 select-none w-8">
                  <span>1,0</span>
                  <span>0,9</span>
                  <span>0,8</span>
                  <span>0,7</span>
                  <span>0,6</span>
                  <span>0,5</span>
                  <span>0,4</span>
                  <span>0,3</span>
                  <span>0,2</span>
                  <span>0,1</span>
                  <span>0</span>
                </div>

                <div className="flex-1 flex flex-col justify-between border-l border-b border-gray-300 py-1 relative">
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-gray-200"></div>
                  <div className="w-full border-b border-transparent"></div>

                  {/* Micro trend bars for realism */}
                  <div className="absolute inset-0 flex items-end justify-around px-2 pb-0.5 pointer-events-none opacity-60">
                    <div className="w-2 bg-[#ea5455]/40 rounded-t h-[15%]"></div>
                    <div className="w-2 bg-[#ea5455]/40 rounded-t h-[28%]"></div>
                    <div className="w-2 bg-[#ea5455]/40 rounded-t h-[12%]"></div>
                    <div className="w-2 bg-[#ea5455]/40 rounded-t h-[45%]"></div>
                    <div className="w-2 bg-[#ea5455]/40 rounded-t h-[30%]"></div>
                    <div className="w-2 bg-[#ea5455]/70 rounded-t h-[60%]"></div>
                    <div className="w-2 bg-[#ea5455]/50 rounded-t h-[35%]"></div>
                    <div className="w-2 bg-[#ea5455] rounded-t h-[75%] shadow-xs"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-100">
                <span>Día 01 - 30</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Ritmo estable de servicio
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Ventas Mensuales */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#b7131a] to-[#aa3438] px-6 py-3.5 flex items-center justify-between">
              <h2 className="text-white font-semibold text-base sm:text-lg tracking-wide">
                Ventas Mensuales (Últimos 12 meses)
              </h2>
              <span className="text-[11px] uppercase tracking-wider text-red-200 font-bold">
                Cierre Trimestral
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between gap-4">
              {/* Leyenda */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-3.5 bg-[#8b5a5a] rounded-sm inline-block border border-[#6b3f3f]"></span>
                <span className="text-xs text-gray-600 font-medium">
                  Ventas Mensuales ($ COP)
                </span>
              </div>

              {/* Grafico Area / Linea SVG interactivo */}
              <div className="w-full flex items-stretch gap-2 h-64 relative">
                <div className="flex flex-col justify-between text-[11px] text-gray-500 font-medium py-1 text-right pr-2 select-none w-8">
                  <span>120</span>
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>

                <div className="flex-1 flex flex-col justify-between border-l border-b border-gray-300 relative">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-b border-gray-200"></div>
                    <div className="w-full border-b border-gray-200"></div>
                    <div className="w-full border-b border-gray-200"></div>
                    <div className="w-full border-b border-gray-200"></div>
                    <div className="w-full border-b border-gray-200"></div>
                    <div className="w-full border-b border-gray-200"></div>
                    <div className="w-full border-b border-transparent"></div>
                  </div>

                  <svg
                    className="w-full h-full relative z-10"
                    preserveAspectRatio="none"
                    viewBox="0 0 300 180"
                  >
                    <defs>
                      <linearGradient
                        id="monthlyGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#8b5a5a" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b5a5a" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    <polygon
                      fill="url(#monthlyGradient)"
                      points="15,35 150,135 285,95 285,180 15,180"
                    ></polygon>
                    <polyline
                      fill="none"
                      points="15,35 150,135 285,95"
                      stroke="#60272b"
                      strokeWidth="2.5"
                    ></polyline>

                    {/* Interactive dots */}
                    <circle
                      cx="15"
                      cy="35"
                      fill="#60272b"
                      r="5.5"
                      className="cursor-pointer hover:scale-125 transition-transform"
                      onMouseEnter={() => setActivePoint(100)}
                    ></circle>
                    <circle
                      cx="150"
                      cy="135"
                      fill="#60272b"
                      r="5.5"
                      className="cursor-pointer hover:scale-125 transition-transform"
                      onMouseEnter={() => setActivePoint(28)}
                    ></circle>
                    <circle
                      cx="285"
                      cy="95"
                      fill="#60272b"
                      r="5.5"
                      className="cursor-pointer hover:scale-125 transition-transform"
                      onMouseEnter={() => setActivePoint(58)}
                    ></circle>
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pl-10 pr-2 pt-1 text-[11px] text-gray-600 font-medium">
                <span>2026-04</span>
                <span>2026-05</span>
                <span>2026-06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Inferior: Resumen de Ventas */}
        <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-[#b7131a] to-[#aa3438] px-6 py-3.5 flex items-center justify-between">
            <h2 className="text-white font-semibold text-base sm:text-lg tracking-wide">
              Resumen de Ventas
            </h2>
            <button
              onClick={() => onShowToast('Métricas de ventas actualizadas con éxito')}
              className="text-white/90 text-xs font-semibold hover:text-white underline"
            >
              Actualizar Datos
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 font-medium">
                  Total Ventas Hoy
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                  $0
                </span>
                <span className="text-[11px] text-gray-400">COP</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 font-medium">
                  Total Ventas Este Mes
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                  $0
                </span>
                <span className="text-[11px] text-gray-400">COP</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 font-medium">
                  Total Ventas Anuales
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                  $780.000
                </span>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  COP (+18.4%)
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600 font-medium">
                  Promedio Diario
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                  $0
                </span>
                <span className="text-[11px] text-gray-400">COP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Satellite Bento Cards for Operational Efficiency (Bento Matrix Expansion) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B1D24]">
                Eficiencia KDS
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900 tabular-nums">11.4</span>
                <span className="text-xs text-gray-500 font-medium">minutos promedio</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Salida de hamburguesas y waffles por encima del objetivo (&lt;15 min).
              </p>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[82%]"></div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#007BFF]">
                Plato Estrella
              </span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 block">
                Hamburguesa La Salvaje
              </span>
              <span className="text-xs text-gray-500 mt-0.5 block">
                142 órdenes servidas este ciclo • 41% de rotación
              </span>
            </div>
            <button
              onClick={() => onNavigate('SCR-03')}
              className="text-xs font-bold text-[#007BFF] hover:underline flex items-center gap-1 self-start"
            >
              <span>Ver ficha en catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Órdenes Pendientes
              </span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900 tabular-nums">4</span>
                <span className="text-xs text-amber-700 font-medium">en cocina en este momento</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Jose Rojas (#AG-4082) y Mariana Gómez (#AG-4083) en marcha.
              </p>
            </div>
            <button
              onClick={() => onNavigate('SCR-04')}
              className="text-xs font-bold text-[#8B1D24] hover:underline flex items-center gap-1 self-start"
            >
              <span>Abrir vista KDS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
