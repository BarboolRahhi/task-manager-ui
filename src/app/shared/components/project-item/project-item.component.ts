import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/core/models/project';
import { MenuItem } from '../../Utils/menu-item';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectItemComponent implements OnInit {
  readonly MENU_ITEM = MenuItem;

  @Input()
  project!: Project;

  @Output()
  onMenuItemClick: EventEmitter<MenuItem> = new EventEmitter();

  @Output()
  onClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
