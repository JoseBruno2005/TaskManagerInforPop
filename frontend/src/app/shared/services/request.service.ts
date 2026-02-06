import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../core/env/environment';
import { ErrorHandleService } from './error-handle.service';

@Injectable({ providedIn: 'root' })
export class RequestService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandle: ErrorHandleService
  ) {}

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<T>(
      `${this.apiUrl}${url}`,
      { params: httpParams }
    ).pipe(
      catchError((err: HttpErrorResponse) =>
        this.errorHandle.handleError(err)
      )
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${url}`, body
    ).pipe(
      catchError((err: HttpErrorResponse) => 
        this.errorHandle.handleError(err)
      )
    );
  }

  put<T>(url: string, body:any): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}${url}`, 
      body
    ).pipe(
      catchError(
        err => this.errorHandle.handleError(err)
      )
    )
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}${url}`
    ).pipe(
      catchError(
        err => this.errorHandle.handleError(err)
      )
    )
  }
}
