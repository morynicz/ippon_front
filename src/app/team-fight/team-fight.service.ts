import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CrudfService } from '../crudf.service';
import { TeamFight } from './team-fight';
import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  TEAM_FIGHTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { Observable } from 'rxjs';
import { Authorization } from '../authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()// FUCK TYPESCRIPT
export class TeamFightService extends CrudfService<TeamFight>{
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + TEAM_FIGHTS_ENDPOINT;
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TEAM_FIGHTS_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      TEAM_FIGHTS_ENDPOINT);
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