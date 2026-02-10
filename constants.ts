import { Tour, CalendarDay, DayAvailability } from './types';
import { IMAGES } from './assets/images';

// Helper to generate random availability for the next 30 days
export const generateMockAvailability = (tourId: string): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < 35; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const dateStr = nextDate.toISOString().split('T')[0];
    
    // Random logic to simulate real world data
    const rand = Math.random();
    let status: DayAvailability = 'AVAILABLE';
    if (rand > 0.8) status = 'FULL';
    else if (rand > 0.6) status = 'LIMITED';

    days.push({
      date: dateStr,
      status: status
    });
  }
  return days;
};

export const MOCK_TOURS: Tour[] = [
  {
    id: 't1',
    title: 'Кезеной-Ам',
    subtitle: 'Жемчужина Кавказа',
    description: 'Высокогорное озеро, поражающее своей бирюзовой гладью. Погружение в историю древнего города Хой, где каждый камень дышит вечностью.',
    price: 3500,
    duration: '1 день',
    difficulty: 'Легкий',
    imageUrl: IMAGES.KEZENOY_AM, 
    features: ['Трансфер', 'Гид-историк', 'Обед у озера', 'Фотосессия']
  },
  {
    id: 't2',
    title: 'Дикий Беной',
    subtitle: 'Сердце гор',
    description: 'Путешествие туда, где облака цепляются за вершины. Треккинг к скрытым водопадам через реликтовые леса и пикник на альпийских лугах.',
    price: 4500,
    duration: '1 день',
    difficulty: 'Средний',
    imageUrl: IMAGES.WILD_BENOY, 
    features: ['Джиппинг', 'Эко-тропы', 'Национальная кухня']
  },
  {
    id: 't3',
    title: 'Башни Предков',
    subtitle: 'Аргунское Ущелье',
    description: 'Строгие силуэты Ушкалойских башен на фоне суровых скал. Некрополь Цой-Педе — место силы и размышлений о вечном.',
    price: 5000,
    duration: '1 день',
    difficulty: 'Легкий',
    imageUrl: IMAGES.ANCESTRAL_TOWERS, 
    features: ['Музеи', 'Мастер-класс', 'Обед в горах']
  },
  {
    id: 't4',
    title: 'Большая Экспедиция',
    subtitle: '3 дня полной свободы',
    description: 'Полная перезагрузка. Ночевки в глэмпинге под звездами, костры, легенды от старейшин и маршруты, недоступные обычным туристам.',
    price: 25000,
    duration: '3 дня',
    difficulty: 'Средний',
    imageUrl: IMAGES.BIG_EXPEDITION, 
    features: ['All Inclusive', 'Глэмпинг', 'Экстрим']
  }
];

export const COMPANY_CONTACTS = {
  phone: "+7 (999) 000-00-00",
  email: "reserve@benoy-travel.ru",
  address: "Чеченская Республика, с. Беной"
};