import React from 'react';
import { BarChart3, Users, Calendar, MapPin, Wifi, WifiOff, TrendingUp, Clock } from 'lucide-react';
import { venues, bookings, visitRecords, analyticsData } from '../data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  isOnline: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isOnline }) => {
  const activeVenues = venues.filter(v => v.status === 'active').length;
  const todayBookings = bookings.filter(b => b.date === '2026-01-20').length;
  const totalVisitorsToday = visitRecords.filter(v => v.checkIn.startsWith('2026-01-19')).length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
        isOnline ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}>
        {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
        {isOnline ? 'Подключение активно — все данные синхронизированы' : 'Офлайн-режим — данные сохранены локально, синхронизация при восстановлении связи'}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Активные объекты</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeVenues}/{venues.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <MapPin className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">✓ Все объекты работают</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Бронирований сегодня</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{todayBookings}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
          {pendingBookings > 0 && (
            <p className="text-xs text-amber-600 mt-2">⏳ {pendingBookings} ожидают подтверждения</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Посетителей вчера</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalVisitorsToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ +12% к прошлому дню</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Средняя загрузка</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">73%</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ +5% за неделю</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600" />
              Посещаемость за неделю
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Посетители" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Utilization Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              Загрузка объектов (%)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="utilization" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="Загрузка %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-purple-600" />
            Ближайшие бронирования
          </h3>
          <div className="space-y-3">
            {bookings.filter(b => b.date === '2026-01-20').slice(0, 4).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{booking.venueName}</p>
                  <p className="text-xs text-gray-500">{booking.userName} • {booking.startTime}-{booking.endTime}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {booking.status === 'confirmed' ? 'Подтв.' : booking.status === 'pending' ? 'Ожидает' : 'Отменено'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-blue-600" />
            Статус объектов
          </h3>
          <div className="space-y-3">
            {venues.map(venue => (
              <div key={venue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{venue.image}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{venue.name}</p>
                    <p className="text-xs text-gray-500">{venue.location}</p>
                  </div>
                </div>
                <span className={`w-3 h-3 rounded-full ${
                  venue.status === 'active' ? 'bg-green-500' :
                  venue.status === 'maintenance' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
