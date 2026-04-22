import { TaskFormPage } from '@/modules/task-form/components/TaskFormPage';

interface NewTaskPageProps {
  searchParams: Promise<{ date?: string | string[] }>;
}

export default async function NewTaskPage({ searchParams }: NewTaskPageProps) {
  const params = await searchParams;
  const dateValue = params.date;
  const initialDate = typeof dateValue === 'string' ? dateValue : undefined;

  return <TaskFormPage initialDate={initialDate} />;
}
