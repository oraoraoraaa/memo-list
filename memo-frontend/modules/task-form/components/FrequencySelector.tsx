'use client';

import type { TaskFrequency } from '@/shared/types/global';

interface Props {
  open: boolean;
  onClose: () => void;
  value: TaskFrequency;
  onChange: (value: TaskFrequency) => void;
}

const options: { value: TaskFrequency; label: string }[] = [
  { value: 'once', label: '不重复' },
  { value: 'daily', label: '每日' },
  { value: 'weekly', label: '每周' },
  { value: 'monthly', label: '每月' },
  { value: 'weekdays', label: '工作日' },
];

export function FrequencySelector({ open, value, onChange, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-4">选择频率</h3>
        <div className="space-y-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                onClose();
              }}
              className={`w-full py-3 px-4 rounded-lg text-left ${
                value === opt.value
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}