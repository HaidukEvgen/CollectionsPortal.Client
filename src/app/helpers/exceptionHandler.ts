import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class ExceptionHandler {
  handleHttpError(
    err: HttpErrorResponse,
    redirectUrl: string,
    router: Router,
    toast: NgToastService
  ): void {
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 0:
          this.showNotification('Failed to connect to the API', toast);
          break;
        default:
          this.showNotification(
            err.statusText +
              ' error: ' +
              (err.error.Message != undefined
                ? err.error.Message
                : err.error.title),
            toast
          );
          if (redirectUrl) {
            router.navigate([redirectUrl]);
          }
          break;
      }
    } else {
      this.showNotification('An unexpected error occurred', toast);
    }
  }

  private showNotification(message: string, toast: NgToastService): void {
    toast.error({
      detail: 'Error',
      summary: message,
      duration: 3000,
    });
  }
}
