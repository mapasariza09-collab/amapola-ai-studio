import React from 'react';
import { ScreenId, SimulationState } from '../types';
import { Sliders, AlertTriangle, Eye, RefreshCw } from 'lucide-react';

interface StateControlBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  simulationState: SimulationState;
  onChangeState: (state: SimulationState) => void;
  isAlertVisible: boolean;
  onToggleAlert: () => void;
}

const SCREENS: { id: ScreenId; label: string; tag: string }[] = [
  { id: 'SCR-01', label: 'Login & Acceso', tag: '01' },
  { id: 'SCR-02', label: 'Dashboard Ventas', tag: '02' },
  { id: 'SCR-03', label: 'Catálogo Menú', tag: '03' },
  { id: 'SCR-04', label: 'KDS & Órdenes', tag: '04' },
  { id: 'SCR-05', label: 'Carrito Checkout', tag: '05' },
  { id: 'SCR-06', label: 'Ajustes & RBAC', tag: '06' },
  { id: 'SCR-07', label: 'Reportes & Export', tag: '07' },
];

export const StateControlBar: React.FC<StateControlBarProps> = ({
  currentScreen,
  onSelectScreen,
  simulationState,
  onChangeState,
  isAlertVisible,
  onToggleAlert,
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-18 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Screen Jump Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="font-bold text-gray-500 uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-[#8B1D24]" /> Módulos:
          </span>
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectScreen(s.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                currentScreen === s.id
                  ? 'bg-[#8B1D24] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              <span className="opacity-75 font-mono text-[10px]">{s.tag}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* State Simulation Switcher & Alert Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => onChangeState('normal')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                simulationState === 'normal'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Vista Normal
            </button>
            <button
              onClick={() => onChangeState('empty')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                simulationState === 'empty'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Estado Vacío
            </button>
            <button
              onClick={() => onChangeState('loading')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                simulationState === 'loading'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Skeleton Loading
            </button>
          </div>

          <button
            onClick={onToggleAlert}
            className={`px-2.5 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 border ${
              isAlertVisible
                ? 'bg-red-100 text-red-700 border-red-200'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
            title="Alternar banner de alerta de error del sistema"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isAlertVisible ? 'Ocultar Alerta' : 'Simular Alerta'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
