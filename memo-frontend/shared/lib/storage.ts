// 本地数据持久化层
import type { Task } from '@/shared/types/global';

const STORAGE_KEY = 'memory_curve_tasks';

// 获取所有任务
export function loadTasks(): Task[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// 保存所有任务
export function saveTasks(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// 添加任务
export function addTaskToStorage(task: Task): Task[] {
  const tasks = loadTasks();
  const newTasks = [...tasks, task];
  saveTasks(newTasks);
  return newTasks;
}

// 更新任务
export function updateTaskInStorage(id: string, updates: Partial<Task>): Task[] {
  const tasks = loadTasks();
  const newTasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
  );
  saveTasks(newTasks);
  return newTasks;
}

// 删除任务
export function deleteTaskFromStorage(id: string): Task[] {
  const tasks = loadTasks();
  const newTasks = tasks.filter((task) => task.id !== id);
  saveTasks(newTasks);
  return newTasks;
}