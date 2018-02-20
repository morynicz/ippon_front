import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class User {
  sth: number;
}

@Injectable()
export class AuthenticationService {
  private authenticationUrl = "api/authentication";
  constructor(private http: HttpClient) { }

  get authenticated(): boolean {
    return false;
  }

  logIn(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.authenticationUrl, { email, password });
  }
}
