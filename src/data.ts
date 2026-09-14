import { Venue, Booking, VisitRecord, AnalyticsData, VenueStats } from './types';

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'Футбольное поле "Колос"',
    type: 'football',
    capacity: 22,
    location: 'с. Берёзовка, ул. Спортивная, 1',
    image: '⚽',
    amenities: ['Освещение', 'Раздевалки', 'Трибуны'],
    status: 'active'
  },
  {
    id: 'v2',
    name: 'Баскетбольная площадка',
    type: 'basketball',
    capacity: 10,
    location: 'с. Берёзовка, Школа №1',
    image: '🏀',
    amenities: ['Освещение', 'Покрытие'],
    status: 'active'
  },
  {
    id: 'v3',
    name: 'Волейбольная площадка',
    type: 'volleyball',
    capacity: 12,
    location: 'с. Берёзовка, Парк культуры',
    image: '🏐',
    amenities: ['Сетка', 'Разметка'],
    status: 'active'
  },
  {
    id: 'v4',
    name: 'Спортивный зал "Олимп"',
    type: 'gym',
    capacity: 30,
    location: 'с. Берёзовка, ул. Ленина, 15',
    image: '🏋️',
    amenities: ['Тренажёры', 'Раздевалки', 'Душевые', 'Зеркала'],
    status: 'active'
  },
  {
    id: 'v5',
    name: 'Легкоатлетическая дорожка',
    type: 'athletics',
    capacity: 15,
    location: 'с. Берёзовка, Стадион',
    image: '🏃',
    amenities: ['Покрытие', 'Разметка', 'Освещение'],
    status: 'maintenance'
  }
];

export const bookings: Booking[] = [
  { id: 'b1', venueId: 'v1', venueName: 'Футбольное поле "Колос"', userName: 'Иванов А.С.', date: '2026-01-20', startTime: '10:00', endTime: '12:00', status: 'confirmed', participants: 14 },
  { id: 'b2', venueId: 'v1', venueName: 'Футбольное поле "Колос"', userName: 'Петров В.М.', date: '2026-01-20', startTime: '14:00', endTime: '16:00', status: 'confirmed', participants: 18 },
  { id: 'b3', venueId: 'v2', venueName: 'Баскетбольная площадка', userName: 'Сидоров К.Л.', date: '2026-01-20', startTime: '09:00', endTime: '10:30', status: 'confirmed', participants: 8 },
  { id: 'b4', venueId: 'v4', venueName: 'Спортивный зал "Олимп"', userName: 'Козлова Е.Н.', date: '2026-01-20', startTime: '18:00', endTime: '20:00', status: 'pending', participants: 12 },
  { id: 'b5', venueId: 'v3', venueName: 'Волейбольная площадка', userName: 'Морозов Д.А.', date: '2026-01-21', startTime: '11:00', endTime: '13:00', status: 'confirmed', participants: 10 },
  { id: 'b6', venueId: 'v1', venueName: 'Футбольное поле "Колос"', userName: 'Николаев С.П.', date: '2026-01-21', startTime: '16:00', endTime: '18:00', status: 'confirmed', participants: 20 },
  { id: 'b7', venueId: 'v4', venueName: 'Спортивный зал "Олимп"', userName: 'Федорова И.В.', date: '2026-01-22', startTime: '08:00', endTime: '10:00', status: 'confirmed', participants: 6 },
  { id: 'b8', venueId: 'v2', venueName: 'Баскетбольная площадка', userName: 'Волков А.Р.', date: '2026-01-22', startTime: '15:00', endTime: '17:00', status: 'cancelled', participants: 10 },
];

export const visitRecords: VisitRecord[] = [
  { id: 'vr1', venueId: 'v1', venueName: 'Футбольное поле "Колос"', userName: 'Иванов А.С.', checkIn: '2026-01-19T10:05:00', checkOut: '2026-01-19T11:55:00', qrCode: 'QR-V1-001' },
  { id: 'vr2', venueId: 'v1', venueName: 'Футбольное поле "Колос"', userName: 'Петров В.М.', checkIn: '2026-01-19T14:02:00', checkOut: '2026-01-19T15:58:00', qrCode: 'QR-V1-002' },
  { id: 'vr3', venueId: 'v2', venueName: 'Баскетбольная площадка', userName: 'Сидоров К.Л.', checkIn: '2026-01-19T09:00:00', checkOut: '2026-01-19T10:25:00', qrCode: 'QR-V2-001' },
  { id: 'vr4', venueId: 'v4', venueName: 'Спортивный зал "Олимп"', userName: 'Козлова Е.Н.', checkIn: '2026-01-19T18:01:00', checkOut: null, qrCode: 'QR-V4-001' },
  { id: 'vr5', venueId: 'v3', venueName: 'Волейбольная площадка', userName: 'Морозов Д.А.', checkIn: '2026-01-18T11:03:00', checkOut: '2026-01-18T12:50:00', qrCode: 'QR-V3-001' },
  { id: 'vr6', venueId: 'v1', venueName: 'Футбольное поле "Колос"', userName: 'Смирнов О.Т.', checkIn: '2026-01-18T16:00:00', checkOut: '2026-01-18T17:45:00', qrCode: 'QR-V1-003' },
];

export const analyticsData: AnalyticsData[] = [
  { date: 'Пн', visitors: 45, bookings: 8, utilization: 62 },
  { date: 'Вт', visitors: 38, bookings: 6, utilization: 52 },
  { date: 'Ср', visitors: 52, bookings: 9, utilization: 71 },
  { date: 'Чт', visitors: 41, bookings: 7, utilization: 57 },
  { date: 'Пт', visitors: 63, bookings: 11, utilization: 86 },
  { date: 'Сб', visitors: 78, bookings: 14, utilization: 95 },
  { date: 'Вс', visitors: 72, bookings: 12, utilization: 89 },
];

export const venueStats: VenueStats[] = [
  { venueId: 'v1', venueName: 'Футбольное поле "Колос"', totalBookings: 48, totalVisitors: 312, avgUtilization: 78, peakHours: ['10:00-12:00', '16:00-18:00'] },
  { venueId: 'v2', venueName: 'Баскетбольная площадка', totalBookings: 32, totalVisitors: 156, avgUtilization: 64, peakHours: ['09:00-11:00', '15:00-17:00'] },
  { venueId: 'v3', venueName: 'Волейбольная площадка', totalBookings: 24, totalVisitors: 98, avgUtilization: 45, peakHours: ['11:00-13:00'] },
  { venueId: 'v4', venueName: 'Спортивный зал "Олимп"', totalBookings: 56, totalVisitors: 280, avgUtilization: 82, peakHours: ['08:00-10:00', '18:00-20:00'] },
  { venueId: 'v5', venueName: 'Легкоатлетическая дорожка', totalBookings: 18, totalVisitors: 72, avgUtilization: 35, peakHours: ['07:00-09:00'] },
];
