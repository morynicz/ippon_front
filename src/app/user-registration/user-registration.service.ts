import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPPON_HOST, REGISTRATION_ENDPOINT } from '../rest-api';
import { UserRegistration } from './user-registartion';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  private url: string = IPPON_HOST + REGISTRATION_ENDPOINT;
  constructor(protected http: HttpClient) { }
  register(registration: UserRegistration): Observable<{}> {
    return this.http.post(this.url, registration, httpOptions)
      .pipe(
        catchError(this.handleError<{}>())
      );
  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
