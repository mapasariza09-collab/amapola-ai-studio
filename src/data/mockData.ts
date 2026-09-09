import {
  Product,
  ClientOrder,
  CartItem,
  ExportedReport,
  RoleMatrixItem,
  PaymentGateway,
  RestaurantProfile,
} from '../types';

export const BRAND_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WcvCrc1IazAETNtzCPKX6fjZebmVzhCae6XUI0xGL3oOYGQff0qdNu_o00ov45kvQBMTr4ozbN_nRu9PGqCiv49TsMAP1vV_VAkbcDBLAm9SA0Mmn4DbPQIp6OR8UUzfXKDih9latpMcIMpMhzHSIpwR6isqaHoKHSm3BboFf2qkdxD95gyE_ZdlYSKY3g_XqP95ZMMCKZjEqO77ZeeyNQhifMkWnmzw9i6P-k3Ll0kDi502YX3JLDmg';

export const HERO_BACKGROUND_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDCZGcoC9EO3c1uT6eGhyLPJ48PrIy8iAtGqgifnH5hdO_LJOVYcfRE_c4CLHWvSNZYlznkhUcq1qohUBzD3NmPU-CxwsUS5eYyj5ASrVvH-Iil3hePZo4LIGVgzVXtLhv6uao_f-j16WsFI3XYOWq4X5ETV365kI8Vz2WvkBKsxhwGclx4l2e1OB__KdfXcmRGZcSz7ADvmNkciWfTciTK-Sh-0QLKXkfCxrxWxknfpkt1zXyCte_r';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Hamburguesa La Salvaje',
    category: 'burger',
    categoryLabel: 'Hamburguesas Gourmet',
    price: 18.99,
    description:
      'Carne Angus 200g, queso cheddar madurado, tocineta crujiente, cebolla confitada al oporto y salsa tártara de la casa.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtszFzuVRUg2Hby8W_g9AMzV2xPSeurTbhHmTnJ-7Veg-nU7md1l9pDH5oqTMja039QuSdf93mdqyn3ohBLfDaALraZSP_8Y0JkdjbcNA4r2TWBg26e07bWnz3WkbTQZOw7q0VszCDXImr4AwmfMFx9ngNFY9HT6_cL0NkrAW_nFTh7OPRFk4j3YY2f2FdqtCgeSWy-fBrPlc1_4lmJzoE7NFfow2lWuZ-YTgksA0gKYOjBKHxgjmO',
    badge: 'Chef Choice',
    badgeColor: 'bg-[#8B1D24] text-white',
    ordersCount: 142,
    prepTimeMinutes: 12,
  },
  {
    id: 'prod-2',
    name: 'Hamburguesa Clásica',
    category: 'burger',
    categoryLabel: 'Hamburguesas Gourmet',
    price: 15.99,
    description:
      'Carne de res seleccionada, queso cheddar fundido, lechuga crocante hidropónica, tomate milano y salsa especial de autor.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSWI59fWzBIFkbWSJ9ChDjJ32UzTTzSaTS4Tf_6FQ47mT4LgJ1dkhZKgS4RFi4IH-0XlXN5PFZKvVMQ_--pTRpPj969yE-00hvjETv23VJUiEgc69TbVuK1Gq0xoxwZodVWkeYt1k4_bCkDBThxpTnIU9DyjGwqhDzMPn2OHJPBwfrZmsK6yAcBON4Hx6Yg5W7q5nEQxXMOPLnOgq0viBOQbBOVeea_71CDzQegJZ1Pf6w4WxVxqmb',
    badge: 'Más Pedida',
    badgeColor: 'bg-emerald-600 text-white',
    ordersCount: 89,
    prepTimeMinutes: 10,
  },
  {
    id: 'prod-3',
    name: 'Hamburguesa Vegana',
    category: 'burger',
    categoryLabel: 'Hamburguesas Gourmet',
    price: 14.99,
    description:
      'Medallón de quinoa y portobello, rodajas de aguacate hass cremoso, tomates cherry dulces, espinaca baby y pan de trigo integral tostado.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRCFbdGK99qhyt4dcY_3wYgYdiZj-5gkxamvQ_4_xLNUltRAZ52pSZBe8d3lvZhsZLQNWkPA3ghuykc48dKnrFHJBPMzajCV6cjzlbD1ocHbtbxnBOD_6TqL4FHr_TgUQFxmcz857KRXg4E0IjXK6PqMZscmahEP2blpj78ukjAV82pOtNyDMWEOGqp0WOH1erGKPU0_92ErXJwZyXJFx4tTaWYl4fUFP25vDilBesCKbAcPS6zB5v',
    badge: '100% Plant Based',
    badgeColor: 'bg-emerald-700 text-white',
    ordersCount: 64,
    prepTimeMinutes: 14,
  },
  {
    id: 'prod-4',
    name: 'Hamburguesa Mexicana',
    category: 'burger',
    categoryLabel: 'Hamburguesas Gourmet',
    price: 17.99,
    description:
      'Carne Angus sazonada, queso pepper jack fundido, guacamole casero con pico de gallo, jalapeños encurtidos y totopos crocantes.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKaTuNHbUiKyM3FQxzr3fvPTJ_GanZSd7SZu4dm7BkyM-ObRZCIBOpen8CQ_Ds-sHE_ukqORGyCMXwXLfOmTplyVYoQE4Eei6aGc4WVsdNx4Wkgbq2vVVpIkK3JnNExrVbahIg4GUwj2cFT4E4Lf4GIz3zEN5FQ3b_vQ7ez1R_kZhQGoLq-XM73lcldJF3_pkD7pmUt2O6l3B1c3DAjrNo0MC4CU87BNMHEqVyqRIwP27LhclGQlEu',
    badge: 'Picante Picor Medio',
    badgeColor: 'bg-amber-600 text-white',
    ordersCount: 78,
    prepTimeMinutes: 13,
  },
  {
    id: 'prod-5',
    name: 'Soda de Maracuyá',
    category: 'drinks',
    categoryLabel: 'Bebidas Artesanales',
    price: 4.99,
    description:
      'Soda artesanal refrescante con pulpa natural de maracuyá de la región, menta macerada, limón tahití y almíbar puro de caña.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxEM0VL_6KCtpS56fRuMvmkVof9uvXy6l0Cvj-9tqF4PhPDhOx-5z2OhZbp_IICXjBC9XpfoWSJgec4exQcj_nUOjMTMKGpSbYGDldrqHXUsMgbcysionqrHtlzuv5CZkq1mmsMTxgzwGZmn0W0Fto_OVPw0Whpo2-btGIYML2KaVCZOK9d2nG02fNTHe5wkPEOfwVB2BtjykgoGhR1B_CM6nrvivsymRewH5jx7FThEooApmmhMXA',
    badge: 'Cítrico & Refrescante',
    badgeColor: 'bg-amber-500 text-white',
    ordersCount: 110,
    prepTimeMinutes: 4,
  },
  {
    id: 'prod-6',
    name: 'Soda de Frutos Rojos',
    category: 'drinks',
    categoryLabel: 'Bebidas Artesanales',
    price: 4.99,
    description:
      'Infusión burbujeante de fresas silvestres, moras andinas, arándanos frescos, albahaca morada y flor de jamaica orgánica infusionada.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYQGVxc09onw3l2Qd_VuTc3vG1iExFH9twpm44Cwuv9QTPfltmjZv9Xw_ZiHmXVq8kpa3bjhCY4sw4XL8GLcegI8dsSNDD1mtKTCtwp_7k4-UsnlilJexK98eRVm77ckXEN8qpoKb46b2YBMz2M4WnZ0mgKiFY2cq3XgGtv6yop25ALWx00IvPz0pW9bx4FyOlf4BNsLHkn4v3oHwQ8phdJeehm7czd6peChEsVM_uJ9imuqUiNbtn',
    badge: 'Signature Mocktail',
    badgeColor: 'bg-[#8B1D24] text-white',
    ordersCount: 135,
    prepTimeMinutes: 4,
  },
  {
    id: 'prod-7',
    name: 'Waffle Amapola Maduro',
    category: 'waffles',
    categoryLabel: 'Gourmet Waffles',
    price: 15.99,
    description:
      'Base crujiente de plátano maduro con carne premium desmechada en cocción lenta de 8 horas, queso costeño rallado y hogao artesanal.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqLrpuCTfoKhi5jcJGFf0y3yul1GdWRSudweiNdqZNuhjj6GHeK9Lz4DA6Zc8kNI6CmUNeiAHBnnP1DT-l892CWt9eyRFFpE3XrBDdkzf84yUhw4thxC-qWkiK74klfmVns-NlAAJt4WoemVD1xAuPIkrWz8vjvujuYhmpHIr1XA1vezHpWYYsNgXz1gErkCy27CanGnr6lIg5jrKcSb_OQFvG3JBtlnN5cv7phUNMD39zjgSP2mdm',
    badge: 'Especial de la Casa',
    badgeColor: 'bg-[#007BFF] text-white',
    ordersCount: 98,
    prepTimeMinutes: 15,
  },
  {
    id: 'prod-8',
    name: 'Copete citeño + Cheesecake',
    category: 'desserts',
    categoryLabel: 'Postres de Autor',
    price: 12.99,
    description:
      'Porción de cheesecake artesanal con coulis de frutos rojos andinos y copete tradicional de arequipe casero elaborado en paila de cobre.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCZGcoC9EO3c1uT6eGhyLPJ48PrIy8iAtGqgifnH5hdO_LJOVYcfRE_c4CLHWvSNZYlznkhUcq1qohUBzD3NmPU-CxwsUS5eYyj5ASrVvH-Iil3hePZo4LIGVgzVXtLhv6uao_f-j16WsFI3XYOWq4X5ETV365kI8Vz2WvkBKsxhwGclx4l2e1OB__KdfXcmRGZcSz7ADvmNkciWfTciTK-Sh-0QLKXkfCxrxWxknfpkt1zXyCte_r',
    badge: 'Dulce Tradición',
    badgeColor: 'bg-amber-700 text-white',
    ordersCount: 52,
    prepTimeMinutes: 6,
  },
];

export const INITIAL_ORDERS: ClientOrder[] = [
  {
    id: 'ord-1',
    code: '#AG-4082',
    clientName: 'Jose Rojas',
    clientType: 'Cliente Frecuente',
    email: 'jhoset40@gmail.com',
    phone: '3234657',
    address: 'Barrio la Ricaurte, Vélez',
    time: '12:45 PM',
    orderType: 'domicilio',
    total: 56.96,
    date: '30/06/2026',
    isToday: true,
    status: 'pendiente',
    dishes: [
      {
        id: 'd-1',
        name: 'Waffle Amapola',
        quantity: 1,
        price: 15.99,
        description:
          'Base de plátano maduro, carne desmechada, queso costeño rallado y hogao artesanal.',
        status: 'pendiente',
        categoryIcon: 'breakfast_dining',
      },
      {
        id: 'd-2',
        name: 'Copete citeño + cheesecake',
        quantity: 1,
        price: 12.99,
        description:
          'Porción de cheesecake artesanal con coulis de frutos rojos y copete de arequipe casero.',
        status: 'pendiente',
        categoryIcon: 'bakery_dining',
      },
      {
        id: 'd-3',
        name: 'Hamburguesa Delirio',
        quantity: 1,
        price: 22.99,
        description:
          'Doble carne angus, tocineta caramelizada, cebolla crispy y salsa de la casa.',
        status: 'pendiente',
        categoryIcon: 'lunch_dining',
      },
      {
        id: 'd-4',
        name: 'Soda de Maracuyá',
        quantity: 1,
        price: 4.99,
        description:
          'Bebida artesanal con pulpa natural de maracuyá y menta fresca.',
        status: 'pendiente',
        categoryIcon: 'local_bar',
      },
    ],
  },
  {
    id: 'ord-2',
    code: '#AG-4083',
    clientName: 'Mariana Gómez',
    clientType: 'Mesa Gourmet',
    email: 'mariana.gomez@gmail.com',
    phone: '3109876543',
    address: 'Calle 8 # 12-45, Centro',
    time: '13:10 PM',
    orderType: 'retiro',
    total: 27.99,
    date: '30/06/2026',
    isToday: true,
    status: 'preparacion',
    estimatedMinutes: 12,
    dishes: [
      {
        id: 'd-5',
        name: 'Hamburguesa Vegana',
        quantity: 1,
        price: 14.99,
        description: 'Medallón de lentejas & portobello',
        status: 'preparacion',
        categoryIcon: 'lunch_dining',
      },
      {
        id: 'd-6',
        name: 'Soda de Frutos Rojos',
        quantity: 1,
        price: 4.99,
        description: 'Artesanal con albahaca',
        status: 'preparacion',
        categoryIcon: 'local_bar',
      },
      {
        id: 'd-7',
        name: 'Papas Rústicas de la Casa',
        quantity: 1,
        price: 8.01,
        description: 'Con sal marina y romero fresco',
        status: 'preparacion',
        categoryIcon: 'bakery_dining',
      },
    ],
  },
  {
    id: 'ord-3',
    code: '#AG-3920',
    clientName: 'Carlos Silva',
    clientType: 'Cliente VIP',
    email: 'carlos.silva@empresa.com',
    phone: '3156789123',
    address: 'Carrera 15 # 45-20',
    time: '14:20 PM',
    orderType: 'domicilio',
    total: 48.5,
    date: '25/05/2026',
    isToday: false,
    status: 'cerrado',
    dishes: [
      {
        id: 'd-8',
        name: '2x Risotto de Hongos Silvestres',
        quantity: 2,
        price: 24.25,
        description: 'Hongos porcini con parmesano reggiano de 24 meses',
        status: 'entregado',
        categoryIcon: 'dinner_dining',
      },
    ],
  },
  {
    id: 'ord-4',
    code: '#AG-3921',
    clientName: 'Elena Restrepo',
    clientType: 'Mesa 4',
    email: 'elena.restrepo@gmail.com',
    phone: '3178901234',
    address: 'Calle 10 # 5-18',
    time: '15:10 PM',
    orderType: 'mesa',
    total: 64.0,
    date: '25/05/2026',
    isToday: false,
    status: 'cerrado',
    dishes: [
      {
        id: 'd-9',
        name: '1x Pulpo a la Parrilla + 1x Vino Tinto',
        quantity: 1,
        price: 64.0,
        description: 'Con papas confitadas y chimichurri de la casa',
        status: 'entregado',
        categoryIcon: 'dinner_dining',
      },
    ],
  },
  {
    id: 'ord-5',
    code: '#AG-3922',
    clientName: 'Andrés Parra',
    clientType: 'Delivery Express',
    email: 'andres.parra@outlook.com',
    phone: '3201234567',
    address: 'Avenida Bolivariana # 12-30',
    time: '13:45 PM',
    orderType: 'domicilio',
    total: 30.0,
    date: '25/05/2026',
    isToday: false,
    status: 'cerrado',
    dishes: [
      {
        id: 'd-10',
        name: '1x Menú Degustación Amapola',
        quantity: 1,
        price: 30.0,
        description: 'Mini burger + soda + waffle bite',
        status: 'entregado',
        categoryIcon: 'lunch_dining',
      },
    ],
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    product: INITIAL_PRODUCTS[0], // La Salvaje ($18.99)
    quantity: 1,
  },
  {
    product: INITIAL_PRODUCTS[6], // Waffle Maduro ($15.99)
    quantity: 2,
  },
  {
    product: INITIAL_PRODUCTS[5], // Soda Frutos Rojos ($4.99)
    quantity: 1,
  },
];

export const INITIAL_REPORTS: ExportedReport[] = [
  {
    id: 'rep-1',
    name: 'Ventas_Junio_2026.pdf',
    format: 'PDF',
    size: '2.4 MB',
    pagesOrSheets: '42 páginas consolidadas',
    date: 'Jun 30, 2026, 11:20 PM',
    generatedBy: 'Admin',
    generatedByRole: 'Admin',
    status: 'Listo',
  },
  {
    id: 'rep-2',
    name: 'Consolidado_Productos_Amapola.xlsx',
    format: 'XLSX',
    size: '840 KB',
    pagesOrSheets: 'Libro con 4 hojas de cálculo',
    date: 'Jun 25, 2026, 04:15 PM',
    generatedBy: 'Admin',
    generatedByRole: 'Admin',
    status: 'Listo',
  },
  {
    id: 'rep-3',
    name: 'Trazabilidad_Pagos_Pasarelas_Mayo.csv',
    format: 'CSV',
    size: '320 KB',
    pagesOrSheets: 'Datos Nequi y Daviplata',
    date: 'Jun 01, 2026, 09:10 AM',
    generatedBy: 'Gerencia',
    generatedByRole: 'Gerencia',
    status: 'Listo',
  },
];

export const INITIAL_RBAC: RoleMatrixItem[] = [
  {
    id: 'rbac-1',
    code: 'AD',
    roleName: 'Administrador',
    badge: 'Acceso Total',
    badgeClass: 'bg-[#d8e2ff] text-[#001a41]',
    manageProducts: true,
    modifyOrders: true,
    viewSalesSummary: true,
    alterPrices: true,
  },
  {
    id: 'rbac-2',
    code: 'CH',
    roleName: 'Cocinero / Chef de Línea',
    badge: 'Cocina KDS',
    badgeClass: 'bg-[#ffdad8] text-[#410006]',
    manageProducts: false,
    modifyOrders: true,
    viewSalesSummary: false,
    alterPrices: false,
  },
  {
    id: 'rbac-3',
    code: 'RP',
    roleName: 'Repartidor / Logística Domicilio',
    badge: 'Despachos',
    badgeClass: 'bg-gray-200 text-gray-800',
    manageProducts: false,
    modifyOrders: true,
    viewSalesSummary: false,
    alterPrices: false,
    note: 'Solo Entrega',
  },
  {
    id: 'rbac-4',
    code: 'CL',
    roleName: 'Cliente Registrado',
    badge: 'Solo Lectura / Compra',
    badgeClass: 'bg-gray-100 text-gray-500',
    manageProducts: false,
    modifyOrders: false,
    viewSalesSummary: false,
    alterPrices: false,
  },
];

export const INITIAL_PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'gw-1',
    name: 'Nequi / Daviplata',
    statusLabel: 'Conectado',
    statusClass: 'bg-emerald-100 text-emerald-800',
    description: 'Transferencias QR inmediatas directas a cuenta comercial',
    icon: 'qr_code_2',
    enabled: true,
  },
  {
    id: 'gw-2',
    name: 'Contraentrega / Efectivo',
    statusLabel: 'Operativo',
    statusClass: 'bg-emerald-100 text-emerald-800',
    description: 'Cobro en efectivo o datáfono móvil a la entrega',
    icon: 'local_shipping',
    enabled: true,
  },
  {
    id: 'gw-3',
    name: 'Wompi / PayU / Stripe',
    statusLabel: 'Inactivo / Requiere API Key',
    statusClass: 'bg-red-100 text-red-800',
    description: 'Pagos online con Visa, Mastercard y PSE',
    icon: 'credit_card',
    enabled: false,
    requiresKey: true,
  },
];

export const INITIAL_PROFILE: RestaurantProfile = {
  name: 'Amapola Gourmet',
  subdomain: 'amapola-gourmet.co',
  email: 'gerencia@amapolagourmet.co',
  whatsapp: '+57 312 450 8921',
  logo: BRAND_LOGO_URL,
  isWhatsappVerified: true,
};
