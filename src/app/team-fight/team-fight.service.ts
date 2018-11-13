import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamFight } from './team-fight';
import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  TEAM_FIGHTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { CrudfaService } from '../crudfa.service';

@Injectable()
export class TeamFightService extends CrudfaService<TeamFight>{
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TEAM_FIGHTS_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      TEAM_FIGHTS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + TEAM_FIGHTS_ENDPOINT);
  }
}