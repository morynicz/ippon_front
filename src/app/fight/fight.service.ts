import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudlService } from '../crudl.service';
import { Fight } from './fight';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT,
  TEAM_FIGHTS_ENDPOINT
} from '../rest-api';
import { Authorization } from '../authorization/Authorization';
import { Observable } from 'rxjs';
import { CrudfService } from '../crudf.service';

@Injectable()
export class FightService extends CrudfService<Fight> {
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + FIGHTS_ENDPOINT;
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + FIGHTS_ENDPOINT,
      IPPON_HOST + TEAM_FIGHTS_ENDPOINT,
      FIGHTS_ENDPOINT);
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
