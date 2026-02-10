import React, { useState, useEffect } from 'react';
import { Tour, BookingDetails, PaymentStatus, CalendarDay } from '../types';
import { generateMockAvailability } from '../constants';
import { Button } from './Button';
import { X, Check, Loader2, Calendar as CalendarIcon, CreditCard } from 'lucide-react';

interface BookingModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ tour, isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); 
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.IDLE);
  const [availability, setAvailability] = useState<CalendarDay[]>([]);
  
  const [formData, setFormData] = useState<BookingDetails>({
    tourId: '',
    date: '',
    guests: 1,
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (isOpen && tour) {
      setFormData(prev => ({ ...prev, tourId: tour.id, date: '' }));
      setStep(1);
      setPaymentStatus(PaymentStatus.IDLE);
      setAvailability(generateMockAvailability(tour.id));
    }
  }, [isOpen, tour]);

  if (!isOpen || !tour) return null;

  const handleDateSelect = (day: CalendarDay) => {
    if (day.status === 'FULL') return;
    setFormData(prev => ({ ...prev, date: day.date }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus(PaymentStatus.PROCESSING);
    setTimeout(() => {
      setPaymentStatus(PaymentStatus.SUCCESS);
    }, 2500);
  };

  const renderCalendar = () => (
    <div className="grid grid-cols-5 gap-2 mb-8">
      {availability.slice(0, 15).map((day, idx) => {
        const isSelected = formData.date === day.date;
        const isFull = day.status === 'FULL';
        const dayNum = new Date(day.date).getDate();
        
        return (
          <button
            key={idx}
            type="button"
            onClick={() => handleDateSelect(day)}
            disabled={isFull}
            className={`
              h-14 rounded-lg flex flex-col items-center justify-center transition-all border
              ${isSelected 
                ? 'bg-orange-600 border-orange-500 text-white' 
                : isFull 
                  ? 'bg-slate-900 border-slate-800 text-slate-700 cursor-not-allowed' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-orange-500 hover:text-white'
              }
            `}
          >
            <span className="text-sm font-bold">{dayNum}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden relative border border-white/10">
        
        <div className="p-8">
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">Бронирование</span>
                <h2 className="text-2xl font-display font-bold text-white">{tour.title}</h2>
            </div>

            {paymentStatus === PaymentStatus.SUCCESS ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Готово!</h3>
                    <p className="text-slate-400 text-sm mb-8">
                        Билет отправлен на {formData.email}
                    </p>
                    <button onClick={onClose} className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors">Закрыть</button>
                </div>
            ) : step === 1 ? (
                <div>
                    <h4 className="text-slate-400 text-sm mb-4 uppercase tracking-wider">Выберите дату</h4>
                    {renderCalendar()}
                    <button 
                        onClick={() => setStep(2)} 
                        disabled={!formData.date} 
                        className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold tracking-wide hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Продолжить
                    </button>
                </div>
            ) : step === 2 ? (
                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                             <label className="text-xs text-slate-500 uppercase block mb-1">Гости</label>
                             <input 
                                type="number" min="1" max="10" name="guests"
                                value={formData.guests} onChange={handleInputChange}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 focus:border-orange-500 outline-none"
                             />
                        </div>
                        <div className="flex-1">
                             <label className="text-xs text-slate-500 uppercase block mb-1">Итого</label>
                             <div className="w-full bg-slate-950 border border-slate-800 text-slate-400 rounded-xl p-4">
                                {(tour.price * formData.guests).toLocaleString()} ₽
                             </div>
                        </div>
                    </div>
                    <input type="text" name="name" placeholder="Ваше Имя" required onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 focus:border-orange-500 outline-none placeholder-slate-500" />
                    <input type="tel" name="phone" placeholder="Телефон" required onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 focus:border-orange-500 outline-none placeholder-slate-500" />
                    <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 focus:border-orange-500 outline-none placeholder-slate-500" />
                    
                    <div className="flex gap-4 pt-2">
                        <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700">Назад</button>
                        <button type="submit" className="w-2/3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-500">Оплата</button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handlePayment} className="space-y-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-white/5 mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Тур</span>
                            <span className="text-white font-bold">{tour.title}</span>
                        </div>
                        <div className="flex justify-between text-sm border-t border-white/10 pt-2 mt-2">
                            <span className="text-slate-400">Сумма</span>
                            <span className="text-orange-400 font-bold text-lg">{(tour.price * formData.guests).toLocaleString()} ₽</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                         <div className="relative">
                            <CreditCard className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                            <input type="text" placeholder="Номер карты" className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 pl-12 focus:border-orange-500 outline-none" required />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 focus:border-orange-500 outline-none" required />
                            <input type="text" placeholder="CVC" className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-4 focus:border-orange-500 outline-none" required />
                         </div>
                    </div>

                    <button type="submit" className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors mt-4" disabled={paymentStatus === PaymentStatus.PROCESSING}>
                        {paymentStatus === PaymentStatus.PROCESSING ? <Loader2 className="animate-spin mx-auto" /> : 'Подтвердить'}
                    </button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};