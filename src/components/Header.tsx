import React from 'react';
import { ScreenId } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';
import { ShoppingCart, LogOut, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#8B1D24] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
        {/* Brand identity */}
        <div
          className="flex items-center gap-3.5 cursor-pointer group"
          onClick={() => onNavigate('SCR-02')}
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 p-1 flex items-center justify-center overflow-hidden shadow-inner group-hover:bg-white/20 transition-all">
            <img
              src={BRAND_LOGO_URL}
              alt="Amapola Gourmet Logo"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Amapola Gourmet
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/15 text-white/90 border border-white/10">
                Cloud KDS v2.4
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onNavigate('SCR-02')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentScreen === 'SCR-02'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('SCR-03')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentScreen === 'SCR-03'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Productos
            </button>

            <button
              onClick={() => onNavigate('SCR-04')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentScreen === 'SCR-04'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Ver Órdenes
            </button>

            <button
              onClick={() => onNavigate('SCR-05')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 relative ${
                currentScreen === 'SCR-05'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Carrito</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-gray-900 text-[10px] font-black flex items-center justify-center -mr-1 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('SCR-07')}
              className={`hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentScreen === 'SCR-07'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Reportes
            </button>

            <button
              onClick={() => onNavigate('SCR-06')}
              className={`hidden md:inline-flex px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentScreen === 'SCR-06'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Configuración
            </button>

            <button
              onClick={() => onNavigate('SCR-01')}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 ${
                currentScreen === 'SCR-01'
                  ? 'bg-white text-[#8B1D24] font-bold shadow-sm'
                  : 'text-red-200 hover:text-white hover:bg-white/10'
              }`}
              title="Cerrar Sesión / Login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>

          {/* User Profile Avatar */}
          <div
            onClick={() => onNavigate('SCR-06')}
            className="w-8 h-8 rounded-full bg-white/20 border border-white/25 flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-all shrink-0"
            title="Perfil de Usuario y Ajustes"
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};
