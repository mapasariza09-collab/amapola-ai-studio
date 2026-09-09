import React, { useState } from 'react';
import { Product, SimulationState, ScreenId } from '../../types';
import {
  Plus,
  Search,
  ChevronUp,
  ChevronDown,
  X,
  Edit2,
  Sparkles,
  ShoppingBag,
  Utensils,
} from 'lucide-react';

interface SCR03CatalogProps {
  products: Product[];
  simulationState: SimulationState;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
}

export const SCR03_Catalog: React.FC<SCR03CatalogProps> = ({
  products,
  simulationState,
  onNavigate,
  onShowToast,
  onAddProduct,
  onUpdateProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'burger' | 'drinks' | 'waffles' | 'desserts'>('burger');
  const [formPrice, setFormPrice] = useState('16.50');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('burger');
    setFormPrice('16.50');
    setFormDescription('Carne Angus seleccionada con queso artesanal y vegetales frescos de huerta orgánica.');
    setFormImage('https://lh3.googleusercontent.com/aida-public/AB6AXuAtszFzuVRUg2Hby8W_g9AMzV2xPSeurTbhHmTnJ-7Veg-nU7md1l9pDH5oqTMja039QuSdf93mdqyn3ohBLfDaALraZSP_8Y0JkdjbcNA4r2TWBg26e07bWnz3WkbTQZOw7q0VszCDXImr4AwmfMFx9ngNFY9HT6_cL0NkrAW_nFTh7OPRFk4j3YY2f2FdqtCgeSWy-fBrPlc1_4lmJzoE7NFfow2lWuZ-YTgksA0gKYOjBKHxgjmO');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormDescription(product.description);
    setFormImage(product.image);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPrice) || 15.0;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        categoryLabel:
          formCategory === 'burger'
            ? 'Hamburguesas Gourmet'
            : formCategory === 'drinks'
            ? 'Bebidas Artesanales'
            : formCategory === 'waffles'
            ? 'Gourmet Waffles'
            : 'Postres de Autor',
        price: priceNum,
        description: formDescription,
        image: formImage || editingProduct.image,
      });
      onShowToast(`Platillo "${formName}" actualizado con éxito.`);
    } else {
      onAddProduct({
        name: formName,
        category: formCategory,
        categoryLabel:
          formCategory === 'burger'
            ? 'Hamburguesas Gourmet'
            : formCategory === 'drinks'
            ? 'Bebidas Artesanales'
            : formCategory === 'waffles'
            ? 'Gourmet Waffles'
            : 'Postres de Autor',
        price: priceNum,
        description: formDescription,
        image: formImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtszFzuVRUg2Hby8W_g9AMzV2xPSeurTbhHmTnJ-7Veg-nU7md1l9pDH5oqTMja039QuSdf93mdqyn3ohBLfDaALraZSP_8Y0JkdjbcNA4r2TWBg26e07bWnz3WkbTQZOw7q0VszCDXImr4AwmfMFx9ngNFY9HT6_cL0NkrAW_nFTh7OPRFk4j3YY2f2FdqtCgeSWy-fBrPlc1_4lmJzoE7NFfow2lWuZ-YTgksA0gKYOjBKHxgjmO',
        badge: 'Nuevo Lanzamiento',
        badgeColor: 'bg-[#8B1D24] text-white',
        ordersCount: 0,
        prepTimeMinutes: 12,
      });
      onShowToast(`Nuevo plato "${formName}" añadido a la carta.`);
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (simulationState === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse flex flex-col gap-8">
        <div className="h-44 bg-stone-900 rounded-3xl"></div>
        <div className="h-16 bg-white rounded-2xl border border-gray-200"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-5 border border-stone-200 flex flex-col items-center gap-3"
            >
              <div className="h-[180px] w-full bg-stone-200 rounded-2xl"></div>
              <div className="h-6 w-3/4 bg-stone-200 rounded-md"></div>
              <div className="h-14 w-full bg-stone-100 rounded-md"></div>
              <div className="h-6 w-16 bg-stone-200 rounded-md"></div>
              <div className="h-9 w-32 bg-stone-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (simulationState === 'empty' || filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Search header remains accessible */}
        <section className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#8B1D24] font-bold">
              Gestión de Menú
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Administrar Productos
            </h2>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#007BFF] hover:bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Nuevo Producto</span>
          </button>
        </section>

        <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#8B1D24] flex items-center justify-center">
            <Utensils className="w-8 h-8" />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              No hay productos registrados
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              No encontramos platos ni bebidas para los criterios seleccionados. Puedes agregar una nueva creación gastronómica al catálogo o restablecer la búsqueda.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all"
            >
              Restablecer Filtros
            </button>
            <button
              onClick={openAddModal}
              className="px-5 py-2 bg-[#007BFF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Agregar Producto Ahora
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-12">
      {/* HERO / ENCABEZADO DE SECCIÓN ESTILO RÚSTICO GOURMET (Image 5) */}
      <section className="relative w-full overflow-hidden bg-stone-900 border-b border-stone-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105 filter blur-[1px]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD10tk8RdWJ41h4AaJl2oXLPiiH8yIwbIKMvMT-cMDmdk2EIIiXVWRx4sRwaTKHIQwRp1RHyYPsg8AoXTrJwL4laFEc-nUR2tpz8QrD8AUHTtEeIXxDwxwkfgS8d1E24wrAtXzLLk21sfKNzdQoo738cU8Uexv9SeoqBnnPdrPpDasgmmWPniiDQIqWKAMjImfwTP488A0nf6q31H640aYjBzisNYVFep0OCoFza3tVaoaUtkCpJjPP')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"></div>

        <div className="relative max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-amber-200 tracking-widest uppercase">
              Experiencia Gastronómica
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            ¡Bienvenido a Nuestro Restaurante!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-stone-300 font-normal max-w-2xl mt-1 drop-shadow">
            Disfruta de la mejor comida gourmet artesanal
          </p>

          <div className="mt-4 pt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#EF4444] tracking-tight drop-shadow-sm inline-block">
              Nuestro Menú Gourmet
            </span>
            <div className="w-16 h-1 bg-[#EF4444] mx-auto mt-1 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Barra de Control Superior / Cabecera Administrativa */}
        <section className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-[#8B1D24] text-[11px] font-bold uppercase tracking-wider">
                Gestión de Menú
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#007BFF] animate-pulse"></span>
                {products.length} productos activos en carta
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              Administrar Productos
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* CTA Principal: Agregar Producto */}
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#007BFF] hover:bg-blue-600 active:scale-98 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Nuevo Producto</span>
            </button>
          </div>
        </section>

        {/* Barra de Filtros Pill y Búsqueda */}
        <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                selectedCategory === 'all'
                  ? 'bg-[#8B1D24] text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setSelectedCategory('burger')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                selectedCategory === 'burger'
                  ? 'bg-[#8B1D24] text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              Hamburguesas Gourmet (
              {products.filter((p) => p.category === 'burger').length}
              )
            </button>
            <button
              onClick={() => setSelectedCategory('drinks')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                selectedCategory === 'drinks'
                  ? 'bg-[#8B1D24] text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              Bebidas Artesanales (
              {products.filter((p) => p.category === 'drinks').length}
              )
            </button>
            <button
              onClick={() => setSelectedCategory('waffles')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs ${
                selectedCategory === 'waffles'
                  ? 'bg-[#8B1D24] text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              Waffles Belgas (
              {products.filter((p) => p.category === 'waffles').length}
              )
            </button>
          </div>

          {/* Barra de Búsqueda Rápida */}
          <div className="relative min-w-[300px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, ingrediente..."
              className="w-full h-11 pl-10 pr-4 bg-white rounded-xl text-sm text-gray-900 placeholder:text-gray-400 shadow-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1D24]/20 transition-all"
            />
          </div>
        </section>

        {/* Matriz de Catálogo Normal según Image 5 (Grid de 3 columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-stone-200/90 group"
            >
              {/* Product Image */}
              <div className="relative w-full h-[190px] overflow-hidden bg-stone-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#8B1D24] shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Content Details */}
              <div className="p-5 flex flex-col items-center text-center flex-1 justify-between gap-3">
                <h3 className="text-[#DC2626] font-bold text-lg leading-tight tracking-tight">
                  {product.name}
                </h3>

                {/* Ingredients box with tactile scroll indicator arrows exactly like reference Image 5 */}
                <div className="w-full relative px-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-[68px] overflow-y-auto pr-1 flex items-center justify-center">
                      <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed text-center">
                        {product.description}
                      </p>
                    </div>

                    {/* Scroll visual bar with top/bottom arrows */}
                    <div className="flex flex-col items-center justify-between h-[64px] w-3 flex-shrink-0 text-stone-400 select-none">
                      <ChevronUp className="w-3 h-3 leading-none" />
                      <div className="w-1.5 h-6 bg-stone-400 rounded-full my-0.5"></div>
                      <ChevronDown className="w-3 h-3 leading-none" />
                    </div>
                  </div>
                </div>

                {/* Price and Amber Edit Button */}
                <div className="flex flex-col items-center gap-2.5 w-full pt-1">
                  <span className="text-[#16A34A] font-extrabold text-lg tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => openEditModal(product)}
                    className="w-32 py-2 bg-[#FFA000] hover:bg-[#F59E0B] active:bg-[#D97706] text-white font-semibold text-sm rounded-md shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-1"
                  >
                    <span>Editar</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Contextual para Agregar / Editar Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-6 border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-6 rounded-full bg-[#8B1D24]"></span>
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProduct
                    ? 'Editar Plato Gastronómico'
                    : 'Nuevo Producto Gastronómico'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Nombre del Plato / Bebida
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej. Hamburguesa Trufada"
                  className="h-11 px-4 bg-gray-50 rounded-xl text-gray-900 text-sm border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#8B1D24]/20 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Categoría
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) =>
                      setFormCategory(e.target.value as any)
                    }
                    className="h-11 px-3 bg-gray-50 rounded-xl text-gray-900 text-sm border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#8B1D24]/20 focus:outline-none transition-all"
                  >
                    <option value="burger">Hamburguesas Gourmet</option>
                    <option value="drinks">Bebidas Artesanales</option>
                    <option value="waffles">Gourmet Waffles</option>
                    <option value="desserts">Postres de Autor</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    Precio ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="16.50"
                    className="h-11 px-4 bg-gray-50 rounded-xl text-gray-900 text-sm border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#8B1D24]/20 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  Descripción y Notas Culinarias
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ingredientes selectos, perfil de sabor y maridaje sugerido..."
                  className="p-3 bg-gray-50 rounded-xl text-gray-900 text-sm border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#8B1D24]/20 focus:outline-none transition-all resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">
                  URL de Imagen (Opcional)
                </label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://..."
                  className="h-10 px-3 bg-gray-50 rounded-xl text-gray-900 text-xs border border-gray-200 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#8B1D24] hover:bg-[#72171d] text-white text-sm font-bold rounded-xl shadow-md transition-all"
                >
                  Guardar en Menú
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
