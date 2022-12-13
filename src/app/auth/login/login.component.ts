import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  loginForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.initRegisterForm();
  }

  ngOnInit(): void {}

  initRegisterForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmitHandler() {
    this.loadingSubject.next(true);

    this.authService.login$({ ...this.loginForm.value }).subscribe(
      (response) => {
        this.toastr.success('Login successfully');
        this.loginForm.reset();
        this.loadingSubject.next(false);
      },
      (error) => {
        this.toastr.error(error.message);
        this.loadingSubject.next(false);
      }
    );
  }

  isInvaild(controlName: string): boolean {
    const control = this.loginForm.controls[controlName] as UntypedFormControl;
    return control.errors !== null && control.dirty;
  }

  invalidClass(controlName: string) {
    return {
      'is-invalid': this.isInvaild(controlName),
    };
  }
}
