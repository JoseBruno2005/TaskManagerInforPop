import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { AppError } from "../types/app-error.type";
import { ApiErrorResponse } from "../types/error-response.type";

@Injectable({ providedIn: 'root' })
export class ErrorHandleService {
  handleError(error: HttpErrorResponse): Observable<never> {
    let appError: AppError;

    if(error.error && error.error.message){
      const apiError = error.error as ApiErrorResponse;

      appError = {
        status: apiError.status,
        message: apiError.message,
      };
    } else {
      appError = {
        status: error.status,
        message: 'Houve um problema na sua solicitação. Tente novamente mais tarde.'
      }
    }

    return throwError(() => appError);
  }
}