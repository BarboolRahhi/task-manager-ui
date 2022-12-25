import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { BreadcrumbItem } from 'src/app/shared/components/breadcrumb-navbar/breadcrumb-item';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  readonly breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'Board',
      link: '/',
      isActive: true,
    },
    {
      name: 'Projects',
      link: '/project',
      isActive: true,
    },
    {
      name: 'Project Details',
      isActive: false,
    },
  ];

  $project!: Observable<Project>;
  project!: Project | undefined;
  public doughnutChartLabels = ['Todo', 'In Progress', 'Done'];
  public doughnutChartData: number[] = [0, 0, 0];
  public doughnutChartType: ChartType = 'doughnut';

  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#0052cc', '#84b3fa', '#57d9a3'],
    },
  ];
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

      const taskdetails = this.project?.taskDetails;

      this.doughnutChartData = [
        taskdetails?.countOfTodo ?? 0,
        taskdetails?.countOfInProgress ?? 0,
        taskdetails?.countOfDone ?? 0,
      ];
    });
  }
}
