import { Injectable } from '@angular/core';
import { CrudfService } from '../crudf.service';
import { HttpClient } from '@angular/common/http';
import { IPPON_HOST, GROUP_FIGHTS_ENDPOINT, GROUPS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { Observable } from 'rxjs';
import { Authorization } from '../authorization/Authorization';
import { GroupFight } from './group-fight';

@Injectable()
export class GroupFightService extends CrudfService<GroupFight>{
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUP_FIGHTS_ENDPOINT;

  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + GROUP_FIGHTS_ENDPOINT,
      IPPON_HOST + GROUPS_ENDPOINT,
      GROUP_FIGHTS_ENDPOINT);
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
