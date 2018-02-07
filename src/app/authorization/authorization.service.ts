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
  private authorizationUrl = "api/authorization";
  constructor(private http: HttpClient) { }

  isClubAdmin(id: number): Observable<Authorization> {
    return this.isAuthorized(id, '/club/');
  }

  isTournamentAdmin(id: number): Observable<Authorization> {
    return this.isAuthorized(id, '/tournament/admin/');
  }

  isTournamentStaff(id: number): Observable<Authorization> {
    return this.isAuthorized(id, '/tournament/staff/');
  }

  private isAuthorized(id: number, urlPath: string): Observable<Authorization> {
    return this.http.get<Authorization>(this.authorizationUrl + urlPath + id);
  }

}
