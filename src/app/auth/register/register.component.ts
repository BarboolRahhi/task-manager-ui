import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/core/models/app-state';
import { DataState } from 'src/app/core/models/data-state';
import { MessageResponse } from 'src/app/core/models/message-response';
import { SignupRequest } from 'src/app/core/models/signup-request';
import { AuthService } from 'src/app/core/services/auth.service';
import Validation from 'src/app/shared/Utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  appState$!: Observable<AppState<MessageResponse>>;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: Validation.match('password', 'confirmPassword') }
    );
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  isInvaild(controlName: string): boolean {
    const control = this.registerForm.controls[controlName] as FormControl;
    return control.errors !== null && control.touched;
  }

  ngOnInit(): void {}

  onSubmitHandler() {
    this.loadingSubject.next(true);

    this.authService
      .register$({ ...this.registerForm.value } as SignupRequest)
      .subscribe(
        (response) => {
          this.loadingSubject.next(false);
        },
        (error) => this.loadingSubject.next(false)
      );

    // .pipe(
    //   map((response) => {
    //     return { dataState: DataState.LOADED_STATE, appData: response };
    //   }),
    //   startWith({ dataState: DataState.LOADING_STATE }),
    //   catchError((error) => {
    //     return of({ dataState: DataState.ERROR_STATE });
    //   })
    // );
  }
}
