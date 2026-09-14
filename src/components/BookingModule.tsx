import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Check, X, Filter, Bell } from 'lucide-react';
import { venues, bookings as initialBookings } from '../data';
import { Booking } from '../types';

const BookingModule: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-20');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [newBooking, setNewBooking] = useState({
    venueId: '',
    userName: '',
    date: '2026-01-20',
    startTime: '10:00',
    endTime: '12:00',
    participants: 2
  });

  const filteredBookings = bookings.filter(b => {
    if (selectedVenue !== 'all' && b.venueId !== selectedVenue) return false;
    if (b.date !== selectedDate) return false;
    return true;
  });

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  const getVenueSchedule = (venueId: string) => {
    return bookings.filter(b => b.venueId === venueId && b.date === selectedDate && b.status !== 'cancelled');
  };

  const isSlotBooked = (venueId: string, time: string) => {
    const venueBookings = getVenueSchedule(venueId);
    return venueBookings.some(b => {
      const start = parseInt(b.startTime.split(':')[0]);
      const end = parseInt(b.endTime.split(':')[0]);
      const slot = parseInt(time.split(':')[0]);
      return slot >= start && slot < end;
    });
  };

  const handleCreateBooking = () => {
    const venue = venues.find(v => v.id === newBooking.venueId);
    if (!venue) return;

    const booking: Booking = {
      id: `b${bookings.length + 1}`,
      venueId: newBooking.venueId,
      venueName: venue.name,
      userName: newBooking.userName,
      date: newBooking.date,
      startTime: newBooking.startTime,
      endTime: newBooking.endTime,
      status: 'pending',
      participants: newBooking.participants
    };

    setBookings([...bookings, booking]);
    setShowBookingForm(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setNewBooking({ venueId: '', userName: '', date: '2026-01-20', startTime: '10:00', endTime: '12:00', participants: 2 });
  };

  const handleStatusChange = (bookingId: string, status: 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  return (
    <div className="space-y-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-50">
          <Bell size={18} />
          <span>Бронирование создано! Уведомление отправлено.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Бронирование площадок</h2>
          <p className="text-sm text-gray-500">Календарь занятости и управление записями</p>
        </div>
        <button
          onClick={() => setShowBookingForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Новое бронирование
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Filter size={16} className="text-gray-400" />
        <select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Все площадки</option>
          {venues.map(v => (
            <option key={v.id} value={v.id}>{v.image} {v.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Calendar size={18} className="text-blue-600" />
            Календарь занятости — {new Date(selectedDate).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-sm font-medium text-gray-600 w-48">Площадка</th>
                {timeSlots.map(slot => (
                  <th key={slot} className="p-2 text-xs font-medium text-gray-500 text-center min-w-[60px]">{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {venues.filter(v => selectedVenue === 'all' || v.id === selectedVenue).map(venue => (
                <tr key={venue.id} className="border-t border-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{venue.image}</span>
                      <span className="text-sm font-medium text-gray-900 truncate">{venue.name}</span>
                    </div>
                  </td>
                  {timeSlots.map(slot => {
                    const booked = isSlotBooked(venue.id, slot);
                    const booking = getVenueSchedule(venue.id).find(b => {
                      const start = parseInt(b.startTime.split(':')[0]);
                      const end = parseInt(b.endTime.split(':')[0]);
                      const s = parseInt(slot.split(':')[0]);
                      return s >= start && s < end;
                    });
                    return (
                      <td key={slot} className="p-1 text-center">
                        {booked ? (
                          <div className={`h-8 rounded text-xs flex items-center justify-center text-white ${
                            booking?.status === 'confirmed' ? 'bg-blue-500' : 'bg-amber-500'
                          }`} title={`${booking?.userName} (${booking?.startTime}-${booking?.endTime})`}>
                            ✓
                          </div>
                        ) : (
                          <div className="h-8 rounded bg-green-50 border border-green-200 flex items-center justify-center">
                            <span className="text-green-400 text-xs">своб.</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-gray-50 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-50 border border-green-200 rounded"></span> Свободно</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded"></span> Подтверждено</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded"></span> Ожидает</span>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Clock size={18} className="text-purple-600" />
            Список бронирований
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Calendar size={32} className="mx-auto mb-2 opacity-50" />
              <p>Нет бронирований на выбранную дату</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Users size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.venueName}</p>
                    <p className="text-xs text-gray-500">
                      {booking.userName} • {booking.startTime}-{booking.endTime} • {booking.participants} чел.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {booking.status === 'confirmed' ? 'Подтверждено' : booking.status === 'pending' ? 'Ожидает' : 'Отменено'}
                  </span>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                        title="Подтвердить"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        title="Отклонить"
                      >
                        <X size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Новое бронирование</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Площадка</label>
                <select
                  value={newBooking.venueId}
                  onChange={(e) => setNewBooking({ ...newBooking, venueId: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Выберите площадку</option>
                  {venues.filter(v => v.status === 'active').map(v => (
                    <option key={v.id} value={v.id}>{v.image} {v.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">ФИО</label>
                <input
                  type="text"
                  value={newBooking.userName}
                  onChange={(e) => setNewBooking({ ...newBooking, userName: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Начало</label>
                  <input
                    type="time"
                    value={newBooking.startTime}
                    onChange={(e) => setNewBooking({ ...newBooking, startTime: e.target.value })}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Конец</label>
                  <input
                    type="time"
                    value={newBooking.endTime}
                    onChange={(e) => setNewBooking({ ...newBooking, endTime: e.target.value })}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Кол-во участников</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={newBooking.participants}
                  onChange={(e) => setNewBooking({ ...newBooking, participants: parseInt(e.target.value) })}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBookingForm(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={handleCreateBooking}
                disabled={!newBooking.venueId || !newBooking.userName}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModule;
