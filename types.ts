export interface Tour {
  id: string;
  title: string;
  subtitle: string; // New field for aesthetic layout
  description: string;
  price: number;
  duration: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  imageUrl: string;
  features: string[];
}

export interface BookingDetails {
  tourId: string | null;
  date: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
}

export enum PaymentStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type DayAvailability = 'AVAILABLE' | 'LIMITED' | 'FULL';

export interface CalendarDay {
  date: string; // ISO string YYYY-MM-DD
  status: DayAvailability;
  priceModifier?: number; // e.g., weekends are more expensive
}