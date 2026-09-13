import React, { useState } from 'react';
import { AppView, ItemRecord, ItemStatus, ItemPriority } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  ArrowLeft,
  DollarSign,
  Boxes,
  Clock,
  Flame,
  ShieldCheck,
  Tag,
  Star,
  CheckCircle2,
  Calendar,
  Save,
  Trash2,
  Share2,
  Layers,
  Database,
  Info,
} from 'lucide-react';

interface ItemDetailViewProps {
  item: ItemRecord | null;
  onNavigate: (view: AppView) => void;
  onUpdateItem: (id: string, updates: Partial<ItemRecord>) => Promise<void>;
  onDeleteItem: (id: string) => Promise<void>;
}

export const ItemDetailView: React.FC<ItemDetailViewProps> = ({
  item,
  onNavigate,
  onUpdateItem,
  onDeleteItem,
}) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'costs' | 'kds' | 'audit'>('general');

  // Local editable states
  const [price, setPrice] = useState<number>(item?.price || 0);
  const [cost, setCost] = useState<number>(item?.cost || 0);
  const [stock, setStock] = useState<number>(item?.stock || 0);
  const [status, setStatus] = useState<ItemStatus>(item?.status || 'active');
  const [priority, setPriority] = useState<ItemPriority>(item?.priority || 'medium');
  const [description, setDescription] = useState(item?.description || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!item) {
    return (
      <div className="p-12 text-center bg-[#1e293b] border border-[#334155] rounded-3xl max-w-lg mx-auto mt-12">
        <Info className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-white mb-1">No hay registro seleccionado</h2>
        <p className="text-xs text-slate-400 mb-6">
          Selecciona un registro desde el explorador para inspeccionar su ficha técnica.
        </p>
        <button
          onClick={() => onNavigate('items-list')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
        >
          Ir al Explorador
        </button>
      </div>
    );
  }

  const marginPercentage = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;
  const grossProfitPerUnit = price - cost;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateItem(item.id, {
        price,
        cost,
        stock,
        status,
        priority,
        description,
      });
      addToast('success', 'Ficha técnica actualizada en PostgreSQL con éxito.');
    } catch {
      addToast('error', 'Error al guardar los cambios.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Detail View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('items-list')}
            className="p-2.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-indigo-400 font-bold">{item.sku}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{item.category}</span>
              <span
                className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                  status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : status === 'in-progress'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {status}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{item.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-500 transition-all cursor-pointer"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Guardar Ficha</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex rounded-2xl bg-[#1e293b] p-1.5 border border-[#334155] max-w-2xl">
        {[
          { id: 'general', label: '1. Ficha General' },
          { id: 'costs', label: '2. Costos & Escandallo' },
          { id: 'kds', label: '3. Producción KDS' },
          { id: 'audit', label: '4. Auditoría PostgreSQL' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Ficha General */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (Span 2) */}
          <div className="lg:col-span-2 bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-2">Descripción Gastronómica</h3>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-700/80 focus:border-indigo-500 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none transition-colors leading-relaxed"
                placeholder="Describe los ingredientes de autor, técnica culinaria..."
              />
            </div>

            {/* Tags and Badges */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Etiquetas del Catálogo
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900/80 text-xs font-medium text-indigo-300 border border-slate-700"
                  >
                    <Tag className="w-3 h-3 text-indigo-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Status and Priority Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estado Operativo
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ItemStatus)}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none"
                >
                  <option value="active">Activo (Disponible en Menú)</option>
                  <option value="in-progress">En Cocina KDS</option>
                  <option value="completed">Completado</option>
                  <option value="archived">Archivado / Temporalmente Fuera</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Prioridad en Cocina
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ItemPriority)}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none"
                >
                  <option value="low">Baja (Mise en place)</option>
                  <option value="medium">Media (Estándar)</option>
                  <option value="high">Alta (Urgente)</option>
                  <option value="urgent">Crítica (Mesa VIP)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Image & Rating Card */}
          <div className="space-y-6">
            <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-5 shadow-xl">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 rounded-2xl object-cover border border-slate-700 mb-4 shadow-inner"
                />
              ) : (
                <div className="w-full h-56 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center text-indigo-400 mb-4">
                  <Flame className="w-12 h-12 mb-2" />
                  <span className="text-xs font-mono font-bold">{item.sku}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Calificación del Plato:</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  {item.rating} / 5.0
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Costos & Escandallo */}
      {activeTab === 'costs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Precio al Público (COP)
            </span>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 pl-8 pr-3 text-lg font-mono font-bold text-white focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">Precio final con impuestos incluidos.</p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Costo de Ingredientes (Materia Prima)
            </span>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 pl-8 pr-3 text-lg font-mono font-bold text-slate-200 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400">Escandallo por unidad de despacho.</p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Margen Bruto Calculado
            </span>
            <div className="text-3xl font-black text-emerald-400 font-mono pt-1">
              {marginPercentage}%
            </div>
            <div className="text-xs text-slate-300 font-mono">
              Utilidad por plato: <strong className="text-white">${grossProfitPerUnit.toLocaleString('es-CO')}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Producción KDS */}
      {activeTab === 'kds' && (
        <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-white">Parámetros de Línea de Cocina</h3>
          <div className="space-y-3 text-xs text-slate-300 divide-y divide-slate-800">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Estación KDS:</span>
              <span className="font-semibold text-indigo-300">
                {item.category === 'Hamburguesas'
                  ? 'Estación 1 - Plancha y Grill'
                  : item.category.includes('Waffles')
                  ? 'Estación 2 - Postres & Waffles Belgas'
                  : item.category.includes('Bebidas')
                  ? 'Barra & Mixología'
                  : 'Cocina Fría & Frituras'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Tiempo estimado de elaboración:</span>
              <span className="font-mono text-emerald-400 font-semibold">12 - 15 minutos</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Temperatura de servicio recomendada:</span>
              <span className="font-mono text-amber-400 font-semibold">
                {item.category.includes('Bebidas') ? '4°C - 6°C (Frío)' : '68°C - 72°C (Caliente)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Auditoría PostgreSQL */}
      {activeTab === 'audit' && (
        <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Registro en PostgreSQL (Cloud SQL & Supabase)
          </h3>
          <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-500">primary_key_id:</span>
              <span className="text-indigo-400">{item.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">owner_id:</span>
              <span className="text-slate-300">{item.owner_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">sku_unique:</span>
              <span className="text-slate-300">{item.sku}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">created_at:</span>
              <span className="text-slate-400">{new Date(item.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">updated_at:</span>
              <span className="text-slate-400">{new Date(item.updated_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">rls_security_status:</span>
              <span className="text-emerald-400">ENFORCED (auth.uid() = owner_id)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
