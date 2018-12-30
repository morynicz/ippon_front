import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT,
  ADMINS_ENDPOINT,
  STAFF_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { CrudlaService } from '../crudla.service';
import { Observable } from 'rxjs';
import { Authorization } from '../authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TournamentService extends CrudlaService<Tournament>{
  staffUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + TOURNAMENTS_ENDPOINT + STAFF_ENDPOINT;
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + TOURNAMENTS_ENDPOINT + ADMINS_ENDPOINT)
  }

  isStaff(id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.get<Authorization>(this.staffUrl + `${id}/`, httpOptions)
        .subscribe(result => {
          observer.next(result.isAuthorized);
        }, error => {
          console.log("isAuthorizedError" + error);
          observer.next(false);
        });
    });
  }
}
