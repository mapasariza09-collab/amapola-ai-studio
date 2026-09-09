import React from 'react';
import { AlertCircle, CheckCircle2, X, Info } from 'lucide-react';

interface ToastAlertsProps {
  isAlertVisible: boolean;
  onDismissAlert: () => void;
  successToastMessage: string | null;
  onDismissToast: () => void;
}

export const ToastAlerts: React.FC<ToastAlertsProps> = ({
  isAlertVisible,
  onDismissAlert,
  successToastMessage,
  onDismissToast,
}) => {
  return (
    <>
      {/* Global Dismissible Error Banner */}
      {isAlertVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="w-full bg-red-50 text-red-900 border border-red-200 rounded-2xl p-4 flex items-start justify-between shadow-xs transition-all duration-300">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-[#E53935] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-900">
                  Alerta Operativa de Conexión en Cocina Central
                </h4>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  No se pudieron sincronizar los últimos cambios del KDS en vivo. Verifique la conexión a internet o reintente la operación.
                </p>
              </div>
            </div>
            <button
              onClick={onDismissAlert}
              className="text-red-400 hover:text-red-800 p-1 rounded-lg transition-colors"
              title="Cerrar alerta"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Success Feedback Toast */}
      {successToastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full pointer-events-none animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="pointer-events-auto bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-gray-700 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#10B981] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                Operación Exitosa
              </h5>
              <p className="text-xs text-gray-300 mt-0.5 truncate">
                {successToastMessage}
              </p>
            </div>
            <button
              onClick={onDismissToast}
              className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
