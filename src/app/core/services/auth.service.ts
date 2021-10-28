import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { MessageResponse } from '../models/message-response';
import { SigninRequest } from '../models/signin-request';
import { SignupRequest } from '../models/signup-request';
import { User } from '../models/user';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:8083/api/auth';

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  register$ = (request: SignupRequest): Observable<MessageResponse> =>
    this.http
      .post<MessageResponse>(`${this.BASE_URL}/signup`, request)
      .pipe(tap(console.log), catchError(this.handleError));

  login$ = (request: SigninRequest): Observable<User> =>
    this.http.post<User>(`${this.BASE_URL}/login`, request).pipe(
      map((data) => {
        this.setAuth(data);
        return data;
      }),
      catchError(this.handleError)
    );

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  handleError(httpError: HttpErrorResponse): Observable<never> {
    console.log(httpError.error);

    if (httpError.status === HttpStatusCode.Unauthorized) {
      return throwError({ message: 'Please check your credentials.' });
    }

    return throwError(httpError.error);
  }
}
