import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/core/models/app-state';
import { DataState } from 'src/app/core/models/data-state';
import { Project } from 'src/app/core/models/project';
import {
  ProjectAction,
  ProjectService,
} from 'src/app/core/services/project.service';
import { MenuItem } from 'src/app/shared/Utils/menu-item';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  appData$!: Observable<AppState<Project[]>>;
  readonly DATA_STATE = DataState;

  private editingSubject = new BehaviorSubject<boolean>(false);
  isEditing$ = this.editingSubject.asObservable();

  private savingSubject = new BehaviorSubject<boolean>(false);
  isSaving$ = this.savingSubject.asObservable();

  projectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.projectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: [''],
      isCompleted: [{ value: false, disabled: true }],
    });
  }

  ngOnInit(): void {
    this.appData$ = this.projectService.fetchProjects$.pipe(
      map((response) =>
        this.projectService.dispatchAction(response, ProjectAction.FETCH)
      ),
      startWith({
        dataState: DataState.LOADING_STATE,
      })
    );
  }

  onSubmitHandle() {
    this.savingSubject.next(true);
    console.log(this.projectForm.value);

    if (this.editingSubject.value) {
      this.appData$ = this.projectService
        .updateProject$(this.projectForm.value)
        .pipe(
          map((response) => {
            this.resetModal();
            this.toastr.success('Updated Successfully');
            return this.projectService.dispatchAction(
              response,
              ProjectAction.EDIT
            );
          })
        );
    } else {
      this.appData$ = this.projectService
        .saveProject$(this.projectForm.value)
        .pipe(
          map((response) => {
            this.resetModal();
            this.toastr.success('Saved Successfully');
            return this.projectService.dispatchAction(
              response,
              ProjectAction.ADD
            );
          })
        );
    }
  }

  resetModal() {
    document.getElementById('closeModal')?.click();
    this.editingSubject.next(false);
    this.savingSubject.next(false);
    this.projectForm.reset();
  }

  onItemClick() {
    console.log('OnItemClick');
  }

  onMenuItemClick(action: MenuItem, project: Project) {
    switch (action) {
      case MenuItem.EDIT:
        this.editProject(project);
        break;
      case MenuItem.DELETE:
        break;
      default:
        break;
    }
  }

  editProject(project: Project) {
    this.editingSubject.next(true);
    this.projectForm.controls['isCompleted'].enable();
    this.projectForm.setValue({
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      dueDate: project.dueDate,
      isCompleted: project.isCompleted,
    });
  }

  onCloseModal() {
    this.editingSubject.next(false);
    this.projectForm.reset();
  }

  onOngoingHandler() {
    this.appData$ = this.projectService.filter$(ProjectAction.FILTER_ONGOING);
  }

  onFinishedHandler() {
    this.appData$ = this.projectService.filter$(ProjectAction.FILTER_FINISHED);
  }

  onAllHandler() {
    this.appData$ = this.projectService.filter$(ProjectAction.FILTER_ALL);
  }
}
