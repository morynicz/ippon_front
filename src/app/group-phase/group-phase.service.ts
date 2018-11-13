import { Injectable } from '@angular/core';
import { GroupPhase } from './group-phase';
import { HttpClient } from '@angular/common/http';
import { IPPON_HOST, TOURNAMENTS_ENDPOINT, GROUP_PHASES_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { CrudfaService } from '../crudfa.service';


@Injectable()
export class GroupPhaseService extends CrudfaService<GroupPhase> {
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + GROUP_PHASES_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      GROUP_PHASES_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUP_PHASES_ENDPOINT)
  }
}
