import React from 'react';
import { ArrowDownRight, Globe, Wind } from 'lucide-react';

export const Hero = () => {
  const scrollToTours = () => {
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-12">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
          alt="Benoy Mountains"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      </div>

      {/* Floating Blobs for Atmosphere */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-6">
             <span className="px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                Сезон 2025 Открыт
             </span>
          </div>

          {/* Huge Typography */}
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-white mb-8">
            БЕНОЙ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-600">
              ТРЭВЕЛ
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-t border-white/10 pt-8">
             <p className="max-w-md text-slate-300 text-lg leading-relaxed">
               Мы не водим экскурсии. Мы организуем экспедиции в сердце Кавказа. 
               Дикая природа, древние башни и абсолютная свобода.
             </p>
             
             <button 
               onClick={scrollToTours}
               className="group flex items-center gap-4 bg-white text-slate-950 px-8 py-4 rounded-full font-bold tracking-wider hover:bg-orange-500 hover:text-white transition-all duration-300"
             >
               ВЫБРАТЬ ПУТЬ
               <ArrowDownRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
             </button>
          </div>
        </div>
      </div>
      
      {/* Infinite Marquee */}
      <div className="absolute bottom-0 w-full bg-orange-500 text-slate-950 py-2 overflow-hidden z-20">
         <div className="flex gap-8 whitespace-nowrap animate-marquee font-black uppercase text-sm tracking-widest">
            <span>Экспедиции</span> • <span>Джиппинг</span> • <span>Эко-тропы</span> • <span>История</span> • 
            <span>Гастрономия</span> • <span>Кемпинг</span> • <span>Экстрим</span> • <span>Беной</span> •
            <span>Экспедиции</span> • <span>Джиппинг</span> • <span>Эко-тропы</span> • <span>История</span> • 
            <span>Гастрономия</span> • <span>Кемпинг</span> • <span>Экстрим</span> • <span>Беной</span> •
         </div>
      </div>
    </div>
  );
};