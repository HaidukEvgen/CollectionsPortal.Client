import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserRegisterModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userRegisterModel = this.createUserRegisterModel();
      this.registerUser(userRegisterModel);
    } else {
      this.displayFormError();
    }
  }

  private createUserRegisterModel(): UserRegisterModel {
    return {
      username: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
  }

  private registerUser(userRegisterModel: UserRegisterModel): void {
    this.userService.register(userRegisterModel).subscribe({
      next: (res) => {
        this.handleRegistrationSuccess(res);
      },
      error: (err) => {
        this.handleRegistrationError(err);
      },
    });
  }

  private handleRegistrationSuccess(res: any): void {
    this.toast.success({
      detail: 'Success',
      summary: res.message,
      duration: 3000,
    });
    this.router.navigate(['login']);
    this.registerForm.reset();
  }

  private handleRegistrationError(err: any): void {
    if (err instanceof HttpErrorResponse && err.status === 0) {
      this.toast.error({
        detail: 'Error',
        summary: 'Failed to connect to the API',
        duration: 3000,
      });
    } else {
      this.toast.error({
        detail: 'Error',
        summary: err.error.Message,
        duration: 3000,
      });
    }
  }

  private displayFormError(): void {
    this.toast.error({
      detail: 'Error',
      summary: 'Form is Invalid',
      duration: 3000,
    });
  }
}
