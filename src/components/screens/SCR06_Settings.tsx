import React, { useState } from 'react';
import {
  RoleMatrixItem,
  PaymentGateway,
  RestaurantProfile,
  SimulationState,
  ScreenId,
} from '../../types';
import {
  Store,
  Shield,
  CreditCard,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Upload,
  Phone,
  Mail,
  Globe,
  QrCode,
  Truck,
  Layers,
  Key,
} from 'lucide-react';

interface SCR06SettingsProps {
  profile: RestaurantProfile;
  rbacMatrix: RoleMatrixItem[];
  paymentGateways: PaymentGateway[];
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  onUpdateProfile: (updated: Partial<RestaurantProfile>) => void;
  onUpdateRbac: (updated: RoleMatrixItem[]) => void;
  onToggleGateway: (gatewayId: string) => void;
}

export const SCR06_Settings: React.FC<SCR06SettingsProps> = ({
  profile,
  rbacMatrix,
  paymentGateways,
  simulationState,
  onNavigate,
  onShowToast,
  onUpdateProfile,
  onUpdateRbac,
  onToggleGateway,
}) => {
  const [localProfile, setLocalProfile] = useState<RestaurantProfile>(profile);
  const [localRbac, setLocalRbac] = useState<RoleMatrixItem[]>(rbacMatrix);
  const [isSaving, setIsSaving] = useState(false);

  const handleCheckboxToggle = (
    roleId: string,
    field: keyof Omit<RoleMatrixItem, 'id' | 'code' | 'roleName' | 'badge' | 'badgeClass' | 'note'>
  ) => {
    const updated = localRbac.map((r) => {
      if (r.id === roleId) {
        return { ...r, [field]: !r[field] };
      }
      return r;
    });
    setLocalRbac(updated);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onUpdateProfile(localProfile);
      onUpdateRbac(localRbac);
      onShowToast('Ajustes de identidad, pagos y matriz RBAC guardados con éxito.');
    }, 1000);
  };

  if (simulationState === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse flex flex-col gap-6">
        <div className="h-10 w-64 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-white rounded-2xl border border-gray-200"></div>
          <div className="h-80 bg-white rounded-2xl border border-gray-200"></div>
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
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No se han configurado políticas de restaurante
          </h2>
          <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
            Personaliza el perfil del restaurante y asigna permisos a cocineros, repartidores y comensales.
          </p>
          <button
            onClick={() => onShowToast('Configuración restaurada a valores por defecto')}
            className="px-6 py-3 bg-[#007BFF] hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md transition-all"
          >
            Cargar Parámetros Predeterminados
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#8B1D24] text-[11px] font-bold uppercase tracking-wider">
                Control Institucional
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                Políticas de Seguridad & Pasarelas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mt-1">
              Configuración General y Roles (RBAC)
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Personalización de identidad, pasarelas de pago y matriz de permisos por perfiles.
            </p>
          </div>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#8B1D24] hover:bg-[#72171d] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto disabled:opacity-75"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Guardar Ajustes</span>
          </button>
        </div>

        {/* Bento Grid Principal: 2 Bloques Superiores */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* BLOQUE 1: Identidad & Contacto */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B1D24] flex items-center justify-center">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Identidad & Contacto
                    </h2>
                    <p className="text-[11px] text-gray-400">
                      Datos mostrados en comandas y recibos de compra
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Perfil Activo
                </span>
              </div>

              {/* Logo Uploader */}
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <img
                  src={localProfile.logo}
                  alt="Logo"
                  className="w-14 h-14 rounded-xl object-contain bg-white p-1 border border-gray-200 shadow-2xs"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-900">
                    Emblema de la Marca
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    PNG transparente o JPG cuadrado (mínimo 400x400)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast('Emblema de restaurante actualizado')}
                  className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-300 transition-all flex items-center gap-1 shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir</span>
                </button>
              </div>

              {/* Campos de Identidad */}
              <div className="flex flex-col gap-3.5 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">
                    Nombre del Establecimiento
                  </label>
                  <input
                    type="text"
                    value={localProfile.name}
                    onChange={(e) =>
                      setLocalProfile({ ...localProfile, name: e.target.value })
                    }
                    className="h-10 px-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D24]/20"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 flex items-center justify-between">
                    <span>Identificador de Subdominio</span>
                    <span className="text-[10px] font-bold text-blue-600">
                      Dominio Certificado [PRO]
                    </span>
                  </label>
                  <div className="flex items-center">
                    <span className="h-10 px-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500 flex items-center font-mono">
                      https://
                    </span>
                    <input
                      type="text"
                      value={localProfile.subdomain}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          subdomain: e.target.value,
                        })
                      }
                      className="flex-1 h-10 px-3 bg-gray-50 border border-gray-200 rounded-r-xl text-gray-900 font-medium font-mono focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">
                    Correo Electrónico Principal
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
                    <input
                      type="email"
                      value={localProfile.email}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          email: e.target.value,
                        })
                      }
                      className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700 flex items-center justify-between">
                    <span>WhatsApp para Notificaciones de Pedidos</span>
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verificado
                    </span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
                    <input
                      type="text"
                      value={localProfile.whatsapp}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          whatsapp: e.target.value,
                        })
                      }
                      className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-mono focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 2: Pasarelas & Recepción de Pagos */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#007BFF] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Pasarelas & Recepción de Pagos
                    </h2>
                    <p className="text-[11px] text-gray-400">
                      Canales autorizados para el checkout y mostrador
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  2 Activas
                </span>
              </div>

              {/* Lista de Pasarelas */}
              <div className="flex flex-col gap-4">
                {paymentGateways.map((gw) => (
                  <div
                    key={gw.id}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex items-start justify-between gap-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
                        {gw.icon === 'qr_code_2' ? (
                          <QrCode className="w-5 h-5 text-blue-600" />
                        ) : gw.icon === 'local_shipping' ? (
                          <Truck className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Key className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-gray-900">
                            {gw.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${gw.statusClass}`}
                          >
                            {gw.statusLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {gw.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => {
                        onToggleGateway(gw.id);
                        onShowToast(
                          `Pasarela "${gw.name}" ${
                            gw.enabled ? 'desactivada' : 'activada'
                          }`
                        );
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                        gw.enabled ? 'bg-[#007BFF]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          gw.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Para activar transferencias con tarjetas de crédito internacionales en Wompi o Stripe, configure sus llaves de producción secretas en el servidor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 3: Matriz de Permisos por Roles (RBAC Table) - EXACTO A IMAGE 13 */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#8B1D24] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Matriz de Permisos por Roles (RBAC)
                </h2>
                <p className="text-xs text-gray-400">
                  Control granular de accesos por partida y personal del restaurante
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-mono">
              Role Based Access Control • ISO 27001
            </span>
          </div>

          {/* Tabla de Matriz RBAC */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Rol / Perfil</th>
                  <th className="py-3 px-4 text-center">Gestionar Productos</th>
                  <th className="py-3 px-4 text-center">Modificar Pedidos</th>
                  <th className="py-3 px-4 text-center">Ver Resumen Ventas</th>
                  <th className="py-3 px-4 text-center">Alterar Precios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {localRbac.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Role identity and badge */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs">
                          {item.code}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">
                              {item.roleName}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeClass}`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          {item.note && (
                            <span className="text-[11px] text-gray-400">
                              {item.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Checkbox: Gestionar Productos */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.manageProducts}
                        onChange={() =>
                          handleCheckboxToggle(item.id, 'manageProducts')
                        }
                        className="w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] border-gray-300 cursor-pointer"
                      />
                    </td>

                    {/* Checkbox: Modificar Pedidos */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.modifyOrders}
                        onChange={() =>
                          handleCheckboxToggle(item.id, 'modifyOrders')
                        }
                        className="w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] border-gray-300 cursor-pointer"
                      />
                    </td>

                    {/* Checkbox: Ver Resumen Ventas */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.viewSalesSummary}
                        onChange={() =>
                          handleCheckboxToggle(item.id, 'viewSalesSummary')
                        }
                        className="w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] border-gray-300 cursor-pointer"
                      />
                    </td>

                    {/* Checkbox: Alterar Precios */}
                    <td className="py-4 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.alterPrices}
                        onChange={() =>
                          handleCheckboxToggle(item.id, 'alterPrices')
                        }
                        className="w-4 h-4 rounded text-[#007BFF] focus:ring-[#007BFF] border-gray-300 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
            <span>
              Los cambios en la matriz surten efecto inmediato para las sesiones de terminal y comensales.
            </span>
            <span className="font-semibold text-gray-600">
              Versión RBAC: 3.2.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
