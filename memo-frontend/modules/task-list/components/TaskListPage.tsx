'use client';

import { useTasks } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import Link from 'next/link';
import { CalendarDays, Plus } from 'lucide-react';

export function TaskListPage() {
  const { tasks, toggleComplete } = useTasks();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      {/* 鼓励标语区域 */}
      <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-center dark:from-blue-950 dark:to-indigo-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
          坚持复习，知识长青 🌱
        </p>
        <Link
          href="/calendar"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-white"
        >
          <CalendarDays className="h-4 w-4" />
          日历视图
        </Link>
      </div>

      {/* 任务列表 */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <EmptyState />
        ) : (
          tasks.map((task) => (  //遍历
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
            />
          ))
        )}
      </div>

      {/* 底部添加按钮 */}
      <Link href="/task/new">
        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 flex items-center justify-center gap-2">
          <Plus className="h-5 w-5" />
          添加新任务
        </button>
      </Link>
    </div>
  );
}
