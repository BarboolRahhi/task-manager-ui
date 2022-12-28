import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from '../../shared/components/breadcrumb-navbar/breadcrumb-item';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task';

interface BoardColumn<T> {
  id: string;
  name: string;
  data: T[];
}

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'Board',
      link: '/',
      isActive: true,
    },
    {
      name: 'Tasks',
      isActive: false,
    },
  ];

  boardColums: BoardColumn<Task>[] = [
    {
      id: 'todo',
      name: 'Todo',
      data: [],
    },
    {
      id: 'inprogress',
      name: 'In Progress',
      data: [],
    },
    {
      id: 'done',
      name: 'Done',
      data: [],
    },
  ];

  tasksInTodo$ = this.taskService.tasksInTodo$;
  tasksInProgress$ = this.taskService.tasksInProgress$;
  tasksInDone$ = this.taskService.tasksInDone$;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks();
    this.taskService.tasksInTodo$.subscribe((tasks) => {
      const col = this.boardColums.find((col) => col.name === 'Todo');
      if (col) {
        col.data = tasks;
      }
    });

    this.taskService.tasksInProgress$.subscribe((tasks) => {
      const col = this.boardColums.find((col) => col.name === 'In Progress');
      if (col) {
        col.data = tasks;
      }
    });

    this.taskService.tasksInDone$.subscribe((tasks) => {
      const col = this.boardColums.find((col) => col.name === 'Done');
      if (col) {
        col.data = tasks;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data ?? [],
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex
      );
      console.log('transferArrayItem', event);
      console.log(
        'transferArrayItem:previousContainer',
        event.previousContainer.id
      );
      console.log('transferArrayItem:container', event.container.id);

      const task = event.item.data as Task;
      // transfer container
      if (event.container.id === 'todo') {
        // check if transfer item has diffrent status
        if (task.status !== 'TODO') {
          task.status = 'TODO';
          this.taskService.updateTaskStatus(task.id!, 'TODO');
        }
      } else if (event.container.id === 'inprogress') {
        // check if transfer item has diffrent status
        if (task.status !== 'IN_PROGRESS') {
          task.status = 'IN_PROGRESS';
          this.taskService.updateTaskStatus(task.id!, 'IN_PROGRESS');
        }
      } else if (event.container.id === 'done') {
        // check if transfer item has diffrent status
        if (task.status !== 'DONE') {
          task.status = 'DONE';
          this.taskService.updateTaskStatus(task.id!, 'DONE');
        }
      }
    }
  }

  // dropItemProgress(event: CdkDragDrop<Task>) {
  //   console.log('dropItemProgress', event);
  // }

  // dropItemTodo(event: CdkDragDrop<Task>) {
  //   console.log('dropItemTodo', event);
  // }
}
