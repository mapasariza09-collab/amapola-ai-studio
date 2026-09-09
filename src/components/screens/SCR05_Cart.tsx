import React, { useState } from 'react';
import { CartItem, SimulationState, ScreenId } from '../../types';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  DollarSign,
  CreditCard,
  QrCode,
  Truck,
} from 'lucide-react';

interface SCR05CartProps {
  cart: CartItem[];
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: () => void;
}

export const SCR05_Cart: React.FC<SCR05CartProps> = ({
  cart,
  simulationState,
  onNavigate,
  onShowToast,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}) => {
  const [coupon, setCoupon] = useState<string>('AMAPOLA10');
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cod' | 'pickup'>('transfer');
  const [cashChange, setCashChange] = useState<string>('exact');
  const [chefInstructions, setChefInstructions] = useState<string>(
    'Punto de carne 3/4 para la Salvaje, sin picante en la salsa tártara por favor.'
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Financial Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingFee = paymentMethod === 'pickup' ? 0.0 : 3.0;
  const discountAmount = isCouponApplied ? 2.0 : 0.0;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'AMAPOLA10') {
      setIsCouponApplied(true);
      onShowToast('Cupón AMAPOLA10 aplicado: Descuento de $2.00 USD');
    } else {
      setIsCouponApplied(false);
      onShowToast('Cupón no válido o expirado.');
    }
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onCheckoutSuccess();
      onShowToast(
        '¡Pedido Gourmet Confirmado! Enviado inmediatamente a KDS Cocina.'
      );
      onNavigate('SCR-04');
    }, 1500);
  };

  if (simulationState === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse flex flex-col gap-6">
        <div className="h-10 w-48 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="h-28 bg-white rounded-2xl border border-gray-200"></div>
            <div className="h-28 bg-white rounded-2xl border border-gray-200"></div>
            <div className="h-28 bg-white rounded-2xl border border-gray-200"></div>
          </div>
          <div className="lg:col-span-5 h-96 bg-white rounded-2xl border border-gray-200 p-6"></div>
        </div>
      </div>
    );
  }

  if (simulationState === 'empty' || cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#8B1D24] flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu Carrito Gourmet está vacío
          </h2>
          <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
            Parece que aún no has agregado platillos ni bebidas a tu orden. Descubre nuestras hamburguesas Angus, waffles y sodas de autor.
          </p>
          <button
            onClick={() => onNavigate('SCR-03')}
            className="px-6 py-3 bg-[#8B1D24] hover:bg-[#72171d] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Explorar Menú Gourmet</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('SCR-03')}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-2xs"
              title="Volver a Catálogo"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B1D24]">
                  Pedido Actual
                </span>
                <span className="w-2 h-2 rounded-full bg-[#007BFF]"></span>
                <span className="text-xs text-gray-500">
                  {cart.reduce((a, b) => a + b.quantity, 0)} artículos
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Carrito de Compra & Checkout
              </h1>
            </div>
          </div>

          <button
            onClick={onClearCart}
            className="text-xs font-semibold text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vaciar Carrito</span>
          </button>
        </div>

        {/* Layout Bento de Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* COLUMNA IZQUIERDA: Artículos del Carrito */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-200 shadow-2xs shrink-0"
                    />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1D24]">
                        {item.product.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-xs">
                        {item.product.description}
                      </p>
                      <span className="text-sm font-bold text-[#16A34A] mt-1 inline-block tabular-nums">
                        ${item.product.price.toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  {/* Controles de Cantidad */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 self-stretch sm:self-center">
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 active:scale-95 shadow-2xs transition-all"
                        title="Disminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 active:scale-95 shadow-2xs transition-all"
                        title="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right shrink-0 min-w-[70px]">
                      <span className="text-sm font-extrabold text-gray-900 tabular-nums block">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[11px] text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notas Especiales para el Chef */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <span>Instrucciones Especiales para el Chef</span>
                <span className="text-gray-400 font-normal lowercase">(alergias, término de carne, salsas)</span>
              </label>
              <textarea
                rows={2}
                value={chefInstructions}
                onChange={(e) => setChefInstructions(e.target.value)}
                placeholder="Indica al personal de cocina tus preferencias especiales..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1D24]/20 transition-all resize-none leading-relaxed"
              ></textarea>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 px-2">
              <button
                onClick={() => onNavigate('SCR-03')}
                className="text-[#007BFF] font-semibold hover:underline flex items-center gap-1"
              >
                <span>← Continuar explorando el menú gourmet</span>
              </button>
              <span>Precios incluyen impuestos de ley</span>
            </div>
          </div>

          {/* COLUMNA DERECHA: Resumen Financiero & Pasarelas de Pago */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Resumen de Compra
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#8B1D24] text-[10px] font-extrabold uppercase">
                  Despacho Gourmet
                </span>
              </div>

              {/* Cupón Promocional */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Código de descuento"
                    className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs uppercase font-mono font-bold text-gray-900 focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 h-10 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shrink-0"
                >
                  Aplicar
                </button>
              </form>

              {/* Desglose de Precios */}
              <div className="flex flex-col gap-2.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal Platillos</span>
                  <span className="font-semibold text-gray-900 tabular-nums">
                    ${subtotal.toFixed(2)} USD
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Domicilio Gourmet (Vélez)</span>
                  <span className="font-semibold text-gray-900 tabular-nums">
                    {shippingFee === 0 ? 'Gratis (Retiro)' : `$${shippingFee.toFixed(2)} USD`}
                  </span>
                </div>

                {isCouponApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Cupón AMAPOLA10
                    </span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)} USD</span>
                  </div>
                )}

                <div className="pt-3 mt-1 border-t border-gray-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-gray-900 block">
                      Total a Pagar
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Incluye empaque biodegradable térmico
                    </span>
                  </div>
                  <span className="text-2xl font-black text-gray-900 tabular-nums text-[#8B1D24]">
                    ${total.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Selector de Método de Pago */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Método de Pago
                </label>

                {/* Opción 1: QR Bancario */}
                <div
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'transfer'
                      ? 'border-[#007BFF] bg-blue-50/50 shadow-2xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#007BFF] flex items-center justify-center shrink-0 mt-0.5">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">
                        Transferencia Bancaria / QR
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Nequi / Daviplata
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                      Acreditación inmediata con comprobante digital sin comisión.
                    </p>
                  </div>
                </div>

                {/* Opción 2: Contraentrega */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    paymentMethod === 'cod'
                      ? 'border-[#007BFF] bg-blue-50/50 shadow-2xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">
                          Pago Contraentrega
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          En Puerta
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                        Efectivo o datáfono móvil entregado por el motorizado.
                      </p>
                    </div>
                  </div>

                  {/* Detalle de cambio si es contraentrega */}
                  {paymentMethod === 'cod' && (
                    <div className="pl-11 pt-1 flex items-center gap-2 flex-wrap text-[11px]">
                      <span className="text-gray-600 font-medium">Cambio para:</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCashChange('exact');
                        }}
                        className={`px-2 py-0.5 rounded-md border font-semibold ${
                          cashChange === 'exact'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        Exacto
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCashChange('50000');
                        }}
                        className={`px-2 py-0.5 rounded-md border font-semibold ${
                          cashChange === '50000'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        $50.000
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCashChange('100000');
                        }}
                        className={`px-2 py-0.5 rounded-md border font-semibold ${
                          cashChange === '100000'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        $100.000
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCashChange('pos');
                        }}
                        className={`px-2 py-0.5 rounded-md border font-semibold ${
                          cashChange === 'pos'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        Datáfono
                      </button>
                    </div>
                  )}
                </div>

                {/* Opción 3: Pick-up en caja */}
                <div
                  onClick={() => setPaymentMethod('pickup')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'pickup'
                      ? 'border-[#007BFF] bg-blue-50/50 shadow-2xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">
                        Efectivo en Caja / Retiro
                      </span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Pick-up
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                      Recoge en el local sin costo de envío adicional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón Principal: Confirmar Pedido */}
              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl bg-[#007BFF] hover:bg-blue-600 active:scale-99 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Procesando Comanda...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Pedido Gourmet</span>
                    <span className="tabular-nums font-mono">(${total.toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Insignias de Confianza */}
            <div className="grid grid-cols-3 gap-2 text-center text-gray-500">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-[#8B1D24]" />
                <span className="text-[10px] font-bold text-gray-800">25 - 35 min</span>
                <span className="text-[9px] text-gray-400">Tiempo estimado</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#007BFF]" />
                <span className="text-[10px] font-bold text-gray-800">100% Seguro</span>
                <span className="text-[9px] text-gray-400">Protocolo SSL</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs flex flex-col items-center gap-1">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-bold text-gray-800">Garantía</span>
                <span className="text-[9px] text-gray-400">Artesanal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
