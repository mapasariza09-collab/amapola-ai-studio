import React from 'react';
import { BRAND_LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 p-1 flex items-center justify-center overflow-hidden border border-red-100">
            <img
              src={BRAND_LOGO_URL}
              alt="Amapola Gourmet logo"
              className="h-7 w-auto object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#8B1D24]">
            Amapola Gourmet
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-[#8B1D24]">
            SaaS Gastronómico
          </span>
        </div>

        <p className="max-w-md text-sm text-gray-500 leading-relaxed">
          Disfruta de la mejor comida gourmet artesanal preparada con ingredientes frescos, recetas de autor y cocina en tiempo real.
        </p>

        <p className="text-xs text-gray-400 mt-2">
          © 2026 Amapola Gourmet. Todos los derechos reservados. Arquitectura Bento Grid para restaurantes de alta cocina.
        </p>
      </div>
    </footer>
  );
};
