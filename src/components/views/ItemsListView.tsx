import React, { useState } from 'react';
import { AppView, ItemRecord, ItemStatus, SimulationState } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  Search,
  SlidersHorizontal,
  Table as TableIcon,
  Kanban as KanbanIcon,
  Plus,
  Eye,
  Trash2,
  AlertTriangle,
  ArrowUpDown,
  Filter,
  Flame,
  CheckCircle2,
  Clock,
  Archive,
  Boxes,
  RefreshCw,
} from 'lucide-react';

interface ItemsListViewProps {
  items: ItemRecord[];
  loading: boolean;
  simulationState: SimulationState;
  onNavigate: (view: AppView) => void;
  onSelectItem: (item: ItemRecord) => void;
  onDeleteItem: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, newStatus: ItemStatus) => Promise<void>;
}

export const ItemsListView: React.FC<ItemsListViewProps> = ({
  items,
  loading,
  simulationState,
  onNavigate,
  onSelectItem,
  onDeleteItem,
  onUpdateStatus,
}) => {
  const { addToast } = useToast();
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(items.map((i) => i.category)));

  // Filter items
  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    try {
      await onDeleteItem(id);
      addToast('success', 'Registro eliminado correctamente de PostgreSQL.');
      setDeleteConfirmId(null);
    } catch {
      addToast('error', 'Error al eliminar el registro.');
    }
  };

  const handleStatusChange = async (id: string, status: ItemStatus) => {
    try {
      await onUpdateStatus(id, status);
      addToast('info', `Estado actualizado a "${status}".`);
    } catch {
      addToast('error', 'Error al actualizar estado.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls & Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1e293b] border border-[#334155] rounded-3xl p-5 shadow-xl">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-400" />
            Explorador de Registros & Catálogo KDS
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Sincronizado con tabla PostgreSQL <code className="text-indigo-300 font-mono">items</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Switcher Table / Kanban */}
          <div className="flex rounded-xl bg-slate-900/60 p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Tabla</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <KanbanIcon className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('item-create')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-500 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nuevo</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#1e293b]/70 border border-[#334155] rounded-2xl p-3">
        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar por título, SKU o tags..."
            className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none cursor-pointer"
          >
            <option value="all">Todas las Categorías ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/80 focus:border-indigo-500 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none cursor-pointer"
          >
            <option value="all">Todos los Estados</option>
            <option value="active">Activo (En Menú)</option>
            <option value="in-progress">En Producción KDS</option>
            <option value="completed">Completado</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-800/60 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty State */
        <div className="bg-[#1e293b] border border-dashed border-slate-700 rounded-3xl p-12 text-center max-w-lg mx-auto">
          <Boxes className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No se encontraron registros</h3>
          <p className="text-xs text-slate-400 mb-6">
            Ajusta los filtros de búsqueda o registra un nuevo plato gourmet en la base de datos.
          </p>
          <button
            onClick={() => onNavigate('item-create')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Registro Ahora</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="bg-[#1e293b] border border-[#334155] rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#334155] bg-slate-900/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Registro / SKU</th>
                  <th className="py-3.5 px-4">Categoría</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4">Prioridad</th>
                  <th className="py-3.5 px-4">Precio</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-300">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs shrink-0">
                            {item.sku.slice(0, 3)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <button
                            onClick={() => {
                              onSelectItem(item);
                              onNavigate('item-detail');
                            }}
                            className="font-bold text-slate-100 hover:text-indigo-300 truncate block text-left transition-colors"
                          >
                            {item.title}
                          </button>
                          <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                            {item.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-medium text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as ItemStatus)}
                        className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border bg-transparent focus:outline-none cursor-pointer ${
                          item.status === 'active'
                            ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
                            : item.status === 'in-progress'
                            ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
                            : item.status === 'completed'
                            ? 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10'
                            : 'text-slate-400 border-slate-600 bg-slate-800'
                        }`}
                      >
                        <option value="active" className="bg-slate-900 text-slate-200">
                          active
                        </option>
                        <option value="in-progress" className="bg-slate-900 text-slate-200">
                          in-progress
                        </option>
                        <option value="completed" className="bg-slate-900 text-slate-200">
                          completed
                        </option>
                        <option value="archived" className="bg-slate-900 text-slate-200">
                          archived
                        </option>
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                          item.priority === 'urgent'
                            ? 'text-rose-400'
                            : item.priority === 'high'
                            ? 'text-amber-400'
                            : item.priority === 'medium'
                            ? 'text-indigo-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-white">
                      ${item.price.toLocaleString('es-CO')}
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-300">{item.stock} un.</td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            onSelectItem(item);
                            onNavigate('item-detail');
                          }}
                          className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-indigo-300 transition-colors"
                          title="Ver Ficha Técnica"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Eliminar Registro"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['active', 'in-progress', 'completed', 'archived'] as ItemStatus[]).map((status) => {
            const columnItems = filtered.filter((i) => i.status === status);
            return (
              <div
                key={status}
                className="bg-[#1e293b] border border-[#334155] rounded-3xl p-4 flex flex-col min-h-[500px] shadow-xl"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#334155]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        status === 'active'
                          ? 'bg-emerald-400'
                          : status === 'in-progress'
                          ? 'bg-amber-400'
                          : status === 'completed'
                          ? 'bg-indigo-400'
                          : 'bg-slate-500'
                      }`}
                    />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      {status === 'active'
                        ? 'En Menú (Activo)'
                        : status === 'in-progress'
                        ? 'En Cocina KDS'
                        : status === 'completed'
                        ? 'Completado'
                        : 'Archivado'}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {columnItems.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {columnItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700/80 hover:border-indigo-500/50 shadow-md transition-all group"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-24 rounded-xl object-cover border border-slate-800 mb-2.5"
                        />
                      )}
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>{item.sku}</span>
                        <span className="text-amber-400 font-semibold">★ {item.rating}</span>
                      </div>
                      <h4
                        onClick={() => {
                          onSelectItem(item);
                          onNavigate('item-detail');
                        }}
                        className="text-xs font-bold text-white group-hover:text-indigo-300 cursor-pointer line-clamp-2 transition-colors mb-2"
                      >
                        {item.title}
                      </h4>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                        <span className="font-mono font-bold text-emerald-400">
                          ${item.price.toLocaleString('es-CO')}
                        </span>
                        <button
                          onClick={() => {
                            onSelectItem(item);
                            onNavigate('item-detail');
                          }}
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                        >
                          Ficha →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Destructive Deletion Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e293b] border border-rose-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">¿Confirmar Eliminación?</h3>
                <p className="text-xs text-slate-400">Esta acción es destructiva e irreversible.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              El registro será eliminado permanentemente de la base de datos PostgreSQL en Cloud SQL /
              Supabase y se revocarán sus referencias en el catálogo KDS.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-all"
              >
                Sí, Eliminar de la BD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
