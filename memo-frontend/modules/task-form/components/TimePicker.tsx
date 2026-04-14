'use client';

import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  value: string | null;  // 👈 允许 null
  onChange: (value: string | null) => void;  // 👈 允许传 null
}

export function TimePicker({ open, value, onChange, onClose }: Props) {
  const [tempHour, setTempHour] = useState(() => {
    if (!value) return '09';
    return value.split(':')[0];
  });
  const [tempMinute, setTempMinute] = useState(() => {
    if (!value) return '00';
    return value.split(':')[1];
  });

  if (!open) return null;

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  const handleConfirm = () => {
    onChange(`${tempHour}:${tempMinute}`);
    onClose();
  };

  const handleClear = () => {
    onChange(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">选择时间</h3>
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            不提醒
          </button>
        </div>

        <div className="flex gap-4 justify-center py-4">
          {/* 小时选择器 */}
          <div className="h-40 overflow-y-auto w-20 border rounded-lg">
            {hours.map((h) => (
              <button
                key={h}
                onClick={() => setTempHour(h)}
                className={`w-full py-2 text-center ${
                  tempHour === h ? 'bg-blue-100 text-blue-600 font-medium' : ''
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          {/* 分钟选择器 */}
          <div className="h-40 overflow-y-auto w-20 border rounded-lg">
            {minutes.map((m) => (
              <button
                key={m}
                onClick={() => setTempMinute(m)}
                className={`w-full py-2 text-center ${
                  tempMinute === m ? 'bg-blue-100 text-blue-600 font-medium' : ''
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 border rounded-lg"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}