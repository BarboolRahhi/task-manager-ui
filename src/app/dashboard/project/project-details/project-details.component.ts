import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project = {
    name: 'App Development',
    description:
      'With supporting text below as a natural lead-in to additional contenposuere erat a ante. Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet.',
    isCompleted: true,
    startDate: new Date(),
  };

  public doughnutChartLabels = ['Todo', 'In Progress', 'Done'];
  public doughnutChartData = [80, 83, 94];
  public doughnutChartType: ChartType = 'doughnut';
  constructor() {}

  ngOnInit(): void {}
}
