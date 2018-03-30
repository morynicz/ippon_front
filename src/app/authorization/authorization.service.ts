import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

export class Authorization {
  isAuthorized: boolean;
}

@Injectable()
export class AuthorizationService {
  private authorizationUrl = "http://localhost:8000/ippon/authorization";
  constructor(private http: HttpClient) { }

  isClubAdmin(id: number): Observable<boolean> {
    return this.isAuthorized(id, '/clubs/');
  }

  isTournamentAdmin(id: number): Observable<boolean> {
    return this.isAuthorized(id, '/tournaments/admins/');
  }

  isTournamentStaff(id: number): Observable<boolean> {
    return this.isAuthorized(id, '/tournaments/staff/');
  }

  private isAuthorized(id: number, urlPath: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Authorization>(this.authorizationUrl + urlPath + id).subscribe(result => {
        observer.next(result.isAuthorized);
      }, error => {
        console.log(error);
        observer.next(false);
      });
    });
  }
}
