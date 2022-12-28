import { Project } from './project';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  completedAt?: Date;
  project: Project;
}

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
