export type ScreenId =
  | 'SCR-01'
  | 'SCR-02'
  | 'SCR-03'
  | 'SCR-04'
  | 'SCR-05'
  | 'SCR-06'
  | 'SCR-07';

export type SimulationState = 'normal' | 'empty' | 'loading';

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
  generatedByRole: 'Admin' | 'Gerencia' | 'Chef';
  status: 'Listo' | 'Generando';
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
  statusLabel: string;
  statusClass: string;
  description: string;
  icon: string;
  enabled: boolean;
  requiresKey?: boolean;
}

export interface RestaurantProfile {
  name: string;
  subdomain: string;
  email: string;
  whatsapp: string;
  logo: string;
  isWhatsappVerified: boolean;
}
