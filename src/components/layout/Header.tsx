import React, { useState, useEffect } from 'react';
import { AppView, ItemRecord } from '../../types';
import {
  Search,
  Plus,
  Command,
  ChevronRight,
  Database,
  Bell,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  selectedItemTitle?: string;
  onNavigate: (view: AppView) => void;
  onSelectItem?: (item: ItemRecord) => void;
  items: ItemRecord[];
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  selectedItemTitle,
  onNavigate,
  onSelectItem,
  items,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Dynamic breadcrumb generation
  const getBreadcrumbs = () => {
    switch (currentView) {
      case 'dashboard':
        return [{ label: 'Inicio' }, { label: 'Dashboard Métricas KPI', active: true }];
      case 'items-list':
        return [{ label: 'Inicio' }, { label: 'Explorador de Registros', active: true }];
      case 'item-detail':
        return [
          { label: 'Inicio', view: 'dashboard' as AppView },
          { label: 'Registros', view: 'items-list' as AppView },
          { label: selectedItemTitle || 'Ficha Técnica Profunda', active: true },
        ];
      case 'item-create':
        return [
          { label: 'Inicio', view: 'dashboard' as AppView },
          { label: 'Registros', view: 'items-list' as AppView },
          { label: 'Wizard de Creación (+)', active: true },
        ];
      case 'settings':
        return [{ label: 'Inicio' }, { label: 'Configuración & RLS', active: true }];
      case 'auth':
        return [{ label: 'Inicio' }, { label: 'Autenticación & Acceso', active: true }];
      default:
        return [{ label: 'Inicio' }];
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="h-16 bg-[#1e293b]/90 backdrop-blur-md border-b border-[#334155] px-6 flex items-center justify-between sticky top-0 z-20 transition-all">
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium">
          {getBreadcrumbs().map((b, idx, arr) => (
            <React.Fragment key={idx}>
              {b.view ? (
                <button
                  onClick={() => onNavigate(b.view!)}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {b.label}
                </button>
              ) : (
                <span className={b.active ? 'text-indigo-400 font-semibold' : 'text-slate-400'}>
                  {b.label}
                </span>
              )}
              {idx < arr.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
            </React.Fragment>
          ))}
        </div>

        {/* Center/Right Search Bar & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Ctrl+K Search Bar Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-700/80 hover:border-indigo-500/60 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-inner group w-52 md:w-64"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
            <span className="flex-1 text-left truncate">Buscar registro o SKU...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* "+ Nuevo" Primary CTA Button */}
          <button
            onClick={() => onNavigate('item-create')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 border border-indigo-500 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Nuevo</span>
          </button>
        </div>
      </header>

      {/* Command Palette / Search Modal (Ctrl+K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#334155] bg-slate-900/50">
              <Search className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Escribe título, SKU, categoría..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-xs text-slate-400 border border-slate-700 font-mono">
                ESC
              </kbd>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-800">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-slate-400">No se encontraron registros para "{searchQuery}".</p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (onSelectItem) onSelectItem(item);
                      onNavigate('item-detail');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs">
                          {item.sku.slice(0, 3)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-300 truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-mono text-slate-400">{item.sku}</span>
                          <span>•</span>
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        ${item.price.toLocaleString('es-CO')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 bg-slate-900/60 border-t border-[#334155] flex items-center justify-between text-[11px] text-slate-400">
              <span>Navega con flechas o ratón</span>
              <span className="font-mono">{filteredItems.length} resultado(s)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
