import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudlService } from '../crudl.service';
import { Fight } from './fight';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { Authorization } from '../authorization/Authorization';
import { Observable } from 'rxjs';

@Injectable()
export class FightService extends CrudlService<Fight> {
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + FIGHTS_ENDPOINT;
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + FIGHTS_ENDPOINT);
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
