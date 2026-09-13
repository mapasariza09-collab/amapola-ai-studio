import React, { useState } from 'react';
import { AppView, ItemRecord, ItemStatus, ItemPriority } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Boxes,
  DollarSign,
  Tag,
  Sparkles,
  Database,
  Layers,
  Info,
} from 'lucide-react';

interface ItemCreateWizardViewProps {
  onNavigate: (view: AppView) => void;
  onCreateItem: (
    itemData: Omit<ItemRecord, 'id' | 'created_at' | 'updated_at' | 'owner_id'>
  ) => Promise<ItemRecord>;
  onSelectCreatedItem: (item: ItemRecord) => void;
}

export const ItemCreateWizardView: React.FC<ItemCreateWizardViewProps> = ({
  onNavigate,
  onCreateItem,
  onSelectCreatedItem,
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState(`AG-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState('Hamburguesas');
  const [price, setPrice] = useState<number>(32000);
  const [cost, setCost] = useState<number>(12000);
  const [stock, setStock] = useState<number>(50);
  const [priority, setPriority] = useState<ItemPriority>('medium');
  const [status, setStatus] = useState<ItemStatus>('active');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Artesanal, Gourmet, Best Seller');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  );

  const steps = [
    { number: 1, title: 'Datos Básicos', desc: 'Identificación y SKU' },
    { number: 2, title: 'Costos & Margen', desc: 'Precios e inventario' },
    { number: 3, title: 'Gastronomía', desc: 'Notas y etiquetas' },
    { number: 4, title: 'Confirmar & Guardar', desc: 'Inserción PostgreSQL' },
  ];

  const handleNext = () => {
    if (step === 1 && !title.trim()) {
      addToast('warning', 'Por favor ingresa el nombre o título del plato.');
      return;
    }
    if (step === 2 && price <= 0) {
      addToast('warning', 'El precio de venta debe ser mayor a 0.');
      return;
    }
    if (step < 4) {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    } else {
      onNavigate('items-list');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const created = await onCreateItem({
        title,
        sku,
        category,
        status,
        priority,
        price,
        cost,
        stock,
        description: description || 'Plato gastronómico artesanal creado en Amapola Gourmet.',
        tags,
        rating: 4.9,
        image: imageUrl,
      });

      addToast('success', `Registro "${created.title}" insertado exitosamente en PostgreSQL.`);
      onSelectCreatedItem(created);
      onNavigate('item-detail');
    } catch {
      addToast('error', 'Ocurrió un error al insertar en la base de datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        <span className="text-xs font-mono text-indigo-400 font-semibold">
          Paso {step} de 4
        </span>
      </div>

      {/* Step Indicator Bar */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((s) => (
          <div
            key={s.number}
            className={`p-3 rounded-2xl border transition-all ${
              step === s.number
                ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg'
                : step > s.number
                ? 'bg-slate-900/60 border-slate-700 text-emerald-400'
                : 'bg-slate-900/30 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-mono font-bold">0{s.number}.</span>
              <span className="text-xs font-bold truncate">{s.title}</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Wizard Form Card */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-8 shadow-2xl space-y-6">
        {/* STEP 1: Datos Básicos */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">1. Identificación del Plato / Registro</h2>
            <p className="text-xs text-slate-400">
              Ingresa los datos generales para dar de alta el registro en el catálogo de producción.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nombre del Plato / Producto *
              </label>
              <input
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Hamburguesa de Cordero & Queso de Cabra"
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Código SKU Único
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs font-mono text-indigo-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Categoría Gastronómica
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Hamburguesas">Hamburguesas</option>
                  <option value="Waffles Gourmet">Waffles Gourmet</option>
                  <option value="Bebidas de Autor">Bebidas de Autor</option>
                  <option value="Acompañamientos">Acompañamientos</option>
                  <option value="Postres de Autor">Postres de Autor</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Costos & Margen */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">2. Estructura de Precios & Escandallo</h2>
            <p className="text-xs text-slate-400">
              Define los valores monetarios para calcular automáticamente la rentabilidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Precio de Venta al Público ($ COP) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-sm font-mono font-bold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Costo de Materia Prima ($ COP)
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-sm font-mono text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Stock Inicial en Cocina (Unidades)
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs font-mono text-slate-200 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Margen Calculado:</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {price > 0 ? Math.round(((price - cost) / price) * 100) : 0}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Utilidad por plato:</span>
                  <span className="text-sm font-mono font-bold text-white">
                    ${(price - cost).toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Gastronomía & Notas */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">3. Notas Gastronómicas & Presentación</h2>
            <p className="text-xs text-slate-400">
              Añade notas del Chef, etiquetas de búsqueda y la imagen de presentación.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Descripción del Plato
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ingredientes clave, tipo de pan brioche, salsas de autor..."
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl p-3 text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Etiquetas (Separadas por comas)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs text-indigo-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                URL de Imagen de Presentación
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-4 text-xs font-mono text-slate-300 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Confirmar & Resumen */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              4. Resumen & Inserción en PostgreSQL
            </h2>
            <p className="text-xs text-slate-400">
              Revisa los detalles antes de persistir el registro con{' '}
              <code className="text-indigo-300 font-mono">owner_id: {user?.id || 'auth.uid()'}</code>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Plato / Título:</span>
                <span className="font-bold text-white">{title || 'Sin Título'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">SKU & Categoría:</span>
                <span className="font-mono text-indigo-300">{sku} • {category}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Precio / Costo:</span>
                <span className="font-mono text-emerald-400 font-bold">
                  ${price.toLocaleString('es-CO')} / ${cost.toLocaleString('es-CO')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Propietario asignado:</span>
                <span className="font-mono text-slate-300">{user?.name} ({user?.email})</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            {step === 1 ? 'Cancelar' : 'Atrás'}
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-500 transition-all cursor-pointer"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 border border-emerald-500 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              <span>Insertar en PostgreSQL</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
