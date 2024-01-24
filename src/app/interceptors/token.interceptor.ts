import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.toast.error({
              detail: 'Error',
              summary: 'Token expired. Please, login again',
              duration: 3000,
            });
            this.authService.logout();
            this.router.navigate(['login']);
            break;
          case 403:
            this.toast.error({
              detail: 'Error',
              summary: error.error.message,
              duration: 3000,
            });
            this.authService.logout();
            this.router.navigate(['login']);
            break;
          default:
            break;
        }
        return throwError(error);
      })
    );
  }
}
