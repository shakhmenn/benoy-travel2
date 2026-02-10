import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { TourCard } from './components/TourCard';
import { BookingModal } from './components/BookingModal';
import { AIAssistant } from './components/AIAssistant';
import { MOCK_TOURS } from './constants';
import { Tour } from './types';
import { IMAGES } from './assets/images';
import { MapPin, Instagram, Facebook, Mountain, Menu, ArrowRight, Compass, Shield, Zap } from 'lucide-react';

const App = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-orange-500 selection:text-white">
      
      {/* Navigation (Transparent & Minimal) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2 text-white">
           <Mountain className="w-6 h-6 text-orange-500" />
           <span className="font-display font-bold tracking-tight text-xl">BENOY.</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-300">
           <a href="#about" className="hover:text-white transition-colors">О нас</a>
           <a href="#tours" className="hover:text-white transition-colors">Экспедиции</a>
           <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
        </div>
        <button className="md:hidden text-white">
           <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Bento Grid Info Section */}
      <section id="about" className="py-24 px-4 container mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white max-w-2xl leading-tight">
               БОЛЬШЕ ЧЕМ <br/>
               <span className="text-slate-600">ПРОСТО ГОРЫ</span>
            </h2>
            <p className="text-slate-400 max-w-sm text-right">
               Мы создаем условия, где комфорт встречается с дикой природой. Без компромиссов.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
            {/* Main Feature - Jeep Image Updated */}
            <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group bg-slate-800">
               <img 
                 src={IMAGES.JEEP_OFFROAD} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 alt="Jeep Expedition"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
               <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold font-display uppercase mb-2">Джиппинг 4x4</h3>
                  <p className="text-slate-300 max-w-md">Доберемся туда, где не ступала нога туриста. Только подготовленные внедорожники.</p>
               </div>
            </div>

            {/* Small Feature 1 */}
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-orange-500/50 transition-colors">
               <Compass className="w-10 h-10 text-orange-500" />
               <div>
                  <h4 className="font-bold text-lg mb-2">Локальные Гиды</h4>
                  <p className="text-sm text-slate-400">Люди, которые выросли в этих горах.</p>
               </div>
            </div>

            {/* Small Feature 2 */}
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-purple-500/50 transition-colors">
               <Shield className="w-10 h-10 text-purple-500" />
               <div>
                  <h4 className="font-bold text-lg mb-2">Безопасность</h4>
                  <p className="text-sm text-slate-400">Спутниковая связь и регистрация в МЧС.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Horizontal Scroll Tours */}
      <section id="tours" className="py-12 bg-slate-950 border-y border-white/5">
         <div className="container mx-auto px-4 mb-12 flex justify-between items-center">
            <h2 className="text-3xl font-display font-bold">НАПРАВЛЕНИЯ</h2>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
               <div className="w-2 h-2 rounded-full bg-slate-800"></div>
               <div className="w-2 h-2 rounded-full bg-slate-800"></div>
            </div>
         </div>
         
         {/* Scroll Container */}
         <div className="overflow-x-auto no-scrollbar pb-12 px-4 md:px-0">
            <div className="flex gap-6 container mx-auto md:px-4 snap-x snap-mandatory">
               {MOCK_TOURS.map((tour, idx) => (
                  <TourCard key={tour.id} tour={tour} index={idx} onBook={handleBookTour} />
               ))}
               
               {/* "More" Card */}
               <div className="min-w-[300px] flex items-center justify-center rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 font-bold hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer snap-center">
                  <span className="flex items-center gap-2">СМОТРЕТЬ ВСЕ <ArrowRight className="w-5 h-5"/></span>
               </div>
            </div>
         </div>
      </section>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Footer */}
      <footer id="contacts" className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
         <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
               <div className="col-span-2">
                  <h2 className="text-[15vw] md:text-8xl font-black text-slate-900 leading-[0.8] select-none">
                     BENOY
                  </h2>
               </div>
               
               <div>
                  <h4 className="text-orange-500 font-bold mb-6 text-sm uppercase tracking-widest">Контакты</h4>
                  <ul className="space-y-4 text-lg font-medium text-slate-300">
                     <li><a href="#" className="hover:text-white transition-colors">+7 (999) 000-00-00</a></li>
                     <li><a href="#" className="hover:text-white transition-colors">hello@benoy.travel</a></li>
                     <li className="text-slate-500 text-sm">Чеченская Республика,<br/>Беной, ул. Горная 1</li>
                  </ul>
               </div>

               <div>
                  <h4 className="text-orange-500 font-bold mb-6 text-sm uppercase tracking-widest">Соцсети</h4>
                  <div className="flex gap-4">
                     <a href="#" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Instagram className="w-5 h-5" />
                     </a>
                     <a href="#" className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Facebook className="w-5 h-5" />
                     </a>
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-600 text-sm">
               <p>© 2024 Benoy Travel. All rights reserved.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-slate-400">Privacy Policy</a>
                  <a href="#" className="hover:text-slate-400">Terms of Use</a>
               </div>
            </div>
         </div>
      </footer>

      <BookingModal 
        tour={selectedTour} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;