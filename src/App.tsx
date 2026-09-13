import React, { useState, useEffect } from 'react';
import { AppView, ItemRecord, ItemStatus, SimulationState } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { itemsService } from './services/itemsService';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

import { AuthView } from './components/views/AuthView';
import { DashboardView } from './components/views/DashboardView';
import { ItemsListView } from './components/views/ItemsListView';
import { ItemDetailView } from './components/views/ItemDetailView';
import { ItemCreateWizardView } from './components/views/ItemCreateWizardView';
import { SettingsView } from './components/views/SettingsView';

function MainAppContent() {
  const { user } = useAuth();
  const { addToast } = useToast();

  // Reactive State Machine for Multi-View Routing
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedItem, setSelectedItem] = useState<ItemRecord | null>(null);

  // Items State & UI Simulation
  const [items, setItems] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [simulationState, setSimulationState] = useState<SimulationState>('normal');

  // Load items from database
  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await itemsService.getItems();
      setItems(data);
      if (data.length > 0 && !selectedItem) {
        setSelectedItem(data[0]);
      }
    } catch (err) {
      console.error('Failed to load items:', err);
      addToast('error', 'Error al cargar registros desde PostgreSQL.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // CRUD Actions
  const handleCreateItem = async (
    itemData: Omit<ItemRecord, 'id' | 'created_at' | 'updated_at' | 'owner_id'>
  ): Promise<ItemRecord> => {
    const ownerId = user?.id || 'usr_admin_default';
    const created = await itemsService.createItem(itemData, ownerId);
    setItems((prev) => [created, ...prev]);
    setSelectedItem(created);
    return created;
  };

  const handleUpdateItem = async (id: string, updates: Partial<ItemRecord>) => {
    const updated = await itemsService.updateItem(id, updates);
    if (updated) {
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
      if (selectedItem?.id === id) {
        setSelectedItem(updated);
      }
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: ItemStatus) => {
    await handleUpdateItem(id, { status: newStatus });
  };

  const handleDeleteItem = async (id: string) => {
    await itemsService.deleteItem(id);
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleResetDemo = async () => {
    const fresh = await itemsService.resetToDemo();
    setItems(fresh);
    if (fresh.length > 0) {
      setSelectedItem(fresh[0]);
    }
  };

  // If there is no user session or view is explicitly set to 'auth', render AuthView
  if (!user || currentView === 'auth') {
    return (
      <AuthView
        onSuccess={() => {
          setCurrentView('dashboard');
          loadItems();
        }}
      />
    );
  }

  // Determine items passed down according to simulationState
  const effectiveItems =
    simulationState === 'empty' ? [] : items;
  const effectiveLoading =
    simulationState === 'loading' ? true : loading;

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 font-sans antialiased selection:bg-[#6366f1] selection:text-white">
      {/* Persistent Sidebar */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Persistent Header with Breadcrumbs & Ctrl+K */}
        <Header
          currentView={currentView}
          selectedItemTitle={selectedItem?.title}
          onNavigate={setCurrentView}
          onSelectItem={setSelectedItem}
          items={items}
        />

        {/* Dynamic Main View Router */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              items={effectiveItems}
              loading={effectiveLoading}
              simulationState={simulationState}
              onNavigate={setCurrentView}
              onSelectItem={setSelectedItem}
              onRetry={() => {
                setSimulationState('normal');
                loadItems();
              }}
            />
          )}

          {currentView === 'items-list' && (
            <ItemsListView
              items={effectiveItems}
              loading={effectiveLoading}
              simulationState={simulationState}
              onNavigate={setCurrentView}
              onSelectItem={setSelectedItem}
              onDeleteItem={handleDeleteItem}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {currentView === 'item-detail' && (
            <ItemDetailView
              item={selectedItem}
              onNavigate={setCurrentView}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
            />
          )}

          {currentView === 'item-create' && (
            <ItemCreateWizardView
              onNavigate={setCurrentView}
              onCreateItem={handleCreateItem}
              onSelectCreatedItem={setSelectedItem}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              simulationState={simulationState}
              onSetSimulationState={setSimulationState}
              onResetDemo={handleResetDemo}
              onNavigate={setCurrentView}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
