import { Component } from '@angular/core';
import { BreadcrumbItem } from '../../shared/components/breadcrumb-navbar/breadcrumb-item';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
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
}
