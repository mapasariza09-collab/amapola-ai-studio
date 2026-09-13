import React, { useState } from 'react';
import { AppView, SimulationState } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import {
  User,
  ShieldCheck,
  Database,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Key,
  Server,
  Save,
} from 'lucide-react';

interface SettingsViewProps {
  simulationState: SimulationState;
  onSetSimulationState: (state: SimulationState) => void;
  onResetDemo: () => Promise<void>;
  onNavigate: (view: AppView) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  simulationState,
  onSetSimulationState,
  onResetDemo,
  onNavigate,
}) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'admin');
  const [role, setRole] = useState(user?.role || 'Master Admin / Chef Ejecutiva');

  const handleSaveProfile = () => {
    addToast('success', 'Perfil de usuario actualizado correctamente.');
  };

  const handleResetData = async () => {
    try {
      await onResetDemo();
      addToast('info', 'Catálogo reiniciado con los datos demo de Amapola Gourmet.');
      onNavigate('items-list');
    } catch {
      addToast('error', 'Error al reiniciar datos.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          Configuración del Sistema & Seguridad RLS
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Ajustes de cuenta, conexión a PostgreSQL en Cloud SQL / Supabase y simulador de estados UI.
        </p>
      </div>

      {/* User Profile Bento Card */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-400" />
          Perfil de Operador
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nombre de Usuario
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2 px-3 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              disabled
              value={user?.email || 'admin@amapolagourmet.com'}
              className="w-full bg-slate-900/50 border border-slate-800 text-slate-400 rounded-xl py-2 px-3 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Rol Asignado en Base de Datos (RBAC)
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl py-2 px-3 text-xs text-indigo-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Identificador Único (UID / owner_id)
            </label>
            <input
              type="text"
              disabled
              value={user?.id || 'usr_admin_default'}
              className="w-full bg-slate-900/50 border border-slate-800 text-slate-400 rounded-xl py-2 px-3 text-xs font-mono"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSaveProfile}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Perfil</span>
          </button>
        </div>
      </div>

      {/* Database & RLS Status Bento Card */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          Conexión PostgreSQL & Seguridad RLS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-indigo-400" />
                Cloud SQL (PostgreSQL)
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Habilitado (us-west2)
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Instancia: <code className="text-indigo-300 font-mono">ai-studio-5f399947</code>
              <br />
              Región: <code className="text-indigo-300 font-mono">us-west2</code>
              <br />
              Drizzle ORM con connection pooling (Object Method).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Key className="w-4 h-4 text-emerald-400" />
                Supabase Client & RLS
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  isSupabaseConfigured
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                }`}
              >
                {isSupabaseConfigured ? 'Conectado a Remoto' : 'Modo Híbrido Activo'}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Persistencia de sesión: <strong className="text-white">true</strong>
              <br />
              Auto refresh token: <strong className="text-white">true</strong>
              <br />
              Inyecciones: asignan <code className="text-indigo-300 font-mono">owner_id = auth.uid()</code>
            </p>
          </div>
        </div>
      </div>

      {/* Simulator: The 4 UI States Requirement */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          Simulador de los 4 Estados de UI (Stitch Testing)
        </h2>
        <p className="text-xs text-slate-400">
          Alterna los estados para verificar los Skeleton Loaders, Empty States y Alertas de Error con
          botón de Reintentar.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'normal', label: '1. Normal (Datos)', desc: 'Registros activos' },
            { id: 'loading', label: '2. Skeleton Loaders', desc: 'Cargando asíncrono' },
            { id: 'empty', label: '3. Empty State', desc: 'Sin registros' },
            { id: 'error', label: '4. Alerta de Error', desc: 'Falla con reintentar' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => {
                onSetSimulationState(st.id as SimulationState);
                addToast('info', `Estado UI cambiado a: ${st.label}`);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                simulationState === st.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="text-xs font-bold block">{st.label}</span>
              <span className="text-[10px] text-slate-400">{st.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Database Reset Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleResetData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/30 text-xs font-semibold text-slate-300 hover:text-rose-300 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar Catálogo a Datos Demo</span>
        </button>
      </div>
    </div>
  );
};
