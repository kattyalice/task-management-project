import type { Task, NewTask, ID } from '../types';
import { TaskStatus } from '../types';

let tasks: Task[] = [];

export async function fetchTasks(): Promise<Task[]> {
  return tasks;
}

export async function createTask(input: NewTask): Promise<Task> {
  const newTask: Task = {
    id: (tasks.length + 1).toString(),
    title: input.title,
    description: input.description,
    status: input.status || TaskStatus.Todo,
    priority: input.priority || 1,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
}

export async function updateTask(id: ID, patch: Partial<NewTask>): Promise<Task> {
  const task = tasks.find(t => t.id === id);
  if (!task) throw new Error('Task not found');
  Object.assign(task, patch);
  return task;
}

export async function deleteTask(id: ID): Promise<void> {
  tasks = tasks.filter(t => t.id !== id);
}