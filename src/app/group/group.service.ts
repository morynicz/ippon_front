import { Injectable } from '@angular/core';
import { GROUPS_ENDPOINT, GROUP_PHASES_ENDPOINT, IPPON_HOST, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';
import { CrudfaService } from '../crudfa.service';

@Injectable()
export class GroupService extends CrudfaService<Group> {
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + GROUPS_ENDPOINT,
      IPPON_HOST + GROUP_PHASES_ENDPOINT,
      GROUPS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUPS_ENDPOINT);
  }
}
