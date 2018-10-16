import { Injectable } from '@angular/core';
import { TEAMS_ENDPOINT, IPPON_HOST, TOURNAMENTS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CrudfService } from '../crudf.service';
import { Team } from './team';
import { Observable } from 'rxjs';
import { Authorization } from '../authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()// FUCK TYPESCRIPT
export class TeamService extends CrudfService<Team>{
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + TEAMS_ENDPOINT;
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TEAMS_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      TEAMS_ENDPOINT);
  }

  isAuthorized(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Authorization>(this.authorizationUrl + `${id}/`)
        .subscribe(result => {
          observer.next(result.isAuthorized);
        }, error => {
          console.log(error);
          observer.next(false);
        });
    });
  }
}