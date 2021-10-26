import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageResponse } from '../models/message-response';
import { SignupRequest } from '../models/signup-request';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = '';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  register$ = (request: SignupRequest): Observable<MessageResponse> =>
    this.http
      .post<MessageResponse>(`${this.BASE_URL}/signup`, request)
      .pipe(tap(console.log), catchError(this.handleError));

  handleError(httpError: any): Observable<never> {
    console.log(httpError);
    throw new Error('Method not implemented.');
  }
}
