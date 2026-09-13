import React from 'react';
import { AppView } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Boxes,
  PlusCircle,
  Settings,
  LogOut,
  Flame,
  Database,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      id: 'dashboard' as AppView,
      label: 'Dashboard KPI',
      badge: 'Live',
      icon: LayoutDashboard,
    },
    {
      id: 'items-list' as AppView,
      label: 'Explorador & Kanban',
      badge: 'Items',
      icon: Boxes,
    },
    {
      id: 'item-create' as AppView,
      label: 'Crear Registro',
      badge: 'Wizard',
      icon: PlusCircle,
    },
    {
      id: 'settings' as AppView,
      label: 'Configuración',
      badge: 'DB / RLS',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-[#334155] flex flex-col shrink-0 h-screen sticky top-0 select-none z-30 transition-all duration-200">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#334155] flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-100 flex items-center gap-1.5 group-hover:text-indigo-400 transition-colors">
              Amapola
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PRO
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium block">
              Gourmet OS · Stitch Suite
            </span>
          </div>
        </button>
      </div>

      {/* Cloud & DB Status Pill */}
      <div className="mx-4 mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1.5">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            PostgreSQL Engine
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            us-west2
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          Cloud SQL & Supabase RLS sincronizados en tiempo real.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Navegación Suite
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-indigo-700/80 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Footer Profile & Sign Out */}
      <div className="p-4 border-t border-[#334155] bg-slate-900/40">
        {user ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-[#334155] shadow-sm shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 font-mono">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigate('settings')}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-[11px] text-slate-300 font-medium flex items-center justify-center gap-1.5 transition-colors"
                title="Ajustes de cuenta"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Perfil RLS
              </button>
              <button
                onClick={logout}
                className="py-1.5 px-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-[11px] text-rose-300 font-medium flex items-center justify-center gap-1 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                Salir
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('auth')}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            Iniciar Sesión
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </aside>
  );
};
