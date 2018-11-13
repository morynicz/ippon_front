import { Injectable } from '@angular/core';
import { CrudfService } from '../crudf.service';
import { HttpClient } from '@angular/common/http';
import { IPPON_HOST, GROUP_FIGHTS_ENDPOINT, GROUPS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { GroupFight } from './group-fight';
import { CrudfaService } from '../crudfa.service';

@Injectable()
export class GroupFightService extends CrudfaService<GroupFight>{

  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + GROUP_FIGHTS_ENDPOINT,
      IPPON_HOST + GROUPS_ENDPOINT,
      GROUP_FIGHTS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUP_FIGHTS_ENDPOINT
    );
  }
}
