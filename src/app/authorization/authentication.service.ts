import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { JwtHelperWrapperService } from "./jwt-helper-wrapper.service";
import { TokenStorageService } from "./token-storage.service";
import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_ENDPOINT,
  TOKEN_ENDPOINT,
  REFRESH_ENDPOINT
} from '../rest-api';

export class Token {
  access: string;
  refresh: string;
  expiresAt: string;
}

export class Key {
  key: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class AuthenticationService {
  private authenticationUrl: string = AUTHENTICATION_HOST
    + AUTHENTICATION_ENDPOINT;
  private statusChangeCallbacks: ((isLoggedIn: boolean) => void)[] = [];
  private statusChangeSource: Subject<boolean> = new Subject<boolean>();
  statusChangeStream = this.statusChangeSource.asObservable();
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperWrapperService,
    private tokenStorage: TokenStorageService) {
  }

  get authenticated(): boolean {
    return false;
  }

  logIn(email: string, password: string): Observable<void> {
    return new Observable((observer) => {
      this.http.post<Token>(this.authenticationUrl + TOKEN_ENDPOINT,
        { "username": email, "password": password }, httpOptions)
        .subscribe(res => {
          this.setSession(res);
          this.statusChangeSource.next(true);
        });
      observer.next();
      observer.complete();
    });
  }

  private setSession(authResult) {
    this.tokenStorage.setAccess(authResult.access);
    this.tokenStorage.setRefresh(authResult.refresh);
  }

  logOut() {
    this.tokenStorage.clearTokens();
    this.statusChangeSource.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    const access_token: string = this.tokenStorage.getAccess();
    const refresh_token: string = this.tokenStorage.getRefresh();
    return new Observable((observer) => {
      if (refresh_token != null && this.jwtHelper.isExpired(access_token)) {
        this.http.post<Token>(this.authenticationUrl + TOKEN_ENDPOINT + REFRESH_ENDPOINT,
          { "refresh": refresh_token }, httpOptions)
          .subscribe(res => {
            this.setSession(res);
            observer.next(true);
            this.statusChangeSource.next(true);
            observer.complete();
          }, error => {
            this.tokenStorage.clearTokens();
            observer.next(false);
            this.statusChangeSource.next(false);
            observer.complete();
          }
          );
      } else {
        observer.next(access_token != null);
        observer.complete();
      }
    });
  }
  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
