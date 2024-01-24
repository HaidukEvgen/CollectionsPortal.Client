import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toast: NgToastService
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const userLoginModel = this.createUserLoginModel();
      this.loginUser(userLoginModel);
    } else {
      this.displayFormError();
    }
  }

  private createUserLoginModel(): UserLoginModel {
    return {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
  }

  private loginUser(userLoginModel: UserLoginModel): void {
    this.userService.login(userLoginModel).subscribe({
      next: (res) => {
        this.handleLoginSuccess(res);
      },
      error: (err) => {
        this.handleLoginError(err);
      },
    });
  }

  private handleLoginSuccess(res: any) {
    this.authService.storeToken(res.token);
    const username = this.authService.getUsername();
    this.storageService.setUsername(username);
    this.toast.success({
      detail: 'Success',
      summary: res.message,
      duration: 3000,
    });
    this.router.navigate(['user-manager']);
    this.loginForm.reset();
  }

  private handleLoginError(err: any) {
    if (err instanceof HttpErrorResponse && err.status === 0) {
      this.toast.error({
        detail: 'Error',
        summary: 'Failed to connect to the API',
        duration: 3000,
      });
    } else {
      this.toast.error({
        detail: 'Error',
        summary: err.error.title,
        duration: 3000,
      });
    }
  }

  private displayFormError() {
    this.toast.error({
      detail: 'Error',
      summary: 'Form is Invalid',
      duration: 3000,
    });
  }
}
