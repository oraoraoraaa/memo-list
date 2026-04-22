'use client';

import { useParams, notFound } from 'next/navigation';
import { TaskFormPage } from '@/modules/task-form/components/TaskFormPage';
import { loadTasks } from '@/shared/lib/storage';
import { useMemo } from 'react';

export default function EditTaskPage() {
  const params = useParams();
  const id = params.id as string;

  const task = useMemo(() => {
    const tasks = loadTasks();
    return tasks.find((t) => t.id === id) || null;
  }, [id]);

  if (!task) {
    notFound();
  }

  return <TaskFormPage task={task} />;
}
