import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskBoardComponent } from './task-board/task-board.component';
import { BreadcrumbNavbarComponent } from '../shared/components/breadcrumb-navbar/breadcrumb-navbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [TaskBoardComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    BreadcrumbNavbarComponent,
    DragDropModule,
  ],
})
export class TaskModule {}
