import React from 'react';
import { AppView, ItemRecord, SimulationState } from '../../types';
import {
  Boxes,
  TrendingUp,
  Flame,
  Clock,
  ArrowUpRight,
  Plus,
  Kanban,
  Settings,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
  DollarSign,
} from 'lucide-react';

interface DashboardViewProps {
  items: ItemRecord[];
  loading: boolean;
  simulationState: SimulationState;
  onNavigate: (view: AppView) => void;
  onSelectItem: (item: ItemRecord) => void;
  onRetry: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  items,
  loading,
  simulationState,
  onNavigate,
  onSelectItem,
  onRetry,
}) => {
  if (simulationState === 'error') {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-12">
        <div className="p-8 rounded-3xl bg-[#1e293b] border border-rose-500/40 shadow-2xl">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Error de Sincronización con PostgreSQL</h2>
          <p className="text-sm text-slate-300 mb-6">
            Ocurrió un problema al consultar la base de datos o verificar las políticas de RLS.
          </p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar Conexión
          </button>
        </div>
      </div>
    );
  }

  // Calculate high-level KPIs
  const totalItems = items.length;
  const activeItems = items.filter((i) => i.status === 'active').length;
  const inProgressItems = items.filter((i) => i.status === 'in-progress').length;
  const totalInventoryValue = items.reduce((acc, i) => acc + i.price * i.stock, 0);
  const avgMargin =
    items.length > 0
      ? Math.round(
          items.reduce((acc, i) => acc + ((i.price - i.cost) / (i.price || 1)) * 100, 0) /
            items.length
        )
      : 58;

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner / Header Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#1e293b] via-[#1e293b] to-indigo-950/40 border border-[#334155] rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Cloud SQL · PostgreSQL
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sincronización en Tiempo Real
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Panel de Control & Métricas KDS
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Gestión centralizada del catálogo gastronómico Amapola, control de costos, inventario y
            órdenes en línea de producción.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('items-list')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
          >
            <Kanban className="w-4 h-4 text-indigo-400" />
            <span>Ver Tablero Kanban</span>
          </button>
          <button
            onClick={() => onNavigate('item-create')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-500 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Registro Wizard</span>
          </button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Registros Totales */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Registros en Catálogo
            </span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-800 animate-pulse rounded my-2" />
          ) : (
            <div className="text-3xl font-black text-white font-mono mt-2">{totalItems}</div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{activeItems} activos en KDS</span>
          </div>
        </div>

        {/* KPI 2: Valor Estimado de Inventario */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Valor de Inventario
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-28 bg-slate-800 animate-pulse rounded my-2" />
          ) : (
            <div className="text-2xl font-black text-emerald-400 font-mono mt-2">
              ${totalInventoryValue.toLocaleString('es-CO')}
            </div>
          )}
          <div className="text-xs text-slate-400 mt-1 font-medium">
            Precio unitario ponderado
          </div>
        </div>

        {/* KPI 3: Margen Promedio */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Margen de Utilidad
            </span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-800 animate-pulse rounded my-2" />
          ) : (
            <div className="text-3xl font-black text-violet-400 font-mono mt-2">{avgMargin}%</div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
            <span>Optimizado para alta gastronomía</span>
          </div>
        </div>

        {/* KPI 4: Órdenes en Cocina */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              En Producción KDS
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-800 animate-pulse rounded my-2" />
          ) : (
            <div className="text-3xl font-black text-amber-400 font-mono mt-2">
              {inProgressItems + 3}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Tiempo promedio: 14 min</span>
          </div>
        </div>
      </div>

      {/* Bento Grid: 2 Columns (Main Showcase + Quick Actions / Telemetry) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Items List Showcase (Span 2) */}
        <div className="lg:col-span-2 bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Registros Recientes</h2>
              <p className="text-xs text-slate-400">
                Últimas creaciones sincronizadas con el motor PostgreSQL
              </p>
            </div>
            <button
              onClick={() => onNavigate('items-list')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Ver todos ({items.length}) →
            </button>
          </div>

          {loading ? (
            <div className="space-y-3 pt-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 bg-slate-800/60 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-700 rounded-2xl">
              <Boxes className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-300 font-semibold">No hay registros creados</p>
              <p className="text-xs text-slate-400 mb-4">Comienza creando tu primer producto gourmet.</p>
              <button
                onClick={() => onNavigate('item-create')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                + Crear Registro
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onNavigate('item-detail');
                  }}
                  className="py-3 flex items-center justify-between group cursor-pointer hover:bg-slate-800/40 px-3 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs shrink-0">
                        {item.sku.slice(0, 3)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="font-mono text-slate-400">{item.sku}</span>
                        <span>•</span>
                        <span>{item.category}</span>
                        <span>•</span>
                        <span className="text-amber-400">★ {item.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                        item.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : item.status === 'in-progress'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-slate-700 text-slate-300 border-slate-600'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      ${item.price.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Database Status & Quick Action Widgets */}
        <div className="space-y-6">
          {/* Quick Access Card */}
          <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white">Accesos Rápidos</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('item-create')}
                className="p-3.5 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-left transition-all group"
              >
                <Plus className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-100">Crear Registro</p>
                <p className="text-[11px] text-slate-400">Wizard por pasos</p>
              </button>
              <button
                onClick={() => onNavigate('items-list')}
                className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-left transition-all group"
              >
                <Kanban className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-100">Kanban KDS</p>
                <p className="text-[11px] text-slate-400">Ver líneas activas</p>
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-left transition-all group"
              >
                <ShieldCheck className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-100">Políticas RLS</p>
                <p className="text-[11px] text-slate-400">Seguridad y roles</p>
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-left transition-all group"
              >
                <Database className="w-5 h-5 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-100">PostgreSQL</p>
                <p className="text-[11px] text-slate-400">us-west2 Cloud</p>
              </button>
            </div>
          </div>

          {/* Database Health Pill Card */}
          <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                Estado del Backend
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Activo
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Motor:</span>
                <span className="font-mono text-slate-200">PostgreSQL v16</span>
              </div>
              <div className="flex justify-between">
                <span>Región:</span>
                <span className="font-mono text-slate-200">us-west2 (GCP)</span>
              </div>
              <div className="flex justify-between">
                <span>ORM:</span>
                <span className="font-mono text-slate-200">Drizzle ORM</span>
              </div>
              <div className="flex justify-between">
                <span>Auth:</span>
                <span className="font-mono text-slate-200">Supabase / Firebase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
