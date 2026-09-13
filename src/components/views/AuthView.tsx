import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Flame,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Database,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AuthViewProps {
  onSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  const { login, register, loginWithGoogle, loading } = useAuth();
  const { addToast } = useToast();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('admin@amapolagourmet.com');
  const [password, setPassword] = useState('Amapola2026!');
  const [name, setName] = useState('admin');
  const [roleSelection, setRoleSelection] = useState('Chef Ejecutivo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('warning', 'Por favor ingresa correo y contraseña.');
      return;
    }

    try {
      if (mode === 'login') {
        const ok = await login(email, password);
        if (ok) {
          addToast('success', `¡Bienvenido de nuevo! Sesión iniciada.`);
          onSuccess();
        }
      } else {
        const ok = await register(email, password, name);
        if (ok) {
          addToast('success', `Cuenta creada exitosamente para ${name}.`);
          onSuccess();
        }
      }
    } catch (err: any) {
      addToast('error', err.message || 'Error en la autenticación.');
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const ok = await loginWithGoogle();
      if (ok) {
        addToast('success', 'Sesión iniciada con Google OAuth exitosamente.');
        onSuccess();
      }
    } catch {
      addToast('error', 'No se pudo completar el acceso con Google.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-xl shadow-indigo-600/25 mb-4 ring-1 ring-white/20">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Amapola Gourmet <span className="text-indigo-400">PRO</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Plataforma Cloud KDS & Suite con PostgreSQL (Cloud SQL & Supabase)
          </p>
        </div>

        {/* Main Bento Form Card */}
        <div className="bg-[#1e293b]/90 backdrop-blur-xl border border-[#334155] rounded-3xl p-8 shadow-2xl relative">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-900/60 p-1 border border-slate-700/60 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Registrar Operador
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. admin"
                    className="w-full bg-slate-900/60 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@amapolagourmet.com"
                  className="w-full bg-slate-900/60 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/60 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Rol Asignado (RBAC)
                </label>
                <select
                  value={roleSelection}
                  onChange={(e) => setRoleSelection(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700 focus:border-indigo-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-100 focus:outline-none"
                >
                  <option value="Chef Ejecutivo">Chef Ejecutivo / Master Admin</option>
                  <option value="Jefe de Cocina">Jefe de Cocina (KDS)</option>
                  <option value="Encargado de Barra">Encargado de Barra & Bebidas</option>
                  <option value="Auditor Financiero">Auditor Financiero</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 border border-indigo-500 flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Entrar a la Plataforma' : 'Crear Cuenta'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/80" />
            </div>
            <span className="relative px-3 bg-[#1e293b] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              O accede con
            </span>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google Workspace / Firebase OAuth</span>
          </button>
        </div>

        {/* Security and Database Status Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400 px-2">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            PostgreSQL us-west2 (Cloud SQL)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            RLS & JWT Activo
          </span>
        </div>
      </div>
    </div>
  );
};
