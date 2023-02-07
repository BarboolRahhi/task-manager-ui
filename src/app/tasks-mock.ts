import { Task } from './core/models/task';
const tasksString = JSON.stringify([
  {
    id: 60,
    title: "Issue with API's call",
    description: 'Projects api call is falling due to project id null',
    status: 'TODO',
    priority: 'LOW',
    createdAt: 'Tue, 27 Dec 2022 00:09:15',
    completedAt: null,
  },
  {
    id: 58,
    title: 'Manager Test data 58',
    description: 'Manager application manage all task in easy way.',
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: 'Tue, 27 Dec 2022 00:06:13',
    completedAt: null,
  },
  {
    id: 57,
    title: 'Manager Test data 57',
    description: 'Manager application manage all task in easy way.',
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: 'Tue, 27 Dec 2022 00:06:13',
    completedAt: null,
  },
  {
    id: 56,
    title: 'Component library for dropdown',
    description:
      'Dropdown library build with angular material and support custom images features',
    status: 'TODO',
    priority: 'MEDIUM',
    createdAt: 'Tue, 27 Dec 2022 00:06:13',
    completedAt: null,
  },
  {
    id: 55,
    title: 'Manager Test data 55',
    description: 'Manager application manage all task in easy way.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: 'Tue, 27 Dec 2022 00:06:13',
    completedAt: null,
  },
  {
    id: 5,
    title: 'Manager Test data 5',
    description: 'Manager application manage all task in easy way.',
    status: 'DONE',
    priority: 'MEDIUM',
    createdAt: 'Tue, 27 Dec 2022 00:06:13',
    completedAt: null,
  },

  {
    id: 25,
    title: 'Dedign template on Dribbble ',
    description:
      'Dribbble is the world’s leading community for creatives to share, grow, and get hired.',
    status: 'DONE',
    priority: 'HIGH',
    createdAt: 'Tue, 27 Dec 2022 00:06:13',
    completedAt: null,
  },
]);
const TASKS: Task[] = JSON.parse(tasksString);
export default TASKS;
