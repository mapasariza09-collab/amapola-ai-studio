import React, { useState } from 'react';
import { SimulationState, ScreenId } from '../../types';

interface SCR01AuthProps {
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const SCR01_Auth: React.FC<SCR01AuthProps> = ({
  simulationState,
  onNavigate,
  onShowToast,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('Sesión iniciada con éxito. Bienvenido a Amapola Gourmet.');
      onNavigate('SCR-02');
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast(`¡Registro exitoso para ${regName || 'comensal'}! Bienvenido a Amapola Gourmet.`);
      onNavigate('SCR-02');
    }, 700);
  };

  if (simulationState === 'loading') {
    return (
      <div className="relative min-h-[calc(100vh-125px)] w-full flex items-center justify-center p-6 sm:p-10 bg-[#FAFAFA] overflow-hidden">
        <div className="relative z-10 w-full max-w-[390px] p-4 animate-pulse flex flex-col gap-4">
          <div className="h-8 w-44 bg-gray-200 rounded-md"></div>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="h-9.5 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-9.5 w-full bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-9 w-28 bg-gray-300 rounded-md mt-1"></div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (simulationState === 'empty') {
    return (
      <div className="relative min-h-[calc(100vh-125px)] w-full flex items-center justify-center p-6 sm:p-10 bg-[#FAFAFA] overflow-hidden">
        <div className="relative z-10 w-full max-w-[390px] p-6 bg-white/95 rounded-xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Formulario sin datos</h2>
          <p className="text-sm text-gray-500 mb-4">
            {authMode === 'login'
              ? 'Ingresa tu usuario o correo electrónico y contraseña para acceder a la plataforma.'
              : 'Completa tu información personal para crear una nueva cuenta.'}
          </p>
          <button
            onClick={() => {
              if (authMode === 'login') {
                setUsernameOrEmail('chef.patricio@amapolagourmet.com');
                setPassword('GourmetPassword2024!');
                onShowToast('Credenciales de prueba cargadas');
              } else {
                setRegName('Mariana Gómez');
                setRegEmail('mariana.gomez@gmail.com');
                setRegAddress('Calle 8 # 12-45, Centro');
                setRegPhone('3109876543');
                setRegPassword('Amapola2026!');
                onShowToast('Datos de registro de prueba cargados');
              }
            }}
            className="px-4 py-2 bg-[#007BFF] text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            Cargar datos de prueba
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-125px)] w-full flex items-center justify-center p-6 sm:p-10 overflow-hidden bg-[#FAFAFA]">
      {/* Background with light culinary wash matching the image (greens, cashews, plate texture) */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-30 mix-blend-multiply filter blur-[0.6px]"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRCFbdGK99qhyt4dcY_3wYgYdiZj-5gkxamvQ_4_xLNUltRAZ52pSZBe8d3lvZhsZLQNWkPA3ghuykc48dKnrFHJBPMzajCV6cjzlbD1ocHbtbxnBOD_6TqL4FHr_TgUQFxmcz857KRXg4E0IjXK6PqMZscmahEP2blpj78ukjAV82pOtNyDMWEOGqp0WOH1erGKPU0_92ErXJwZyXJFx4tTaWYl4fUFP25vDilBesCKbAcPS6zB5v')",
        }}
      ></div>

      {/* Subtle high-key radial wash overlay to replicate the exact pale, clean backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/85 to-white/90 pointer-events-none"></div>

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-[390px] py-4 px-2 sm:px-4">
        {authMode === 'login' ? (
          /* ==========================================================
             VISTA 1: INICIAR SESIÓN (MATCHING IMAGE 1)
             ========================================================== */
          <div>
            <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#1F2937] tracking-tight mb-4">
              Iniciar Sesión
            </h1>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
              {/* Campo Usuario / Correo */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="usernameOrEmail"
                  className="text-sm font-normal text-[#374151]"
                >
                  Usuario / Correo
                </label>
                <input
                  id="usernameOrEmail"
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Campo Contraseña */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-normal text-[#374151]"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Botón Iniciar Sesión */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#007BFF] hover:bg-[#0069d9] active:bg-[#005cbf] text-white text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center justify-center min-w-[120px] disabled:opacity-70"
                >
                  {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>
              </div>

              {/* Enlaces de Ayuda y Registro */}
              <div className="flex flex-col gap-1.5 pt-2 text-[13.5px] text-[#374151]">
                <p className="leading-snug">
                  ¿Olvidaste tu contraseña?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onShowToast(
                        'Se ha enviado un enlace de restablecimiento a tu correo.'
                      );
                    }}
                    className="text-[#007BFF] hover:underline cursor-pointer font-normal"
                  >
                    Recupérala aquí
                  </a>
                </p>

                <p className="leading-snug">
                  ¿No tienes cuenta?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setAuthMode('register');
                    }}
                    className="text-[#007BFF] hover:underline cursor-pointer font-normal"
                  >
                    Regístrate
                  </a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* ==========================================================
             VISTA 2: REGISTRO (MATCHING EXACTLY IMAGE 2)
             ========================================================== */
          <div>
            <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#1F2937] tracking-tight mb-4">
              Registro
            </h1>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
              {/* Campo Nombre */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="regName"
                  className="text-sm font-normal text-[#374151]"
                >
                  Nombre
                </label>
                <input
                  id="regName"
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Campo Correo */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="regEmail"
                  className="text-sm font-normal text-[#374151]"
                >
                  Correo
                </label>
                <input
                  id="regEmail"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Campo Dirección */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="regAddress"
                  className="text-sm font-normal text-[#374151]"
                >
                  Dirección
                </label>
                <input
                  id="regAddress"
                  type="text"
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Campo Teléfono */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="regPhone"
                  className="text-sm font-normal text-[#374151]"
                >
                  Teléfono
                </label>
                <input
                  id="regPhone"
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Campo Contraseña */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="regPassword"
                  className="text-sm font-normal text-[#374151]"
                >
                  Contraseña
                </label>
                <input
                  id="regPassword"
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full h-9.5 px-3 py-1.5 bg-white border border-[#CBD5E1] rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all shadow-2xs"
                />
              </div>

              {/* Botón Registrar */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#007BFF] hover:bg-[#0069d9] active:bg-[#005cbf] text-white text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center justify-center min-w-[100px] disabled:opacity-70"
                >
                  {isSubmitting ? 'Registrando...' : 'Registrar'}
                </button>
              </div>

              {/* Enlace para volver a Iniciar Sesión */}
              <div className="flex flex-col gap-1.5 pt-2 text-[13.5px] text-[#374151]">
                <p className="leading-snug">
                  ¿Ya tienes cuenta?{' '}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setAuthMode('login');
                    }}
                    className="text-[#007BFF] hover:underline cursor-pointer font-normal"
                  >
                    Inicia sesión
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
