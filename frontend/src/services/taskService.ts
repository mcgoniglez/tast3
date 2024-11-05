// src/services/taskService.ts

import api from './api';
import { Task } from '../types';

export async function getTasks(): Promise<Task[]> {
  const response = await api.get('/api/tasks');
  return response.data;
}

export async function getTaskById(id: number): Promise<Task> {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
}

export async function createTask(taskData: any): Promise<Task> {
  const response = await api.post('/api/tasks', taskData);
  return response.data;
}

export async function updateTask(id: number, taskData: any): Promise<Task> {
  const response = await api.patch(`/api/tasks/${id}`, taskData);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/api/tasks/${id}`);
}
