'use client';

import { useParams, notFound } from 'next/navigation';
import { TaskFormPage } from '@/modules/task-form/components/TaskFormPage';
import { loadTasks } from '@/shared/lib/storage';
import { useEffect, useState } from 'react';
import type { Task } from '@/shared/types/global';

export default function EditTaskPage() {
  const params = useParams();
  const id = params.id as string;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tasks = loadTasks();
    const found = tasks.find((t) => t.id === id);
    setTask(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  if (!task) {
    notFound();
  }

  return <TaskFormPage task={task} />;
}