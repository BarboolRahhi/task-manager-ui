import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ProjectListComponent, ProjectDetailsComponent],
  imports: [CommonModule, ProjectRoutingModule, SharedModule, ChartsModule],
})
export class ProjectModule {}
