import { Injectable } from '@angular/core';
import { GROUPS_ENDPOINT, GROUP_PHASES_ENDPOINT, IPPON_HOST, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CrudfService } from '../crudf.service';
import { Group } from './group';
import { Observable } from 'rxjs';
import { Authorization } from '../authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable()
export class GroupService extends CrudfService<Group> {
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUPS_ENDPOINT;
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + GROUPS_ENDPOINT,
      IPPON_HOST + GROUP_PHASES_ENDPOINT,
      GROUPS_ENDPOINT);
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
