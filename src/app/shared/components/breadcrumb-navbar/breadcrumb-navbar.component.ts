import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbItem } from './breadcrumb-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'rb-breadcrumb-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="row">
      <div class="col-sm-6">
        <h4 class="text-secondary">{{ title }}</h4>
      </div>
      <div class="col-md-6 d-flex justify-content-end subtitle-font-size">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li
              class="breadcrumb-item"
              [class.active]="!item.isActive"
              *ngFor="let item of breadcrumbItems"
            >
              <a
                *ngIf="item.isActive"
                class="text-decoration-none text-primary"
                [routerLink]="item.link"
              >
                {{ item.name }}
              </a>
              <ng-container *ngIf="!item.isActive">
                {{ item.name }}
              </ng-container>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  `,
  styleUrls: ['./breadcrumb-navbar.component.scss'],
})
export class BreadcrumbNavbarComponent {
  @Input()
  title: string = '';

  @Input()
  breadcrumbItems: BreadcrumbItem[] = [];
}
