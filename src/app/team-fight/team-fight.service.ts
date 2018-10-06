import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CrudfService } from '../crudf.service';
import { TeamFight } from './team-fight';
import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  TEAM_FIGHTS_ENDPOINT
} from '../rest-api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()// FUCK TYPESCRIPT
export class TeamFightService extends CrudfService<TeamFight>{
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TEAM_FIGHTS_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      TEAM_FIGHTS_ENDPOINT);
  }
}