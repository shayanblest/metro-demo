import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {ACCESS_TOKEN_KEY} from '../Services/token.service';
import {ToastrService} from "ngx-toastr";
import {ApiError} from '../models/api-error.model';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
    }
  });
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
        if (error.error && typeof error.error === 'object') {
          const apiError = error.error as ApiError;
          if (error.status === 403) {
            toastr.error(apiError.title, 'خطا');
          } else if (error.status === 500) {
            toastr.error('مشکلی پیش آمده است! لطفا با پشتیبانی تماس بگیرید.', 'خطا');
          } else if (error.status === 404) {
            toastr.error(apiError.title, 'خطا');
          } else if (error.status === 400) {
            if (apiError.errors) {
              const html = buildValidationErrorHtml(error);
              if (html) {
                toastr.error(html, 'خطای اعتبارسنجی', {
                  enableHtml: true,
                  closeButton: false,
                  toastClass: 'ngx-toastr toast-error',
                  timeOut: 10000,
                });
              }
            } else
              toastr.error(apiError.title, 'خطا');
          }
        }  else {
          toastr.error('خطای ناشناخته!', 'خطا');
        }
      return throwError(() => error);
    })
  );
};

export const buildValidationErrorHtml = (error: any): string | null => {
  if (!error?.status || error.status !== 400 || !error.error?.errors) {
    return null;
  }

  const apiError = error.error;
  const messages: string[] = [];

  for (const key in apiError.errors) {
    if (Object.prototype.hasOwnProperty.call(apiError.errors, key)) {
      const fieldErrors = apiError.errors[key];
      fieldErrors.forEach((msg: string) => messages.push(`<strong>${key}</strong>: ${msg}`));
    }
  }

  return `
      <ul class="mt-5 ps-3 m-0 p-0 border-1 border-start ms-1">
        ${messages.map(msg => `<li class="mt-3">${msg}</li>`).join('')}
      </ul>
  `;
};
