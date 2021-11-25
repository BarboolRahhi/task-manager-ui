import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { delay, map, startWith, tap } from 'rxjs/operators';
import { AppState } from '../models/app-state';
import { DataState } from '../models/data-state';
import { Project } from '../models/project';

export enum ProjectAction {
  FETCH = 'FETCH_PROJECT',
  ADD = 'ADD_PROJECT',
  EDIT = 'EDIT_PROJECT',
  FILTER_ONGOING = 'FILTER_ONGOING',
  FILTER_FINISHED = 'FILTER_FINISHED',
  FILTER_ALL = 'FILTER_ALL',
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

  constructor(private http: HttpClient) {}

  get projectStore() {
    return this.projectSubject.value;
  }

  dispatchAction(
    data: Project | Project[],
    action: ProjectAction
  ): AppState<Project[]> {
    switch (action) {
      case ProjectAction.FETCH:
        return this.saveProjects(data as Project[]);
      case ProjectAction.ADD:
        return this.addProject(data as Project);
      case ProjectAction.EDIT:
        return this.editProject(data as Project);
      default:
        return this.initialData;
    }
  }

  filter$ = (action: ProjectAction): Observable<AppState<Project[]>> =>
    new Observable<AppState<Project[]>>((suscriber) => {
      const newState = { ...this.projectSubject.value };
      // Filtering ongoing project
      if (action === ProjectAction.FILTER_ONGOING) {
        const projects = newState.appData?.filter(
          (project) => !project.isCompleted
        ) as Project[];
        newState.appData = [...projects];
      }
      //Filtering finished project
      if (action === ProjectAction.FILTER_FINISHED) {
        const projects = newState.appData?.filter(
          (project) => project.isCompleted
        ) as Project[];
        newState.appData = [...projects];
      }
      suscriber.next(newState);
      suscriber.complete();
    });

  editProject(project: Project): AppState<Project[]> {
    const projects = this.projectSubject.value.appData as Project[];
    const id = projects.findIndex((oldProject) => oldProject.id === project.id);

    projects[id] = {
      ...project,
      progress: projects[id].progress,
      totalTask: projects[id].totalTask,
    };

    this.projectSubject.next({
      dataState: DataState.SAVED_STATE,
      appData: projects,
    });

    return this.projectSubject.value;
  }

  addProject(project: Project): AppState<Project[]> {
    const projects = this.projectSubject.getValue().appData as Project[];
    this.projectSubject.next({
      dataState: DataState.SAVED_STATE,
      appData: [project, ...projects] as Project[],
    });
    return this.projectSubject.value;
  }

  saveProjects(projects: Project[]): AppState<Project[]> {
    this.projectSubject.next({
      dataState: DataState.LOADED_STATE,
      appData: projects,
    });

    return this.projectSubject.value;
  }

  fetchProjects$ = this.http.get<Project[]>(this.BASE_URL);

  saveProject$ = (project: Project) =>
    this.http.post<Project>(this.BASE_URL, project);

  updateProject$ = (project: Project) =>
    this.http.put<Project>(`${this.BASE_URL}/${project.id}`, project);
}
