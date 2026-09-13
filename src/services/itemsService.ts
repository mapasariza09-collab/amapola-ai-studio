import { ItemRecord, ItemStatus, ItemPriority } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const INITIAL_ITEMS: ItemRecord[] = [
  {
    id: 'item-001',
    owner_id: 'usr_admin_default',
    title: 'Amapola Truffle Burger Deluxe',
    sku: 'AG-BGR-001',
    category: 'Hamburguesas',
    status: 'active',
    priority: 'high',
    price: 38900,
    cost: 16500,
    stock: 45,
    description: 'Carne Angus 200g madurada 21 días, alioli de trufa negra de verano, queso brie fundido, cebolla caramelizada al oporto en pan brioche artesanal dorado con mantequilla clarificada.',
    tags: ['Best Seller', 'Gourmet', 'Truffle', 'Angus'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'item-002',
    owner_id: 'usr_admin_default',
    title: 'Smoked Bacon & Cheddar Stack',
    sku: 'AG-BGR-002',
    category: 'Hamburguesas',
    status: 'active',
    priority: 'medium',
    price: 34500,
    cost: 14200,
    stock: 62,
    description: 'Doble smash patty de res seleccionada, tocino ahumado en madera de manzano, cheddar inglés añejo, pepinillos encurtidos de la casa y salsa secreta Amapola.',
    tags: ['Smash', 'Bacon', 'Cheddar'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'item-003',
    owner_id: 'usr_admin_default',
    title: 'Waffle Belga con Frutos Rojos y Crema Mascarpone',
    sku: 'AG-WFL-101',
    category: 'Waffles Gourmet',
    status: 'active',
    priority: 'high',
    price: 26900,
    cost: 8900,
    stock: 38,
    description: 'Waffle crujiente de Lieja con perlas de azúcar perlado, reducción artesanal de frambuesas y moras silvestres, quenelle de mascarpone a la vainilla de Madagascar.',
    tags: ['Dulce', 'Artesanal', 'Frutos Rojos'],
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'item-004',
    owner_id: 'usr_admin_default',
    title: 'Soda Artesanal de Frutos Rojos Silvestres & Albahaca',
    sku: 'AG-DRK-201',
    category: 'Bebidas de Autor',
    status: 'active',
    priority: 'medium',
    price: 14900,
    cost: 4100,
    stock: 120,
    description: 'Extracción en frío de arándanos, frambuesas y cerezas con infusión de albahaca morada, agua con gas mineralizada y hielo cristalino tallado a mano.',
    tags: ['Refrescante', 'Sin Alcohol', 'House Made'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'item-005',
    owner_id: 'usr_admin_default',
    title: 'Waffle Salado de Pollo Crujiente y Miel Picante',
    sku: 'AG-WFL-102',
    category: 'Waffles Gourmet',
    status: 'in-progress',
    priority: 'urgent',
    price: 32000,
    cost: 13500,
    stock: 15,
    description: 'Pechuga de pollo de granja marinada en buttermilk 24h con rebozado crujiente de especias cajún, servida sobre waffle de queso parmesano y glaseado con hot honey.',
    tags: ['Crispy Chicken', 'Hot Honey', 'Salado'],
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'item-006',
    owner_id: 'usr_admin_default',
    title: 'Papas Rústicas con Romero y Parmesano Reggiano',
    sku: 'AG-SID-301',
    category: 'Acompañamientos',
    status: 'active',
    priority: 'low',
    price: 16500,
    cost: 4800,
    stock: 80,
    description: 'Papas nativas cortadas a mano con doble cocción, aceite de oliva extra virgen, sal marina volcánica, romero fresco del huerto y lluvia de Parmigiano 24 meses.',
    tags: ['Sides', 'Rústicas', 'Parmigiano'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    created_at: new Date(Date.now() - 3600000 * 120).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
];

const STORAGE_KEY = 'amapola_gourmet_items_v2';

export const itemsService = {
  async getItems(): Promise<ItemRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: String(d.id),
            owner_id: d.owner_id || 'usr_admin',
            title: d.title,
            sku: d.sku || `AG-${d.id}`,
            category: d.category || 'General',
            status: (d.status as ItemStatus) || 'active',
            priority: (d.priority as ItemPriority) || 'medium',
            price: Number(d.price) || 0,
            cost: Number(d.cost) || 0,
            stock: Number(d.stock) || 0,
            description: d.description || '',
            tags: Array.isArray(d.tags) ? d.tags : (d.tags ? String(d.tags).split(',') : []),
            rating: Number(d.rating) || 4.8,
            image: d.image,
            created_at: d.created_at || new Date().toISOString(),
            updated_at: d.updated_at || new Date().toISOString(),
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local database store:', err);
      }
    }

    // Local storage persistence fallback
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
      return INITIAL_ITEMS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_ITEMS;
    }
  },

  async getItemById(id: string): Promise<ItemRecord | null> {
    const items = await this.getItems();
    return items.find((it) => it.id === id) || null;
  },

  async createItem(
    itemData: Omit<ItemRecord, 'id' | 'created_at' | 'updated_at' | 'owner_id'>,
    ownerId: string
  ): Promise<ItemRecord> {
    const newItem: ItemRecord = {
      ...itemData,
      id: `item-${Date.now()}`,
      owner_id: ownerId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('items').insert([
          {
            owner_id: ownerId,
            title: newItem.title,
            sku: newItem.sku,
            category: newItem.category,
            status: newItem.status,
            priority: newItem.priority,
            price: newItem.price,
            cost: newItem.cost,
            stock: newItem.stock,
            description: newItem.description,
            tags: newItem.tags.join(','),
            rating: newItem.rating,
          },
        ]).select().single();

        if (!error && data) {
          newItem.id = String(data.id);
        }
      } catch (err) {
        console.warn('Supabase insert error, saved locally:', err);
      }
    }

    const current = await this.getItems();
    const updated = [newItem, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  },

  async updateItem(id: string, updates: Partial<ItemRecord>): Promise<ItemRecord | null> {
    const current = await this.getItems();
    const index = current.findIndex((it) => it.id === id);
    if (index === -1) return null;

    const updatedItem = {
      ...current[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('items')
          .update({
            title: updatedItem.title,
            sku: updatedItem.sku,
            category: updatedItem.category,
            status: updatedItem.status,
            priority: updatedItem.priority,
            price: updatedItem.price,
            cost: updatedItem.cost,
            stock: updatedItem.stock,
            description: updatedItem.description,
          })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase update error:', err);
      }
    }

    current[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return updatedItem;
  },

  async deleteItem(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('items').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }

    const current = await this.getItems();
    const filtered = current.filter((it) => it.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  async resetToDemo(): Promise<ItemRecord[]> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ITEMS));
    return INITIAL_ITEMS;
  },
};
