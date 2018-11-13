import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fight } from './fight';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT,
  TEAM_FIGHTS_ENDPOINT
} from '../rest-api';
import { CrudfaService } from '../crudfa.service';

@Injectable()
export class FightService extends CrudfaService<Fight> {
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + FIGHTS_ENDPOINT,
      IPPON_HOST + TEAM_FIGHTS_ENDPOINT,
      FIGHTS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + FIGHTS_ENDPOINT
    );
  }
}
