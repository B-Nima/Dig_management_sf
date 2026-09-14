import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, UserCheck, UserPlus, Clock, Download, ScanLine, Shield } from 'lucide-react';
import { venues, visitRecords as initialVisits } from '../data';
import { VisitRecord } from '../types';

const AttendanceModule: React.FC = () => {
  const [visits, setVisits] = useState<VisitRecord[]>(initialVisits);
  const [selectedVenue, setSelectedVenue] = useState<string>('v1');
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState(false);

  const venueVisits = visits.filter(v => v.venueId === selectedVenue);
  const activeVisits = venueVisits.filter(v => !v.checkOut);

  const generateQR = (venueId: string) => {
    const venue = venues.find(v => v.id === venueId);
    const qrData = `SELOSPORT-VISIT-${venueId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setGeneratedQR(qrData);
    
    // Simulate QR scan - create visit record
    const newVisit: VisitRecord = {
      id: `vr${visits.length + 1}`,
      venueId: venueId,
      venueName: venue?.name || '',
      userName: 'Посетитель #' + (visits.length + 1),
      checkIn: new Date().toISOString(),
      checkOut: null,
      qrCode: qrData
    };
    setVisits([...visits, newVisit]);
  };

  const handleCheckOut = (visitId: string) => {
    setVisits(visits.map(v => v.id === visitId ? { ...v, checkOut: new Date().toISOString() } : v));
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const getDuration = (checkIn: string, checkOut: string | null) => {
    const start = new Date(checkIn).getTime();
    const end = checkOut ? new Date(checkOut).getTime() : Date.now();
    const minutes = Math.round((end - start) / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}мин` : `${mins}мин`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Учёт посещаемости</h2>
          <p className="text-sm text-gray-500">QR-код система без камер и распознавания лиц</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setScanMode(!scanMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              scanMode ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ScanLine size={18} />
            {scanMode ? 'Сканирование...' : 'Режим сканирования'}
          </button>
          <button
            onClick={() => setShowQRGenerator(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <QrCode size={18} />
            Генерировать QR
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Shield size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-900">Защита приватности</p>
          <p className="text-xs text-blue-700 mt-1">
            Система использует только QR-коды для учёта посещений. Камеры видеонаблюдения и распознавание лиц НЕ применяются. 
            Данные хранятся локально и защищены.
          </p>
        </div>
      </div>

      {/* Scan Mode Active */}
      {scanMode && (
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
          <div className="w-48 h-48 mx-auto bg-white rounded-xl border-4 border-green-400 flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-1 bg-green-500 animate-bounce opacity-60 rounded"></div>
            </div>
            <ScanLine size={48} className="text-green-300" />
          </div>
          <p className="text-sm font-medium text-green-800">Наведите камеру на QR-код посетителя</p>
          <p className="text-xs text-green-600 mt-1">Автоматическая регистрация входа/выхода</p>
          <button
            onClick={() => {
              generateQR(selectedVenue);
              setScanMode(false);
            }}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
          >
            Имитация сканирования
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <UserCheck size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Сейчас на объекте</p>
              <p className="text-xl font-bold text-gray-900">{activeVisits.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserPlus size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Визитов сегодня</p>
              <p className="text-xl font-bold text-gray-900">{venueVisits.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Среднее время</p>
              <p className="text-xl font-bold text-gray-900">1ч 24мин</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {venues.map(venue => (
          <button
            key={venue.id}
            onClick={() => setSelectedVenue(venue.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              selectedVenue === venue.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>{venue.image}</span>
            <span className="hidden sm:inline">{venue.name}</span>
          </button>
        ))}
      </div>

      {/* Visit Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Журнал посещений</h3>
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
            <Download size={14} />
            Экспорт
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {venueVisits.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <QrCode size={32} className="mx-auto mb-2 opacity-50" />
              <p>Нет записей посещений</p>
            </div>
          ) : (
            venueVisits.map(visit => (
              <div key={visit.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    visit.checkOut ? 'bg-gray-100' : 'bg-green-50'
                  }`}>
                    <UserCheck size={18} className={visit.checkOut ? 'text-gray-400' : 'text-green-600'} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{visit.userName}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(visit.checkIn)} • Вход: {formatTime(visit.checkIn)}
                      {visit.checkOut && ` • Выход: ${formatTime(visit.checkOut)}`}
                      {' • '}
                      <span className="text-blue-600">{getDuration(visit.checkIn, visit.checkOut)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!visit.checkOut && (
                    <button
                      onClick={() => handleCheckOut(visit.id)}
                      className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-medium hover:bg-orange-100"
                    >
                      Зарегистрировать выход
                    </button>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    visit.checkOut ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
                  }`}>
                    {visit.checkOut ? 'Завершён' : 'Активен'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* QR Generator Modal */}
      {showQRGenerator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">QR-код для входа</h3>
            <p className="text-sm text-gray-500 mb-4">
              {generatedQR ? 'Покажите QR на терминале' : 'Выберите площадку для генерации'}
            </p>
            
            {generatedQR ? (
              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 inline-block mb-4">
                <QRCodeSVG value={generatedQR} size={200} level="M" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {venues.filter(v => v.status === 'active').map(venue => (
                  <button
                    key={venue.id}
                    onClick={() => generateQR(venue.id)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                  >
                    <span className="text-2xl block mb-1">{venue.image}</span>
                    <span className="text-xs text-gray-600">{venue.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {generatedQR && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-500 font-mono break-all">{generatedQR}</p>
              </div>
            )}

            <button
              onClick={() => { setShowQRGenerator(false); setGeneratedQR(null); }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceModule;
