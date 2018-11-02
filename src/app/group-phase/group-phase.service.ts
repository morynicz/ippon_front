import { Injectable } from '@angular/core';
import { CrudfService } from '../crudf.service';
import { GroupPhase } from './group-phase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPPON_HOST, TOURNAMENTS_ENDPOINT, GROUP_PHASES_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { Observable } from 'rxjs';
import { Authorization } from '../authorization/Authorization';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class GroupPhaseService extends CrudfService<GroupPhase> {
  authorizationUrl: string = IPPON_HOST + AUTHORIZATION_ENDPOINT
    + GROUP_PHASES_ENDPOINT;
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + GROUP_PHASES_ENDPOINT, 
      IPPON_HOST + TOURNAMENTS_ENDPOINT, GROUP_PHASES_ENDPOINT)
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
