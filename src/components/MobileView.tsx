import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight, Star, Phone, Bell, Home, Search, QrCode } from 'lucide-react';
import { venues, bookings } from '../data';

const MobileView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'bookings' | 'profile'>('home');
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);

  const myBookings = bookings.filter(b => b.userName === 'Иванов А.С.');
  const availableSlots = [
    { time: '08:00 - 10:00', available: true },
    { time: '10:00 - 12:00', available: false },
    { time: '12:00 - 14:00', available: true },
    { time: '14:00 - 16:00', available: true },
    { time: '16:00 - 18:00', available: false },
    { time: '18:00 - 20:00', available: true },
  ];

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-[700px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 relative">
      {/* Phone Notch */}
      <div className="bg-gray-800 h-6 flex items-center justify-center">
        <div className="w-20 h-3 bg-gray-900 rounded-full"></div>
      </div>

      {/* Status Bar */}
      <div className="bg-white px-4 py-2 flex items-center justify-between text-xs text-gray-600">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Content */}
      <div className="h-[580px] overflow-y-auto bg-gray-50">
        {activeTab === 'home' && !selectedVenue && (
          <div className="p-4 space-y-4">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 text-white">
              <p className="text-sm opacity-80">Добро пожаловать,</p>
              <p className="text-lg font-bold">Алексей Иванов</p>
              <p className="text-xs opacity-80 mt-1">с. Берёзовка</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-white rounded-xl p-3 text-center shadow-sm">
                <Calendar size={20} className="mx-auto text-blue-600 mb-1" />
                <span className="text-xs text-gray-600">Записаться</span>
              </button>
              <button className="bg-white rounded-xl p-3 text-center shadow-sm">
                <QrCode size={20} className="mx-auto text-green-600 mb-1" />
                <span className="text-xs text-gray-600">Мой QR</span>
              </button>
              <button className="bg-white rounded-xl p-3 text-center shadow-sm">
                <Clock size={20} className="mx-auto text-purple-600 mb-1" />
                <span className="text-xs text-gray-600">Расписание</span>
              </button>
            </div>

            {/* My QR Code */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Мой QR-код</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Активен</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <QrCode size={32} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Используйте для входа на объекты</p>
                  <p className="text-xs text-gray-400 mt-1">ID: USR-2026-0042</p>
                  <p className="text-xs text-blue-600 mt-2">Нажмите для увеличения</p>
                </div>
              </div>
            </div>

            {/* Nearby Venues */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Спортивные объекты рядом</h3>
              <div className="space-y-2">
                {venues.filter(v => v.status === 'active').map(venue => (
                  <button
                    key={venue.id}
                    onClick={() => setSelectedVenue(venue.id)}
                    className="w-full bg-white rounded-xl p-3 shadow-sm flex items-center gap-3 text-left"
                  >
                    <span className="text-2xl">{venue.image}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{venue.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={10} />
                        {venue.location}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-amber-600" />
                <p className="text-xs font-medium text-amber-800">Напоминание</p>
              </div>
              <p className="text-xs text-amber-700 mt-1">Завтра в 10:00 — Футбольное поле "Колос"</p>
            </div>
          </div>
        )}

        {/* Venue Detail */}
        {selectedVenue && (
          <div className="p-4 space-y-4">
            <button
              onClick={() => setSelectedVenue(null)}
              className="text-sm text-blue-600 flex items-center gap-1"
            >
              ← Назад к списку
            </button>

            {(() => {
              const venue = venues.find(v => v.id === selectedVenue);
              if (!venue) return null;
              return (
                <>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{venue.image}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{venue.name}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={10} />
                          {venue.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Доступно</span>
                      <span className="text-xs text-gray-500">Вместимость: {venue.capacity} чел.</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.map(a => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{a}</span>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar size={14} className="text-blue-600" />
                      Расписание на сегодня
                    </h4>
                    <div className="space-y-2">
                      {availableSlots.map((slot, i) => (
                        <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${
                          slot.available ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                        }`}>
                          <span className="text-sm text-gray-700 flex items-center gap-2">
                            <Clock size={12} className="text-gray-400" />
                            {slot.time}
                          </span>
                          {slot.available ? (
                            <button
                              onClick={() => setShowBookingConfirm(true)}
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                            >
                              Записаться
                            </button>
                          ) : (
                            <span className="text-xs text-red-600">Занято</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск площадок, видов спорта..."
                className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['Все', '⚽ Футбол', '🏀 Баскетбол', '🏐 Волейбол', '🏋️ Зал'].map(tag => (
                <button key={tag} className="px-3 py-1.5 bg-white rounded-full text-xs border border-gray-200 whitespace-nowrap hover:bg-blue-50 hover:border-blue-200">
                  {tag}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {venues.map(venue => (
                <div key={venue.id} className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{venue.image}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{venue.name}</p>
                      <p className="text-xs text-gray-500">{venue.location}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs text-gray-500">4.8</span>
                        <span className="text-xs text-gray-400 ml-2">{venue.capacity} мест</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Мои записи</h3>
            {myBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Нет активных записей</p>
              </div>
            ) : (
              <div className="space-y-2">
                {myBookings.map(b => (
                  <div key={b.id} className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{b.venueName}</p>
                        <p className="text-xs text-gray-500">{b.date} • {b.startTime}-{b.endTime}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {b.status === 'confirmed' ? '✓' : '⏳'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h3 className="text-sm font-semibold text-gray-900 mt-6">История посещений</h3>
            <div className="space-y-2">
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-sm font-medium text-gray-900">Футбольное поле "Колос"</p>
                <p className="text-xs text-gray-500">19 янв • 10:00-12:00 • 1ч 55мин</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-sm font-medium text-gray-900">Спортивный зал "Олимп"</p>
                <p className="text-xs text-gray-500">17 янв • 18:00-19:30 • 1ч 30мин</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-3">
                <User size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Иванов Алексей Сергеевич</h3>
              <p className="text-xs text-gray-500">с. Берёзовка</p>
              <p className="text-xs text-gray-400 mt-1">ID: USR-2026-0042</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-50">
              <button className="w-full p-3 flex items-center justify-between text-sm text-gray-700">
                <span className="flex items-center gap-2"><Phone size={14} /> Телефон</span>
                <span className="text-gray-400">+7 (900) 123-45-67</span>
              </button>
              <button className="w-full p-3 flex items-center justify-between text-sm text-gray-700">
                <span className="flex items-center gap-2"><Bell size={14} /> Уведомления</span>
                <span className="text-gray-400">Вкл</span>
              </button>
              <button className="w-full p-3 flex items-center justify-between text-sm text-gray-700">
                <span className="flex items-center gap-2"><QrCode size={14} /> Мой QR-код</span>
                <ChevronRight size={14} className="text-gray-400" />
              </button>
              <button className="w-full p-3 flex items-center justify-between text-sm text-gray-700">
                <span className="flex items-center gap-2"><Home size={14} /> Офлайн-данные</span>
                <span className="text-xs text-green-600">Синхр.</span>
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
              <p className="text-xs text-blue-800 font-medium">Офлайн-режим</p>
              <p className="text-xs text-blue-600 mt-1">Последняя синхронизация: сегодня, 09:30</p>
              <p className="text-xs text-blue-600">Данные расписания сохранены на устройстве</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => { setActiveTab('home'); setSelectedVenue(null); }}
          className={`flex flex-col items-center gap-0.5 p-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Home size={20} />
          <span className="text-[10px]">Главная</span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center gap-0.5 p-1 ${activeTab === 'search' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Search size={20} />
          <span className="text-[10px]">Поиск</span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center gap-0.5 p-1 ${activeTab === 'bookings' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <Calendar size={20} />
          <span className="text-[10px]">Записи</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-0.5 p-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <User size={20} />
          <span className="text-[10px]">Профиль</span>
        </button>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <Calendar size={24} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900">Подтвердите запись</h3>
            <p className="text-sm text-gray-500 mt-2">
              {venues.find(v => v.id === selectedVenue)?.name}<br />
              Сегодня, 12:00 - 14:00
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowBookingConfirm(false)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700"
              >
                Отмена
              </button>
              <button
                onClick={() => setShowBookingConfirm(false)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Записаться
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileView;
