import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TASKS from '../../tasks-mock';
import { of, BehaviorSubject } from 'rxjs';
import { Task, Status } from '../models/task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.taskSubject.asObservable();
  constructor(private http: HttpClient) {}

  tasksInTodo$ = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'TODO'))
  );

  tasksInProgress$ = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'IN_PROGRESS'))
  );

  tasksInDone$ = this.tasks$.pipe(
    map((tasks) => tasks.filter((task) => task.status === 'DONE'))
  );

  updateTaskStatus(taskId: number, status: Status) {
    const tasks = this.taskSubject.value;
    // console.table(tasks);
    // const prevTask = tasks[previousIndex];
    // tasks.splice(previousIndex, 1);
    // tasks.splice(currentIndex, 0, prevTask);

    console.table(tasks);

    // const task = tasks.find((task) => task.id === taskId);
    // if (task) {
    //   task.status = status;
    //   console.table(tasks);
    //   //this.taskSubject.next(tasks);
    // }
  }

  getTasks() {
    this.taskSubject.next(TASKS);
    return of(TASKS);
  }
}
