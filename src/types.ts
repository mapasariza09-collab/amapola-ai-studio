export type AppView =
  | 'auth'
  | 'dashboard'
  | 'items-list'
  | 'item-detail'
  | 'item-create'
  | 'settings';

export type ScreenId =
  | 'SCR-01'
  | 'SCR-02'
  | 'SCR-03'
  | 'SCR-04'
  | 'SCR-05'
  | 'SCR-06'
  | 'SCR-07';

export type SimulationState = 'normal' | 'empty' | 'loading' | 'error';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  provider: 'supabase' | 'google-firebase' | 'local';
}

export type ItemStatus = 'active' | 'in-progress' | 'completed' | 'archived';
export type ItemPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ItemRecord {
  id: string;
  owner_id: string;
  title: string;
  sku: string;
  category: string;
  status: ItemStatus;
  priority: ItemPriority;
  price: number;
  cost: number;
  stock: number;
  description: string;
  tags: string[];
  rating: number;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

// Legacy types preserved for backward compatibility
export interface Product {
  id: string;
  name: string;
  category: 'burger' | 'drinks' | 'waffles' | 'desserts';
  categoryLabel: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  ordersCount?: number;
  prepTimeMinutes?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type DishStatus = 'pendiente' | 'preparacion' | 'entregado';

export interface OrderDish {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  status: DishStatus;
  categoryIcon?: string;
}

export interface ClientOrder {
  id: string;
  code: string;
  clientName: string;
  clientType: string;
  email: string;
  phone: string;
  address: string;
  time: string;
  orderType: 'domicilio' | 'retiro' | 'mesa';
  dishes: OrderDish[];
  total: number;
  date: string;
  isToday?: boolean;
  status: 'pendiente' | 'preparacion' | 'entregado' | 'cerrado';
  estimatedMinutes?: number;
}

export interface ExportedReport {
  id: string;
  name: string;
  format: 'PDF' | 'XLSX' | 'CSV';
  size: string;
  pagesOrSheets: string;
  date: string;
  generatedBy: string;
  generatedByRole: string;
  status: 'Listo' | 'Generando' | 'Error';
}

export interface RoleMatrixItem {
  id: string;
  code: string;
  roleName: string;
  badge: string;
  badgeClass: string;
  manageProducts: boolean;
  modifyOrders: boolean;
  viewSalesSummary: boolean;
  alterPrices: boolean;
  note?: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  statusLabel: string;
  statusClass: string;
  requiresKey?: boolean;
}

export interface RestaurantProfile {
  name: string;
  subdomain: string;
  email: string;
  whatsapp: string;
  logo: string;
  isWhatsappVerified?: boolean;
}
