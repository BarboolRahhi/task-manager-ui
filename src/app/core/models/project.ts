import { TaskDetails } from './tast-details';

export interface Project {
  id?: number;
  name: string;
  description: string;
  startDate?: Date;
  dueDate?: Date;
  isCompleted?: boolean;
  taskDetails: TaskDetails;
}
