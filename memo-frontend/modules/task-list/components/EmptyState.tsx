'use client';

import { ClipboardList } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ClipboardList className="h-12 w-12 text-gray-300 mb-4" />
      <p className="text-gray-500 mb-2">今日还没有任务</p>
      <p className="text-sm text-gray-400 mb-6">点击下方按钮创建你的第一个任务</p>
    </div>
  );
}
