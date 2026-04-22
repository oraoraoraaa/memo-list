import { useState } from 'react';
import type { Task, TaskFrequency } from '@/shared/types/global';

export interface TaskFormData {
  title: string;
  frequency: TaskFrequency;
  reminderTime: string | null;
  isLearning: boolean;
  notes: string;
  dueDate: string;
}

const defaultFormData: TaskFormData = {
  title: '',
  frequency: 'once',
  reminderTime: null,
  isLearning: false,
  notes: '',
  dueDate: new Date().toISOString().split('T')[0],
};

// 定义提交数据的类型（不包含 syncStatus 等元数据）
export type TaskSubmitData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed' | 'syncStatus' | 'serverId' | 'lastSyncedAt'>;

const isValidDateString = (value: string | undefined): value is string => {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export function useTaskForm(initialData?: Partial<Task>, initialDueDate?: string) {
  const [formData, setFormData] = useState<TaskFormData>(() => {
    if (initialData) {
      return {
        title: initialData.title || '',
        frequency: initialData.frequency || 'once',
        reminderTime: initialData.reminderTime || null,
        isLearning: initialData.isLearning || false,
        notes: initialData.notes || '',
        dueDate: initialData.dueDate || defaultFormData.dueDate,
      };
    }
    return {
      ...defaultFormData,
      dueDate: isValidDateString(initialDueDate) ? initialDueDate : defaultFormData.dueDate,
    };
  });

  const updateField = <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    return formData.title.trim().length > 0;
  };

  const getSubmitData = (): TaskSubmitData => {
    return {
      ...formData,
    };
  };

  const reset = () => {
    setFormData(defaultFormData);
  };

  return {
    formData,
    updateField,
    validate,
    getSubmitData,
    reset,
  };
}
