export type ID = string;

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Done = 'done',
}

export interface Task {
  id: ID;
  title: string;
  description?: string;
  createdAt: string;
  dueDate?: string;
  status: TaskStatus;
  priority?: number;
  assigneeId?: ID;
  // optional audit fields
  createdBy?: string;
}

export interface NewTask {
  title: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
  priority?: number;
}