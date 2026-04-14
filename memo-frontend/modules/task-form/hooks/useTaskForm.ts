import { useState } from 'react';
import type { Task, TaskFrequency } from '@/shared/types/global';

export interface TaskFormData {
  title: string;
  frequency: TaskFrequency;
  reminderTime: string | null;
  isLearning: boolean;
  notes: string;
}

const defaultFormData: TaskFormData = {
  title: '',
  frequency: 'once',
  reminderTime: null,
  isLearning: false,
  notes: '',
};

// 定义提交数据的类型（不包含 syncStatus 等元数据）
export type TaskSubmitData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed' | 'syncStatus' | 'serverId' | 'lastSyncedAt'>;

export function useTaskForm(initialData?: Partial<Task>) {
  const [formData, setFormData] = useState<TaskFormData>(() => {
    if (initialData) {
      return {
        title: initialData.title || '',
        frequency: initialData.frequency || 'once',
        reminderTime: initialData.reminderTime || null,
        isLearning: initialData.isLearning || false,
        notes: initialData.notes || '',
      };
    }
    return defaultFormData;
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
      dueDate: new Date().toISOString().split('T')[0],
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