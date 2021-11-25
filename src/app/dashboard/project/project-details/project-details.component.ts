import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  $project!: Observable<Project>;
  project!: Project | undefined;
  public doughnutChartLabels = ['Todo', 'In Progress', 'Done'];
  public doughnutChartData = [80, 83, 94];
  public doughnutChartType: ChartType = 'doughnut';
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);

      this.project = this.projectService.projectStore.appData?.filter(
        (project) => project.id === +params['id']
      )[0];
    });
  }
}
