import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/core/models/app-state';
import { DataState } from 'src/app/core/models/data-state';
import { Project } from 'src/app/core/models/project';
import {
  ProjectAction,
  ProjectService,
} from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  appData$!: Observable<AppState<Project[]>>;
  readonly DATA_STATE = DataState;

  private savingSubject = new BehaviorSubject<boolean>(false);
  isSaving$ = this.savingSubject.asObservable();

  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.projectService.dispatchAction({}, ProjectAction.FETCH);
    this.appData$ = this.projectService.projectObserable$.pipe(
      map((state) => {
        if (state.dataState === DataState.SAVED_STATE) {
          this.savingSubject.next(false);
          this.projectForm.reset();
        }
        return state;
      })
    );
  }

  onSubmitHandle() {
    this.savingSubject.next(true);
    console.log(this.projectForm.value);
    this.projectService.dispatchAction(
      this.projectForm.value,
      ProjectAction.ADD
    );
  }

  onItemClick() {
    console.log('OnItemClick');
  }
}
