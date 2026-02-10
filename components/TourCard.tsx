import React from 'react';
import { Tour } from '../types';
import { Clock, Mountain, ArrowRight } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  onBook: (tour: Tour) => void;
  index: number;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onBook, index }) => {
  return (
    <div 
      className="group relative min-w-[320px] w-[320px] md:min-w-[400px] md:w-[400px] h-[550px] rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 snap-center bg-slate-900 border border-white/5"
      onClick={() => onBook(tour)}
    >
      {/* Image Background */}
      <img 
        src={tour.imageUrl} 
        alt={tour.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
           <span className="font-display font-bold text-4xl text-white/10 select-none">0{index + 1}</span>
           <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10">
              {tour.difficulty}
           </div>
        </div>

        {/* Bottom Info */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
           <h3 className="text-3xl font-bold text-white mb-2 leading-tight uppercase font-display">{tour.title}</h3>
           <p className="text-orange-400 font-medium mb-4 text-sm">{tour.subtitle}</p>
           
           <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
             <p className="text-slate-300 text-sm mb-6 line-clamp-3 leading-relaxed">
               {tour.description}
             </p>
           </div>

           <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
              <div className="flex gap-4 text-slate-300 text-sm">
                 <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-orange-500" /> {tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                 {tour.price.toLocaleString()}₽ <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-orange-500" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};