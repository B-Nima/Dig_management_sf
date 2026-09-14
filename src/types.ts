export interface Venue {
  id: string;
  name: string;
  type: 'football' | 'basketball' | 'volleyball' | 'gym' | 'swimming' | 'athletics';
  capacity: number;
  location: string;
  image: string;
  amenities: string[];
  status: 'active' | 'maintenance' | 'closed';
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  participants: number;
}

export interface VisitRecord {
  id: string;
  venueId: string;
  venueName: string;
  userName: string;
  checkIn: string;
  checkOut: string | null;
  qrCode: string;
}

export interface AnalyticsData {
  date: string;
  visitors: number;
  bookings: number;
  utilization: number;
}

export interface VenueStats {
  venueId: string;
  venueName: string;
  totalBookings: number;
  totalVisitors: number;
  avgUtilization: number;
  peakHours: string[];
}

export type ViewMode = 'dashboard' | 'booking' | 'attendance' | 'analytics' | 'mobile';
