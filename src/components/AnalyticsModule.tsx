import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Calendar, Users, Clock, Target, Download, Filter } from 'lucide-react';
import { analyticsData, venueStats, venues, bookings } from '../data';

const AnalyticsModule: React.FC = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  const [selectedVenue, setSelectedVenue] = useState<string>('all');

  const monthlyData = [
    { date: 'Янв', visitors: 320, bookings: 52, utilization: 68 },
    { date: 'Фев', visitors: 290, bookings: 48, utilization: 62 },
    { date: 'Мар', visitors: 380, bookings: 61, utilization: 75 },
    { date: 'Апр', visitors: 420, bookings: 68, utilization: 80 },
    { date: 'Май', visitors: 510, bookings: 82, utilization: 88 },
    { date: 'Июн', visitors: 480, bookings: 76, utilization: 84 },
  ];

  const hourlyData = [
    { hour: '06', load: 10 }, { hour: '07', load: 25 }, { hour: '08', load: 45 },
    { hour: '09', load: 60 }, { hour: '10', load: 75 }, { hour: '11', load: 70 },
    { hour: '12', load: 40 }, { hour: '13', load: 35 }, { hour: '14', load: 55 },
    { hour: '15', load: 65 }, { hour: '16', load: 80 }, { hour: '17', load: 90 },
    { hour: '18', load: 95 }, { hour: '19', load: 85 }, { hour: '20', load: 60 },
    { hour: '21', load: 30 },
  ];

  const pieData = venueStats.map(vs => ({
    name: vs.venueName.split(' ')[0],
    value: vs.totalBookings
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  const radarData = venueStats.map(vs => ({
    venue: vs.venueName.split(' ')[0],
    utilization: vs.avgUtilization,
    bookings: Math.round(vs.totalBookings / 2),
    visitors: Math.round(vs.totalVisitors / 10),
  }));

  const totalBookings = venueStats.reduce((sum, v) => sum + v.totalBookings, 0);
  const totalVisitors = venueStats.reduce((sum, v) => sum + v.totalVisitors, 0);
  const avgUtilization = Math.round(venueStats.reduce((sum, v) => sum + v.avgUtilization, 0) / venueStats.length);

  const recommendations = [
    { type: 'success', text: 'Футбольное поле загружено на 78% — оптимальная загрузка', icon: '✅' },
    { type: 'warning', text: 'Волейбольная площадка недогружена (45%) — рекомендуется провести турнир', icon: '⚠️' },
    { type: 'info', text: 'Пиковая нагрузка 17:00-19:00 — рассмотрите расширение часов работы', icon: '💡' },
    { type: 'success', text: 'Спортивный зал показывает рост посещаемости +15% за месяц', icon: '📈' },
    { type: 'warning', text: 'Легкоатлетическая дорожка на ремонте — запланировать открытие к сезону', icon: '🔧' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Аналитика и отчётность</h2>
          <p className="text-sm text-gray-500">Оценка загрузки и оптимизация расписания</p>
        </div>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="quarter">Квартал</option>
          </select>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Все объекты</option>
            {venues.map(v => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
            <Download size={14} />
            PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="opacity-80" />
            <span className="text-xs opacity-80">Бронирований</span>
          </div>
          <p className="text-2xl font-bold">{totalBookings}</p>
          <p className="text-xs opacity-80 mt-1">за период</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="opacity-80" />
            <span className="text-xs opacity-80">Посетителей</span>
          </div>
          <p className="text-2xl font-bold">{totalVisitors}</p>
          <p className="text-xs opacity-80 mt-1">за период</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="opacity-80" />
            <span className="text-xs opacity-80">Ср. загрузка</span>
          </div>
          <p className="text-2xl font-bold">{avgUtilization}%</p>
          <p className="text-xs opacity-80 mt-1">по всем объектам</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="opacity-80" />
            <span className="text-xs opacity-80">Пиковые часы</span>
          </div>
          <p className="text-2xl font-bold">17-19</p>
          <p className="text-xs opacity-80 mt-1">максимальная нагрузка</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly/Monthly Trend */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" />
            Динамика посещаемости
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={period === 'week' ? analyticsData : monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} name="Посетители" />
              <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} name="Бронирования" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Venue Distribution */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={18} className="text-purple-600" />
            Распределение бронирований
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Load */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-orange-600" />
            Загрузка по часам
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" fontSize={12} />
              <YAxis fontSize={12} unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="load" name="Загрузка" radius={[4, 4, 0, 0]}>
                {hourlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.load > 80 ? '#ef4444' : entry.load > 50 ? '#f59e0b' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Filter size={18} className="text-green-600" />
            Сравнение объектов
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="venue" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
              <Radar name="Загрузка" dataKey="utilization" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Venue Stats Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Детальная статистика по объектам</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 text-sm font-medium text-gray-600">Объект</th>
                <th className="text-center p-3 text-sm font-medium text-gray-600">Бронирований</th>
                <th className="text-center p-3 text-sm font-medium text-gray-600">Посетителей</th>
                <th className="text-center p-3 text-sm font-medium text-gray-600">Загрузка</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Пиковые часы</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {venueStats.map(stat => (
                <tr key={stat.venueId} className="hover:bg-gray-50">
                  <td className="p-3">
                    <span className="text-sm font-medium text-gray-900">{stat.venueName}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-sm text-gray-700">{stat.totalBookings}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-sm text-gray-700">{stat.totalVisitors}</span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            stat.avgUtilization > 70 ? 'bg-green-500' :
                            stat.avgUtilization > 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${stat.avgUtilization}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{stat.avgUtilization}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {stat.peakHours.map(hour => (
                        <span key={hour} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{hour}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          💡 Рекомендации по оптимизации
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className={`p-3 rounded-lg flex items-start gap-3 ${
              rec.type === 'success' ? 'bg-green-50 border border-green-100' :
              rec.type === 'warning' ? 'bg-amber-50 border border-amber-100' :
              'bg-blue-50 border border-blue-100'
            }`}>
              <span className="text-lg">{rec.icon}</span>
              <p className="text-sm text-gray-700">{rec.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModule;
