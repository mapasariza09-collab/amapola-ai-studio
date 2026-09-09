import React, { useState } from 'react';
import {
  ScreenId,
  SimulationState,
  Product,
  ClientOrder,
  CartItem,
  ExportedReport,
  RoleMatrixItem,
  PaymentGateway,
  RestaurantProfile,
  DishStatus,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CART,
  INITIAL_REPORTS,
  INITIAL_RBAC,
  INITIAL_PAYMENT_GATEWAYS,
  INITIAL_PROFILE,
} from './data/mockData';
import { Header } from './components/Header';
import { StateControlBar } from './components/StateControlBar';
import { ToastAlerts } from './components/ToastAlerts';
import { Footer } from './components/Footer';

import { SCR01_Auth } from './components/screens/SCR01_Auth';
import { SCR02_Dashboard } from './components/screens/SCR02_Dashboard';
import { SCR03_Catalog } from './components/screens/SCR03_Catalog';
import { SCR04_OrderKDS } from './components/screens/SCR04_OrderKDS';
import { SCR05_Cart } from './components/screens/SCR05_Cart';
import { SCR06_Settings } from './components/screens/SCR06_Settings';
import { SCR07_Reports } from './components/screens/SCR07_Reports';

export default function App() {
  // Navigation & State Management
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('SCR-01');
  const [simulationState, setSimulationState] = useState<SimulationState>('normal');
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [successToastMessage, setSuccessToastMessage] = useState<string | null>(null);

  // Business Data Store
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<ClientOrder[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [reports, setReports] = useState<ExportedReport[]>(INITIAL_REPORTS);
  const [rbacMatrix, setRbacMatrix] = useState<RoleMatrixItem[]>(INITIAL_RBAC);
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>(INITIAL_PAYMENT_GATEWAYS);
  const [profile, setProfile] = useState<RestaurantProfile>(INITIAL_PROFILE);

  // Toast Helper
  const showToast = (msg: string) => {
    setSuccessToastMessage(msg);
    setTimeout(() => {
      setSuccessToastMessage((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Cart Handlers
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Artículo retirado del carrito.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('El carrito ha sido vaciado.');
  };

  const handleCheckoutSuccess = () => {
    // Generate new order in kitchen KDS
    const newOrderCode = `#AG-${Math.floor(4000 + Math.random() * 999)}`;
    const newTotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newOrder: ClientOrder = {
      id: `ord-${Date.now()}`,
      code: newOrderCode,
      clientName: 'Comensal en Línea (Mesa / Express)',
      clientType: 'Pedido Web',
      email: 'comensal.web@amapola.com',
      phone: '312 000 0000',
      address: 'Mesa 3 / Domicilio Centro',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderType: 'domicilio',
      total: newTotal > 0 ? newTotal : 56.96,
      date: '30/06/2026',
      isToday: true,
      status: 'pendiente',
      dishes: cart.map((item, idx) => ({
        id: `dish-${Date.now()}-${idx}`,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        description: item.product.description,
        status: 'pendiente',
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  // KDS Handlers
  const handleUpdateDishStatus = (
    orderId: string,
    dishId: string,
    status: DishStatus
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedDishes = ord.dishes.map((d) =>
            d.id === dishId ? { ...d, status } : d
          );
          return { ...ord, dishes: updatedDishes };
        }
        return ord;
      })
    );
  };

  // Product Catalog Handlers
  const handleAddProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
  };

  // Reports Handlers
  const handleGenerateReport = (name: string, format: 'PDF' | 'XLSX' | 'CSV') => {
    const newRep: ExportedReport = {
      id: `rep-${Date.now()}`,
      name,
      format,
      size: format === 'PDF' ? '1.8 MB' : '420 KB',
      pagesOrSheets: format === 'PDF' ? '28 páginas consolidadas' : 'Hoja analítica',
      date: new Date().toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      generatedBy: 'Admin',
      generatedByRole: 'Admin',
      status: 'Listo',
    };
    setReports((prev) => [newRep, ...prev]);
  };

  // Settings Handlers
  const handleToggleGateway = (gatewayId: string) => {
    setPaymentGateways((prev) =>
      prev.map((gw) => (gw.id === gatewayId ? { ...gw, enabled: !gw.enabled } : gw))
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 flex flex-col antialiased selection:bg-[#8B1D24] selection:text-white">
      {/* Primary Brand Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        cartCount={totalCartCount}
      />

      {/* Simulator Control Bar for Multi-Screen & State Evaluation */}
      <StateControlBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        simulationState={simulationState}
        onChangeState={(st) => setSimulationState(st)}
        isAlertVisible={isAlertVisible}
        onToggleAlert={() => setIsAlertVisible(!isAlertVisible)}
      />

      {/* Toast & Error Alert Notifications */}
      <ToastAlerts
        isAlertVisible={isAlertVisible}
        onDismissAlert={() => setIsAlertVisible(false)}
        successToastMessage={successToastMessage}
        onDismissToast={() => setSuccessToastMessage(null)}
      />

      {/* Main Content Area: Screen Switcher */}
      <main className="flex-1 w-full">
        {currentScreen === 'SCR-01' && (
          <SCR01_Auth
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'SCR-02' && (
          <SCR02_Dashboard
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'SCR-03' && (
          <SCR03_Catalog
            products={products}
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        )}

        {currentScreen === 'SCR-04' && (
          <SCR04_OrderKDS
            orders={orders}
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            onUpdateDishStatus={handleUpdateDishStatus}
          />
        )}

        {currentScreen === 'SCR-05' && (
          <SCR05_Cart
            cart={cart}
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}

        {currentScreen === 'SCR-06' && (
          <SCR06_Settings
            profile={profile}
            rbacMatrix={rbacMatrix}
            paymentGateways={paymentGateways}
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            onUpdateProfile={(updated) => setProfile((p) => ({ ...p, ...updated }))}
            onUpdateRbac={(updated) => setRbacMatrix(updated)}
            onToggleGateway={handleToggleGateway}
          />
        )}

        {currentScreen === 'SCR-07' && (
          <SCR07_Reports
            reports={reports}
            simulationState={simulationState}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            onGenerateReport={handleGenerateReport}
          />
        )}
      </main>

      {/* Institutional Global Footer */}
      <Footer />
    </div>
  );
}
