import React, { useState } from 'react';
import { ExportedReport, SimulationState, ScreenId } from '../../types';
import {
  FileText,
  Download,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface SCR07ReportsProps {
  reports: ExportedReport[];
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  onGenerateReport: (name: string, format: 'PDF' | 'XLSX' | 'CSV') => void;
}

export const SCR07_Reports: React.FC<SCR07ReportsProps> = ({
  reports,
  simulationState,
  onNavigate,
  onShowToast,
  onGenerateReport,
}) => {
  const [dateRange, setDateRange] = useState<'30days' | 'month' | 'custom'>('30days');
  const [salesFormat, setSalesFormat] = useState<'PDF' | 'XLSX' | 'CSV'>('PDF');
  const [dishesFormat, setDishesFormat] = useState<'PDF' | 'XLSX'>('PDF');
  const [historySearch, setHistorySearch] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const handleDownload = (rep: ExportedReport) => {
    onShowToast(`Descargando archivo "${rep.name}" (${rep.format})...`);
  };

  const handleCreateReport = (type: 'ventas' | 'platos') => {
    const format = type === 'ventas' ? salesFormat : dishesFormat;
    const name =
      type === 'ventas'
        ? `Consolidado_Ventas_${new Date().toISOString().slice(0, 10)}.${format.toLowerCase()}`
        : `Rotacion_Platos_Amapola_${new Date().toISOString().slice(0, 10)}.${format.toLowerCase()}`;

    setIsGenerating(type);
    setTimeout(() => {
      setIsGenerating(null);
      onGenerateReport(name, format);
      onShowToast(`Reporte "${name}" compilado y listo para descarga.`);
    }, 1200);
  };

  const filteredReports = reports.filter((r) =>
    r.name.toLowerCase().includes(historySearch.toLowerCase())
  );

  if (simulationState === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse flex flex-col gap-6">
        <div className="h-10 w-72 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-white rounded-2xl border border-gray-200"></div>
          <div className="h-72 bg-white rounded-2xl border border-gray-200"></div>
        </div>
        <div className="h-64 bg-white rounded-2xl border border-gray-200"></div>
      </div>
    );
  }

  if (simulationState === 'empty') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#8B1D24] flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No hay reportes generados en el archivo histórico
          </h2>
          <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
            Puedes generar consolidados de ventas contables o análisis de rotación de menú para el periodo actual.
          </p>
          <button
            onClick={() => handleCreateReport('ventas')}
            className="px-6 py-3 bg-[#007BFF] hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md transition-all"
          >
            Generar Primer Consolidado (PDF)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Cabecera de la Suite */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#8B1D24] text-[11px] font-bold uppercase tracking-wider">
                Inteligencia de Negocio
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                Auditoría Contable & Ventas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
              Generación de Reportes & Analítica
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Consolidados ejecutivos y exportación de datos contables para auditoría y toma de decisiones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="h-10 px-3 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#8B1D24]/20"
            >
              <option value="30days">Últimos 30 días</option>
              <option value="month">Este Mes (Junio 2026)</option>
              <option value="custom">Rango Personalizado</option>
            </select>
          </div>
        </div>

        {/* Bento Grid Superior: 2 Tarjetas Generadoras según Image 11 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* TARJETA 1: Reporte Consolidado de Ventas */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#007BFF] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Reporte Consolidado de Ventas
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Desglose por fecha, canal de venta (Mesa, Retiro, Domicilio) y comisiones de pasarela.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicadores Clave */}
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200/80">
                <div>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Ingresos Totales
                  </span>
                  <span className="text-base font-extrabold text-gray-900 tabular-nums">
                    $18.450.000
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    Órdenes
                  </span>
                  <span className="text-base font-extrabold text-gray-900 tabular-nums">
                    342
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    IVA Recaudado
                  </span>
                  <span className="text-base font-extrabold text-gray-900 tabular-nums">
                    $2.952.000
                  </span>
                </div>
              </div>

              {/* Selector de Formato */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-semibold text-gray-700">
                  Formato de Exportación
                </label>
                <div className="flex items-center gap-2">
                  {(['PDF', 'XLSX', 'CSV'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSalesFormat(fmt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        salesFormat === fmt
                          ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCreateReport('ventas')}
              disabled={isGenerating === 'ventas'}
              className="w-full py-3 px-4 rounded-xl bg-[#007BFF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isGenerating === 'ventas' ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Compilando ventas...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generar Reporte Ahora ({salesFormat})</span>
                </>
              )}
            </button>
          </div>

          {/* TARJETA 2: Informe de Platos Más Vendidos */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1D24] flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Informe de Platos Más Vendidos y Rotación de Menú
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Ranking de productos por volumen, margen de contribución y horas pico de demanda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicadores de Rotación */}
              <div className="flex flex-col gap-2 p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    1. Hamburguesa La Salvaje
                  </span>
                  <span className="font-bold text-[#8B1D24]">
                    142 pedidos (41%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8B1D24] h-full rounded-full w-[41%]"></div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="font-semibold text-gray-800">
                    2. Waffle Amapola Maduro
                  </span>
                  <span className="font-bold text-[#007BFF]">
                    98 pedidos (28%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#007BFF] h-full rounded-full w-[28%]"></div>
                </div>
              </div>

              {/* Selector de Formato */}
              <div className="flex flex-col gap-1.5 pt-1">
                <label className="text-xs font-semibold text-gray-700">
                  Formato de Exportación
                </label>
                <div className="flex items-center gap-2">
                  {(['PDF', 'XLSX'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setDishesFormat(fmt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        dishesFormat === fmt
                          ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCreateReport('platos')}
              disabled={isGenerating === 'platos'}
              className="w-full py-3 px-4 rounded-xl bg-[#007BFF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isGenerating === 'platos' ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Compilando rotación...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generar Reporte Ahora ({dishesFormat})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bento Card 3: Historial de Reportes Exportados - EXACTO A IMAGE 11 */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Historial de Reportes Exportados
              </h2>
              <p className="text-xs text-gray-400">
                Archivos generados en sesiones previas disponibles para descarga inmediata
              </p>
            </div>

            {/* Buscador Rápido de Reportes */}
            <div className="relative min-w-[280px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Buscar por nombre de reporte o fecha..."
                className="w-full h-9 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Tabla de Reportes */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Nombre del Reporte</th>
                  <th className="py-3 px-4">Formato</th>
                  <th className="py-3 px-4">Tamaño & Páginas</th>
                  <th className="py-3 px-4">Fecha de Generación</th>
                  <th className="py-3 px-4">Generado Por</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredReports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-900">
                      {rep.name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rep.format === 'PDF'
                            ? 'bg-red-100 text-[#8B1D24]'
                            : rep.format === 'XLSX'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {rep.format}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {rep.size} • {rep.pagesOrSheets}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">
                      {rep.date}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-700">
                      {rep.generatedBy}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownload(rep)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#007BFF] hover:bg-blue-50 transition-colors"
                        title="Descargar Reporte"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
