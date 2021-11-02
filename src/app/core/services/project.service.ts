import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { AppState } from '../models/app-state';
import { DataState } from '../models/data-state';
import { Project } from '../models/project';

export enum ProjectAction {
  FETCH = 'FETCH_PROJECT',
  ADD = 'ADD_PROJECT',
  EDIT = 'EDIT_PROJECT',
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  readonly BASE_URL = 'http://localhost:8083/api/project';

  initialData: AppState<Project[]> = {
    dataState: DataState.LOADING_STATE,
  };

  private projectSubject = new BehaviorSubject<AppState<Project[]>>(
    this.initialData
  );
  projectObserable$ = this.projectSubject.asObservable();

  constructor(private http: HttpClient) {}

  dispatchAction = (data: any = {}, action: ProjectAction) => {
    switch (action) {
      case ProjectAction.FETCH:
        this.fetchProjects();
        break;
      case ProjectAction.ADD:
        this.addProject(data);
        break;
      default:
        break;
    }
  };

  addProject(project: Project) {
    this.http.post<Project>(this.BASE_URL, project).subscribe(
      (response) => {
        const projects = this.projectSubject.getValue().appData as Project[];
        this.projectSubject.next({
          dataState: DataState.SAVED_STATE,
          appData: [...projects, response] as Project[],
        });
      },
      (error) => {
        this.projectSubject.next({
          dataState: DataState.ERROR_STATE,
          error: error,
        });
      }
    );
  }

  fetchProjects() {
    this.http
      .get<Project[]>(this.BASE_URL)
      .pipe(tap(console.log))
      .subscribe(
        (response) =>
          this.projectSubject.next({
            dataState: DataState.LOADED_STATE,
            appData: response,
          }),
        (error) =>
          this.projectSubject.next({
            dataState: DataState.ERROR_STATE,
            error: error,
          })
      );
  }
}
