import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class Authorization {
  isAuthorized: boolean;
}

import {
  IPPON_HOST,
  AUTHORIZATION_ENDPOINT,
  CLUBS_ENDPOINT,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT,
  STAFF_ENDPOINT
} from '../rest-api';

@Injectable()
export class AuthorizationService {
  private authorizationUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT;
  constructor(private http: HttpClient) { }

  isClubAdmin(id: number): Observable<boolean> {
    return this.isAuthorized(id, CLUBS_ENDPOINT);
  }

  isTournamentAdmin(id: number): Observable<boolean> {
    return this.isAuthorized(id, TOURNAMENTS_ENDPOINT + ADMINS_ENDPOINT);
  }

  isTournamentStaff(id: number): Observable<boolean> {
    return this.isAuthorized(id, TOURNAMENTS_ENDPOINT + STAFF_ENDPOINT);
  }

  private isAuthorized(id: number, urlPath: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Authorization>(this.authorizationUrl + urlPath + id)
        .subscribe(result => {
          observer.next(result.isAuthorized);
        }, error => {
          console.log(error);
          observer.next(false);
        });
    });
  }
}
