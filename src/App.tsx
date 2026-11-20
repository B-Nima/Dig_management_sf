import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, QrCode, BarChart3, Smartphone, 
  Menu, X, Wifi, WifiOff, Database, Globe 
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import BookingModule from './components/BookingModule';
import AttendanceModule from './components/AttendanceModule';
import AnalyticsModule from './components/AnalyticsModule';
import MobileView from './components/MobileView';
import { ViewMode } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      setTimeout(() => setSyncStatus('synced'), 2000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'dashboard' as ViewMode, label: 'Панель управления', icon: LayoutDashboard },
    { id: 'booking' as ViewMode, label: 'Бронирование', icon: Calendar },
    { id: 'attendance' as ViewMode, label: 'Посещаемость', icon: QrCode },
    { id: 'analytics' as ViewMode, label: 'Аналитика', icon: BarChart3 },
    { id: 'mobile' as ViewMode, label: 'Мобильное приложение', icon: Smartphone },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard isOnline={isOnline} />;
      case 'booking': return <BookingModule />;
      case 'attendance': return <AttendanceModule />;
      case 'analytics': return <AnalyticsModule />;
      case 'mobile': return <MobileView />;
      default: return <Dashboard isOnline={isOnline} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🏟️</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-sm">СелоСпорт</h1>
                <p className="text-xs text-gray-500">Управление объектами</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Offline Status */}
          <div className="p-4 border-t border-gray-100">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
              isOnline ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
              <span>{isOnline ? 'Онлайн' : 'Офлайн-режим'}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 mt-1 text-xs text-gray-500">
              <Database size={14} />
              <span>Данные: {syncStatus === 'synced' ? 'Синхр.' : syncStatus === 'syncing' ? 'Обновление...' : 'Локально'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <Globe size={14} />
              <span>с. Берёзовка, Берёзовский район</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Sync indicator */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${
              isOnline ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
            }`}>
              {isOnline ? (
                <>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Синхронизировано</span>
                </>
              ) : (
                <>
                  <WifiOff size={12} />
                  <span className="hidden sm:inline">Офлайн</span>
                </>
              )}
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-blue-700">АД</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {currentView === 'mobile' ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Мобильное приложение для жителей</h2>
                <p className="text-sm text-gray-500">Адаптированный интерфейс для записи на площадки и просмотра расписания</p>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <MobileView />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3">📱 Возможности мобильного приложения</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Запись на спортивные площадки в несколько нажатий</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Просмотр расписания и свободных слотов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Персональный QR-код для входа на объекты</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Push-уведомления о бронированиях и изменениях</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Офлайн-доступ к расписанию и своим записям</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>История посещений и статистика</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3">🌐 Адаптация для сельских условий</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">●</span>
                        <span>Минимальный трафик данных — кэширование расписания</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">●</span>
                        <span>Работа при слабом сигнале (2G/3G)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">●</span>
                        <span>Офлайн-режим с последующей синхронизацией</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">●</span>
                        <span>Простой интерфейс для пользователей любого возраста</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">●</span>
                        <span>SMS-уведомления как альтернатива push</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderView()
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
